import * as Plugin from "iitcpluginkit";
import { RenderPath } from "./UI/RenderPath";
import { RenderNumbers } from "./UI/RenderNumbers";
import { State } from "./State/State";
import { addPortalToCurrentMission } from "./Edits";
import { createToolbar } from "./UI/ButtonBar";
import { addWaypointEditorToPortal } from "./UI/EditWaypoint";
import { editMissionSetDetails } from "./UI/Dialog/MissionDetails";


// eslint-disable-next-line unicorn/prevent-abbreviations
class UMM_Ext implements Plugin.Class {

    public state: State;
    public renderPath: RenderPath;
    public renderNumbers: RenderNumbers;
    public missionModeActive: boolean;


    constructor() {
        // prevent UMM boot
        const index = window.bootPlugins?.findIndex((x: any) => {
            return x.info?.script?.name === "IITC Plugin: Ultimate Mission Maker";
        });

        if (index && index !== -1) {
            console.info("Ultimate Mission Editor found - this is no longer required for UMM-Ext");
            window.bootPlugins.splice(index, 1);
        }
    }


    init() {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("./styles.pcss");

        this.state = new State();

        createToolbar();
        $('#toolbox').append(
            $('<a>', { text: "UMM", title: "Ultimate Mission Maker", click: () => this.toggleUMM() }));

        // hide toolbar by default
        $('.leaflet-umm.leaflet-bar').hide();

        this.renderPath = new RenderPath();
        this.renderNumbers = new RenderNumbers();

        this.missionModeActive = false;
    }

    toggleUMM() {
        $('.leaflet-umm.leaflet-bar').toggle();

        if ($('.leaflet-umm.leaflet-bar').is(":visible")) {
            this.activateUMM();
        } else {
            this.deactivateUMM();
        }
    }

    activateUMM() {
        // drawing attention
        $('.leaflet-umm').fadeIn().fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn();
        if (this.state.isEmpty()) {
            editMissionSetDetails();
        } else {
            this.state.missions.zoom();
        }

        this.renderPath.toggle(true);
        this.renderNumbers.toggle(true);

        this.missionModeActive = false;
        this.renderPath.redraw();
        this.renderNumbers.redraw();

        window.addHook('portalSelected', this.onPortalSelected);
        window.addHook('portalDetailsUpdated', this.onPortalDetailsUpdated);
        window.addHook('mapDataRefreshEnd', this.onMapDataRefreshEnd);

        addWaypointEditorToPortal();
    }


    deactivateUMM() {
        this.missionModeActive = false;
        this.renderPath.toggle(false);
        this.renderNumbers.toggle(false);

        window.removeHook('portalSelected', this.onPortalSelected);
        window.removeHook('portalDetailsUpdated', this.onPortalDetailsUpdated);
        window.removeHook('mapDataRefreshEnd', this.onMapDataRefreshEnd);

        // remove editor if open
        $("#umm-waypoint-editor").remove();
    }


    onPortalSelected = (event: EventPortalSelected) => void addPortalToCurrentMission(event);
    onPortalDetailsUpdated = (event: EventPortalDetailsUpdated) => {
        this.state.checkPortal(event);
        addWaypointEditorToPortal();
    }
    onMapDataRefreshEnd = () => this.state.checkAllPortals();

}


/**
 * use "main" to access you main class from everywhere
 * (same as window.plugin.UMM_Ext)
 */
export const main = new UMM_Ext();
Plugin.Register(main, "UMM_Ext");
