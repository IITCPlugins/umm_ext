import * as Plugin from "iitcpluginkit";
import { UMM, UMM_State } from "./UMM_types";
import { RenderPath } from "./Render/RenderPath";
import { RenderNumbers } from "./Render/RenderNumbers";
import { State } from "./State/State";


// eslint-disable-next-line unicorn/prevent-abbreviations
class UMM_Ext implements Plugin.Class {

    public umm: UMM;

    private renderPath: RenderPath;
    private renderNumbers: RenderNumbers;
    public state: State;


    init() {
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
        this.monkeyPatchPortalAdd();
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

        window.removeHook('portalDetailsUpdated', this.umm.updateMissionPortalsDetails);

        this.umm.clearMissionData = () => {
            this.state.reset();
            this.state.save();

            this.umm.updateCurrentActiveMissionSidebar(this.state.get());
            this.umm.reloadSettingsWindowIfNeeded();
            if (this.umm.missionModeActive) {
                this.umm.toggleMissionMode();
            }
            this.renderPath.drawMissions();
            this.renderNumbers.redraw();
        }
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

    // Patch - Select every mission - even when empty
    monkeyPatchMissionSelect() {
        this.umm.nextMission = () => this.state.nextMission();
        this.umm.previousMission = () => this.state.prevMission();
    }

    // Patch - refresh our drawing on new Portal add
    monkeyPatchPortalAdd() {
        window.addHook('portalSelected', (event) => this.addPortalToCurrentMission(event));
        window.removeHook('portalSelected', this.umm.addPortalToCurrentMission);
        this.umm.addPortalToCurrentMission = this.addPortalToCurrentMission;
    }


    addPortalToCurrentMission(data: EventPortalSelected) {

        // we are not in edit mode or it is the first selection
        if (!this.umm.missionModeActive || this.umm.missionModeResuming) {
            this.umm.missionModeResuming = false;
            return;
        }

        if (this.umm.lastPortal === data.selectedPortalGuid) {
            return;
        }
        this.umm.lastPortal = data.selectedPortalGuid;

        const mission = this.state.getEditMission();
        if (!mission) return;

        const portalToAdd = mission.portals.create(data.selectedPortalGuid);

        if (mission.portals.includes(portalToAdd)) {
            if (mission.portals.get(-1)?.guid !== portalToAdd.guid) {
                const state = this.state.get();
                this.umm.notification(`${state.missionSetName}\nPortal already in mission #${state.currentMission + 1}`);
            }
        } else {
            mission.portals.add(portalToAdd);
            this.state.save();

            this.renderPath.drawMissions();
            this.renderNumbers.redraw();
            this.umm.updatePortalCountSidebar();

            const state = this.state.get();
            this.umm.notification(`${state.missionSetName}\nAdded to mission #${state.currentMission + 1}`)
        }



    }
}


/**
 * use "main" to access you main class from everywhere
 * (same as window.plugin.UMM_Ext)
 */
export const main = new UMM_Ext();
Plugin.Register(main, "UMM_Ext");

