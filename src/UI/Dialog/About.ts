import { title } from "../../Text/Text";
import { dialogButton, dialogButtonClose } from "./Button";
import { showUmmOptions } from "./Options";

import changelogText from "../../../CHANGELOG.md";


export const about = () => {
    let html = '<div class="umm-options-list">';
    html += 'In short: Create missions in IITC, export as a json file:<br>';
    html += '<a href="https://intel.ingress.com/" target="_blank"' + (/^intel\.ingress\.com$/i.test(window.location.host) ? ' style="color: #bbb; pointer-events: none; cursor: default;"' : '') + '>https://intel.ingress.com/</a>';
    html += 'Then open the mission creator and load the json file.<br>';
    html += 'Start creating missions and import the UMM data for every mission:<br>';
    html += '<a href="https://missions.ingress.com/" target="_blank"' + (/^missions\.ingress\.com$/i.test(window.location.host) ? ' style="color: #bbb; pointer-events: none; cursor: default;"' : '') + '>https://missions.ingress.com/</a>';
    html += 'Documentation for this plugin can be found at:<br>';
    html += '<a href="https://umm.8bitnoise.rocks/" target="_blank">https://umm.8bitnoise.rocks/</a>';
    html += 'Questions, feature requests and tips:<br>';
    html += '<a href="https://t.me/joinchat/j9T9eLfa3VJlZWE0" target="_blank">Telegram: [XF] Ultimate Mission Maker</a>';
    html += '</div>';

    const buttons = [
        dialogButton("< Main Menu", showUmmOptions),
        dialogButton("Changelog", () => dialog({ title: "Changelog", html: miniMarkdown(changelogText), width: 500 })),
        dialogButtonClose()
    ];

    window.dialog({
        html: html,
        title: `${title} ${VERSION} - About`,
        id: 'umm-options',
        width: 350,
        buttons: buttons
    });
};

// we don't want to bloat the plugin just for the changelog. so we use a mini markdown converter:
const miniMarkdown = (incoming: string): string => {
    return incoming
        .replace(/^---/gm, "<hr>")
        .replace(/^##\s(.*)\n*/gm, "<h3>$1</h3>")
        .replace(/^#\s(.*)\n*/gm, "<h2>$1</h2>")
        .replace(/\*\*(.*)\*\*/gm, "<b>$1</b>")
        .replace(/\n/gm, "<br/>")
        .replace(/(<\/h.>)<br>/gm, "$1")
        .replace(/<br>(<h.>)/gm, "$1")
}