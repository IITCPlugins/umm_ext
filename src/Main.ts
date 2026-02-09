import * as Plugin from "iitcpluginkit";
import { UMM, UMM_old, UMM_State } from "./UMM_types";
import { RenderPath } from "./UI/RenderPath";
import { RenderNumbers } from "./UI/RenderNumbers";
import { State } from "./State/State";
import { addPortalToCurrentMission, clearMissionData, mergeMissions, removeLastPortal, reverseMission, setCurrentMission, splitMissionOptions, startEdit, toggleMissionMode } from "./Edits";
import { about } from "./UI/Dialog/About";
import { showUmmOptions } from "./UI/Dialog/Options";
import { editActiveMission } from "./UI/Dialog/SelectMission";
import { editMissionSetDetails } from "./UI/Dialog/MissionDetails";
import { createToolbar, updateCurrentActiveMissionSidebar, updatePortalCountSidebar } from "./UI/ButtonBar";
import { addWaypointEditorToPortal } from "./UI/EditWaypoint";


// eslint-disable-next-line unicorn/prevent-abbreviations
class UMM_Ext implements Plugin.Class {

    public umm: UMM;

    public renderPath: RenderPath;
    public renderNumbers: RenderNumbers;
    public state: State;
    public missionModeActive: boolean;
    public missionModeResuming: boolean; // TODO: move it to edit.ts?


    constructor() {
        // prevent UMM boot
        const index = window.bootPlugins.findIndex((x: any) => {
            return x.info.script.name === "IITC Plugin: Ultimate Mission Maker";
        });

        if (index !== -1) {
            console.info("Ultimate Mission Editor found - this is no longer required for UMM-Ext");
            window.bootPlugins.splice(index, 1);
        }
    }


    init() {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("./styles.pcss");

        this.umm = (window.plugin as any).umm;
        if (!this.umm) {
            // TODO REMOVE UMM
            console.error("UMM_Ext: UMM plugin not found!");
            return;
        }

        this.state = new State();

        $('body').append("<div class='umm-notification' style='display:none'></div>");

        createToolbar();
        $('#toolbox').append(
            $('<a>', { text: "UMM", title: "Ultimate Mission Maker", click: () => $('.leaflet-umm.leaflet-bar').toggle() }));

        // hide toolbar by default
        $('.leaflet-umm.leaflet-bar').hide();

        this.umm.ummMissionPaths = new window.L.FeatureGroup();
        window.addLayerGroup('UMM: Mission Paths', this.umm.ummMissionPaths, true);
        this.renderPath = new RenderPath(this.umm.ummMissionPaths);


        this.umm.ummMissionNumbers = new window.L.FeatureGroup();
        window.addLayerGroup('UMM: Mission Numbers', this.umm.ummMissionNumbers, true);
        this.renderNumbers = new RenderNumbers(this.umm.ummMissionNumbers);

        window.addHook('portalSelected', (event) => addPortalToCurrentMission(event));
        window.addHook('portalDetailsUpdated', addWaypointEditorToPortal);
        window.addHook('mapDataRefreshEnd', () => this.state.checkAllPortals()); // TODO: only do it if required

        this.missionModeActive = false;
        this.missionModeResuming = false;

        this.patch();

        this.redrawAllTotal();
    }

    private get ori(): UMM_old { return this.umm as UMM_old; }

    redrawAll() {
        this.renderPath.redraw();
        this.renderNumbers.redraw();
        updatePortalCountSidebar();
    }

    redrawAllTotal() {
        updateCurrentActiveMissionSidebar(this.state);
        updatePortalCountSidebar();
        this.umm.reloadSettingsWindowIfNeeded();
        this.redrawAll();
        this.state.missions.zoom();
        renderPortalDetails(window.selectedPortal);
    }

    patch() {
        this.monkeyPatchState();
        this.monkeyPatchDrawing();
        this.monkeyPatchNumbers();
        this.monkeyPatchMissionSelect();
        this.monkeyPatchPortalEdits();
        this.monkeyPatchDialogs();
        this.monkeyPatchToolbar();
    }



    // Patch - State management
    monkeyPatchState() {
        this.ori.getUmmState = () => this.state.get();
        this.ori.saveUmmState = (_ummState: UMM_State) => {
            // we assume the state is already updated
            this.state.save();
        };

        this.ori.clearMissionData = clearMissionData;
    }


    // Patch - Path editing
    monkeyPatchDrawing() {
        // Patch - Inject our Path Renderer
        this.ori.drawMissions = () => this.renderPath.redraw();
        this.ori.redrawUmmIitc = main.redrawAllTotal;
        this.ori.zoomAllMissions = () => main.state.missions.zoom();

        // init repaint
        this.renderPath.redraw();
    }

    // Patch - Autonumbers
    monkeyPatchNumbers() {
        // Patch - Inject our Number Renderer
        this.ori.refreshMissionNumbers = () => this.renderNumbers.redraw();
    }

    // Patch - Select every mission - even when empty
    monkeyPatchMissionSelect() {
        this.ori.nextMission = () => this.state.nextMission();
        this.ori.previousMission = () => this.state.prevMission();
    }

    // Patch - refresh our drawing on new Portal add
    monkeyPatchPortalEdits() {
        this.ori.addPortalToCurrentMission = addPortalToCurrentMission;
        this.ori.undoPortal = removeLastPortal;
        this.ori.toggleMissionMode = toggleMissionMode;
        this.ori.splitMissionOptions = splitMissionOptions;
        this.ori.mergeMissions = mergeMissions;
        this.ori.reverseMission = reverseMission;
        this.ori.setCurrentMission = setCurrentMission;
        this.ori.resumeOrStartNewMission = startEdit;
    }

    monkeyPatchDialogs() {
        this.ori.about = about;
        this.ori.showUmmOptions = showUmmOptions;
        this.ori.editActiveMission = editActiveMission;
        this.ori.editMissionSetDetails = editMissionSetDetails;

        this.ori.addUmmButtons = createToolbar;

        this.ori.reloadSettingsWindowIfNeeded = () => {
            if (window.iitcLoaded) {
                if ($("#dialog-umm-options").dialog('isOpen')) {
                    showUmmOptions();
                }
            }
        }
    }


    monkeyPatchToolbar() {
        this.ori.updateCurrentActiveMissionSidebar = () => updateCurrentActiveMissionSidebar(this.state);
        this.ori.updatePortalCountSidebar = updatePortalCountSidebar;
    }
}


/**
 * use "main" to access you main class from everywhere
 * (same as window.plugin.UMM_Ext)
 */
export const main = new UMM_Ext();
Plugin.Register(main, "UMM_Ext");

