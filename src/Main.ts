import * as Plugin from "iitcpluginkit";
import { Renderer } from "./Map";
import { UMM } from "./UMM_types";


// TODO add State Manager (reduce getState calls)

// eslint-disable-next-line unicorn/prevent-abbreviations
class UMM_Ext implements Plugin.Class {

    // TODO: umm should be private
    public umm: UMM;

    private render: Renderer;


    init() {
        console.log("UMM_Ext: Loaded");

        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("./styles.css");

        this.umm = (window.plugin as any).umm;
        if (!this.umm) {
            console.error("UMM_Ext: UMM plugin not found!");
            return;
        }

        this.render = new Renderer(this.umm.ummMissionPaths);

        this.patch();
    }

    patch() {
        this.replaceToolboxButton();
        this.monkeyPatchUMM();
    }

    // Patch 1 - Use Toolbox as visibilty toggle
    replaceToolboxButton() {
        // remove old
        /*
            $('#toolbox a:contains("UMM Opt")').remove();
            $('#,toolbox_component a:contains("UMM Opt")').remove();
        */
        // create new
        $('#toolbox').append(
            $('<a>', { text: "UMM", title: "Ultimate Mission Maker", click: () => $('.leaflet-umm.leaflet-bar').toggle() }));

        // hide toolbar as default
        $('.leaflet-umm.leaflet-bar').hide();
    }


    monkeyPatchUMM() {
        // Patch 2 - Inject our Path Renderer
        this.umm.drawMissions = () => this.render.drawMissions();

        // Patch 2b - redraw on mission mode toggle
        const ori = this.umm.toggleMissionMode;
        this.umm.toggleMissionMode = () => {
            ori();
            this.render.drawMissions();
        }

        // init repaint
        this.render.drawMissions();
    }
}


/**
 * use "main" to access you main class from everywhere
 * (same as window.plugin.UMM_Ext)
 */
export const main = new UMM_Ext();
Plugin.Register(main, "UMM_Ext");
