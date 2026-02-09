
(function main() {
    require("styles.pcss");


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

})();


/*

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

*/