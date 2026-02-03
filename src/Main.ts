import * as Plugin from "iitcpluginkit";
import { UMM, UMM_State } from "./UMM_types";
import { RenderPath } from "./Render/RenderPath";
import { RenderNumbers } from "./Render/RenderNumbers";
import { State } from "./State/State";


// TODO add State Manager (reduce getState calls)

// eslint-disable-next-line unicorn/prevent-abbreviations
class UMM_Ext implements Plugin.Class {

    // TODO: umm should be private
    public umm: UMM;

    private renderPath: RenderPath;
    private renderNumbers: RenderNumbers;
    public state: State;


    init() {
        console.log("UMM_Ext: Loaded");

        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("./styles.css");

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

    patch() {
        this.replaceToolboxButton();
        this.monkeyPatchState();
        this.monkeyPatchDrawing();
        this.monkeyPatchNumbers();
        this.monkeyPatchMissionSelect();
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
        this.umm.getUmmState = () => this.state.get();
        this.umm.saveUmmState = (_ummState: UMM_State) => {
            // we assume the state is already updated
            this.state.save();
        };
    }


    // Patch - Path editing
    monkeyPatchDrawing() {
        // Patch - Inject our Path Renderer
        this.umm.drawMissions = () => this.renderPath.drawMissions();

        // Patch - redraw on mission mode toggle
        const ori = this.umm.toggleMissionMode;
        this.umm.toggleMissionMode = () => {
            ori();
            this.renderPath.drawMissions();
        }

        // init repaint
        this.renderPath.drawMissions();
    }

    // Patch - Autonumbers
    monkeyPatchNumbers() {
        // Patch - Inject our Number Renderer
        this.umm.refreshMissionNumbers = () => this.renderNumbers.redraw();
    }


    monkeyPatchMissionSelect() {
        this.umm.nextMission = () => this.state.nextMission();
        this.umm.previousMission = () => this.state.prevMission();
    }
}



/**
 * use "main" to access you main class from everywhere
 * (same as window.plugin.UMM_Ext)
 */
export const main = new UMM_Ext();
Plugin.Register(main, "UMM_Ext");

