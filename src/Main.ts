import * as Plugin from "iitcpluginkit";
import { RenderPath } from "./UI/RenderPath";
import { RenderNumbers } from "./UI/RenderNumbers";
import { State } from "./State/State";
import { addPortalToCurrentMission } from "./Edits";
import { createToolbar, updateCurrentActiveMissionSidebar, updatePortalCountSidebar } from "./UI/ButtonBar";
import { addWaypointEditorToPortal } from "./UI/EditWaypoint";


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

        $('body').append("<div class='umm-notification' style='display:none'></div>");

        createToolbar();
        $('#toolbox').append(
            $('<a>', { text: "UMM", title: "Ultimate Mission Maker", click: () => $('.leaflet-umm.leaflet-bar').toggle() }));

        // hide toolbar by default
        $('.leaflet-umm.leaflet-bar').hide();


        this.renderPath = new RenderPath();
        this.renderNumbers = new RenderNumbers();

        window.addHook('portalSelected', (event) => addPortalToCurrentMission(event));
        window.addHook('portalDetailsUpdated', addWaypointEditorToPortal);
        window.addHook('mapDataRefreshEnd', () => this.state.checkAllPortals()); // TODO: only do it if required
        window.addHook("portalDetailsUpdated", event => this.state.checkPortal(event));

        this.missionModeActive = false;

        this.redrawAllTotal();
    }

    redrawAll() {
        this.renderPath.redraw();
        this.renderNumbers.redraw();
        updatePortalCountSidebar();
    }

    redrawAllTotal() {
        updateCurrentActiveMissionSidebar(this.state);
        updatePortalCountSidebar();
        this.redrawAll();
        this.state.missions.zoom();
        renderPortalDetails(window.selectedPortal);
    }
}


/**
 * use "main" to access you main class from everywhere
 * (same as window.plugin.UMM_Ext)
 */
export const main = new UMM_Ext();
Plugin.Register(main, "UMM_Ext");
