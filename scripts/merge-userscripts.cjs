const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const dist = path.join(repoRoot, "dist");
const fileIITC = path.join(dist, "iitc.user.js");
const fileEditor = path.join(dist, "editor.user.js");
const outFile = path.join(dist, "combined.user.js");

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function extractHeader(content) {
  const m = content.match(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/);
  return m ? m[0] : "";
}

function stripHeader(content) {
  return content.replace(
    /\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==\n?/,
    "",
  );
}

function renameWrapper(content, newName) {
  // rename the wrapper function declaration
  return content.replace(/function\s+wrapper\s*\(/, `function ${newName}(`);
}

function removeInitIIFE(content) {
  // Remove the final init IIFE that injects the wrapper into the page.
  // Look for the unique call to script.appendChild(document.createTextNode and remove the surrounding (function(){...})();
  const injectMarker = "script.appendChild(document.createTextNode";
  const idx = content.indexOf(injectMarker);
  if (idx === -1) return content;
  const start = content.lastIndexOf("(function", idx);
  if (start === -1) return content;
  const endMarker = "})();";
  const end = content.indexOf(endMarker, idx);
  if (end === -1) return content;
  return content.slice(0, start) + content.slice(end + endMarker.length);
}

function prepare(file, wrapperName) {
  let txt = read(file);
  if (!txt) return "";
  txt = stripHeader(txt);
  txt = renameWrapper(txt, wrapperName);
  txt = removeInitIIFE(txt);
  return txt.trim() + "\n";
}

const a = read(fileIITC);
const b = read(fileEditor);
if (!a || !b) {
  console.error("Missing source files in dist/:", { iitc: !!a, editor: !!b });
  process.exitCode = 1;
  process.exit();
}

const header = extractHeader(a) || extractHeader(b) || "";
const partA = prepare(fileIITC, "wrapper_iitc");
const partB = prepare(fileEditor, "wrapper_editor");

const combinedInit = `
(function () {
  const info = {};
  if (typeof GM_info !== 'undefined' && GM_info && GM_info.script)
    info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
  if (typeof unsafeWindow != 'undefined' || typeof GM_info == 'undefined' || GM_info.scriptHandler != 'Tampermonkey') {
    const script = document.createElement('script');
    const code = '(' + wrapper_iitc + ')(' + JSON.stringify(info) + ');(' + wrapper_editor + ')(' + JSON.stringify(info) + ');';
    script.appendChild(document.createTextNode(code));
    document.head.appendChild(script);
  } else {
    try { wrapper_iitc(info); } catch (e) {}
    try { wrapper_editor(info); } catch (e) {}
  }
})();
`;

const out = [header.trim(), "", partA, "", partB, "", combinedInit]
  .filter(Boolean)
  .join("\n");

fs.writeFileSync(outFile, out, "utf8");
console.log("Wrote merged userscript to", outFile);

// Exit with success
process.exitCode = 0;
