import { main } from "../../Main";
import { about } from "./About";
import { dialogButton, dialogButtonClose } from "./Button";

export const showUmmOptions = () => {
    const ummState = main.state.get();

    const html = $("<div>", { class: "umm-options-list" }).append(
        $("<b>", { text: "Banner data" }), $("<br>"),
        'Banner name: <b><span>' + (ummState.missionSetName ?? "N/A") + '</span></b><br>',
        'Banner description: <b><span>' + (ummState.missionSetDescription ?? "N/A") + '</span></b><br>',
        'Mission title format: <b><span>' + (ummState.titleFormat ?? "N/A") + '</span></b> <span title="Title format allows:&#10;N = Mission number without leading 0 (if required by banner length)&#10;NN = Mission number with leading 0&#10;M = Planned banner length&#10;T = (mission title)&#10; &#10;eg. T N-M or NN.M T">(?)</span><br>',
        'Planned banner length: <b><span>' + ummState.plannedBannerLength + '</span></b> <span title="Length your banner is going to be. Will be used for mission titles and to make sure you don\'t create too many.">(?)</span><br>',
        (ummState.plannedBannerLength % 6 != 0 ? '<span style="color: red;"><b>Warning:</b></span> banner length is not a multiple of 6<br>' : '<br><b>Active mission data</b><br>'),
        'Active mission: <b><span id="umm-active-mission-no">' + (ummState.currentMission + 1) + '</span></b><br>',
        'Active mission title: <b><span id="umm-active-mission-title">' + (ummState.missions[ummState.currentMission].missionTitle || "N/A") + '</span></b><br>',
        'Active mission portal count: <b><span id="umm-active-mission-no-portals">' + ummState.missions[ummState.currentMission].portals.length + '</span></b><br>',

        $("<br>"),
        $("<b>", { text: "Mission options" }), $("<br>"),
        'Layers: <label style="user-select: none"><input type="checkbox" onclick="window.plugin.umm.toggleLayerPaths(this.checked)" id="umm-layercheckbox-paths"' + (window.map.hasLayer(main.umm.ummMissionPaths) ? ' checked' : '') + '>Mission Paths</label> <label style="user-select: none"><input type="checkbox" onclick="window.plugin.umm.toggleLayerNumbers(this.checked)" id="umm-layercheckbox-numbers"' + (window.map.hasLayer(main.umm.ummMissionNumbers) ? ' checked' : '') + '>Mission Numbers</label>',
        '<a onclick="window.plugin.umm.editMissionSetDetails(); return false;">Edit banner details</a>',
        '<a onclick="window.plugin.umm.editActiveMission(); return false;">Change active mission #</a>',
        '<a onclick="window.plugin.umm.zoomAllMissions(); return false;">Zoom to view all missions</a>',
        $("<hr>"),
        '<a onclick="window.plugin.umm.splitMissionOptions(); return false;">Split mission</a>',
        '<a onclick="window.plugin.umm.mergeMissions(); return false;">Merge missions</a>',
        '<a onclick="window.plugin.umm.reverseMission(); return false;">Reverse mission</a>',
        $("<hr>"),
        '<a onclick="if (confirm(\'Are you sure you want to clear ALL missions data?\')) window.plugin.umm.clearMissionData(); return false;">Clear ALL missions data</a>',
        '<b>Import/Export</b><br>',
        '<a onclick="window.plugin.umm.exportData(); return false;">Export banner data to file</a>',
        '<div style="width:80%; margin: auto;"><b>Import banner data from file:</b><br>',
        '<input type="file" id="umm-import-file"></input></div>',

    );

    window.dialog({
        html: html,
        title: `${main.umm.title} v${main.umm.version}`,
        id: 'umm-options',
        width: 350,
        buttons: [
            dialogButton("About this plugin", about),
            dialogButtonClose()
        ],
    })

    $("#umm-import-file").on('change', (event) => {
        if (confirm("Are you sure you want to overwrite the current mission data?")) {
            main.umm.loadFile(event);
        }
    });
};
