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

    let ummCSS = `.umm-notification{width:300px;height:20px;height:auto;position:absolute;left:50%;margin-left:-100px;top:20px;z-index:10000;background-color: #383838;color: #F0F0F0;font-family: Calibri,sans-serif;font-size: 20px;padding:10px;text-align:center;border-radius: 2px;-webkit-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);-moz-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);}
      .umm-options-list a{display: block; color: #ffce00; border: 1px solid #ffce00; padding: 3px 0; margin: 10px auto; width: 80%; text-align: center; background: rgba(8,48,78,.9);}
      #dialog-umm-edit-mission-set-details { background-color: rgba(8, 48, 78, 0.9); } .umm-edit-mission-set-details p { margin: 5px 0 8px; display: block;} .umm-dialog-button { margin-left: 5px; }  .umm-edit-mission-set-details label { margin-bottom: 5px; display: block;} .umm-edit-mission-set-details input, .umm-edit-mission-set-details textarea { width: 100%; margin-bottom: 15px;} .umm-edit-mission-set-details textarea { resize: vertical; color: #ffce00; background-color: #062844; font-family: inherit; width: calc(100% - 6px);} .umm-edit-mission-set-details span.umm-error { color: white; display: block; margin-bottom: 5px; display: none;} .umm-edit-mission-set-details span.umm-error b { color: red; }
      .umm-mission-marker .start{fill:#16d4b2;stroke:#005243;stroke-miterlimit:10;} .umm-mission-marker .active{fill:#6832da;stroke:#16043f;stroke-miterlimit:10;} .umm-mission-number { font-size: 14px; color: #000; font-family: monospace; text-align: center; width: 34px; left: 0; top: 6px; position: absolute; font-weight: bold;}
      #umm-waypoint-editor {border-top: 1px solid #20A8B1; border-bottom: 1px solid #20A8B1; padding: 8px 5px; margin-top: 10px; display: flex; flex-direction: column; width: 100%; color: #ffce00; box-sizing: border-box; margin-bottom: 10px;} .umm-waypoint-editor-title{font-weight: bold; margin-bottom: 6px;} .umm-waypoint-select-container{display: flex; flex-direction: row; width: 100%;} .umm-waypoint-select-container > select {background-color: #062844; border: none; color: #ffce00; height: 24px;} #umm-mission-select{width: 60px;} #umm-action-select{width: 100%; margin-left: 4px;} #umm-passphrase-container{display: none; flex-direction: column; margin-top: 5px;} #umm-passphrase-container > span {margin-bottom: 3px;} #umm-passphrase-container > input, #umm-passphrase-container > textarea {margin-bottom: 5px; background-color: #062844; min-height: 24px; color: #ffce00; font-family: 'Arial'; padding: 3px; border: none; resize: vertical;}`;

    $('head').append("<style>" + ummCSS + "</style>");
    $('body').append("<div class='umm-notification' style='display:none'></div>");

    if (typeof localStorage['ultimate-mission-maker'] === 'undefined') {
      thisPlugin.clearMissionData();
    }

    // UMM File format version check at boot
    let ummState = thisPlugin.getUmmState();
    if (ummState.fileFormatVersion > thisPlugin.fileFormatVersion) {
      alert("UMM: Your UMM version is too old for the data you've currently loaded. Please update UMM. The plugin won't initialize.");
      return;
    } else {
      ummState = thisPlugin.convertUmmVersion(ummState);
      thisPlugin.saveUmmState(ummState);
    }

    thisPlugin.ummBookmarks = false;
    thisPlugin.notificationTimer = null;
    thisPlugin.addUmmButtons(ummState);
    $('#toolbox').append('<a onclick="window.plugin.umm.showUmmOptions()" accesskey="m">UMM Opt</a>');
    // $('#toolbox').append('<a onclick="window.plugin.umm.showUmmManager()" title="Ultimate Mission Maker Options">UMM Manager</a>');

    // let toolboxLink = document.getElementById('toolbox').appendChild(document.createElement('a'));
    // toolboxLink.textContent = "UMM Opt";
    // toolboxLink.addEventListener('click', function (e) {
    //   e.preventDefault();
    //   thisPlugin.showUmmOptions();
    // }, false);

    // thisPlugin.ummButtonsToggle = new window.L.LayerGroup();
    // window.addLayerGroup('UMM: Buttons', thisPlugin.ummButtonsToggle, true);

    //thisPlugin.ummMissionPaths = new window.L.LayerGroup();
    thisPlugin.ummMissionPaths = new window.L.FeatureGroup();
    window.addLayerGroup('UMM: Mission Paths', thisPlugin.ummMissionPaths, true);

    thisPlugin.drawMissions();

    thisPlugin.ummMissionNumbers = new window.L.FeatureGroup();
    window.addLayerGroup('UMM: Mission Numbers', thisPlugin.ummMissionNumbers, true);

    map.on('layeradd', function (obj) {
      // if (obj.layer === thisPlugin.ummButtonsToggle) {
      //   $('.leaflet-umm.leaflet-bar').show();
      // }
      if (obj.layer === thisPlugin.ummMissionPaths) {
        $('#umm-layercheckbox-paths').prop("checked", true);
      }
      if (obj.layer === thisPlugin.ummMissionNumbers) {
        $('#umm-layercheckbox-numbers').prop("checked", true);
        thisPlugin.addMissionNumbers();
      }
    });
    map.on('layerremove', function (obj) {
      // if (obj.layer === thisPlugin.ummButtonsToggle) {
      //   $('.leaflet-umm.leaflet-bar').hide();
      // }
      if (obj.layer === thisPlugin.ummMissionPaths) {
        $('#umm-layercheckbox-paths').prop("checked", false);
      }
      if (obj.layer === thisPlugin.ummMissionNumbers) {
        $('#umm-layercheckbox-numbers').prop("checked", false);
        thisPlugin.ummMissionNumbers.clearLayers();
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

