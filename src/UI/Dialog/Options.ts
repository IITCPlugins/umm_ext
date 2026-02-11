import { clearMissionData, mergeMissions, reverseMission, splitMissionOptions } from "../../Edits";
import { exportData, loadFileInput } from "../../ImportExport";
import { main } from "../../Main";
import { State } from "../../State/State";
import { updateCurrentActiveMissionSidebar, updatePortalCountSidebar } from "../ButtonBar";
import { title } from "../Text";
import { about } from "./About";
import { button, dialogButton, dialogButtonClose } from "./Button";
import { editMissionSetDetails } from "./MissionDetails";
import { editActiveMission } from "./SelectMission";



export const showUmmOptions = () => {
    const state = main.state;

    const html = $("<div>", { class: "umm-options-list" }).append(

        $("<p>").append(
            $("<b>", { text: "Banner data" }), $("<br>"),
            'Banner name: <b><span>' + (state.getBannerName() ?? "N/A") + '</span></b><br>',
            'Banner description: <b><span>' + (state.getBannerDesc() ?? "N/A") + '</span></b><br>',
            'Mission title format: <b><span>' + (state.getTitleFormat() ?? "N/A") + '</span></b> <span title="Title format allows:&#10;N = Mission number without leading 0 (if required by banner length)&#10;NN = Mission number with leading 0&#10;M = Planned banner length&#10;T = (mission title)&#10; &#10;eg. T N-M or NN.M T">(?)</span><br>',
            'Planned banner length: <b><span>' + state.getPlannedLength().toString() + '</span></b><br>',
            'Length: <b><span>' + window.formatDistance(state.missions.getTotalDistance()) + '</span></b><br>',

            validateMissions(state),
        ),
        $("<p>").append(
            $("<b>", { text: "Mission options" }), $("<br>"),
            'Layers: ',
            '<label style="user-select: none"><input type="checkbox" onclick="window.plugin.umm.toggleLayerPaths(this.checked)" id="umm-layercheckbox-paths"' + (main.renderPath.isVisible() ? ' checked' : '') + '>Mission Paths</label>',
            '<label style="user-select: none"><input type="checkbox" onclick="window.plugin.umm.toggleLayerNumbers(this.checked)" id="umm-layercheckbox-numbers"' + (main.renderNumbers.isVisible() ? ' checked' : '') + '>Mission Numbers</label>',
            button("Edit banner details", editMissionSetDetails, "w-full"),
            button("Change active mission #", editActiveMission, "w-full"),
            button("Zoom to view all missions", () => state.missions.zoom(), "w-full"),
        ),
        $("<hr>"),
        button("Split mission", splitMissionOptions, "w-full"),
        button("Merge missions", mergeMissions, "w-full"),
        button("Reverse mission", reverseMission, "w-full"),
        $("<hr>"),
        button("Clear ALL missions data", confirmClear, "w-full"),

        $("<b>", { text: "Import/Export" }), $("<br>"),
        button("Export banner data to file", () => exportData(main.state), "w-full"),
        $("<div>").css({ width: 800, margin: "auto" }).append(
            '<b>Import banner data from file:</b><br>',
            $("<input>", { type: "file", change: confirmLoad }),

        )
    );

    // move this to option dialog
    window.map.on('layeradd', onLayerAdd);
    window.map.on('layerremove', onLayerRemove);

    window.dialog({
        html: html,
        title: `${title} v${VERSION}`,
        id: 'umm-options',
        width: 350,
        buttons: [
            dialogButton("About this plugin", about),
            dialogButtonClose()
        ],
        closeCallback: () => destroy()
    })
};


const destroy = () => {
    window.map.off('layeradd', onLayerAdd);
    window.map.off('layerremove', onLayerRemove);
}


const onLayerAdd = (event: L.LeafletLayerEvent) => {
    if (main.renderPath.isLayer(event.layer)) {
        $('#umm-layercheckbox-paths').prop("checked", true);
    }
    if (main.renderNumbers.isLayer(event.layer)) {
        $('#umm-layercheckbox-numbers').prop("checked", true);
    }
};

const onLayerRemove = (event: L.LeafletLayerEvent) => {
    if (main.renderPath.isLayer(event.layer)) {
        $('#umm-layercheckbox-paths').prop("checked", false);
    }
    if (main.renderNumbers.isLayer(event.layer)) {
        $('#umm-layercheckbox-numbers').prop("checked", false);
    }
};


const validateMissions = (state: State): string => {
    const invalidMissions = state.missions.validate();

    const result: string[] = [];
    for (const error in invalidMissions) {
        const numbers = invalidMissions[error].map(n => n + 1).join(", ");
        result.push(`<span style="color: red;"><b>${error}:</b></span> Mission: ${numbers}`);
    };


    return result.join("<br>");
}


const confirmClear = () => {
    if (confirm("Are you sure you want to clear ALL missions data?")) {
        clearMissionData();
    }
};

const confirmLoad = async (event: Event) => {
    if (confirm("Are you sure you want to overwrite the current mission data?")) {
        await loadFileInput(event, main.state);
        main.state.checkAllPortals();

        main.redrawAll();
        updateCurrentActiveMissionSidebar(main.state);
        updatePortalCountSidebar();
        main.state.missions.zoom();
    }
};

