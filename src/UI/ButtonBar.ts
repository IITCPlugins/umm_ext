import { removeLastPortal, setCurrentMission, toggleMissionMode } from "../Edits";
import { main } from "../Main";
import { Mission } from "../State/Mission";
import { State } from "../State/State";
import { showUmmOptions } from "./Dialog/Options";
import { editActiveMission } from "./Dialog/SelectMission";
import { bannerNotification } from "./Notification";

import imgBookmarks from "../assets/bookmarks.png";
import imgNext from "../assets/next.png";
import imgPrevious from "../assets/previous.png";
import imgUndo from "../assets/undo.png";
import imgOpt from "../assets/options.png";


export const createToolbar = () => {

    const UMMToolbar = L.Control.extend({
        options: {
            position: 'topleft'
        },
        onAdd: () => {
            const container = $("<div>", { class: "leaflet-umm leaflet-bar" }).append(
                toolBarButton("umm-toggle-bookmarks", imgBookmarks, "UMM: Toggle Mission Mode", toggleMissionMode),
                toolBarButton("umm-next-mission", imgNext, "UMM: Next Mission", nextMission),
                toolBarButton("umm-edit-active-mission", undefined, "UMM: Select mission number", editActiveMission),
                toolBarButton("umm-previous-mission", imgPrevious, "UMM: Previous Mission", previousMission),
                toolBarButton("umm-number-of-portals", undefined, "UMM: Number of portals in current mission"),
                toolBarButton("umm-undo", imgUndo, "UMM: Remove Last", removeLastPortal),
                toolBarButton("umm-opt", imgOpt, "UMM: Opt", showUmmOptions),
            );

            return container[0];
        }
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
    window.map.addControl(new UMMToolbar());
};


const toolBarButton = (id: string, image: string | undefined, tooltip: string, click?: () => void): JQuery => {

    // width = "16" height = 16" style="margin - top: 7px; "></a>').on('click dblclick', '#umm-toggle-bookmarks', function (event) {

    return $("<a>", {
        id,
        class: "umm-control",
        title: window.isSmartphone() ? "" : tooltip
    })
        .on("click dblclick", ((event) => { event.stopPropagation(); if (click) click() }))
        .append($("<img>", { src: image }).css({ width: 16, height: 16, "margin-top": "7px" }));
}


export const updateCurrentActiveMissionSidebar = (state: State) => {
    $('#umm-edit-active-mission').text(state.getCurrent() + 1);
    $('#umm-edit-active-mission').css("background-color", "white");
    $('#umm-next-mission img').css("opacity", "100%");
    $('#umm-previous-mission img').css("opacity", "100%");

    const current = state.getCurrent();

    if (current >= state.getPlannedLength() - 1) {
        $('#umm-next-mission').children('img').css("opacity", "30%");
        $('#umm-edit-active-mission').css("background-color", "orange");
    }
    if (current === 0) {
        $('#umm-previous-mission').children('img').css("opacity", "30%");
    }
}


export const updatePortalCountSidebar = () => {
    const count = main.state.getEditMission()?.portals.length ?? 0;
    if (count < 1000) {
        $('#umm-number-of-portals').text(`P${count}`);
    } else {
        $('#umm-number-of-portals').text(`${count}`);
    }
}


const nextMission = () => {
    const state = main.state;
    if (state.getCurrent() >= state.getPlannedLength() - 1) return;

    // Activate the new mission
    setCurrentMission(state.getCurrent() + 1)

    const mission = state.getEditMission()!;
    console.assert(mission, "no mission found");

    if (mission.hasPortals()) {
        showMission(mission);
    } else {
        if (main.missionModeActive) {
            bannerNotification(state, `Start of mission #${state.getCurrent() + 1}\nSelect start portal.`);
        }
    }
}

const previousMission = () => {
    const state = main.state;
    if (state.getCurrent() <= 0) return;

    // Activate the new mission
    setCurrentMission(state.getCurrent() - 1)

    const mission = state.getEditMission()!;
    console.assert(mission, "no mission found");

    showMission(mission);
}

const showMission = (mission: Mission) => {
    if (mission.hasPortals()) {
        mission.show();

        updatePortalCountSidebar();

        if (main.missionModeActive) {
            bannerNotification(main.state, `Mission mode active.\nCurrent mission #${main.state.getCurrent() + 1}\nSelect next portal`);
        } else {
            bannerNotification(main.state, `Current active mission set to #${main.state.getCurrent() + 1}`);
        }
    }
}