import * as Plugin from "iitcpluginkit";
import { UMM, UMM_old, UMM_State } from "./UMM_types";
import { RenderPath } from "./UI/RenderPath";
import { RenderNumbers } from "./UI/RenderNumbers";
import { State } from "./State/State";
import { addPortalToCurrentMission, clearMissionData } from "./Edits";
import { about } from "./UI/Dialog/About";
import { showUmmOptions } from "./UI/Dialog/Options";
import { editActiveMission } from "./UI/Dialog/SelectMission";


// eslint-disable-next-line unicorn/prevent-abbreviations
class UMM_Ext implements Plugin.Class {

    public umm: UMM;

    private renderPath: RenderPath;
    private renderNumbers: RenderNumbers;
    public state: State;


    init() {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("./styles.pcss");

        this.umm = (window.plugin as any).umm;
        if (!this.umm) {
            console.error("UMM_Ext: UMM plugin not found!");
            return;
        }

        this.state = new State();
        this.renderPath = new RenderPath(this.umm.ummMissionPaths);
        this.renderNumbers = new RenderNumbers(this.umm.ummMissionNumbers);

        this.patch();
    }

    private get ori(): UMM_old { return this.umm as UMM_old; }

    redrawAll() {
        this.renderPath.redraw();
        this.renderNumbers.redraw();
        this.umm.updatePortalCountSidebar();
    }

    patch() {
        this.replaceToolboxButton();
        this.monkeyPatchState();
        this.monkeyPatchDrawing();
        this.monkeyPatchNumbers();
        this.monkeyPatchMissionSelect();
        this.monkeyPatchPortalAdd();
        this.monkeyPatchDialogs();
    }


    // Patch - Use Toolbox as visibilty toggle
    replaceToolboxButton() {
        // delay removal, IDK who why when moves the button around
        window.setTimeout(() => {
            $('#toolbox a:contains("UMM Opt")').remove();
            $('#toolbox_component a:contains("UMM Opt")').remove();
        }, 500);

        // create new
        $('#toolbox').append(
            $('<a>', { text: "UMM", title: "Ultimate Mission Maker", click: () => $('.leaflet-umm.leaflet-bar').toggle() }));

        // hide toolbar as default
        $('.leaflet-umm.leaflet-bar').hide();
    }

    // Patch - State management
    monkeyPatchState() {
        this.ori.getUmmState = () => this.state.get();
        this.ori.saveUmmState = (_ummState: UMM_State) => {
            // we assume the state is already updated
            this.state.save();
        };

        window.removeHook('portalDetailsUpdated', this.ori.updateMissionPortalsDetails);

        this.ori.clearMissionData = clearMissionData;
    }


    // Patch - Path editing
    monkeyPatchDrawing() {
        // Patch - Inject our Path Renderer
        this.ori.drawMissions = () => this.renderPath.redraw();

        // Patch - redraw on mission mode toggle
        const ori = this.umm.toggleMissionMode;
        this.ori.toggleMissionMode = () => {
            ori();
            this.renderPath.redraw();
        }

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
    monkeyPatchPortalAdd() {
        window.addHook('portalSelected', (event) => addPortalToCurrentMission(event));
        window.removeHook('portalSelected', this.ori.addPortalToCurrentMission);
        this.ori.addPortalToCurrentMission = addPortalToCurrentMission;
    }

    monkeyPatchDialogs() {
        this.ori.about = about;
        this.ori.showUmmOptions = showUmmOptions;
        this.ori.editActiveMission = editActiveMission;
    }
}


/**
 * use "main" to access you main class from everywhere
 * (same as window.plugin.UMM_Ext)
 */
export const main = new UMM_Ext();
Plugin.Register(main, "UMM_Ext");

