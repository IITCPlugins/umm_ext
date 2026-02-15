const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const dist = path.join(repoRoot, "dist");
const fileIITC = path.join(dist, "iitc.user.js");
const fileEditor = path.join(dist, "editor.user.js");
const outFile = path.join(dist, "iitc_plugin_UMM_Ext.user.js");
const outFileMeta = path.join(dist, "iitc_plugin_UMM_Ext.meta.js");

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function extractHeader(content) {
  const m = content.match(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/);
  return m ? m[0] : "";
}

function addMatchToHeader(header) {
  return header.replace(
    /^(\/\/\s+@match.*)$/m,
    "$1\n// @match           https://missions.ingress.com/*",
  );
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

let header = extractHeader(a) || extractHeader(b) || "";
header = addMatchToHeader(header);

// Ensure @updateURL and @downloadURL point to the final hosted meta.js and user.js
// Use the canonical GitHub raw location for the dist artifacts (adjust if your repo/branch differs)
const githubRawBase = "https://github.com/IITCPlugins/umm_ext/raw/refs/heads/main/dist";
const finalMeta = `${githubRawBase}/iitc_plugin_UMM_Ext.meta.js`;
const finalUser = `${githubRawBase}/iitc_plugin_UMM_Ext.user.js`;

// Remove any existing update/download URL lines and insert the correct ones after @namespace
header = header.replace(/\/\/\s+@updateURL.*\n/g, "");
header = header.replace(/\/\/\s+@downloadURL.*\n/g, "");
if (/\/\/\s+@namespace/.test(header)) {
  header = header.replace(/(\/\/\s+@namespace[^\n]*\n)/, `$1// @updateURL       ${finalMeta}\n// @downloadURL     ${finalUser}\n`);
} else {
  // Fallback: append to the header if @namespace isn't present
  header = header.replace(/\/\/ ==UserScript==\n/, `// ==UserScript==\n// @updateURL       ${finalMeta}\n// @downloadURL     ${finalUser}\n`);
}
const partA = prepare(fileIITC, "wrapper_iitc");
const partB = prepare(fileEditor, "wrapper_editor");

const combinedInit = `
(function () {
  const info = {};
  if (typeof GM_info !== 'undefined' && GM_info && GM_info.script)
    info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
  if (typeof unsafeWindow != 'undefined' || typeof GM_info == 'undefined' || GM_info.scriptHandler != 'Tampermonkey') {

    var pluginContent;
    if (window.location.host.match(/^intel\.ingress\.com$/i)) 
      pluginContent = wrapper_iitc;
    else 
      pluginContent = wrapper_editor;
    
    const script = document.createElement('script');
    const code = '(' + pluginContent + ')(' + JSON.stringify(info) + ');'
    script.appendChild(document.createTextNode(code));
    document.head.appendChild(script);
  } 
})();
`;

const out = [header.trim(), "", partA, "", partB, "", combinedInit]
  .filter(Boolean)
  .join("\n");

fs.writeFileSync(outFile, out, "utf8");
console.log("Wrote merged userscript to", outFile);

fs.writeFileSync(outFileMeta, header, "utf8");

// Exit with success
process.exitCode = 0;
