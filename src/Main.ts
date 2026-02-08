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
    private ummSetup: any;

    public renderPath: RenderPath;
    public renderNumbers: RenderNumbers;
    public state: State;


    constructor() {
        // prevent UMM boot
        const index = window.bootPlugins.findIndex((x: any) => {
            console.log(x.info.script.name);
            return x.info.script.name === "IITC Plugin: Ultimate Mission Maker";
        });

        if (index !== -1) this.ummSetup = window.bootPlugins.splice(index, 1)[0];
    }

    init() {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("./styles.pcss");

        this.umm = (window.plugin as any).umm;
        if (!this.umm) {
            console.error("UMM_Ext: UMM plugin not found!");
            return;
        }


        if (this.ummSetup) {
            console.log("boot UMM");
            this.ori.addUmmButtons = createToolbar // used in setup
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            this.ummSetup();
        }



        this.state = new State();
        this.renderPath = new RenderPath(this.umm.ummMissionPaths);
        this.renderNumbers = new RenderNumbers(this.umm.ummMissionNumbers);

        this.patch();

        updateCurrentActiveMissionSidebar(main.state);
        updatePortalCountSidebar();
    }

    private get ori(): UMM_old { return this.umm as UMM_old; }

    redrawAll() {
        this.renderPath.redraw();
        this.renderNumbers.redraw();
        updatePortalCountSidebar();
    }

    redrawAllTotal() {
        updateCurrentActiveMissionSidebar(this.state)
        this.umm.reloadSettingsWindowIfNeeded();
        this.redrawAll();
        this.state.missions.zoom();
        renderPortalDetails(window.selectedPortal);
    }

    patch() {
        this.replaceToolboxButton();
        this.monkeyPatchState();
        this.monkeyPatchDrawing();
        this.monkeyPatchNumbers();
        this.monkeyPatchMissionSelect();
        this.monkeyPatchPortalEdits();
        this.monkeyPatchDialogs();
        this.monkeyPatchToolbar();
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
        window.addHook('portalSelected', (event) => addPortalToCurrentMission(event));
        window.removeHook('portalSelected', this.ori.addPortalToCurrentMission);
        this.ori.addPortalToCurrentMission = addPortalToCurrentMission;
        this.ori.undoPortal = removeLastPortal;
        this.ori.toggleMissionMode = toggleMissionMode;
        this.ori.splitMissionOptions = splitMissionOptions;
        this.ori.mergeMissions = mergeMissions;
        this.ori.reverseMission = reverseMission;
        this.ori.setCurrentMission = setCurrentMission;
        this.ori.resumeOrStartNewMission = startEdit;

        window.removeHook('portalDetailsUpdated', this.ori.addWaypointEditorToPortal);
        window.addHook('portalDetailsUpdated', addWaypointEditorToPortal);

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

/*
  function setup() {

    $('body').append("<div class='umm-notification' style='display:none'></div>");

    thisPlugin.ummBookmarks = false;
    thisPlugin.addUmmButtons(ummState);
    $('#toolbox').append('<a onclick="window.plugin.umm.showUmmOptions()" accesskey="m">UMM Opt</a>');

    thisPlugin.ummMissionPaths = new window.L.FeatureGroup();
    window.addLayerGroup('UMM: Mission Paths', thisPlugin.ummMissionPaths, true);

    thisPlugin.drawMissions();

    thisPlugin.ummMissionNumbers = new window.L.FeatureGroup();
    window.addLayerGroup('UMM: Mission Numbers', thisPlugin.ummMissionNumbers, true);

    map.on('layeradd', function (obj) {
      if (obj.layer === thisPlugin.ummMissionPaths) {
        $('#umm-layercheckbox-paths').prop("checked", true);
      }
      if (obj.layer === thisPlugin.ummMissionNumbers) {
        $('#umm-layercheckbox-numbers').prop("checked", true);
      }
    });
    map.on('layerremove', function (obj) {
      if (obj.layer === thisPlugin.ummMissionPaths) {
        $('#umm-layercheckbox-paths').prop("checked", false);
      }
      if (obj.layer === thisPlugin.ummMissionNumbers) {
        $('#umm-layercheckbox-numbers').prop("checked", false);
      }
    });

    thisPlugin.refreshMissionNumbers();

    window.addHook('portalSelected', thisPlugin.addPortalToCurrentMission); // changed from portalDetailsUpdated to portalSelected to speed up the path drawing
    window.addHook('portalDetailsUpdated', thisPlugin.updateMissionPortalsDetails); // update all matching mission portal details (after drawing the path)
    window.addHook('mapDataRefreshEnd', thisPlugin.storeMissingData);

    window.addHook('portalDetailsUpdated', thisPlugin.addWaypointEditorToPortal); // update all matching mission portal details (after drawing the path)
    thisPlugin.lastSelectedWaypoint = { missionId: 0, portalPositionInMission: 0 }
  };
*/

/**
 * use "main" to access you main class from everywhere
 * (same as window.plugin.UMM_Ext)
 */
export const main = new UMM_Ext();
Plugin.Register(main, "UMM_Ext");

