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

        this.state = new State();

        createToolbar();
        $('#toolbox').append(
            $('<a>', { text: "UMM", title: "Ultimate Mission Maker", click: () => this.toggleUMMBar() }));

        // hide toolbar by default
        $('.leaflet-umm.leaflet-bar').hide();


        this.renderPath = new RenderPath();
        this.renderNumbers = new RenderNumbers();

        window.addHook('portalSelected', (event) => addPortalToCurrentMission(event));
        window.addHook('portalDetailsUpdated', addWaypointEditorToPortal);
        window.addHook('mapDataRefreshEnd', () => this.state.checkAllPortals()); // TODO: only do it if required
        window.addHook("portalDetailsUpdated", event => this.state.checkPortal(event));

        this.missionModeActive = false;

        this.renderPath.redraw();
        this.renderNumbers.redraw();
    }

    toggleUMMBar() {
        $('.leaflet-umm.leaflet-bar').toggle();

        if ($('.leaflet-umm.leaflet-bar').is(":visible")) {
            // drawing attention
            $('.leaflet-umm').fadeIn().fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn();
            if (this.state.isEmpty()) {
                editMissionSetDetails();
            } else {
                this.state.missions.zoom();
            }

            // restore layer status
            const layer = [this.renderPath, this.renderNumbers];
            layer.forEach(l => l.toggle(true));
        } else {
            // store layer status
            const layer = [this.renderPath, this.renderNumbers];
            layer.forEach(l => l.toggle(false));
        }
    }
}


/**
 * use "main" to access you main class from everywhere
 * (same as window.plugin.UMM_Ext)
 */
export const main = new UMM_Ext();
Plugin.Register(main, "UMM_Ext");
