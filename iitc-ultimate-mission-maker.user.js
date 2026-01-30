// ==UserScript==
// @id            ultimate-mission-maker
// @name          IITC Plugin: Ultimate Mission Maker
// @category      Misc
// @version       0.7.3
// @namespace     https://umm.8bitnoise.rocks/plugin/iitc-ultimate-mission-maker
// @description   Greatly simplifies the generation of (banner) missions in a draw style manner
// @downloadURL   https://umm.8bitnoise.rocks/plugin/iitc-ultimate-mission-maker.user.js
// @updateURL     https://umm.8bitnoise.rocks/plugin/iitc-ultimate-mission-maker.meta.js
// @author        Vashiru & j00rtje & DanielOnDiordna
// @include       *://*.ingress.com/intel*
// @include       *://*.ingress.com/mission/
// @include       *://intel.ingress.com/*
// @match         *://*.ingress.com/intel*
// @match         *://*.ingress.com/mission/*
// @match         *://intel.ingress.com/*
// @match         *://missions.ingress.com/*
// @include       https://missions.ingress.com/*
// @grant         none
// ==/UserScript==

function ummUtilityFunctionsWrapper() {
  // Define global variables and functions, to use both in IITC and Mission Creator

  if (typeof window.plugin !== 'function') window.plugin = function () { };

  // Use own namespace for plugin
  if (typeof window.plugin.umm !== 'function') window.plugin.umm = function () { };

  let thisPlugin = window.plugin.umm;

  thisPlugin.title = 'Ultimate Mission Maker';
  thisPlugin.version = '0.7.3';
  thisPlugin.author = 'Vashiru, j00rtje & DanielOnDiordna';

  thisPlugin.fileFormatVersion = 2;

  thisPlugin.changelog = `
  Changelog:

  Version 0.7.3
  - Added the ability to split the first mission into multiple missions, but have the remainder spread over the the first missions in the banner
  - Fixed invalid input for splitting/reversing resulting in errors

  Version 0.7.2
  - Change wording for importing files in MAT to be less scary
  - Fix an issue where importing a new file wouldn't refresh the portal view to reflect the new mission state

  Version 0.7.1
  - Fix an issue where merging/splitting/reversing paths resulted in portal action changes not saving

  Version 0.7.0
  - Added the ability to split the first mission into multiple missions
  - Added the ability to merge all missions into 1 mission
  - Added the ability to reverse the path of any mission
  - Added portal counter for current mission in sidebar

  Version 0.6.3
  - Fix issue where multi-line question would no longer be shown in IITC after save

  Version 0.6.2
  - Support multi-line questions

  Version 0.6.1
  - Fix contrast issues with dropdowns when the OS/browser is set to light mode

  Version 0.6.0
  - Added the ability to change waypoint objective from portal detail view
  - Update notification font for readability on systems without Calibri (eg. Mac)

  Version v0.5.1
  - Added support for versions of Chrome older than 80

  Version v0.5.0
  - Improved: Major improvements to path draw speed by changing from portalDetailsUpdated to portalSelected.
  This does have the side effect that some data in the JSON might be missing (specifically titles and images for portals).
  However, this has no consequences within the Mission Authoring Tool aside from the visual list. When missing
  data is detected, UMM will show the UMM logo for the portal and then attempt to refresh MAT. This will automatically
  fix the display the same way as a refresh of the page would've done.
  - Added: UMM Logo will be used as default portal image in MAT when non is found (won't affect what's send to NIA)
  - New: Automatically zoom to the banner on the map after import
  - New: IITC "Select Active Mission" replaced with a mission picker dialog with portal counts
  - New: Rewrite image URLs to https in Mission Authoring Tool (MAT) to prevent mixed content warnings

  Version v0.4.5
  - Fixed: Edit banner details won't save without N or NN in banner format

  Version v0.4.4
  - Fixed: Mission importer not showing in Mission Authoring Tool on first start

  Version v0.4.3
  - Fixed: Mission number display in Firefox

  Version v0.4.2
  - Fixed: Export / Save file for mobile. Now works on IITC.me (PC and app), IITC-CE (PC and app), iOS
  - Fixed: Cancel on Clear mission data would still clear all data
  - Fixed: Issue where UMM would affect TextArea styling of other plugins

  - Added: Shortkey Alt+M (probably Option + M on Mac) to bring up UMM options. (Picked the letter M for Mission)
  - Added: When there's no available 'save file' method, offer copy/paste modal
  - Added: Changelog and About in UMM Opt
  - Added: Zoom to view all missions in UMM Opt
  - Added: UMM opt button to sidebar
  - Added: checkboxes to toggle layers from the opt menu

  - Other various mobile optimizations (remove tooltips on buttons, remove unnecessary buttons)
  `;

  // By creating a new Mission in MC and adding an image for the mission, it uploads the image to googleusercontent. The mission image URL is visible in the console source code.
  // After canceling and removing the new mission, the image stays online and can be used as a portal image:
  thisPlugin.ummLogo = "https://lh3.googleusercontent.com/s0kCRS7KE-i0gQhbH_gx-qxvC2kHBJ9TDITirnpzSJnEDV-QVDio5OFl8bJ8OC8EhPGGFOFje5HeO9M6RDklZ971e8aSPeLs";

  thisPlugin.getUmmState = function () {
    return JSON.parse(localStorage.getItem("ultimate-mission-maker"));
  }

  thisPlugin.saveUmmState = function (ummState) {
    return localStorage.setItem("ultimate-mission-maker", JSON.stringify(ummState));
  }

  thisPlugin.about = function () {
    let html = '<div class="umm-options-list">';
    html += 'In short: Create missions in IITC, export as a json file:<br>';
    html += '<a href="https://intel.ingress.com/" target="_blank"' + (window.location.host.match(/^intel\.ingress\.com$/i) ? ' style="color: #bbb; pointer-events: none; cursor: default;"' : '') + '>https://intel.ingress.com/</a>';
    html += 'Then open the mission creator and load the json file.<br>';
    html += 'Start creating missions and import the UMM data for every mission:<br>';
    html += '<a href="https://missions.ingress.com/" target="_blank"' + (window.location.host.match(/^missions\.ingress\.com$/i) ? ' style="color: #bbb; pointer-events: none; cursor: default;"' : '') + '>https://missions.ingress.com/</a>';
    html += 'Documentation for this plugin can be found at:<br>';
    html += '<a href="https://umm.8bitnoise.rocks/" target="_blank">https://umm.8bitnoise.rocks/</a>';
    html += 'Questions, feature requests and tips:<br>';
    html += '<a href="https://t.me/joinchat/j9T9eLfa3VJlZWE0" target="_blank">Telegram: [XF] Ultimate Mission Maker</a>';
    html += '</div>';

    let buttons = [];
    if (window.iitcLoaded) {
      buttons.push(thisPlugin.ummDialogButtonCreator("< Main Menu", thisPlugin.showUmmOptions));
    }
    buttons.push(thisPlugin.ummDialogButtonCreator("Changelog", function () { alert(thisPlugin.changelog) }));
    buttons.push(thisPlugin.ummDialogButtonCreator("Close", function () { $(this).dialog("close") }));

    window.dialog({
      html: html,
      title: `${thisPlugin.title} v${thisPlugin.version} - About`,
      id: 'umm-options',
      width: 350,
      buttons: buttons
    });
  };

  thisPlugin.splitMissionOptions = function () {
    let html = '<div class="umm-split-mission-options">';
    html = `<b>How do you want to split your mission?</b><br><br>
      <b>Remainder at the end:</b> All missions will contain the same amount of portals, any portals left over after splitting are added to the last mission.<br><br>
      <b>Balanced:</b> Split the banner into missions of the same length, if any portals are left over after splitting, earlier missions will get 1 portal extra to balance it out.
      `

    let buttons = [];
    buttons.push(thisPlugin.ummDialogButtonCreator("< Main Menu", thisPlugin.showUmmOptions));
    buttons.push(thisPlugin.ummDialogButtonCreator("Remainder at end", thisPlugin.splitMissionRemainderAtEnd));
    buttons.push(thisPlugin.ummDialogButtonCreator("Balanced", thisPlugin.splitMissionBalanced));

    window.dialog({
      html: html,
      title: `${thisPlugin.title} - Split mission options`,
      id: 'umm-options',
      width: 350,
      buttons: buttons
    });
  };

  thisPlugin.splitMissionRemainderAtEnd = async function () {
    let ummState = thisPlugin.getUmmState();

    if (ummState.missions.length > 1) {
      if (confirm("It's currently only supported to split 1 single mission, do you want to merge all missions now and continue?\r\n\r\nThis can't be undone.")) {
        thisPlugin.mergeMissions(false);
        ummState = thisPlugin.getUmmState();
        await new Promise(r => setTimeout(r, 250)); // Allow IITC to redraw the map to reliably show the merger
      } else {
        return;
      }
    }

    let numMissions = prompt(`In how many missions do you want to split your banner (1-${ummState.missions[0].portals.length})?\r\rRecommended number is a multiple of 6.`, ummState.plannedBannerLength <= ummState.missions[0].portals.length ? ummState.plannedBannerLength : ummState.missions[0].portals.length);
    if (parseInt(numMissions) > ummState.missions[0].portals.length) {
      alert(`Can't split into more missions than there are portals in your current path. Please try again with a number between 1 and ${ummState.missions[0].portals.length}`)
      return;
    } else if (numMissions && (parseInt(numMissions) < 1 || !Number.isInteger(parseInt(numMissions)))) {
      alert(`Invalid input. Please try again with a number between 1 and ${ummState.missions[0].portals.length}`)
      return
    } else if (numMissions === null) {
      // Pressed cancel, don't throw an error.
      return;
    }

    let numPortals = ummState.missions[0].portals.length;
    let numPortalsPerMission = Math.floor(numPortals / numMissions);
    let numLeftOverPortals = numPortals % numMissions;

    let textMessage = `Your path of ${numPortals} will be divided into ${numMissions} missions of ${numPortalsPerMission} portals each.`
    if (numLeftOverPortals > 0) {
      textMessage += ` The remaining ${numLeftOverPortals} portal(s) will be added to the last mission.`;
    }
    textMessage += `\r\n\r\nThis process can be reversed using the merge missions feature. Do you want to continue?`

    if (confirm(textMessage)) {
      // preserve the banner data

      let sMissions = [];
      sMissions.push(ummState.missions[0]);
      // put the banner data back

      ummState.currentMission = numMissions - 1;
      ummState.plannedBannerLength = numMissions;

      let newMissions = [];
      let p = 0;
      let m = 0;

      // create missions with portals
      for (let i = 0; i < numMissions; i++) {
        p = 0;
        let newPortals = [];
        // first get the portals
        if (i < numMissions - 1) {
          m = numPortalsPerMission + (i * numPortalsPerMission);
          // fill new with number of portals per mission
          for (let k = (i * numPortalsPerMission); k < m; k++) {
            newPortals[p] = sMissions[0].portals[k];
            ++p;
          }
        } else {
          // last mission also contains remaining portals
          for (let k = i * numPortalsPerMission; k < numPortals; k++) {
            newPortals[p] = sMissions[0].portals[k];
            ++p;
          }
        }

        // put the created portal set into a new mission
        let newMissionTitle = thisPlugin.generateMissionTitle(i + 1, numMissions, ummState.missionSetName, ummState.titleFormat);
        newMissions.push({ missionTitle: newMissionTitle, missionDescription: ummState.missionSetDescription, portals: newPortals });
      };

      ummState.missions = newMissions;
      thisPlugin.saveUmmState(ummState);

      thisPlugin.redrawUmmIitc();
    } else {
      return;
    }
  };


  thisPlugin.splitMissionBalanced = async function () {
    let ummState = thisPlugin.getUmmState();

    if (ummState.missions.length > 1) {
      if (confirm("It's currently only supported to split 1 single mission, do you want to merge all missions now and continue?\r\n\r\nThis can't be undone.")) {
        thisPlugin.mergeMissions(false);
        ummState = thisPlugin.getUmmState();
        await new Promise(r => setTimeout(r, 250)); // Allow IITC to redraw the map to reliably show the merger
      } else {
        return;
      }
    }

    let numMissions = prompt(`In how many missions do you want to split your banner (1-${ummState.missions[0].portals.length})?\r\rRecommended number is a multiple of 6.`, ummState.plannedBannerLength <= ummState.missions[0].portals.length ? ummState.plannedBannerLength : ummState.missions[0].portals.length);
    if (parseInt(numMissions) > ummState.missions[0].portals.length) {
      alert(`Can't split into more missions than there are portals in your current path. Please try again with a number between 1 and ${ummState.missions[0].portals.length}`)
      return;
    } else if (numMissions && (parseInt(numMissions) < 1 || !Number.isInteger(parseInt(numMissions)))) {
      alert(`Invalid input. Please try again with a number between 1 and ${ummState.missions[0].portals.length}`)
      return
    } else if (numMissions === null) {
      // Pressed cancel, don't throw an error.
      return;
    }

    let numPortals = ummState.missions[0].portals.length;
    let numPortalsPerMission = Math.floor(numPortals / numMissions);
    let numRestPortals = numPortals % numMissions;

    let textMessage = `Your path of ${numPortals} will be divided into ${numMissions} missions of ${numPortalsPerMission} portals each.`
    if (numRestPortals > 0) {
      textMessage += ` The remaining ${numRestPortals} portal(s) will be equaly divided between the first missions.`;
    }
    textMessage += `\r\n\r\nThis process can be reversed using the merge missions feature. Do you want to continue?`;

    if (confirm(textMessage)) {
      // preserve the banner data

      let sMissions = [];
      sMissions.push(ummState.missions[0]);
      // put the banner data back

      ummState.currentMission = numMissions - 1;
      ummState.plannedBannerLength = numMissions;

      let newMissions = [];
      let p = 0;
      let m = 0;
      let extraPortal = 0;
      let startPortal = 0;
      let endPortal = 0;

      // create missions with portals
      for (let i = 0; i < numMissions; i++) {
        p = 0;
        // if any left-over portal, divide them over the first missions
        if (i < numRestPortals) {
          extraPortal = 1;
        } else {
          extraPortal = 0;
        }
        endPortal = startPortal + numPortalsPerMission + extraPortal;
        let newPortals = [];
        // fill new with number of portals per mission
        for (let k = startPortal; k < endPortal; k++) {
          newPortals[p] = sMissions[0].portals[k];
          ++p;
        }
        // set startportal for following mission
        startPortal = endPortal;
        // put the created portal set into a new mission
        let newMissionTitle = thisPlugin.generateMissionTitle(i + 1, numMissions, ummState.missionSetName, ummState.titleFormat);
        newMissions.push({ missionTitle: newMissionTitle, missionDescription: ummState.missionSetDescription, portals: newPortals });
      };

      ummState.missions = newMissions;
      thisPlugin.saveUmmState(ummState);

      thisPlugin.redrawUmmIitc();
    } else {
      return;
    }
  };

  thisPlugin.mergeMissions = function (prompt = true) {
    if (prompt && !confirm("Are you sure you want to merge all your missions into 1?\r\n\r\nThis can't be undone.")) {
      return;
    }

    let ummState = thisPlugin.getUmmState();

    let singleMission = JSON.parse(JSON.stringify(ummState.missions[0]));
    singleMission.portals = [];
    for (let mission of ummState.missions) {
      singleMission.portals = singleMission.portals.concat(mission.portals)
    }
    ummState.missions = [singleMission];
    ummState.currentMission = 0;
    thisPlugin.saveUmmState(ummState);

    thisPlugin.redrawUmmIitc();
  }

  thisPlugin.reverseMission = function () {
    let ummState = thisPlugin.getUmmState();
    let missionToReverse = prompt(`Which mission do you want to reverse (1-${ummState.missions.length})?`, ummState.currentMission + 1);
    if (missionToReverse && (missionToReverse > ummState.missions.length || (missionToReverse - 1) < 0 || !Number.isInteger(parseInt(missionToReverse)))) {
      alert(`This mission doesn't exist, enter a value between 1-${ummState.missions.length}.`)
      return;
    } else if (missionToReverse === null) {
      // Pressed cancel, don't throw an error.
      return;
    }

    ummState.missions[missionToReverse - 1].portals = ummState.missions[missionToReverse - 1].portals.reverse();
    thisPlugin.saveUmmState(ummState);
    thisPlugin.drawMissions();
    thisPlugin.refreshMissionNumbers();
    renderPortalDetails(window.selectedPortal);
  }

  thisPlugin.loadFile = function (evt) {
    let files = evt.target.files; // FileList object
    if (files.length === 0) {
      alert("No file selected! Please select a mission file in JSON format and try again.");
      $("#umm-import-file").val('');
      return;
    }

    if (files[0].type != 'application/json') {
      $("#umm-import-file").val('');
      alert(files[0].name + " has not been recognized as JSON file. Make sure you've loaded the right file.");
      return;
    }
    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function (theFile) {
      return function (e) {
        let ummState = JSON.parse(e.target.result);

        if (ummState.fileFormatVersion > thisPlugin.fileFormatVersion) {
          alert("UMM: You've attempted to load data that's newer than what's supported by this version of UMM. Please update the plugin and try again. Data has not been loaded.");
        } else {
          ummState = thisPlugin.convertUmmVersion(ummState);

          let errorsDetected = false;

          // Reset currentMission to the last mission if it's too high
          // This could happen if people manually tamper with the JSON but for get to forget to adjust the value
          // Without resetting it, the plugin breaks
          if (ummState.currentMission > ummState.missions.length - 1) {
            ummState.currentMission = ummState.missions.length - 1
            errorsDetected = true;
          }

          // Fix plannedBannerLength if people altered the amount of missions outside IITC and added too many
          if (ummState.missions.length > ummState.plannedBannerLength) {
            ummState.plannedBannerLength = ummState.missions.length;
            thisPlugin.saveUmmState(ummState);
            thisPlugin.syncMissionTitles();
            ummState = thisPlugin.getUmmState();
            errorsDetected = true;
          }

          thisPlugin.saveUmmState(ummState);

          if (errorsDetected && window.iitcLoaded) {
            thisPlugin.notification(`Incorrect current mission or\nplanned banner length corrected\nBanner data loaded:\n${ummState.missionSetName}`);
          } else if (window.iitcLoaded) {
            thisPlugin.notification(`Banner data loaded:\n${ummState.missionSetName}`);
          }
        }

        // The loadFile function is used both inside IITC and the Mission Editor
        // That's why there is a distinction between the two actions that happen after it's done
        if (!window.iitcLoaded) {
          thisPlugin.setActiveBannerTitle();
          thisPlugin.generateMissionSelect();
        } else {
          thisPlugin.storeMissingData(); // Attempt to update missing image data and titles upon import
          thisPlugin.redrawUmmIitc();
        }
      };
    })(evt);

    reader.readAsText(files[0]);
  };

  thisPlugin.redrawUmmIitc = function () {
    let ummState = thisPlugin.getUmmState();
    thisPlugin.updateCurrentActiveMissionSidebar(ummState);
    thisPlugin.reloadSettingsWindowIfNeeded();
    thisPlugin.drawMissions();
    thisPlugin.refreshMissionNumbers();
    thisPlugin.updatePortalCountSidebar();
    thisPlugin.zoomAllMissions(); // Zoom in to mission after import
    renderPortalDetails(window.selectedPortal);
  }

  thisPlugin.ummDialogButtonCreator = function (label, callback) {
    return {
      text: label,
      "click": callback,
      class: "umm-dialog-button"
    }
  }

  thisPlugin.convertUmmVersion = function (ummState) {

    // Original beta didn't have a fileFormatVersion yet
    if (ummState.fileFormatVersion == undefined || ummState.fileFormatVersion == "") {


      // Because of slight variations on BETA's we do some checks to avoid overwriting any data
      function undefinedOrEmptyString(value) {
        if (value == undefined || value == "") {
          return true
        }
        return false;
      }

      if (undefinedOrEmptyString(ummState.missionSetName)) {
        // Check if old name was set, if so, use that for missionSetName, otherwise set blank
        if (!undefinedOrEmptyString(ummState.missionName)) {
          ummState.missionSetName = ummState.missionName;
          delete ummState.missionName; // Remove old field from state
        } else {
          ummState.missionSetName = '';
        }

      }

      if (undefinedOrEmptyString(ummState.missionSetDescription)) {
        if (!undefinedOrEmptyString(ummState.missionDescription)) {
          ummState.missionSetDescription = ummState.missionDescription;
          delete ummState.missionDescription; // Remove old field from state
        } else {
          ummState.missionSetDescription = '';
        }
      }

      if (undefinedOrEmptyString(ummState.titleFormat)) {
        ummState.titleFormat = 'T NN-M';
      }

      // Rename numberofMissions to plannedBannerLength if present, otherwise set to current banner length
      if (ummState.numberOfMissions != undefined) {
        ummState.plannedBannerLength = ummState.numberOfMissions;
        delete ummState.numberOfMissions;
      } else {
        ummState.plannedBannerLength = Object.keys(ummState.missions).length
      }

      // Check if the data is using the oldest beta format or a newer version, newer versions don't need converting for V1.
      if (!Object.keys(ummState.missions[0]).includes("portals")) {
        // Old format detected, check if data is present
        if (ummState.missions[0][0].guid) {
          // Data present, convert necessary
          let newMissions = [];
          for (const mission in ummState.missions) {
            let missionTitle = thisPlugin.generateMissionTitle(parseInt(mission) + 1, (ummState.plannedBannerLength > 0 ? ummState.plannedBannerLength : ummState.missions.length), ummState.missionSetName, ummState.titleFormat)
            newMissions.push({ missionTitle: missionTitle, missionDescription: ummState.missionSetDescription, portals: ummState.missions[mission] })
          }
          ummState.missions = newMissions;
        } else {
          // No data detected, just set it to an empty state.
          ummState.missions = [{ missionTitle: '', missionDescription: '', portals: [] }];
        }
      }

      ummState.fileFormatVersion = 1;

    }

    if (ummState.fileFormatVersion == 1) {
      // FileFormatVersion 2 supports custom objectives for portals
      // Valid type values are: HACK_PORTAL, INSTALL_MOD, CAPTURE_PORTAL, CREATE_LINK, CREATE_FIELD, PASSPHRASE
      // NIA will ignore passphrase_params if type is not passphrase
      for (let mission in ummState.missions) {
        for (let portal in ummState.missions[mission].portals) {
          ummState.missions[mission].portals[portal].objective = { type: "HACK_PORTAL", passphrase_params: { question: "", _single_passphrase: "" } }
        }
      }
      ummState.fileFormatVersion = 2;
    }

    if (ummState.fileFormatVersion == 2) {
      //Bugfix for 0.4.0, unintentionally it had objective type HACK rather than HACK_PORTAL, not a full new fileFormatVersion
      for (let mission in ummState.missions) {
        for (let portal in ummState.missions[mission].portals) {
          if (ummState.missions[mission].portals[portal].objective.type == "HACK") {
            ummState.missions[mission].portals[portal].objective.type = "HACK_PORTAL"
          }
        }
      }

      // Future migrations for fileFormatVersion 3
    }

    return ummState;
  }

  thisPlugin.clearMissionData = function () {
    localStorage.setItem('ultimate-mission-maker', JSON.stringify({
      missionSetName: '',
      missionSetDescription: '',
      currentMission: 0,
      plannedBannerLength: 0,
      titleFormat: "T NN-M",
      fileFormatVersion: thisPlugin.fileFormatVersion,
      missions: [
        {
          missionTitle: '',
          missionDescription: '',
          portals: []
        }],
    }));

    if (window.iitcLoaded) {
      let ummState = thisPlugin.getUmmState();
      thisPlugin.updateCurrentActiveMissionSidebar(ummState);
      thisPlugin.reloadSettingsWindowIfNeeded();
      if (thisPlugin.missionModeActive) {
        window.plugin.umm.toggleMissionMode();
      }
      thisPlugin.ummMissionPaths.clearLayers();
      thisPlugin.refreshMissionNumbers();
    }
  }

  thisPlugin.reloadSettingsWindowIfNeeded = function () {
    if (window.iitcLoaded) {
      if ($("#dialog-umm-options").dialog('isOpen') == true) {
        thisPlugin.showUmmOptions();
      }
    }
  }

  thisPlugin.notification = function (notificationText, isPersistent = false) {
    $('.umm-notification').hide();
    let notification = $('.umm-notification').text(notificationText);
    notification.html(notification.html().replace(/\n/g, '<br/>'));
    $('.umm-notification').show();
    window.clearTimeout(thisPlugin.notificationTimer);
    if (!isPersistent) {
      thisPlugin.notificationTimer = window.setTimeout(function () {
        $('.umm-notification').fadeOut(400);
      }, 3000);
    }
  };
}

// Wrapper function that will be stringified and injected
// into the document. Because of this, normal closure rules
// do not apply here.
function iitcPluginWrapper(plugin_info) {
  // Make sure that window.plugin exists. IITC defines it as a no-op function,
  // and other plugins assume the same.
  if (typeof window.plugin !== 'function') window.plugin = function () { };

  // Use own namespace for plugin
  if (typeof window.plugin.umm !== 'function') window.plugin.umm = function () { };

  let thisPlugin = window.plugin.umm;

  // Name of the IITC build for first-party plugins
  plugin_info.buildName = 'umm';

  // Datetime-derived version of the plugin
  plugin_info.dateTimeVersion = '20210930000400';

  // ID/name of the plugin
  plugin_info.pluginId = 'ultimate-mission-maker';

  // The entry point for this plugin.
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


  thisPlugin.refreshMissionNumbers = function () {
    if (map.hasLayer(thisPlugin.ummMissionNumbers)) {
      thisPlugin.ummMissionNumbers.clearLayers();
      thisPlugin.addMissionNumbers();
    }
  }

  thisPlugin.addWaypointEditorToPortal = function () {
    let ummState = thisPlugin.getUmmState();

    let wayPointHtml = document.createElement("div");
    wayPointHtml.setAttribute("id", "umm-waypoint-editor");



    function getMissionIdsForGuid(guid) {
      let missionIds = [];
      for (let mission in ummState.missions) {
        for (let portal in ummState.missions[mission].portals) {
          if (ummState.missions[mission].portals[portal].guid == guid) {
            if (!missionIds.includes(mission)) {
              missionIds.push(mission);
            }
          }
        }
      }
      return missionIds;
    }

    if (getMissionIdsForGuid(window.selectedPortal).length == 0) {
      // Selected portal is not in any mission
      return;
    }

    function portalMissionSelectFactory(validMissionIds) {
      let missionSelect = document.createElement("select");
      missionSelect.setAttribute("id", "umm-mission-select");

      let missionOption = document.createElement("option")
      missionOption.setAttribute("data-mission-id", undefined)
      missionOption.setAttribute("value", "#")
      missionOption.appendChild(document.createTextNode("Select mission"));
      missionSelect.appendChild(missionOption);

      for (let missionId of validMissionIds) {
        let missionOption = document.createElement("option")
        missionOption.setAttribute("data-mission-id", missionId)
        missionOption.setAttribute("value", missionId)
        missionOption.appendChild(document.createTextNode(`${parseInt(missionId) + 1}`));
        missionSelect.appendChild(missionOption);
      }
      missionSelect.getElementsByTagName("option")[1].setAttribute("selected", "selected") // For now select first mission as default

      return missionSelect;
    }

    function findWayPointIdForSelectedPortalInMission(missionId) {
      for (let portal in ummState.missions[missionId].portals) {
        if (ummState.missions[missionId].portals[portal].guid == window.selectedPortal) {
          return portal;
        }
      }
    }

    function portalActionSelectFactory(missionId) {
      let ummState = thisPlugin.getUmmState();
      let actionSelect = document.createElement("select");
      actionSelect.setAttribute("id", "umm-action-select")
      actionSelect.setAttribute("name", "umm-action-select")

      let possibleActions = [
        { action: "HACK_PORTAL", label: "Hack portal" },
        { action: "INSTALL_MOD", label: "Install mod" },
        { action: "CAPTURE_PORTAL", label: "Capture portal" },
        { action: "CREATE_LINK", label: "Create link" },
        { action: "CREATE_FIELD", label: "Create field" },
        { action: "PASSPHRASE", label: "Enter passphrase" },
      ]

      for (action of possibleActions) {
        let option = document.createElement("option");
        option.setAttribute("value", action.action)
        option.appendChild(document.createTextNode(action.label));
        actionSelect.appendChild(option);
        if (ummState.missions[missionId].portals[findWayPointIdForSelectedPortalInMission(missionId)].objective.type === action.action) {
          option.setAttribute("selected", "selected")
        }
      }
      return actionSelect;
    }

    function passCodeBoxFactory(missionId) {
      let ummState = thisPlugin.getUmmState();
      let portalId = findWayPointIdForSelectedPortalInMission(missionId);

      let passPhraseHtml = document.createElement("div");
      passPhraseHtml.setAttribute("id", "umm-passphrase-container");

      let questionSpan = document.createElement("span")
      questionSpan.appendChild(document.createTextNode("Question"))

      let question = document.createElement("textarea");
      question.setAttribute("type", "text");
      question.setAttribute("id", "umm-passphrase-question");
      question.setAttribute("rows", "1");

      let ppQuestion = ummState.missions[missionId].portals[portalId].objective.passphrase_params.question ? ummState.missions[missionId].portals[portalId].objective.passphrase_params.question : "";
      question.appendChild(document.createTextNode(ppQuestion));

      let passPhraseSpan = document.createElement("span")
      passPhraseSpan.appendChild(document.createTextNode("Passphrase"))
      question.setAttribute('onblur', 'savePassPhrase();'); // for FF
      question.onblur = function () { savePassPhrase(); }; // for IE

      let passPhrase = document.createElement("input");
      passPhrase.setAttribute("type", "text");
      passPhrase.setAttribute("id", "umm-passphrase-passphrase");

      let spQuestion = ummState.missions[missionId].portals[portalId].objective.passphrase_params._single_passphrase ? ummState.missions[missionId].portals[portalId].objective.passphrase_params._single_passphrase : "";
      passPhrase.setAttribute("value", spQuestion);
      passPhrase.setAttribute('onblur', 'savePassPhrase();'); // for FF
      passPhrase.onblur = function () { savePassPhrase(); }; // for IE

      passPhraseHtml.appendChild(questionSpan);
      passPhraseHtml.appendChild(question);
      passPhraseHtml.appendChild(passPhraseSpan);
      passPhraseHtml.appendChild(passPhrase);


      function savePassPhrase() {
        let ummState = thisPlugin.getUmmState();
        let missionId = $("#umm-mission-select").val();
        let portalId = findWayPointIdForSelectedPortalInMission(missionId);
        let passphrase_params = { question: $("#umm-passphrase-question").val(), _single_passphrase: $("#umm-passphrase-passphrase").val() }
        ummState.missions[missionId].portals[portalId].objective.passphrase_params = passphrase_params;
        thisPlugin.saveUmmState(ummState);
        thisPlugin.notification("Question and passphrase saved");
      }

      return passPhraseHtml;
    }

    function updatePassPhraseContent() {
      $("#umm-passphrase-container").replaceWith(passCodeBoxFactory($("#umm-mission-select").val()));
      $("#umm-passphrase-container").children('textarea').each(function () {
        this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
      }).on("input", function () {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
      });
      if ($("#umm-action-select").val() == "PASSPHRASE") {
        $("#umm-passphrase-container").css('display', 'flex');
      }
    }

    function updateActionSelect() {
      $("#umm-action-select").replaceWith(portalActionSelectFactory($("#umm-mission-select").val()));

      $("#umm-action-select").on('change', function (e) {
        if ($("#umm-action-select").val() == "PASSPHRASE") {
          updatePassPhraseContent();
        } else {
          $("#umm-passphrase-container").hide();
        }
        let ummState = thisPlugin.getUmmState();
        let missionId = $("#umm-mission-select").val();
        let portalId = findWayPointIdForSelectedPortalInMission(missionId);
        let action = $("#umm-action-select").val();
        ummState.missions[missionId].portals[portalId].objective.type = action;
        thisPlugin.saveUmmState(ummState);
        thisPlugin.notification("Portal action saved");
      });
    }

    // Construct waypoint editor HTML
    let ummTitle = document.createElement("span")
    ummTitle.appendChild(document.createTextNode("UMM Waypoint Editor"))
    ummTitle.setAttribute("class", "umm-waypoint-editor-title")
    wayPointHtml.appendChild(ummTitle)

    let waypointSelectContainer = document.createElement("div");
    waypointSelectContainer.setAttribute("class", "umm-waypoint-select-container")

    waypointSelectContainer.appendChild(portalMissionSelectFactory(getMissionIdsForGuid(window.selectedPortal)));

    let actionSelect = document.createElement("select");
    actionSelect.setAttribute("id", "umm-action-select")
    waypointSelectContainer.appendChild(actionSelect); // Placeholder to be replaced with updateActionSelect

    wayPointHtml.appendChild(waypointSelectContainer);

    let passPhraseHtml = document.createElement("div");
    passPhraseHtml.setAttribute("id", "umm-passphrase-container"); // Placeholder to be replaced with updatePassPhraseContent

    wayPointHtml.appendChild(passPhraseHtml)

    document.getElementById("portaldetails").insertBefore(wayPointHtml, document.getElementById("randdetails"));

    // Make mission dropdown functional
    $("#umm-mission-select").on('change', function (e) {
      if ($("#umm-mission-select").val() != "#") {
        // If a different mission is selected, update the waypoint selector and action selector to reflect the new portal(s)
        updateActionSelect();
        updatePassPhraseContent();
      } else {
        // If no mission is selected, disable other dropdowns
        $("#umm-action-select").prop("disabled", true)
        $("#umm-passphrase-container").hide();
      }
    });

    updateActionSelect(); // Replace action placeholder
    updatePassPhraseContent(); // Replace passphrase placeholder
  }

  thisPlugin.addMissionNumbers = function () {

    let ummState = thisPlugin.getUmmState();
    function generateMarker(type, number) {
      return `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 49" class="umm-mission-marker"><defs><style>.cls-2{fill:#fff;}</style></defs><path class="${type}" d="M33,18c0,8.84-12,31-16,31S1,26.84,1,18,8.16,1,17,1,33,9.16,33,18Z" transform="translate(-0.5 -0.5)"/><circle class="cls-2" cx="16.5" cy="16.5" r="13"/><foreignObject x="0" y="0" width="34px" height="34px"><span class="umm-mission-number">${number}</span></foreignObject></svg>`;
    }
    for (let mission in ummState.missions) {

      if (ummState.missions[mission].portals.length > 0) {
        let portal = ummState.missions[mission].portals[0];

        let missionNumber = L.marker({ lat: portal.location.latitude, lng: portal.location.longitude }, {
          icon: L.divIcon({
            className: 'umm-mission-icon',
            iconSize: [34, 50],
            iconAnchor: [17, 50],
            html: generateMarker(parseInt(mission) == ummState.currentMission ? "active" : "start", parseInt(mission) + 1)
          }),
          interactive: false
        });

        missionNumber.addTo(thisPlugin.ummMissionNumbers);
      }
    }
  }

  thisPlugin.addUmmButtons = function (ummState) {
    thisPlugin.ummButtons = L.Control.extend({
      options: {
        position: 'topleft'
      },
      onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-umm leaflet-bar');
        $(container).append('<a id="umm-toggle-bookmarks" href="javascript: void(0);" class="umm-control"' + (window.isSmartphone() ? '' : ' title="UMM: Toggle Mission Mode"') + '><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATLSURBVGhD7ZoHqH5jHMdfe++9CcnKLnsWsjLKLiHZo5AthQjJlvwzSkqyIjObEJGysorsvSPz8znv+9NzT+c97xnvvZy63/p0z/Pc5z7n+Z5znvV7bm9a/0M9Du/AITCrGWPS/HAWfAXPwV4wM4xLC8JF8C3Y9t7fCe9DW0Nh4BtI6xYf2OEwJzTVHHAifA1R7zXwb+KN5LqJoSIDD8OWcBC8NsiTz+EMWBiqyrd5IHwAUc8ng58TjFhwP6hrqMjAI7AZpJoJdoanIMr9BJfBClCmHeBliL97CbaGIwfpCUZCZYZmg9AwA5vDKG0Cd8Kf4N/9DrfAupBqPXgIov53wbb5UFSpkdAwQ4dC3sCjUMVAXqvBDPgVoq4HYQ/QWBj9Eo6H2SFVJSOhIkOBBraAtloKLoTvIa3/FzgfHKGKVMtIKAy9AtGJxy0/15PhdbgeloEyjTRio2Wy5BNevH/ZSiONvAB23MnQyuAk5j2PMAMtArfCdbC0GRU10shtcFX/ciw6APbsX2Zv4nl4C3Y1A20E0Q4nO+XEt2z/cqga9ZE6mgdm6V/2TgPrd+Qp+1w14zJm3izV650H/t2NWapYlY3sCHfBqCcTWg4eA4fNn8GRyGHzbdgF6mh7+AGcNOcyo0CVjVwK/s6FZRU9DVFf4NqqqRaC5fuXhapsZAFwBr44S5XLdVPUleIENw7Zb51TUjXuI864J4CjTCrHe/vFHxD1BbdDW7k0+g6sb2MzBmpsxInKss9kqf4NngTzrgCHz6hP7CtbwTi0N3j/lbJUX42NbAg3wFFZqr+vcP31BXgjV8mngEbvhW1hMtXYSJHSFfFUaMXBTzVWI1MpJ1bb6nyjOmvkaLCtTguqs0YcLW+GtbNUh43k1Wkja0Cs2Tpr5BiwrftnqQ4buRxs68FZqsNGjLIYXXQxqaY7+38pO7m7zIhpqc4ZMZ71IdjONGjRCSNzg9tfY14GJFxJvwhT9kacfdsuJN1iexxhu/4CRys7ej7oXduIDVsfVoeYjHzdbrIMQhtYU6eDdRloWMIM5NK+TgzL4EN6ZBDsA3nVMmJ89k2Ick+Aw58mIm8DUPvCe+AnMJ8Z6A6wzANZarSMIUe9KW7a8qplxIZHmeBKMCjgXt7PoEyHgU/4VYhP7hJwD57uHo28+3C2g/z95GzIq7IRb2zIP8oEHto0lXV60GM995uBfHux33ePbywrvZ8HOotBXrXeyMcQZQLPLNrI+JdzQoR67HengvsMQ6qmPY9xyX4uRH/Lq5YRK3TkiHKeZWwKVWXZUVH1pppgJF7p3ZA/MQptA9eCT2wtMypoJzAYbt2/wU2wJoxLu0EMQvbZLOphWNIMn3yZoSpKDchnECdS1n8ftAkRGdeKEJQYIloHMjnOO5K0MZQ38BEcC4aMloQLII4TxLJ1zt5XAQeC+MwdAAzHFh7UNjGUN+DgcBwUnaU7cZ4E6QAy6ux9Ubga/Dwt/yN4hhlR+1JVMTTMwLDIeSpXBW6OInIpDslnQixDDMF6Fm/D/b3TgIaGjWClKjJ0D6QGPgWPDqoYyMvPyk77LER93stoZvwzgPc0kL4qtFbeUFsDRfIfDHxI0QfE0GsatB6bNHQOVP2EmsgNlAdEu2epaXVSvd4/r54FA9f01AsAAAAASUVORK5CYII=" width="16" height=16" style="margin-top:7px;"></a>').on('click dblclick', '#umm-toggle-bookmarks', function (event) {
          thisPlugin.toggleMissionMode();
        });

        $(container).append('<a id="umm-next-mission" href="javascript: void(0);" class="umm-control"' + (window.isSmartphone() ? '' : '  title="UMM: Next Mission"') + '><img src="data:image/png;base64,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" width="16" height="16" style="margin-top: 7px;"></a>').on('click dblclick', '#umm-next-mission', function (event) {
          event.stopPropagation();
          thisPlugin.nextMission();
        });

        $(container).append(`<a id="umm-edit-active-mission" href="javascript: void(0);" class="umm-control"'` + (window.isSmartphone() ? '' : '  title="UMM: Select mission number"') + `>${ummState.currentMission + 1}</a>`).on('click dblclick', '#umm-edit-active-mission', function (event) {
          event.stopPropagation();
          thisPlugin.editActiveMission();
        });

        $(container).append('<a id="umm-previous-mission" href="javascript: void(0);" class="umm-control"' + (window.isSmartphone() ? '' : '  title="UMM: Previous Mission"') + '><img src="data:image/png;base64,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" width="16" height="16" style="margin-top: 7px;"></a>').on('click dblclick', '#umm-previous-mission', function (event) {
          event.stopPropagation();
          thisPlugin.previousMission();
        });

        $(container).append(`<a id="umm-number-of-portals" href="javascript: void(0);" class="umm-control"'` + (window.isSmartphone() ? '' : '  title="UMM: Number of portals in current mission"') + `>P${ummState.missions[ummState.currentMission].portals.length}</a>`);

        $(container).append('<a id="umm-undo" href="javascript: void(0);" class="umm-control"' + (window.isSmartphone() ? '' : '  title="UMM: Undo"') + '><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOiSURBVHhe7Zo9SFtRFMeTvHwbjSHRIA52aJBICw1oSSCglQ66CIWOLoUOLh0cOnRLJwcHu3Xp0EJLV3HxIwSe1iGKGKFCAnaok9RUjUbQ6NP0HjiC1PeZvCTvxvsDufcc0eT837nnnnsTE4PBYDAYjHuLGceaEI/HnxQKhemrq6shQRCs6L4Dx3GF7u7uSCqV+o2uumHBUXf6+/vj+Xz+R6lUei4XPGA2m60OhwOt+lKTDIDgi8Xi/PX1tQddklit1tNgMDjK8/wquuqK7gLQFDygqwC0BQ/oJgCNwQO6CEBr8EDVAtAcPFCVALQHD1QsQDMED1QkQLMED2gWoJmCBzQJoCX4WkHaZpPdbi+Qcdtms/EdHR3fFhcXc/hrzagWwAjBi2GxWECQWZ/P93ZlZeUXulWjSoCBpwPRk+OTpNGCvw05UZ57vd43a2trn9ClCg5HWQL+wPfLy8uHaBqScrlsPTs7GyNL4vjg4CCNbkVUHYdh3dECydKZaDT6Gk1FVAkA6wsqOpqG5/DwcGZ4eFhVxqoSgGxj6c5g5ygtIpDl4CHLYBpNWTTl9uDQYHz/z/68IAiqiiEsHajSekJSHAJESxp43d7e3vDc3JzsFql5cWsRgbyJ09bW1tGNjQ3dGqFEIuFJpVIjR0dHU6VSSTbNyWu/39zcTKApSkXVrdEiAOFw2EP+d+bi4kJSBIfTwW//3H6GpigV5ecyv7yqtiZA7wANFDRS6NKFbDZ72tbW9g5NccqmRziTpOIFagQRIpHIAk5FIRkawKkkVW/wjV4OoVBItiLu7OzIxlh1iTZCJlSDLnsUzSLotknTKoJuAgA0iqCrAABtIuguAFCJCOTw8gBddaUmAgAgQldXV8zldi3Y7fZzjuPg0kL0x2azCW63G/+yvlTdBzSSiYkJOBcU0bwDiJvL5WrbBzSSTCYzglNRyBL8i1NJqBVgfHw8QGrHFJqiwM0xTiVRdSdoJCDtSWqP7e7uKt5TulyuL3t7ezyaohiuBsRisZfkyX6Eg8zNxcf/oxrgQqSnpye0tLQke1VuOAH6+vry5MkqnuKUaGlpmd3a2nqBpiSGqwF6BA+nTqfTOYmmLFTvAmLAPSR8QJJOp1V95a6pBIDgSYGcXF9f/4wuRZpGAEj79vb2V9ls9gO6VGE4AUhbrNi83AaqPRQ8n8/3WMuTv4G6bRDaW+jwoMkhYi37/f6vyWRS86fCDAaDwWAwGAwG4z5jMv0D9jMAtZVsLdkAAAAASUVORK5CYII=" width="16" height="16" style="margin-top: 7px;"></a>').on('click dblclick', '#umm-undo', function (event) {
          event.stopPropagation();
          thisPlugin.undoPortal();
        });

        $(container).append('<a id="umm-opt" href="javascript: void(0);" class="umm-control"' + (window.isSmartphone() ? '' : '  title="UMM: Opt"') + '><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAB3RJTUUH5QgWEyMyp0FY2wAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAAKoSURBVHja7Zo/SFxBEMb3GQvFIpoY6yjcgdgmRVKYwlJBSaugYKmNNsYEDAmIYmMEa4OgpYWo2AkKVlqr3IFa+zcWEpvk+Y1vrzm5Y+e4ZVZvfjDsO7hl5/vuvd3ZfWeMoiiKoiiKolQkEefLqVQqymQycTqdfoGPs4hexCthDVeIZcQIcvuH3KJsNht7MSCOY4MBXuNyEdEpLDyfDUQ/TLiMIndZ3DuAfvnVAMXnWEd04w7479qhijnAbMDiiS6bozNcA/qkFZY7R64B9dLqHGjwacCJtDoHjn0aMIm4k1ZYhL82Rz8GYIlZQDMjrbIIM8jxN6cDuw4gUAuMoPmCaJJWbDlDTEH8rwdRHusAugtyJjSieW/CqAT3kNeFzcugDnDuXM0djQYg7ICbwuIf5aUoPFhzAEHzAJGbC0Ih9whwnn+2AfniMWgdmhph7XfI57ZUE9iTIInHQK24HEe0I14KG3CDfHZMsgwecifDUs4DOnC5EoDwR0YgPsOELZ91QJtJ9txvpdUW4BTRiUfgwLUDdy8wH7B4Y3Ob53TgGvBRWmG5c+Qa8OzgGrArnXC5c+QaMGySiSZUTmyOfgzAEkOz66BJlpzQ+EO5US3A6cQqhKjIoHUW7QeTnAd8MvL1AP0Y2yYphI68FkLPsRSu+M2QUumUNAcQoT4ChPftsB3wDZp3JoxD0X3kdZ5vhAulHouPohkzYR2LT8OEhxej3rbD9jzgBy4npBUX4CdM+O7zPICqQNpuSq/9haBXY0OYA5zfDnH3Al8DFk/UIr5xOnANaJZW6ECLTwOupdU5cOXTgCVpdeXOkWsAvRVel1ZYhDXEqDcDsMTQv6/6AzWBxA/YHP0YQH9CxAD0jHUj5hCX0qptDpRLD+VGOUonpCiKoiiKoihPgHtXV96aolVzHAAAAABJRU5ErkJggg==" width="16" height="16" style="margin-top: 7px;"></a>').on('click dblclick', '#umm-opt', function (event) {
          event.stopPropagation();
          thisPlugin.showUmmOptions();
        });
        return container;
      }
    });
    map.addControl(new thisPlugin.ummButtons());

    thisPlugin.updateCurrentActiveMissionSidebar(ummState);
  };

  thisPlugin.portalDetails = function (description, guid, imageUrl, isOrnamented, isStartPoint, location, title, type, objective) {
    this.description = description;
    this.guid = guid;
    this.imageUrl = imageUrl;
    this.isOrnamented = isOrnamented; // Unknown what it does, seems false everwhere
    this.isStartPoint = isStartPoint; // Unknown what NIA uses it for, seems false everywhere
    this.location = location;
    this.title = title;
    this.type = type;
    this.objective = objective;
  }

  thisPlugin.toggleMissionMode = function () {

    if (!thisPlugin.missionModeActive) {

      let ummState = thisPlugin.getUmmState();
      if (ummState.missionSetName == undefined || ummState.missionSetName === "" || ummState.missionSetDescription == undefined || ummState.missionSetDescription === "" || ummState.plannedBannerLength == 0) {
        // Mission data not set, ask for details, then attempt to enable mission mode again on Save
        thisPlugin.editMissionSetDetails(true);
        return thisPlugin.notification("Mission mode inactive\nPlease enter mission data\nAnd try again.")
      }

      thisPlugin.missionModeActive = true;

      thisPlugin.resumeOrStartNewMission(ummState);
      $('#umm-toggle-bookmarks').css("background-color", "crimson");
    } else {
      thisPlugin.missionModeActive = false;
      $('#umm-toggle-bookmarks').css("background-color", "");
    }
  }

  thisPlugin.undoPortal = function () {
    let ummState = thisPlugin.getUmmState();
    // If currentMission has 0 portals, refuse
    if (ummState.missions[ummState.currentMission].portals.length > 0) {
      // Remove the last portal from the array
      ummState.missions[ummState.currentMission].portals.pop();
      thisPlugin.saveUmmState(ummState);
      // Redraw
      thisPlugin.drawMissions();
      thisPlugin.refreshMissionNumbers();
      thisPlugin.updatePortalCountSidebar();
      // Check if current mission still has portals, if so reset view to this portal
      if (ummState.missions[ummState.currentMission].portals.length > 0) {
        window.map.setView([ummState.missions[ummState.currentMission].portals[ummState.missions[ummState.currentMission].portals.length - 1].location.latitude, ummState.missions[ummState.currentMission].portals[ummState.missions[ummState.currentMission].portals.length - 1].location.longitude]);
        window.renderPortalDetails(ummState.missions[ummState.currentMission].portals[ummState.missions[ummState.currentMission].portals.length - 1].guid);
      } else {
        // Clear out the portal view to allow for any portal to be selected as start portal
        renderPortalDetails(null);
        thisPlugin.notification(ummState.missionSetName + "\nNo portals left in mission.\nSelect start portal");
      }
    } else {
      // If no more portals are left in the current mission
      // Go back to the last portal of the previous mission (but don't delete it)
      // And destroy the new mission. This can only be done if it's the last mission in a serie, otherwise refuse
      if (ummState.currentMission == ummState.missions.length - 1) {
        if (ummState.currentMission != 0) {
          ummState.missions.pop();
          thisPlugin.saveUmmState(ummState);

          thisPlugin.setCurrentMission(ummState.currentMission - 1);
          ummState = thisPlugin.getUmmState();

          if (ummState.missions[ummState.currentMission].portals.length > 0) {
            window.map.setView([ummState.missions[ummState.currentMission].portals[ummState.missions[ummState.currentMission].portals.length - 1].location.latitude, ummState.missions[ummState.currentMission].portals[ummState.missions[ummState.currentMission].portals.length - 1].location.longitude]);
            window.renderPortalDetails(ummState.missions[ummState.currentMission].portals[ummState.missions[ummState.currentMission].portals.length - 1].guid);
          }
          thisPlugin.updatePortalCountSidebar();
          thisPlugin.notification(`${ummState.missionSetName}\nLast mission removed\nSwitched to previous mission ${ummState.currentMission + 1}\n`);
        } else {
          thisPlugin.notification(`${ummState.missionSetName}\nCan't undo\nAlready on last mission\n`);
        }
      } else {
        thisPlugin.notification(`${ummState.missionSetName}\nCan't undo portal.\nCurrent mission contains no portals\nand isn't last mission in banner.`);
      }
    }
  }

  thisPlugin.resumeOrStartNewMission = function (ummState) {
    // If the currentMission already has portals, resume mission creation at last portal
    if (ummState.missions[ummState.currentMission].portals.length > 0) {
      thisPlugin.missionModeResuming = true;
      window.map.setView([ummState.missions[ummState.currentMission].portals[ummState.missions[ummState.currentMission].portals.length - 1].location.latitude, ummState.missions[ummState.currentMission].portals[ummState.missions[ummState.currentMission].portals.length - 1].location.longitude]);
      window.renderPortalDetails(ummState.missions[ummState.currentMission].portals[ummState.missions[ummState.currentMission].portals.length - 1].guid);
      thisPlugin.notification("Mission mode active.\n" + ummState.missionSetName + "\nResuming mission #" + (ummState.currentMission + 1) + "\nSelect next portal");
    } else {
      // It's the start of a new mission, add the portal as such
      if (window.selectedPortal !== null) {
        window.map.setView(window.portals[window.selectedPortal].getLatLng());
        window.renderPortalDetails(window.selectedPortal);
        thisPlugin.notification("Mission mode active.\n" + ummState.missionSetName + "\nPortal added as start for mission #" + (ummState.currentMission + 1));
      } else {
        // Player has no portal selected, instruct to select a new start portal
        thisPlugin.notification("Mission mode active.\n" + ummState.missionSetName + "\nSelect start portal for mission #" + (ummState.currentMission + 1));
      }
    }
  }

  thisPlugin.nextMission = function () {
    let ummState = thisPlugin.getUmmState();

    // If currentMission has 0 portals, refuse to switch to the next mission
    if (ummState.missions[ummState.currentMission].portals.length > 0) {

      // Check if it's the last mission in the set, if so we will have to initialize a new mission (if allowed)
      if (ummState.currentMission + 1 == ummState.missions.length) {
        // Check if plannedBannerLength is set, otherwise ask for one
        if (ummState.plannedBannerLength == 0) {
          let plannedBannerLengthSet = thisPlugin.editPlannedBannerLength();
          if (plannedBannerLengthSet) {
            ummState = thisPlugin.getUmmState(); // Name has been set, refresh the state
          } else {
            // Still no length set, stop next mission creation / switch
            return thisPlugin.notification("Can't start new mission.\nPlease enter a valid banner length first")
          }
        }

        // Validate if we're still allowed to create new missions, if so create the new mission.
        if (ummState.currentMission < ummState.plannedBannerLength - 1) {

          // Create the new mission (but don't activate it yet)
          ummState.missions[ummState.currentMission + 1] = {
            missionTitle: thisPlugin.generateMissionTitle(ummState.currentMission + 2, ummState.plannedBannerLength, ummState.missionSetName, ummState.titleFormat),
            missionDescription: ummState.missionSetDescription,
            portals: []
          };

          thisPlugin.saveUmmState(ummState);

          // Activate the new mission
          thisPlugin.setCurrentMission(ummState.currentMission + 1)
          // Disable currently active portal
          renderPortalDetails(null);

          ummState = thisPlugin.getUmmState();

          thisPlugin.notification(ummState.missionSetName + "\nStart of mission #" + (ummState.currentMission + 1) + "\nSelect start portal.");
        } else {
          thisPlugin.notification(`Can't start new mission.\nBanner length (${ummState.plannedBannerLength}) reached.`);
        }
      } else {
        thisPlugin.setCurrentMission(ummState.currentMission + 1)
        ummState = thisPlugin.getUmmState(); // Refresh state

        if (thisPlugin.missionModeActive) {
          if (ummState.missions[ummState.currentMission].portals.length > 0) {
            window.map.setView([ummState.missions[ummState.currentMission].portals[ummState.missions[ummState.currentMission].portals.length - 1].location.latitude, ummState.missions[ummState.currentMission].portals[ummState.missions[ummState.currentMission].portals.length - 1].location.longitude]);
            window.renderPortalDetails(ummState.missions[ummState.currentMission].portals[ummState.missions[ummState.currentMission].portals.length - 1].guid);
            thisPlugin.notification("Mission mode active.\n" + ummState.missionSetName + "\nCurrent mission #" + (ummState.currentMission + 1) + "\nSelect next portal");
          }
        }
        else {
          thisPlugin.updatePortalCountSidebar();
          thisPlugin.notification(ummState.missionSetName + "\nCurrent active mission set to #" + (ummState.currentMission + 1));
        }
      }
    } else {
      thisPlugin.notification(ummState.missionSetName + "\nCan't start new mission.\nCurrent mission is empty.");
    }
  }

  thisPlugin.previousMission = function () {
    let ummState = thisPlugin.getUmmState();

    // If currentMission has 0 portals, refuse to switch to the next mission
    if (ummState.missions[ummState.currentMission].portals.length > 0) {

      // Check if it's the first mission in the set, if so we can't go back
      if (ummState.currentMission - 1 < 0) {
        return thisPlugin.notification("Can't go to previous mission.\nFirst mission in set")
      } else {


        thisPlugin.setCurrentMission(ummState.currentMission - 1)
        ummState = thisPlugin.getUmmState(); // Refresh state

        if (thisPlugin.missionModeActive) {
          if (ummState.missions[ummState.currentMission].portals.length > 0) {
            window.map.setView([ummState.missions[ummState.currentMission].portals[ummState.missions[ummState.currentMission].portals.length - 1].location.latitude, ummState.missions[ummState.currentMission].portals[ummState.missions[ummState.currentMission].portals.length - 1].location.longitude]);
            window.renderPortalDetails(ummState.missions[ummState.currentMission].portals[ummState.missions[ummState.currentMission].portals.length - 1].guid);
            thisPlugin.updatePortalCountSidebar();
            thisPlugin.notification("Mission mode active.\n" + ummState.missionSetName + "\nCurrent mission #" + (ummState.currentMission + 1) + "\nSelect next portal");
          }
        } else {
          thisPlugin.updatePortalCountSidebar();
          thisPlugin.notification(ummState.missionSetName + "\nCurrent active mission set to #" + (ummState.currentMission + 1));
        }
      }
    } else {
      thisPlugin.notification(ummState.missionSetName + "\nCan't change mission.\nCurrent mission is empty.");
    }
  }

  // TODO: Mission title stuff fixing
  thisPlugin.generateMissionTitle = function (missNumber, plannedBannerLength, missSetName, missNameFormat) {
    let missTitleNew = missNameFormat;
    if (missNameFormat != null && missNameFormat != "") {
      if (plannedBannerLength >= 1) {
        missTitleNew = missTitleNew.replace(/(M+)/g, plannedBannerLength);
      }



      if (missNumber >= 0) {
        let missionNumberFormat = missNameFormat.match(/(N+)/g) ? missNameFormat.match(/(N+)/g)[0] : "";
        if (missionNumberFormat.length > 1) {
          let missionNumberInTitle = "0".repeat(("" + plannedBannerLength).length - ("" + missNumber).length) + missNumber;
          missTitleNew = missTitleNew.replace(/(N+)/g, missionNumberInTitle);
        } else if (missionNumberFormat.length == 1) {
          missTitleNew = missTitleNew.replace(/(N)/, missNumber)
        }
      }

      if (missSetName != null && missSetName != "") {
        missTitleNew = missTitleNew.replace("T", missSetName);
      }
    }
    return missTitleNew;
  }

  thisPlugin.editMissionSetDetails = function (toggleMissionModeAfterSave = false) {
    let ummState = thisPlugin.getUmmState();

    let html = '<div class="umm-edit-mission-set-details">';
    html += '<b>Banner details</b>';
    html += '<p>Please enter the details for your banner. All fields are required.</p><br>';

    html += `<label for="umm-mission-set-name"><b>Banner name</b> (max. 50 characters)</label>
      <span class="umm-error" id="umm-mission-set-name-error"><b>Error: </b>Please enter a valid banner name</span>
      <input id="umm-mission-set-name" name="umm-mission-set-name" type="text" placeholder="Enter name for the banner" maxlength="50" value="${ummState.missionSetName ? ummState.missionSetName : ""}">`

    html += `<label for="umm-mission-set-description"><b>Banner description</b> (max. 200 characters)</label>
      <span class="umm-error" id="umm-mission-set-description-error"><b>Error: </b>Please enter a valid banner description</span>
      <textarea id="umm-mission-set-description" name="umm-mission-set-description" placeholder="Enter description for the banner" maxlength="200" rows="5">${ummState.missionSetDescription ? ummState.missionSetDescription : ""}</textarea>`

    html += `<label for="umm-banner-length"><b>Planned banner length</b>, min. ${ummState.missions.length > 1 ? ummState.missions.length : 1} mission(s)</label>
      <span class="umm-error" id="umm-mission-planned-banner-length-error"><b>Error: </b>Please enter a valid banner length</span>
      <input id="umm-banner-length" name="umm-banner-length" type="number" placeholder="Enter length of banner set" min="${ummState.missions.length > 1 ? ummState.missions.length : 1}" value="${ummState.plannedBannerLength && ummState.plannedBannerLength > 0 ? ummState.plannedBannerLength : (ummState.missions.length > 0 ? ummState.missions.length : 1)}">`

    html += `<label for="umm-title-format"><b>Title format</b></label>
      <span class="umm-error" id="umm-mission-title-format-error"><b>Error: </b>Please enter a valid title-format</span>
      <p>Title format allows:<br>N = Mission number without leading 0<br>NN = Mission number with leading 0 (if required by banner length)<br>M = Planned banner length<br>T = (banner title)<br>Examples:T NN-M (default) or NN.M T</p>
      <input id="umm-title-format" name="umm-title-format" type="text" placeholder="Enter a title format" value="${ummState.titleFormat ? ummState.titleFormat : "T NN-M"}" style="margin-bottom: 5px;">
      <b>Preview: </b><span id="umm-mission-title-preview"></span>`

    html += '</div>';

    function succesfulSave() {
      let isSavedSuccesful = thisPlugin.saveMissionSetDetails($('#umm-mission-set-name').val(), $('#umm-mission-set-description').val(), $('#umm-banner-length').val(), $('#umm-title-format').val());
      if (isSavedSuccesful) {
        ummState = thisPlugin.getUmmState();
        //thisPlugin.reloadSettingsWindowIfNeeded();
        thisPlugin.updateCurrentActiveMissionSidebar(ummState);
        // $(this).dialog("close");
        thisPlugin.notification(`${ummState.missionSetName}\nMission details saved`);
        if (toggleMissionModeAfterSave) {
          thisPlugin.toggleMissionMode();
        }
      }
    }

    window.dialog({
      html: html,
      title: `Edit banner details - UMM v${thisPlugin.version}`,
      id: 'umm-options',
      width: 400,
      buttons: [
        thisPlugin.ummDialogButtonCreator("< Main Menu", thisPlugin.showUmmOptions),
        thisPlugin.ummDialogButtonCreator("Save", succesfulSave),
        thisPlugin.ummDialogButtonCreator("Close", function () { $(this).dialog("close") })
      ]
    });
    function updateMissionTitlePreview() {
      if ($('#umm-mission-set-name').val() != "" && $('#umm-title-format').val() != "" && !isNaN(parseInt($('#umm-banner-length').val()))) {
        let missionTitle = thisPlugin.generateMissionTitle(1, parseInt($('#umm-banner-length').val()), $('#umm-mission-set-name').val(), $('#umm-title-format').val())
        $('#umm-mission-title-preview').text(missionTitle);
      } else {
        $('#umm-mission-title-preview').text("Fill in all required fields");
      }
    }

    updateMissionTitlePreview();

    $('#umm-mission-set-name, #umm-mission-set-description, #umm-banner-length, #umm-title-format').on('input', function () {
      updateMissionTitlePreview();
    });
  };

  thisPlugin.saveMissionSetDetails = function (missionSetName, missionSetDescription, plannedBannerLength, titleFormat) {
    let ummState = thisPlugin.getUmmState();
    let shouldStoreData = true;

    if (missionSetName != null && missionSetName != "") {
      ummState.missionSetName = missionSetName;
      $('#umm-mission-set-name-error').css('display', 'none');
    } else {
      shouldStoreData = false;
      $('#umm-mission-set-name-error').css('display', 'block');
    }

    if (missionSetDescription != null && missionSetDescription != "") {
      ummState.missionSetDescription = missionSetDescription;
      $('#umm-mission-set-description-error').css('display', 'none');
    } else {
      shouldStoreData = false;
      $('#umm-mission-set-description-error').css('display', 'block');
    }

    if (plannedBannerLength != null && plannedBannerLength != "" && !isNaN(parseInt(plannedBannerLength)) && !(parseInt(plannedBannerLength) < ummState.missions.length)) {
      ummState.plannedBannerLength = parseInt(plannedBannerLength);
      $('#umm-mission-planned-banner-length-error').css('display', 'none');
    } else {
      shouldStoreData = false;
      $('#umm-mission-planned-banner-length-error').css('display', 'block');
    }

    if (titleFormat != null && titleFormat != "") {
      ummState.titleFormat = titleFormat;
      $('#umm-mission-title-format-error').css('display', 'none');
    } else {
      shouldStoreData = false;
      $('#umm-mission-title-format-error').css('display', 'block');
    }


    if (shouldStoreData) {
      thisPlugin.saveUmmState(ummState);
      thisPlugin.syncMissionTitles();
      thisPlugin.syncMissionDescriptions();
      return true;
    } else {
      return false;
    }
  }

  thisPlugin.editActiveMission = function () {
    let ummState = thisPlugin.getUmmState();

    let html = '<div class="umm-options-list">';
    html += 'Select a mission number:<br>';
    html += '<select id="umm-mission-picker" class="umm-mission-picker">';
    for (let mission in ummState.missions) {
      html += '<option value="' + mission + '"' + (mission == ummState.currentMission ? ' selected' : '') + '>' + (parseInt(mission) + 1) + ' - waypoints: ' + ummState.missions[mission].portals.length + '</option>';
    }
    html += '</select>';
    html += '<button id="umm-mission-picker-btn" class="umm-mission-picker-btn">Select</button>';
    html += '<button id="umm-mission-zoom-btn" class="umm-mission-picker-btn">Zoom to mission</button>';
    html += '</div>';
    window.dialog({
      html: html,
      title: `${thisPlugin.title} v${thisPlugin.version}`,
      id: 'umm-options',
      width: 350,
      buttons: [
        thisPlugin.ummDialogButtonCreator("< Main Menu", thisPlugin.showUmmOptions),
        thisPlugin.ummDialogButtonCreator("Close", function () { $(this).dialog("close") })
      ],
    })
    $("#umm-mission-picker-btn").bind('click', function (evt) {
      let missionNumber = parseInt($('#umm-mission-picker').val());
      if (missionNumber == ummState.currentMission || missionNumber < 0 || missionNumber >= ummState.missions.length) {
        thisPlugin.notification("Active mission not changed.");
      } else {
        thisPlugin.setCurrentMission(missionNumber);
        ummState = thisPlugin.getUmmState();

        if (thisPlugin.missionModeActive) {
          renderPortalDetails(null); // Avoid adding current portal to a mission
          thisPlugin.resumeOrStartNewMission(ummState);
        } else {
          if (ummState.missions[ummState.currentMission].portals.length > 0) {
            window.map.fitBounds(thisPlugin.ummMissionPaths.getLayers()[missionNumber].getBounds());
          }
          thisPlugin.notification("Current working mission set to #" + (ummState.currentMission + 1));
        }
        $("#dialog-umm-options").dialog("close");
      }
    });
    $("#umm-mission-zoom-btn").bind('click', function (evt) {
      let missionNumber = parseInt($('#umm-mission-picker').val());
      if (ummState.missions[ummState.currentMission].portals.length == 0 || missionNumber < 0 || missionNumber >= ummState.missions.length) {
        thisPlugin.notification("Can't zoom in on this mission. No portals.");
      } else {
        window.map.fitBounds(thisPlugin.ummMissionPaths.getLayers()[missionNumber].getBounds());
      }
    });
  };

  thisPlugin.setCurrentMission = function (missionId) {
    let ummState = thisPlugin.getUmmState()
    ummState.currentMission = (missionId);

    thisPlugin.updateCurrentActiveMissionSidebar(ummState);

    thisPlugin.saveUmmState(ummState);
    thisPlugin.reloadSettingsWindowIfNeeded();
    thisPlugin.refreshMissionNumbers();
    thisPlugin.drawMissions();
  }

  thisPlugin.updatePortalCountSidebar = function () {
    let ummState = thisPlugin.getUmmState();
    if (ummState.missions[ummState.currentMission].portals.length < 1000) {
      $('#umm-number-of-portals').text(`P${ummState.missions[ummState.currentMission].portals.length}`);
    } else {
      $('#umm-number-of-portals').text(`${ummState.missions[ummState.currentMission].portals.length}`);
    }
  }

  thisPlugin.updateCurrentActiveMissionSidebar = function (ummState) {
    $('#umm-edit-active-mission').text(parseInt(ummState.currentMission) + 1);
    $('#umm-edit-active-mission').css("background-color", "white");
    $('#umm-next-mission').children('img').css("opacity", "100%");
    $('#umm-previous-mission').children('img').css("opacity", "100%");

    if (ummState.currentMission == ummState.plannedBannerLength - 1 || ummState.plannedBannerLength == 0) {
      $('#umm-next-mission').children('img').css("opacity", "30%");
      $('#umm-edit-active-mission').css("background-color", "orange");
    }
    if (ummState.currentMission == 0) {
      $('#umm-previous-mission').children('img').css("opacity", "30%");
    }
  }

  thisPlugin.editPlannedBannerLength = function () {
    let ummState = thisPlugin.getUmmState();
    let plannedBannerLength = prompt("Please enter the total number of mission you want your banner to have.", ummState.plannedBannerLength ? ummState.plannedBannerLength : "");
    if (parseInt(plannedBannerLength) > 0) {
      ummState.plannedBannerLength = parseInt(plannedBannerLength);
      thisPlugin.saveUmmState(ummState);
      thisPlugin.syncMissionTitles();
      thisPlugin.reloadSettingsWindowIfNeeded();
      ummState = thisPlugin.getUmmState(); // Refresh state to be safe, not technically required here
      thisPlugin.updateCurrentActiveMissionSidebar(ummState);
      thisPlugin.notification("Total number of missions updated:\n" + ummState.plannedBannerLength);
      return true;
    } else {
      thisPlugin.notification("Total number of missions not changed.");
      return false;
    }
  }

  thisPlugin.syncMissionTitles = function () {
    let ummState = thisPlugin.getUmmState();
    for (let mission in ummState.missions) {
      ummState.missions[mission].missionTitle = thisPlugin.generateMissionTitle(parseInt(mission) + 1, ummState.plannedBannerLength, ummState.missionSetName, ummState.titleFormat);
    }
    thisPlugin.saveUmmState(ummState);
  }

  thisPlugin.syncMissionDescriptions = function () {
    let ummState = thisPlugin.getUmmState();
    for (let mission in ummState.missions) {
      ummState.missions[mission].missionDescription = ummState.missionSetDescription;
    }
    thisPlugin.saveUmmState(ummState);
  }

  thisPlugin.updateMissionPortalsDetails = function (data) { // data = {guid: guid, portal: portal, portalDetails: details, portalData: data}
    // Update portal details (image and title) if portal is part of any mission
    let ummState = thisPlugin.getUmmState();
    if (!("missions" in ummState)) return; // no mission data found

    let isUmmStateUpdated = false;
    for (let mission of ummState.missions) {
      for (let portal of mission.portals) {
        if (portal.guid == data.guid) {
          if (portal.imageUrl !== data.portalDetails.image && data.portalDetails.image) { // change only when change is needed AND if portal image is defined (not null)
            portal.imageUrl = data.portalDetails.image;
            isUmmStateUpdated = true;
          }
          if (portal.title !== data.portalDetails.title) { // change only when change is needed
            portal.title = data.portalDetails.title;
            isUmmStateUpdated = true;
          }
        }
      }
    }
    if (isUmmStateUpdated) { // save only when changes are made
      thisPlugin.saveUmmState(ummState); // Save the changes
    }
  };

  thisPlugin.storeMissingData = function () {
    let ummState = thisPlugin.getUmmState();
    let portalsUpdated = false;

    // Loop over missions
    for (let mission of ummState.missions) {
      // Loop over portals
      for (let portal of mission.portals) {
        // Check if portal exists in window.portals and has the data we're after
        // The code below has been transpiled by https://babeljs.io/ to support Chrome versions older than 80
        // Original code: if (!(window.portals[portal.guid]?.options?.data?.image?.length > 0)) return;
        let _window$portals$porta, _window$portals$porta2, _window$portals$porta3, _window$portals$porta4;
        if (!(((_window$portals$porta = window.portals[portal.guid]) == null ? void 0 : (_window$portals$porta2 = _window$portals$porta.options) == null ? void 0 : (_window$portals$porta3 = _window$portals$porta2.data) == null ? void 0 : (_window$portals$porta4 = _window$portals$porta3.image) == null ? void 0 : _window$portals$porta4.length) > 0)) return;

        // Store the data
        let portalOptions = window.portals[portal.guid].options;
        // Because portal is a pointer, it will update it within ummState, not just within this loop
        if (portal.imageUrl != portalOptions.data.image) {
          portal.imageUrl = portalOptions.data.image;
          portalsUpdated = true;
        }
        if (portal.title != portalOptions.data.title) {
          portal.title = portalOptions.data.title;
          portalsUpdated = true;
        }
      }
    }
    if (portalsUpdated) {
      thisPlugin.saveUmmState(ummState);
    }
  };

  thisPlugin.addPortalToCurrentMission = function (data) { // data = {selectedPortalGuid: guid, unselectedPortalGuid: oldPortalGuid}
    // If missionMode is active, add to current mission
    if (thisPlugin.missionModeActive && !thisPlugin.missionModeResuming) {

      // Prevents excess messages when portal reloads
      //if (thisPlugin.lastPortal == window.selectedPortal) {
      //  return;
      //} else {
      //  thisPlugin.lastPortal == window.selectedPortal;
      //}
      if (thisPlugin.lastPortal == data.selectedPortalGuid) { // replaced current selectedPortal with hook data selectedPortalGuid for accuracy during fast drawing moments
        return;
      }
      thisPlugin.lastPortal = data.selectedPortalGuid;

      let ummState = thisPlugin.getUmmState();
      // let selectedPortalDetails = window.portalDetail.get(window.selectedPortal);
      // selectedPortalDetails.guid = window.selectedPortal;
      // window.portals[data.selectedPortalGuid] is always defined, because the hook is fired after it's added, use this instead:
      let selectedPortalDetails = window.portals[data.selectedPortalGuid].options.data;
      selectedPortalDetails.guid = data.selectedPortalGuid;
      selectedPortalDetails.title = selectedPortalDetails.title || '[undefined]';
      let portalToAdd = new thisPlugin.portalDetails("", selectedPortalDetails.guid, selectedPortalDetails.image, false, false, { latitude: selectedPortalDetails.latE6 / 1E6, longitude: selectedPortalDetails.lngE6 / 1E6 }, selectedPortalDetails.title, "PORTAL", { type: "HACK_PORTAL", passphrase_params: { question: "", _single_passphrase: "" } });

      // If it's the first portal in a mission, automatically add it the mission with startpoint is true
      if (ummState.missions[ummState.currentMission].portals.length === 0) {
        portalToAdd.isStartPoint = false; // NIA doesn't seem to use this at this point in time so always false
        addPortalToCurrentMission(portalToAdd);
      } else {
        let alreadyInMission = false;
        // Check if the portal is already in the current mission, if so skip adding
        for (let portal in ummState.missions[ummState.currentMission].portals) {
          let currentPortal = ummState.missions[ummState.currentMission].portals[portal];
          if (currentPortal.guid === portalToAdd.guid) {
            alreadyInMission = true;
            break;
          }
        }

        // Sometimes portalDetailsUpdated gets fired multiple times
        // In that case the first pass of this function will add it,
        // the second will keep triggering 'already in mission'.
        // When this happens, we supress the message as the user most likely didn't attempt to add this.
        // (Only way would be to close and then reopen that portal, in which case the user probably meant to resume adding others)
        let isPortalToAddLastPortalInMission = false;
        if (ummState.missions[ummState.currentMission].portals[ummState.missions[ummState.currentMission].portals.length - 1].guid === portalToAdd.guid) {
          isPortalToAddLastPortalInMission = true;
        }

        if (!alreadyInMission) {
          addPortalToCurrentMission(portalToAdd);
        } else if (!isPortalToAddLastPortalInMission) {
          thisPlugin.notification(ummState.missionSetName + "\nPortal already in mission #" + (ummState.currentMission + 1))
        }
      }

      function addPortalToCurrentMission(portalToAdd) {
        ummState.missions[ummState.currentMission].portals.push(portalToAdd);
        thisPlugin.saveUmmState(ummState); // Save the newly added portal
        drawLineToAddedPortal(portalToAdd);
        thisPlugin.updatePortalCountSidebar();
        thisPlugin.notification(ummState.missionSetName + "\nAdded to mission #" + (ummState.currentMission + 1))
      }

      function drawLineToAddedPortal(portalToAdd) {
        // Can't draw a line to a single portal, so skip drawing, but do refresh mission numbers on the map
        if (ummState.missions[ummState.currentMission].portals.length <= 1) {
          thisPlugin.refreshMissionNumbers();
          return;
        }
        let coordinatesList = [];
        coordinatesList.push(new L.latLng(ummState.missions[ummState.currentMission].portals[(ummState.missions[ummState.currentMission].portals.length - 2)].location.latitude, ummState.missions[ummState.currentMission].portals[(ummState.missions[ummState.currentMission].portals.length - 2)].location.longitude));
        coordinatesList.push(new L.latLng(portalToAdd.location.latitude, portalToAdd.location.longitude));

        let geodesicPolyline = new L.geodesicPolyline(coordinatesList, {
          color: "#ff9a00",
          weight: 5,
          smoothFactor: 1
        });
        geodesicPolyline.addTo(thisPlugin.ummMissionPaths);
      }
    } else {
      thisPlugin.missionModeResuming = false;
    }
  };

  thisPlugin.zoomAllMissions = function () {
    // If there are no paths on the paths layer, fitBounds has issues
    if (window.plugin.umm.ummMissionPaths.getBounds().hasOwnProperty("_southWest") && window.plugin.umm.ummMissionPaths.getBounds().hasOwnProperty("_northEast")) {
      window.map.fitBounds(thisPlugin.ummMissionPaths.getBounds());
    } else {
      window.map.fitBounds(thisPlugin.ummMissionNumbers.getBounds());
    }
  };

  thisPlugin.toggleLayerPaths = function (show) {
    if (show) {
      window.map.addLayer(thisPlugin.ummMissionPaths);
    } else {
      window.map.removeLayer(thisPlugin.ummMissionPaths);
    }
  };
  thisPlugin.toggleLayerNumbers = function (show) {
    if (show) {
      window.map.addLayer(thisPlugin.ummMissionNumbers);
    } else {
      window.map.removeLayer(thisPlugin.ummMissionNumbers);
    }
  };

  thisPlugin.showUmmOptions = function () {
    let ummState = thisPlugin.getUmmState();
    let html = '<div class="umm-options-list">';
    html += '<b>Banner data</b><br>';
    html += 'Banner name: <b><span>' + (ummState.missionSetName ? ummState.missionSetName : "N/A") + '</span></b><br>';
    html += 'Banner description: <b><span>' + (ummState.missionSetDescription ? ummState.missionSetDescription : "N/A") + '</span></b><br>';
    html += 'Mission title format: <b><span>' + (ummState.titleFormat ? ummState.titleFormat : "N/A") + '</span></b> <span title="Title format allows:&#10;N = Mission number without leading 0 (if required by banner length)&#10;NN = Mission number with leading 0&#10;M = Planned banner length&#10;T = (mission title)&#10; &#10;eg. T N-M or NN.M T">(?)</span><br>';
    html += 'Planned banner length: <b><span>' + ummState.plannedBannerLength + '</span></b> <span title="Length your banner is going to be. Will be used for mission titles and to make sure you don\'t create too many.">(?)</span><br>';
    html += ummState.plannedBannerLength % 6 != 0 ? '<span style="color: red;"><b>Warning:</b></span> banner length is not a multiple of 6<br>' : ''

    html += '<br><b>Active mission data</b><br>';
    html += 'Active mission: <b><span id="umm-active-mission-no">' + (ummState.currentMission + 1) + '</span></b><br>';
    html += 'Active mission title: <b><span id="umm-active-mission-title">' + (ummState.missions[ummState.currentMission].missionTitle || "N/A") + '</span></b><br>';
    html += 'Active mission portal count: <b><span id="umm-active-mission-no-portals">' + ummState.missions[ummState.currentMission].portals.length + '</span></b><br>';

    html += '<br>';
    html += '<b>Mission options</b><br>';
    html += 'Layers: <label style="user-select: none"><input type="checkbox" onclick="window.plugin.umm.toggleLayerPaths(this.checked)" id="umm-layercheckbox-paths"' + (window.map.hasLayer(thisPlugin.ummMissionPaths) ? ' checked' : '') + '>Mission Paths</label> <label style="user-select: none"><input type="checkbox" onclick="window.plugin.umm.toggleLayerNumbers(this.checked)" id="umm-layercheckbox-numbers"' + (window.map.hasLayer(thisPlugin.ummMissionNumbers) ? ' checked' : '') + '>Mission Numbers</label>';
    html += '<a onclick="window.plugin.umm.editMissionSetDetails(); return false;">Edit banner details</a>';
    html += '<a onclick="window.plugin.umm.editActiveMission(); return false;">Change active mission #</a>';
    html += '<a onclick="window.plugin.umm.zoomAllMissions(); return false;">Zoom to view all missions</a>';
    html += '<hr>'
    html += '<a onclick="window.plugin.umm.splitMissionOptions(); return false;">Split mission</a>';
    html += '<a onclick="window.plugin.umm.mergeMissions(); return false;">Merge missions</a>';
    html += '<a onclick="window.plugin.umm.reverseMission(); return false;">Reverse mission</a>';
    html += '<hr>'
    html += '<a onclick="if (confirm(\'Are you sure you want to clear ALL missions data?\')) window.plugin.umm.clearMissionData(); return false;">Clear ALL missions data</a>';

    html += '<b>Import/Export</b><br>';
    html += '<span>Supported file format versions: ' + thisPlugin.fileFormatVersion + ' and below</span><br>';
    html += '<a onclick="window.plugin.umm.exportData(); return false;">Export banner data to file</a>';
    html += '<div style="width:80%; margin: auto;"><b>Import banner data from file:</b><br>';
    html += '<input type="file" id="umm-import-file"></input></div>';

    html += '</div>';

    window.dialog({
      html: html,
      title: `${thisPlugin.title} v${thisPlugin.version}`,
      id: 'umm-options',
      width: 350,
      buttons: [
        thisPlugin.ummDialogButtonCreator("About this plugin", thisPlugin.about),
        thisPlugin.ummDialogButtonCreator("Close", function () { $(this).dialog("close") })
      ],
    })

    $("#umm-import-file").bind('change', function (evt) {
      if (confirm("Are you sure you want to overwrite the current mission data?")) {
        thisPlugin.loadFile(evt);
      }
    });
  };

  thisPlugin.showUmmManager = function () {
    alert("Yet to be implemented");
    // Option to change the order of missions
    // Option to change the order of portals
    // Option to easily switch "active" mission
    // Option to remove portals from a misson
    // Option to split a mission into multiple missions
    // Option to add a new mission and start bookmark mode
    // Counter for portals in current mission
    // Option to quickly view current mission
  }

  thisPlugin.ummHighlight = function () {
    // Hightlight portals in active mission
    // Highlight portals in banner
  }

  thisPlugin.drawMissions = function () {
    thisPlugin.ummMissionPaths.clearLayers();
    let ummState = thisPlugin.getUmmState();
    for (let mission in ummState.missions) {
      if (ummState.missions[mission].portals.length > 1) {
        thisPlugin.drawMission(ummState, mission);
      }
    }
  }

  thisPlugin.drawMission = function (ummState, missionId) {
    let coordinatesList = [];
    for (let portal in ummState.missions[missionId].portals) {
      coordinatesList.push(new L.latLng(ummState.missions[missionId].portals[portal].location.latitude, ummState.missions[missionId].portals[portal].location.longitude));
    }
    let geodesicPolyline = new L.geodesicPolyline(coordinatesList, {
      color: ummState.currentMission == missionId ? "#ff9a00" : "crimson",
      weight: 5,
      smoothFactor: 1
    });
    geodesicPolyline.addTo(thisPlugin.ummMissionPaths);
  }

  thisPlugin.exportDataManually = function () {
    let ummState = thisPlugin.getUmmState();
    let html = '<div>' +
      `<p>Copy the mission data below and paste it to a file:</p>
        <textarea id="umm-export" rows="15" cols="50">${JSON.stringify(ummState)}</textarea>
        <i>File format version: ${thisPlugin.fileFormatVersion}</i><br>
        <br>
        <button onclick="$('#umm-export').select();document.execCommand('copy');window.plugin.umm.notification('Mission data copied');" style="width: 80%; display: block: margin: 0 auto 10px;  cursor: pointer;">Copy data</button>
        </div>`;

    window.dialog({
      title: `Export mission data - UMM v${thisPlugin.version}`,
      html: html,
      id: "umm-options",
      width: 400,
      buttons: [
        thisPlugin.ummDialogButtonCreator("< Main Menu", thisPlugin.showUmmOptions),
        thisPlugin.ummDialogButtonCreator("Close", function () { $(this).dialog("close") })
      ],
    });
  };

  thisPlugin.exportData = function () {
    let ummState = thisPlugin.getUmmState();
    let data = JSON.stringify(ummState);
    let sanitizedName = ummState.missionSetName.replace(/[\W_]+/g, " ");
    let filename = sanitizedName + "-mission-data.json";

    if (typeof window.saveFile == 'function') { // iitc-ce method
      window.saveFile(data, filename, "application/json");
    } else if (!window.isSmartphone()) { // pc method
      let a = document.createElement('a');
      a.href = "data:text/json;charset=utf-8," + encodeURIComponent(data);
      a.download = filename;
      a.click();
    } else if (typeof android !== 'undefined' && android && android.saveFile) { // iitc-me method
      android.saveFile(filename, "application/json", data);
    } else {
      thisPlugin.exportDataManually();
    }
  }

  // Add an info property for IITC's plugin system
  setup.info = plugin_info;

  // Make sure window.bootPlugins exists and is an array
  if (!window.bootPlugins) window.bootPlugins = [];
  // Add our startup hook
  window.bootPlugins.push(setup);
  // If IITC has already booted, immediately run the 'setup' function
  if (window.iitcLoaded && typeof setup === 'function') setup();
}

function missionEditorPluginWrapper() {
  if (typeof window.plugin !== 'function') window.plugin = function () { };

  // Use own namespace for plugin
  if (typeof window.plugin.umm !== 'function') window.plugin.umm = function () { };

  let thisPlugin = window.plugin.umm;

  thisPlugin.mESetup = function () {

    let ummCSS = ".umm-upload-label {box-sizing: border-box; padding: 3px 0 7px 0; margin: 0 0 0 5px; display: inline-block; cursor: pointer; width: 16px; height: 16px; background-size: cover; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA5LTE3VDAyOjU3OjM3KzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0wOS0xN1QwMjo1ODoyMCswMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0wOS0xN1QwMjo1ODoyMCswMjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NWYwMDRiMS05NzRjLWRlNDctYTEzMi02NWZlYzIyOWM1NWYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDVmMDA0YjEtOTc0Yy1kZTQ3LWExMzItNjVmZWMyMjljNTVmIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NDVmMDA0YjEtOTc0Yy1kZTQ3LWExMzItNjVmZWMyMjljNTVmIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NWYwMDRiMS05NzRjLWRlNDctYTEzMi02NWZlYzIyOWM1NWYiIHN0RXZ0OndoZW49IjIwMTgtMDktMTdUMDI6NTc6MzcrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5w/iV0AAACPklEQVRoge2ZsWvVQACHv1yVoiIiggWhkygu0giC4KSzrg4ujp27uTnq6KDgoOjoKPgvCA5OeQ8LWqHa6lAdWnWprdWfw7009/Kitbl4eRf84JG7eyT8PnJ3uVwSSXQB03aApvgvMm4YYB9wB1gDtIvfInAxfORqEkm3gbma538GUmCpoTy1SSStAFMe13gGXAB+NpKoJomamX9vAHcbuM5O/AC+Vv3RlEhI3gPXgcduY4wiYO/MeeBF3hDr9DsBXHEb9uxwgrAz0zhyyK1UiQh4BNwDXgLfAoTypmqMzAL3B+VJ4CiwN2iqv2MT+LBd0zBPJSFpUtJDSRsabz5JuiZpROSyrMit4JHqsyXpXLlrHQFWgWVgOmxP8eKmO/0uYSWmiEsCYN0V6Q2OaQtBfOm7ItngmIbP4U3WBZE1YLkLIj0o1lpfgHfAAeBES4HqMiSSYZcmp7ELspgYEYH4uhV0RGQLmIdCJNZnyCtgA6zId6zVBHaMxESWFwxWYhM4CexvKVBd+nnBUFjNtBLFjywvGIrxcaaVKH5U3pG0jSQerAAf80rMIplbMdhdkmPYd/OY6LuV/DkS9UCHQiTGgd5zK7lIGj6HF+vAgtsQq8g8dp21jQEOAsdbiVOfXrnBYNdXsW1mV4rEOND75QZDfOMDSlMvxCnyFrvHMIQBToXP4sVItwIrshg4iC/PqxoTSZeAJ4znN5Ayb4CzVHzZTQab8TPAVeBw2Fy74jXwgD98ng4b5x8R24Pwt3RG5BfpNRC+G94MKgAAAABJRU5ErkJggg==');}";
    ummCSS += "#umm-import-file {border: none; border-radius: 0; width: 0.1px; height: 0.1px; opacity: 0; overflow: hidden; position: absolute; z-index: -1;}";
    ummCSS += ".umm-mission-picker{height:26px; margin-left: 15px; padding: 0 10px; background-color: rgb(8, 48, 78);}";
    ummCSS += ".umm-mission-picker-btn{height:26px; margin-left: 3px; padding: 0 10px; background-color: rgb(8, 48, 78);}";
    ummCSS += "";
    ummCSS += `.umm-notification{width:300px;height:20px;height:auto;position:fixed;left:50%;margin-left:-100px;top:55px;z-index:10000;background-color: #383838;color: #F0F0F0;font-family: Calibri, sans-serif;font-size: 20px;padding:10px;text-align:center;border-radius: 2px;-webkit-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);-moz-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);}`;
    ummCSS += ".umm-options-list a{display: block; color: #ffce00; border: 1px solid #ffce00; padding: 3px 0; margin: 10px auto; width: 80%; text-align: center; background: rgba(8,48,78,.9);}";

    $('head').append("<style>" + ummCSS + "</style>");
    $('body').append("<div class='umm-notification' style='display:none'></div>");

    if (typeof localStorage['ultimate-mission-maker'] === 'undefined') {
      thisPlugin.clearMissionData();
    }
    $('.navbar-header').append('<div id="umm-badge" style="margin: 15px 0 0 10px; background-color: crimson; float:left; height: 26px; padding: 0px 5px 0 5px; line-height:28px; vertical-align:middle; color: #fff;">UMM:</div><div id="umm-mission-editor-bar" style="padding-left: 5px; height: 26px; float: left; margin-top: 15px; background-color: rgb(8, 48, 78); color:#fff; vertical-align: middle; line-height:28px;"><div id="umm-mission-title" style="display: inline-block; max-width: 200px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"></div><div style="display: inline-block;"><input type="file" name="umm-import-file" id="umm-import-file" /><label for="umm-import-file" class="umm-upload-label">&nbsp;</label></div><div id="umm-mission-picker-wrapper" style="display: inline-block; float: right; margin-left: 10px;"></div></div>');

    // UMM File format version check at boot
    let ummState = thisPlugin.getUmmState();
    if (ummState.fileFormatVersion > ummState.fileFormatVersion) {
      alert("UMM: Your UMM version is too old for the data you've currently loaded. Please update UMM. The plugin won't initialize.");
      return;
    } else {
      ummState = thisPlugin.convertUmmVersion(ummState);
      thisPlugin.saveUmmState(ummState);
    }

    thisPlugin.setActiveBannerTitle();
    thisPlugin.bindFileImport();
    thisPlugin.generateMissionSelect();
  }

  thisPlugin.setActiveBannerTitle = function () {
    let ummState = thisPlugin.getUmmState();
    if (ummState.missionSetName == undefined || ummState.missionSetName == "") {
      $("#umm-mission-title").text('Please load a mission file...');
    } else {
      $("#umm-mission-title").text(ummState.missionSetName);
    }
  }

  thisPlugin.generateMissionSelect = function () {
    let ummState = thisPlugin.getUmmState();
    let selectedMission = ummState.currentMission;
    let html = '<select name="umm-mission-picker" id="umm-mission-picker" class="umm-mission-picker">';
    for (let mission in ummState.missions) {
      // html += '<option value="' + mission + '">' + (parseInt(mission) + 1) + '</option>';
      html += '<option value="' + mission + '"' + (mission == selectedMission ? ' selected' : '') + '>' + (parseInt(mission) + 1) + ': ' + ummState.missions[mission].missionTitle + '</option>';
    }
    html += '</select>';

    html += '<button onClick="window.plugin.umm.importMission(); return false;" class="umm-mission-picker-btn">Import</button>';

    $("#umm-mission-picker-wrapper").html(html);
  }

  thisPlugin.importMission = function () {
    let selectedMission = $("#umm-mission-picker").val();
    let ummState = thisPlugin.getUmmState();

    ummState.currentMission = selectedMission;
    thisPlugin.saveUmmState(ummState);

    let scope = thisPlugin.getAngularScope();

    if (!ummState.missions[selectedMission] || (ummState.missions[selectedMission].missionTitle == '' && ummState.missions[selectedMission].missionDescription == '' && ummState.missions[selectedMission].portals.length == 0)) {
      thisPlugin.notification('There is no mission data loaded');
      return;
    }

    if (!($('.loading').hasClass('ng-hide'))) {
      thisPlugin.notification('Please wait for the spinner in the top right to finish loading before importing a (new) mission');
      return;
    }

    if (!scope.mission) {
      thisPlugin.notification('You can not import a mission on the preview page\nStart with Create New Mission');
      return;
    }

    if (($('.title.title-4').length > 0 && !$('.title.title-4').hasClass("ng-hide")) || $('.pagination li:nth-child(4)').hasClass('active')) { // stop import if (IMATTC) preview bullet is displayed
      thisPlugin.notification('You can not import a mission on this page\nGo back to a previous page');
      return;
    }

    if (scope.mission.definition.waypoints.length > 0) {
      if (!confirm("Your current mission already contains portals/waypoints. Are you sure you want to overwrite these?")) {
        return;
      }
    }

    thisPlugin.resetWaypoints();

    //scope.definition.name = ummState.missionTitle;
    //scope.definition.description = ummState.missionSetDescription;

    // if we have a displayname, we overwrite it.
    if (ummState.missions[selectedMission].missionTitle) {
      scope.mission.definition.name = ummState.missions[selectedMission].missionTitle;
    }

    // if we have a mission description, we overwrite it.
    if (ummState.missions[selectedMission].missionDescription) {
      scope.mission.definition.description = ummState.missions[selectedMission].missionDescription;
    }

    let missingImagesCount = 0;
    for (let portal in ummState.missions[selectedMission].portals) {
      let currentPortal = { ...ummState.missions[selectedMission].portals[portal] }; // Shallow copy so we can remove objective before passing it to addWaypoint
      if (!('imageUrl' in currentPortal) || typeof currentPortal.imageUrl == 'undefined') {
        missingImagesCount++;
        currentPortal.imageUrl = thisPlugin.ummLogo; // if undefined, use the ummLogo by default until page reloads; if null, the portal has no image, keep it that way
      }
      if (currentPortal.imageUrl && currentPortal.imageUrl.match('http:')) {
        currentPortal.imageUrl = currentPortal.imageUrl.replace('http:', 'https:'); // fix warnings: Mixed Content: The page at '<URL>' was loaded over HTTPS, but requested an insecure element '<URL>'
      }
      currentPortal['$$hashKey'] = null;
      currentPortal.isStartPoint = false;
      delete currentPortal.objective; // addWaypoint expects portals without it, has to be added after the fact
      scope.addWaypoint(currentPortal);
    }

    for (let portal in scope.mission.definition.waypoints) {
      // We can't overwrite objective at once, because we need to retain the constructor inside passphrase_params
      scope.mission.definition.waypoints[portal].objective.type = ummState.missions[selectedMission].portals[portal].objective.type;
      scope.mission.definition.waypoints[portal].objective.passphrase_params.question = ummState.missions[selectedMission].portals[portal].objective.passphrase_params.question;
      scope.mission.definition.waypoints[portal].objective.passphrase_params._single_passphrase = ummState.missions[selectedMission].portals[portal].objective.passphrase_params._single_passphrase;
    }

    scope.$apply();


    let angularApp = angular.element(document.getElementsByClassName('container')[0]);
    let angularTimeout = angularApp.injector().get('$timeout');
    angularTimeout(function () {
      if (missingImagesCount > 0) {
        // If there are missing images, refresh as soon as the new import has been saved, otherwise it'll load the old mission data

        thisPlugin.notification('Missing data detected\nRefreshing data to correct the issue. Standby...', true);
        function triggerRefresh() {
          setTimeout(validateRefresh, 200)
        }

        function validateRefresh() {
          let angularApp = angular.element(document.getElementsByClassName('container')[0]);
          let angularHttp = angularApp.injector().get('$http');
          let isMissionSaving = false;
          for (let request of angularHttp.pendingRequests) {
            if (request.url === '/api/author/saveMission') {
              isMissionSaving = true;
            }
          }
          if (scope.pendingSave || isMissionSaving) {
            triggerRefresh();
          } else {
            // When the mission has been saved, refresh it
            thisPlugin.notification('Refreshing mission...', true);
            let scope = thisPlugin.getAngularScope();
            thisPlugin.reloadMAT(scope.mission.mission_id);
          }
        }
        // Wait for a little bit before trigging the first refresh to increase reliability of pending save detection
        setTimeout(triggerRefresh, 200);
      } else {
        thisPlugin.notification('UMM Mission import succesful:\n' + scope.mission.definition.name);
      }
    })
  }

  thisPlugin.reloadMAT = async function (missionId) {
    let angularApp = angular.element(document.getElementsByClassName('container')[0]);
    let angularHttp = angularApp.injector().get('$http');
    let angularApi = angularApp.injector().get('Api');
    let angularTimeout = angularApp.injector().get('$timeout');
    let wireUtil = angularApp.injector().get('WireUtil');
    let styles = angularApp.injector().get('Styles');

    // By using the build in http we don't have to mess with botGuard and it just gets handled by MAT
    angularHttp.post(angularApi.GET_MISSION, { mission_id: missionId }).success(function (data) {

      data = wireUtil.convertMissionWireToLocal(data.mission, data.pois);
      let scope = window.plugin.umm.getAngularScope();

      // Replace mission data with the mission data retrieved from the server
      scope.mission = data;

      // AngularTimeout to fix double $digest issue
      angularTimeout(function () {
        // Replace the markers with the ones retrieved from the server
        // Without this, they become non-interactive

        // waypointMarkerProcessing, copied from MAT r1227
        scope.waypointMarkers = function (a) {
          let d = [];

          // Processing of individual waypoints, copied from MAT r595
          function u(b, d) {
            if (b._poi) {
              var c = "" + (d + 1);
              return {
                id: Math.floor(1E10 * Math.random()),
                location: b._poi.location,
                icon: scope.isWaypointSelected(b) ? styles.SELECTED_WAYPOINT_ICON : styles.WAYPOINT_ICON,
                onClicked: function () {
                  scope.$apply(function () {
                    scope.setSelectedWaypoint(b, !0)
                  })
                },
                options: {
                  labelAnchor: styles.WAYPOINT_LABEL_ANCHOR,
                  labelClass: "waypoint-label",
                  labelContent: c,
                  zIndex: styles.WAYPOINT_MARKER_Z_INDEX
                },
                latitude: b._poi.location.latitude,
                longitude: b._poi.location.longitude
              }
            }
          }
          angular.forEach(a, function (a, b) {
            let c = u(a, b);
            d.push(c)
          })
          return d;
        }(scope.mission.definition.waypoints);
        scope.$apply();
        thisPlugin.notification('UMM Mission import succesful:\n' + scope.mission.definition.name);
      });

    }).catch((error) => {
      // If it fails, we'll just do a hard refresh
      window.alert('Failed to refresh mission, refreshing full page to fix this.')
      window.location.href = window.location.href
    });
  }

  thisPlugin.getAngularScope = function () {
    // Get angular container
    let el = document.getElementsByClassName('container')[0]
    // Get angular element
    let ngEl = angular.element(el);
    // Get angular scope
    let scope = ngEl.scope();
    return scope;
  }

  thisPlugin.resetWaypoints = function () {
    let scope = thisPlugin.getAngularScope();
    // Waypoints are the actual portals that get submitted
    scope.mission.definition.waypoints = [];
    // Waypointmarkers are the markers displayed on the map
    scope.waypointMarkers = [];
    scope.$apply();
  }

  thisPlugin.bindFileImport = function () {
    $("#umm-import-file").bind('change', function (evt) {
      let ummState = thisPlugin.getUmmState();
      if (ummState.missionSetName != undefined && ummState.missionSetName != "") {
        if (!confirm("Are you sure you want to load this file? Doing so will overwrite any previously imported UMM data. Your existing missions will not be affected.")) {
          return;
        }
      }
      $("#umm-mission-title").text("Loading banner... ");
      thisPlugin.loadFile(evt);
    });
  }

  // Insert UMM into mission editor
  thisPlugin.mESetup();
}

var utilitiesScript = document.createElement('script');
utilitiesScript.appendChild(document.createTextNode('(' + ummUtilityFunctionsWrapper + ')();'));
(document.body || document.head || document.documentElement).appendChild(utilitiesScript);

var pluginContent;
if (window.location.host.match(/^intel\.ingress\.com$/i)) {
  let info = {};
  if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
  pluginContent = document.createTextNode('(' + iitcPluginWrapper + ')(' + JSON.stringify(info) + ');');
} else if (window.location.host.match(/^missions\.ingress\.com$/i)) {
  pluginContent = document.createTextNode('(' + missionEditorPluginWrapper + ')();');
}
// inject code into site context
var pluginScript = document.createElement('script');
pluginScript.appendChild(pluginContent);
(document.body || document.head || document.documentElement).appendChild(pluginScript);
