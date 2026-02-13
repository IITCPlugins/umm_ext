import { clearMissionData, mergeMissions, reverseMission, splitMissionOptions } from "../../Edits";
import { exportData, loadFileInput } from "../../ImportExport";
import { main } from "../../Main";
import { State } from "../../State/State";
import { title } from "../../Text/Text";
import { about } from "./About";
import { button, dialogButton, dialogButtonClose } from "./Button";
import { confirmDialog } from "./Confirm";
import { editMissionSetDetails } from "./MissionDetails";
import { editActiveMission } from "./SelectMission";

const lable = (lable: string): JQuery => {
    return $("<td>", { text: lable });
}

const stat = (id: string): JQuery => {
    return $("<td>").append($("<span>", { class: "stat", id }));
}

export const showUmmOptions = () => {
    const state = main.state;

    const html = $("<div>", { class: "umm-options-list" }).append(
        $("<p>", { class: "banner_info" }).append(
            $("<div>", { class: "title", id: "umm_opt_bannername" }),
            $("<div>", { class: "description", id: "umm_opt_bannerdesc" }),
            "<table><tr>",
            lable("Title format"),
            stat("umm_opt_bannerformat").append(
                $("<span>", { text: "(?)", title: "Title format allows:&#10;N = Mission number without leading 0 (if required by banner length)&#10;NN = Mission number with leading 0&#10;M = Planned banner length&#10;T = (mission title)&#10; &#10;eg. T N-M or NN.M T" }),
            ),
            $("<td>").css({ width: "2em" }),
            lable("Missions"), stat("umm_opt_bannerlength"),
            "</tr><tr>",
            lable("Waypoints"), stat("umm_opt_waypoints"),
            $("<td>"),
            lable("Length"), stat("umm_opt_bannerdistance"),
            "</tr></table>",
            $("<div>", { id: "umm_opt_error" }),
            button("Edit", () => editMissionSetDetails(), "editButtom"),
        ),
        $("<p>").append(
            'Layers:',
            '<label style="user-select: none">Mission Paths</label>',
            $("<input>", {
                type: "checkbox",
                click: (event: Event) => tooglePathsLayer((event.target as HTMLInputElement).checked),
                checked: main.renderPath.isVisible()
            }),
            '<label style="user-select: none">Mission Numbers</label>',
            $("<input>", {
                type: "checkbox",
                click: (event: Event) => toggleLayerNumbers((event.target as HTMLInputElement).checked),
                checked: main.renderNumbers.isVisible()
            }),
            button("Change active mission #", editActiveMission, "w-full"),
            button("Zoom to view all missions", () => state.missions.zoom(), "w-full"),
        ),
        $("<hr>"),
        button("Split mission", splitMissionOptions, "w-full"),
        button("Merge missions", mergeMissions, "w-full"),
        button("Reverse mission", reverseMission, "w-full"),
        button("Clear ALL missions data", confirmClear, "w-full"),
        $("<hr>"),

        $("<b>", { text: "Import/Export" }), $("<br>"),
        button("Export banner data to file", () => exportData(main.state), "w-full"),
        $("<div>").css({ width: 800, margin: "auto" }).append(
            '<b>Import banner data from file:</b><br>',
            $("<input>", { type: "file", change: confirmLoad }),

        )
    );

    window.dialog({
        html: html,
        title: `${title} ${VERSION}`,
        id: 'umm-options',
        width: 350,
        buttons: [
            dialogButton("About this plugin", about),
            dialogButtonClose()
        ],
        closeCallback: () => destroy()
    })


    window.map.on('layeradd', onLayerAdd);
    window.map.on('layerremove', onLayerRemove);
    main.state.onMissionChange.do(updateDialog);
    updateDialog();
};


const destroy = () => {
    window.map.off('layeradd', onLayerAdd);
    window.map.off('layerremove', onLayerRemove);
    main.state.onMissionChange.dont(updateDialog);
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


const updateDialog = () => {
    const state = main.state;
    $("#umm_opt_bannername").text(state.getBannerName() ?? "N/A");
    $("#umm_opt_bannerdesc").text(state.getBannerDesc() ?? "N/A");
    $("#umm_opt_bannerformat").text(state.getTitleFormat() ?? "N/A");
    $("#umm_opt_bannerlength").text(state.getPlannedLength().toString());
    $("#umm_opt_waypoints").text(state.missions.getWaypointCount().toString());
    $("#umm_opt_bannerdistance").text(window.formatDistance(state.missions.getTotalDistance()));

    $("#umm_opt_error")
        .empty()
        .append(validateMissions(state));
};


const validateMissions = (state: State): string => {
    const invalidMissions = state.missions.validate();

    const result: string[] = [];
    for (const error in invalidMissions) {
        const numbers = invalidMissions[error].map(n => n + 1).join(", ");
        result.push(`<span class="error">${error}:</span></br>Mission: ${numbers}`);
    };


    return result.join("<br>");
};


const confirmClear = async () => {
    if (await confirmDialog({ message: "Clear all Mission data?", details: "Removes mission settings and waypoints. This action cannot be undone." })) {
        clearMissionData();
    }
};


const confirmLoad = async (event: Event) => {
    if (main.state.isEmpty() ||
        await confirmDialog({ message: "Overwrite current data?", details: "All current missions will be replaced by the imported data." })
    ) {
        await loadFileInput(event, main.state);
        main.state.checkAllPortals();
        main.state.missions.zoom();
    }
};


const tooglePathsLayer = (show: boolean) => main.renderPath.toggle(show);
const toggleLayerNumbers = (show: boolean) => main.renderNumbers.toggle(show);
