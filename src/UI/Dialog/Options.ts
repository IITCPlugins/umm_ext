import { clearMissionData } from "../../Edits";
import { main } from "../../Main";
import { about } from "./About";
import { dialogButton, dialogButtonClose } from "./Button";
import { editActiveMission } from "./SelectMission";


const button = (label: string, click: () => void) => {
    return $("<a>", { text: label, click })
}

export const showUmmOptions = () => {
    const state = main.state;
    const ummState = state.get();
    const current = state.getEditMission() ?? state.missions.get(0)!;


    const html = $("<div>", { class: "umm-options-list" }).append(

        $("<b>", { text: "Banner data" }), $("<br>"),
        'Banner name: <b><span>' + (state.getBannerName() ?? "N/A") + '</span></b><br>',
        'Banner description: <b><span>' + (state.getBannerDesc() ?? "N/A") + '</span></b><br>',
        'Mission title format: <b><span>' + (ummState.titleFormat ?? "N/A") + '</span></b> <span title="Title format allows:&#10;N = Mission number without leading 0 (if required by banner length)&#10;NN = Mission number with leading 0&#10;M = Planned banner length&#10;T = (mission title)&#10; &#10;eg. T N-M or NN.M T">(?)</span><br>',
        'Planned banner length: <b><span>' + state.getPlannedLength().toString() + '</span></b> <span title="Length your banner is going to be. Will be used for mission titles and to make sure you don\'t create too many.">(?)</span><br>',
        (ummState.plannedBannerLength % 6 != 0 ? '<span style="color: red;"><b>Warning:</b></span> banner length is not a multiple of 6<br>' : '<br><b>Active mission data</b><br>'),
        'Active mission: <b><span id="umm-active-mission-no">' + (current.id + 1).toString() + '</span></b><br>',
        'Active mission title: <b><span id="umm-active-mission-title">' + (current.title || "N/A") + '</span></b><br>',
        'Active mission portal count: <b><span id="umm-active-mission-no-portals">' + current.portals.length.toString() + '</span></b><br>',
        $("<br>"),

        $("<b>", { text: "Mission options" }), $("<br>"),
        'Layers: <label style="user-select: none"><input type="checkbox" onclick="window.plugin.umm.toggleLayerPaths(this.checked)" id="umm-layercheckbox-paths"' + (window.map.hasLayer(main.umm.ummMissionPaths) ? ' checked' : '') + '>Mission Paths</label> <label style="user-select: none"><input type="checkbox" onclick="window.plugin.umm.toggleLayerNumbers(this.checked)" id="umm-layercheckbox-numbers"' + (window.map.hasLayer(main.umm.ummMissionNumbers) ? ' checked' : '') + '>Mission Numbers</label>',
        button("Edit banner details", main.umm.editMissionSetDetails),
        button("Change active mission #", editActiveMission),
        button("Zoom to view all missions", main.umm.zoomAllMissions),
        $("<hr>"),
        button("Split mission", main.umm.splitMissionOptions),
        button("Merge missions", main.umm.mergeMissions),
        button("Reverse mission", main.umm.reverseMission),
        $("<hr>"),
        button("Clear ALL missions data", confirmClear),

        $("<b>", { text: "Import/Export" }), $("<br>"),
        button("Export banner data to file", main.umm.exportData),
        $("<div>").css({ width: 800, margin: "auto" }).append(
            '<b>Import banner data from file:</b><br>',
            $("<input>", { type: "file", change: confirmLoad }),

        )
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
};


const confirmClear = () => {
    if (confirm("Are you sure you want to clear ALL missions data?")) {
        clearMissionData();
    }
};

const confirmLoad = (event: JQuery.ChangeEvent) => {
    if (confirm("Are you sure you want to overwrite the current mission data?")) {
        main.umm.loadFile(event);
    }
};

