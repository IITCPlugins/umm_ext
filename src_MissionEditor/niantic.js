"use strict";
angular.module(
  "MAT",
  "ngRoute google-maps ngSanitize ngAutocomplete angularMoment angularFileUpload ui.select".split(
    " ",
  ),
);
angular.module("MAT").config([
  "$routeProvider",
  "$locationProvider",
  "$httpProvider",
  "VersionKey",
  "Sha1",
  function (a, c, f, d, l) {
    a.when("/", {
      templateUrl: "views/list.html",
      controller: "ListCtrl",
      resolve: {
        missionListResult: [
          "ResolveMissionList",
          function (a) {
            return a();
          },
        ],
      },
    })
      .when("/edit", {
        templateUrl: "views/editor.html",
        controller: "EditorCtrl",
        reloadOnSearch: !1,
        resolve: {
          mission: [
            "ResolveMission",
            function (a) {
              return a();
            },
          ],
          userMapParams: [
            "ResolveUserMapParams",
            function (a) {
              return a();
            },
          ],
          isUserAllowedToSubmitMission: [
            "ResolveIsUserAllowedToSubmitMission",
            function (a) {
              return a();
            },
          ],
        },
      })
      .when("/mission/:missionGuid", {
        templateUrl: "views/mission_profile.html",
        controller: "MissionProfileCtrl",
        resolve: {
          mission: [
            "ResolveMissionProfile",
            function (a) {
              return a();
            },
          ],
        },
      });
    f.interceptors.push("httpInterceptor");
    f.defaults.transformRequest = (function (a, c) {
      a = angular.isArray(a) ? a : [a];
      return a.concat(c);
    })(function (a, c) {
      c()[d] = l;
      return a;
    }, f.defaults.transformRequest);
    c.html5Mode(!0);
    c.hashPrefix("!");
  },
]);
var MissionStates = {
    DRAFT: "DRAFT",
    SUBMITTED: "SUBMITTED",
    PUBLISHED: "PUBLISHED",
    DISABLED: "DISABLED",
  },
  MissionRules = {
    MAX_MISSION_NAME_LENGTH: 50,
    MAX_MISSION_DESCRIPTION_LENGTH: 200,
    MIN_WAYPOINTS: 6,
    MAX_WAYPOINTS: 100,
    MAX_PASSPHRASE_QUESTION_LENGTH: 200,
    MAX_PASSPHRASE_ANSWER_LENGTH: 50,
    MAX_CUSTOM_DESCRIPTION_LENGTH: 500,
    MAX_HIDDEN_LOCATION_CLUE_LENGTH: 200,
  },
  WaypointObjectiveTypes = {
    HACK_PORTAL: "HACK_PORTAL",
    INSTALL_MOD: "INSTALL_MOD",
    CAPTURE_PORTAL: "CAPTURE_PORTAL",
    CREATE_LINK: "CREATE_LINK",
    CREATE_FIELD: "CREATE_FIELD",
    TAKE_PHOTO: "TAKE_PHOTO",
    VIEW_FIELD_TRIP_CARD: "VIEW_FIELD_TRIP_CARD",
    PASSPHRASE: "PASSPHRASE",
  },
  ImageSizes = {
    THUMBNAIL_SIZE_FOR_POI: 40,
    THUMBNAIL_SIZE_FOR_MISSION_LOGO_IN_EDIT_VIEW: 40,
    THUMBNAIL_SIZE_FOR_MISSION_LOGO_IN_LIST_VIEW: 60,
    THUMBNAIL_SIZE_FOR_MISSION_LOGO_IN_OPS_REVIEW: 242,
    THUMBNAIL_SIZE_FOR_MISSION_LOGO_IN_PREVIEW: 74,
    THUMBNAIL_SIZE_FOR_MISSION_LOGO_IN_SEARCH_RESULTS: 120,
  },
  MissionListStateNames = {
    DRAFT: "DRAFT",
    DRAFT_OF_PUBLISHED_MISSION: "DRAFT_OF_PUBLISHED_MISSION",
    PUBLISHED: "PUBLISHED",
    SUBMITTED: "SUBMITTED",
    SUBMITTED_AND_PUBLISHED: "SUBMITTED_AND_PUBLISHED",
  },
  MissionListStates = {
    DRAFT: {
      BUTTON1: {
        title: "Edit Draft",
        description: "Edit draft Mission.",
        onClickFunction: "editMission",
        show: !0,
      },
      BUTTON2: {
        title: "Delete",
        description: "Permanently delete Mission.",
        onClickFunction: "deleteDraftMission",
        show: !0,
      },
      titleSuffix: "(Draft)",
    },
    DRAFT_OF_PUBLISHED_MISSION: {
      BUTTON1: {
        title: "Edit Draft",
        description: "Edit draft (published version will remain).",
        onClickFunction: "editMission",
        show: !0,
      },
      BUTTON2: {
        title: "Discard Draft",
        description: "Discard draft (published version will remain).",
        onClickFunction: "deleteDraftMission",
        show: !0,
      },
      titleSuffix: "(Draft)",
    },
    PUBLISHED: {
      BUTTON1: {
        title: "Edit",
        description:
          "Edit published Mission (edits will require new review and old Mission will remain playable unless unpublished).",
        onClickFunction: "editMission",
        show: !0,
      },
      BUTTON2: {
        title: "Unpublish",
        description:
          "Remove Mission from active play and return it to Draft form.",
        onClickFunction: "unpublishMission",
        show: !0,
      },
      titleSuffix: "",
    },
    SUBMITTED: {
      BUTTON1: { show: !1 },
      BUTTON2: {
        title: "Withdraw",
        description: "Withdraw from review.",
        onClickFunction: "cancelReview",
        show: !0,
      },
      titleSuffix: "(In Review)",
    },
    SUBMITTED_AND_PUBLISHED: {
      BUTTON1: { show: !1 },
      BUTTON2: {
        title: "Withdraw Draft",
        description: "Withdraw draft from review.",
        onClickFunction: "cancelReview",
        show: !0,
      },
      titleSuffix: "(Draft in review)",
    },
  },
  TimeConversionConstants = {
    MINUTE_GRANULARITY_MINUTES: 15,
    HOUR_GRANULARITY_MINUTES: 30,
    DAY_GRANULARITY_HOURS: 24,
    TEMPLATE_MINUTES: " min",
    TEMPLATE_HOURS: " hr",
    TEMPLATE_DAYS_SINGULAR: " day",
    TEMPLATE_DAYS_PLURAL: " days",
    MS_IN_ONE_DAY: 864e5,
    MS_IN_ONE_HOUR: 36e5,
    MISSING_TIME_PLACEHOLDER: "-",
  },
  MissionRevisionCssStrings = {
    REVISED: "revised",
    UNREVISED: "",
    MISSION_IMAGE_REVISED: "mission-image-revised",
    MISSION_IMAGE_UNREVISED: "mission-image",
  },
  MissionPreviewStates = { AUTHOR: "author", OPS: "ops", PROFILE: "profile" };
function safeGoogleMapsPoint(a, c) {
  if (google.maps && google.maps.Point) return new google.maps.Point(a, c);
}
angular
  .module("MAT")
  .value("HeaderText", "My Missions")
  .constant("POITypes", { PORTAL: "PORTAL", FT: "FIELD_TRIP_CARD" })
  .constant("WaypointObjectiveTypes", WaypointObjectiveTypes)
  .constant("MissionStates", MissionStates)
  .constant("MissionRules", MissionRules)
  .constant("MissionListStateNames", MissionListStateNames)
  .constant("MissionListStates", MissionListStates)
  .constant("TimeConversionConstants", TimeConversionConstants)
  .constant("MissionRevisionCssStrings", MissionRevisionCssStrings)
  .constant("ImageSizes", ImageSizes)
  .constant("MissionPreviewStates", MissionPreviewStates)
  .constant("MatErrorKey", "mat_error")
  .constant("VersionKey", "VERSION-SHA1")
  .constant("AddDiffSuffix", "_diff")
  .constant("WaypointObjectives", {
    portal: [
      {
        type: WaypointObjectiveTypes.HACK_PORTAL,
        description: "Hack this Portal",
      },
      {
        type: WaypointObjectiveTypes.INSTALL_MOD,
        description: "Install a mod on this portal",
      },
      {
        type: WaypointObjectiveTypes.CAPTURE_PORTAL,
        description: "Capture or Upgrade Portal",
      },
      {
        type: WaypointObjectiveTypes.CREATE_LINK,
        description: "Create Link from Portal",
      },
      {
        type: WaypointObjectiveTypes.CREATE_FIELD,
        description: "Create Field from Portal",
      },
      {
        type: WaypointObjectiveTypes.PASSPHRASE,
        description: "Enter the passphrase",
      },
    ],
    ft: [
      {
        type: WaypointObjectiveTypes.VIEW_FIELD_TRIP_CARD,
        description: "View this Field Trip Waypoint",
      },
      {
        type: WaypointObjectiveTypes.PASSPHRASE,
        description: "Enter the passphrase",
      },
    ],
  })
  .constant("EditorScreenViews", {
    TYPE: "type",
    NAME: "name",
    WAYPOINTS: "waypoints",
    PREVIEW: "preview",
  })
  .constant("MissionTypes", {
    SEQUENTIAL: "SEQUENTIAL",
    HIDDEN_SEQUENTIAL: "HIDDEN_SEQUENTIAL",
    NON_SEQUENTIAL: "NON_SEQUENTIAL",
  })
  .constant("Styles", {
    WAYPOINT_LABEL_ANCHOR: "21 10",
    POI_MARKER_Z_INDEX: 100,
    WAYPOINT_MARKER_Z_INDEX: 103,
    WAYPOINT_LINE_STROKE_OPTIONS: {
      color: "white",
      weight: 2,
      opacity: 1,
      zIndex: 102,
    },
    FIELDTRIP_ICON: {
      anchor: safeGoogleMapsPoint(13, 8),
      url: "/images/icon_fieldtrip.png",
    },
    SELECTED_FIELDTRIP_ICON: {
      anchor: safeGoogleMapsPoint(13, 8),
      url: "/images/icon_fieldtrip.png",
    },
    PORTAL_ICON: {
      anchor: safeGoogleMapsPoint(13, 13),
      url: "/images/icon_portal.png",
    },
    SELECTED_PORTAL_ICON: {
      anchor: safeGoogleMapsPoint(13, 13),
      url: "/images/icon_portal.png",
    },
    WAYPOINT_ICON: {
      anchor: safeGoogleMapsPoint(17, 17),
      url: "/images/circle_sgl.png",
    },
    SELECTED_WAYPOINT_ICON: {
      anchor: safeGoogleMapsPoint(17, 17),
      url: "/images/circle_dbl.png",
    },
    UNSELECTED_CLUSTER_ICON: { url: "/images/cluster.png" },
    SELECTED_CLUSTER_ICON: { url: "/images/cluster_down.png" },
    PORTAL_ORNAMENT_ICON: {
      anchor: safeGoogleMapsPoint(18, 18),
      url: "/images/icon_portal_ornament.png",
    },
    CLUSTER_MARKER_LABEL_SIZE: 14,
    CLUSTER_MARKER_Z_INDEX: 101,
    GOOGLE_MAP_STYLES: [
      {
        featureType: "all",
        elementType: "all",
        stylers: [
          { visibility: "on" },
          { hue: "#131c1c" },
          { saturation: "-50" },
          { invert_lightness: !0 },
        ],
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [
          { visibility: "on" },
          { hue: "#005eff" },
          { invert_lightness: !0 },
        ],
      },
      { featureType: "poi", stylers: [{ visibility: "off" }] },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [{ visibility: "off" }],
      },
    ],
  })
  .constant("ApiPrefix", "/api/author/")
  .constant("Api", {
    GET_MISSIONS_LIST: "/api/author/getMissionsList",
    GET_USER_MAP_PARAMS: "/api/author/getUserMapParams",
    GET_CLUSTERS: "/api/author/getClusters",
    GET_CLUSTER_DETAILS: "/api/author/getClusterDetails",
    SAVE_MISSION: "/api/author/saveMission",
    SEARCH_POIS: "/api/author/searchPOIs",
    DELETE_DRAFT_MISSION: "/api/author/deleteDraftMission",
    CREATE_DRAFT_MISSION: "/api/author/createDraftMission",
    GET_MISSION: "/api/author/getMission",
    GET_MISSION_FOR_PROFILE: "/api/author/getMissionForProfile",
    IS_USER_ALLOWED_TO_SUBMIT_MISSION:
      "/api/author/isUserAllowedToSubmitMission",
    CANCEL_REVIEW: "/api/author/cancelReview",
    UNPUBLISH_MISSION: "/api/author/unpublishMission",
    GET_TOP_MISSIONS_IN_BOUNDS: "/api/author/getTopMissionsInBounds",
    GET_TOP_MISSIONS_FOR_PORTAL: "/api/author/getTopMissionsForPortal",
  })
  .constant("LogoParams", { MAX_SIZE_BYTES: 4194304, THUMBNAIL_SIZE: 74 })
  .constant("MapParams", {
    MAX_ZOOM: 18,
    AUTO_SEARCH_ZOOM: 18,
    CLUSTER_CLICK_MAX_ZOOM_LEVEL: 12,
    CLUSTER_CLICK_ZOOM_INCREMENT: 2,
  })
  .constant("Languages", [
    { id: "af", name: "Afrikaans" },
    { id: "sq", name: "Albanian" },
    { id: "ar", name: "Arabic" },
    { id: "az", name: "Azerbaijani" },
    { id: "eu", name: "Basque" },
    { id: "bn", name: "Bengali" },
    { id: "be", name: "Belarusian" },
    { id: "bg", name: "Bulgarian" },
    { id: "ca", name: "Catalan" },
    { id: "zh-CN", name: "Chinese Simplified" },
    { id: "zh-TW", name: "Chinese Traditional" },
    { id: "hr", name: "Croatian" },
    { id: "cs", name: "Czech" },
    { id: "da", name: "Danish" },
    { id: "nl", name: "Dutch" },
    { id: "en", name: "English" },
    { id: "eo", name: "Esperanto" },
    { id: "et", name: "Estonian" },
    { id: "tl", name: "Filipino" },
    { id: "fi", name: "Finnish" },
    { id: "fr", name: "French" },
    { id: "gl", name: "Galician" },
    { id: "ka", name: "Georgian" },
    { id: "de", name: "German" },
    { id: "el", name: "Greek" },
    { id: "gu", name: "Gujarati" },
    { id: "ht", name: "Haitian Creole" },
    { id: "iw", name: "Hebrew" },
    { id: "hi", name: "Hindi" },
    { id: "hu", name: "Hungarian" },
    { id: "is", name: "Icelandic" },
    { id: "id", name: "Indonesian" },
    { id: "ga", name: "Irish" },
    { id: "it", name: "Italian" },
    { id: "ja", name: "Japanese" },
    { id: "kn", name: "Kannada" },
    { id: "ko", name: "Korean" },
    { id: "la", name: "Latin" },
    { id: "lv", name: "Latvian" },
    { id: "lt", name: "Lithuanian" },
    { id: "mk", name: "Macedonian" },
    { id: "ms", name: "Malay" },
    { id: "mt", name: "Maltese" },
    { id: "no", name: "Norwegian" },
    { id: "fa", name: "Persian" },
    { id: "pl", name: "Polish" },
    { id: "pt", name: "Portuguese" },
    { id: "ro", name: "Romanian" },
    { id: "ru", name: "Russian" },
    { id: "sr", name: "Serbian" },
    { id: "sk", name: "Slovak" },
    { id: "sl", name: "Slovenian" },
    { id: "es", name: "Spanish" },
    { id: "sw", name: "Swahili" },
    { id: "sv", name: "Swedish" },
    { id: "ta", name: "Tamil" },
    { id: "te", name: "Telugu" },
    { id: "th", name: "Thai" },
    { id: "tr", name: "Turkish" },
    { id: "uk", name: "Ukrainian" },
    { id: "ur", name: "Urdu" },
    { id: "vi", name: "Vietnamese" },
    { id: "cy", name: "Welsh" },
    { id: "yi", name: "Yiddish" },
  ]);
angular.module("MAT").controller("EditorCtrl", [
  "$scope",
  "$http",
  "$location",
  "$timeout",
  "$window",
  "$q",
  "mission",
  "Geolocation",
  "POITypes",
  "Styles",
  "Api",
  "WireUtil",
  "EditorScreenViews",
  "WaypointObjectiveTypes",
  "WaypointObjectives",
  "MissionRules",
  "Validation",
  "LogoParams",
  "userMapParams",
  "isUserAllowedToSubmitMission",
  "MapParams",
  "ImageSizes",
  "ImageUtil",
  "Serializer",
  "MissionPreviewStates",
  "FormatUtil",
  function (
    a,
    c,
    f,
    d,
    l,
    h,
    m,
    n,
    q,
    g,
    p,
    r,
    k,
    t,
    e,
    I,
    A,
    J,
    x,
    K,
    y,
    C,
    D,
    E,
    L,
    F,
  ) {
    function M(a) {
      var e = angular.copy(g.SELECTED_CLUSTER_ICON);
      e.scaledSize = new google.maps.Size(
        a.clusterPixelWidth,
        a.clusterPixelHeight,
      );
      e.anchor = new google.maps.Point(
        0.5 * a.clusterPixelWidth,
        0.5 * a.clusterPixelHeight,
      );
      return e;
    }
    function N(a) {
      var e = angular.copy(g.UNSELECTED_CLUSTER_ICON);
      e.scaledSize = new google.maps.Size(
        a.clusterPixelWidth,
        a.clusterPixelHeight,
      );
      e.anchor = new google.maps.Point(
        0.5 * a.clusterPixelWidth,
        0.5 * a.clusterPixelHeight,
      );
      return e;
    }
    function w(b, e) {
      a.noResults = 0 == b.length ? !0 : !1;
      a.pois = b;
      e
        ? ((a.poiMarkers = angular.copy(a.pois)),
          angular.forEach(a.poiMarkers, function (b, e) {
            b.closeClick = function () {
              a.$apply(function () {
                a.setSelectedPOI(null);
              });
            };
            b.onClicked = function () {
              a.$apply(function () {
                a.setSelectedPOI(b);
              });
            };
            b.id = e;
            b.options = { zIndex: g.POI_MARKER_Z_INDEX };
            b.type == q.FT &&
              ((b.selectedIcon = g.SELECTED_FIELDTRIP_ICON),
              (b.unselectedIcon = g.FIELDTRIP_ICON),
              (b.icon = b.unselectedIcon));
            b.type == q.PORTAL &&
              (b.isOrnamented
                ? ((b.selectedIcon = g.PORTAL_ORNAMENT_ICON),
                  (b.unselectedIcon = g.PORTAL_ORNAMENT_ICON))
                : ((b.selectedIcon = g.SELECTED_PORTAL_ICON),
                  (b.unselectedIcon = g.PORTAL_ICON)),
              (b.icon = b.unselectedIcon));
          }))
        : (a.poiMarkers = []);
    }
    function O(a) {
      var e = google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(
            a.getSouthWest().lat(),
            a.getSouthWest().lng(),
          ),
          new google.maps.LatLng(
            a.getNorthEast().lat(),
            a.getNorthEast().lng(),
          ),
        ),
        e = Math.round(0.5 * e);
      return {
        centerLatE6: Math.round(1e6 * a.getCenter().lat()),
        centerLonE6: Math.round(1e6 * a.getCenter().lng()),
        radius: e,
      };
    }
    function P(b) {
      a.detailsErrors.messages = A.getMissionDetailsErrors(b);
      a.detailsErrors.hasErrors = 0 < a.detailsErrors.messages.length;
      a.waypointErrors.messages = A.getMissionWaypointErrors(b);
      a.waypointErrors.hasErrors = 0 < a.waypointErrors.messages.length;
      b = 0;
      a.waypointErrors.hasErrors &&
        (b = Q + a.waypointErrors.messages.length * R);
      100 < b && (b = 100);
      a.waypointErrors.waypointsFooterStyle = { height: b };
      a.waypointErrors.waypointsPanelStyle = { bottom: b + 10 };
    }
    function u(b, e) {
      if (b._poi) {
        var c = "" + (e + 1);
        return {
          id: Math.floor(1e10 * Math.random()),
          location: b._poi.location,
          icon: a.isWaypointSelected(b)
            ? g.SELECTED_WAYPOINT_ICON
            : g.WAYPOINT_ICON,
          onClicked: function () {
            a.$apply(function () {
              a.setSelectedWaypoint(b, !0);
            });
          },
          options: {
            labelAnchor: g.WAYPOINT_LABEL_ANCHOR,
            labelClass: "waypoint-label",
            labelContent: c,
            zIndex: g.WAYPOINT_MARKER_Z_INDEX,
          },
          latitude: b._poi.location.latitude,
          longitude: b._poi.location.longitude,
        };
      }
    }
    function S() {
      var b = a.map.control.getGMap().getStreetView();
      google.maps.event.addListener(b, "visible_changed", function () {
        a.$apply(function () {
          b.getVisible() ? (a.showMapControls = !1) : (a.showMapControls = !0);
        });
      });
    }
    function G(b) {
      var e = [];
      angular.forEach(b.mission_summaries, function (a) {
        e.push({
          mission_guid: a.mission_guid,
          name: a.name,
          logo_url: a.logo_url,
          completionTime: F.formatDuration(a.median_completion_time),
          rating: F.formatPercent(a.rating),
        });
      });
      e.length ? (a.overlayMissions = e) : (a.overlayNoResults = !0);
      a.overlayLoading = !1;
    }
    a.EditorScreenViews = k;
    a.POITypes = q;
    a.WaypointObjectiveTypes = t;
    a.LogoParams = J;
    a.MapParams = y;
    a.Styles = g;
    a.MissionRules = I;
    a.ImageSizes = C;
    a.ImageUtil = D;
    a.MissionPreviewStates = L;
    a.mission = m;
    a.savedWireMission = null != m ? r.convertMissionLocalToWire(m) : null;
    a.includeFT = !0;
    a.includePortals = !0;
    a.pois = [];
    a.poiMarkers = [];
    a.noResults = !1;
    a.showPOIMarkers = !1;
    a.searchQ = "";
    a.inSearchMode = !1;
    a.inClusterMode = !1;
    a.inAutoSearchMode = null;
    a.showMapControls = !0;
    a.userIsAllowedToSubmitMission = K;
    a.zoomTooCoarse = !1;
    a.overlayMissions = [];
    a.overlayLoading = !1;
    a.overlayNoResults = !1;
    a.overlayPortalTitle = null;
    var v = (a.overlayIsShowingPortalMissions = !1);
    a.map = {
      autocomplete: {
        value: "",
        result: "",
        options: { watchEnter: !0 },
        details: "",
      },
      bounds: {},
      control: {},
      center: { latitude: x.lat, longitude: x.lng },
      zoom: x.zoom,
      options: {
        panControl: !1,
        streetViewControl: !0,
        mapTypeControl: !0,
        mapTypeControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM,
        },
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER,
        },
        styles: g.GOOGLE_MAP_STYLES,
        maxZoom: y.MAX_ZOOM,
      },
      events: {
        click: function (b, e, c) {
          a.$apply(function () {
            a.inClusterMode && a.clearResults();
            a.selectedWaypoint && a.setSelectedWaypoint(null);
          });
        },
        idle: function (b, e, c) {
          a.$apply(function () {
            a.pendingRefresh && d.cancel(a.pendingRefresh);
            a.startImmediateQuery
              ? a.$apply(function () {
                  a.startImmediateQuery = !1;
                  a.refreshMap();
                })
              : (a.pendingRefresh = d(function () {
                  a.refreshMap();
                }, 300));
            a.initialMapBoundRun ||
              (a.maybeSetMapBoundsFromWaypoints(),
              S(),
              (a.initialMapBoundRun = !0));
          });
        },
      },
    };
    a.mission
      ? a.mission.ui || (a.mission.ui = { view: k.WAYPOINTS })
      : (a.mission = r.getNewMission());
    a.pendingSave = null;
    a.$watch(
      "mission.definition",
      function (b) {
        P(b);
        a.saved = !1;
        a.pendingSave && d.cancel(a.pendingSave);
        a.pendingSave = d(function () {
          a.shouldSaveMissionDraft() && (a.save(), (a.pendingSave = null));
        }, 2e3);
      },
      !0,
    );
    var z = E.Create(),
      H = E.Create();
    a.setSequential = function (b) {
      a.mission.definition._sequential = b;
    };
    a.IsViewComplete = function (b) {
      var e = a.mission.ui.view;
      switch (b) {
        case k.TYPE:
          return e == k.NAME || e == k.WAYPOINTS || e == k.PREVIEW;
        case k.NAME:
          return e == k.WAYPOINTS || e == k.PREVIEW;
        case k.WAYPOINTS:
          return e == k.PREVIEW;
      }
      return !1;
    };
    a.IsViewActive = function (b) {
      return a.mission.ui.view == b;
    };
    a.bulletSetView = function (b) {
      var e = !0;
      switch (b) {
        case k.NAME:
          e = a.isTypeValid();
          break;
        case k.WAYPOINTS:
          e = a.isTypeValid() && !a.detailsErrors.hasErrors;
          break;
        case k.PREVIEW:
          e =
            a.isTypeValid() &&
            !a.detailsErrors.hasErrors &&
            !a.waypointErrors.hasErrors;
      }
      e && a.setView(b);
    };
    a.setView = function (b) {
      a.pendingSave && (d.cancel(a.pendingSave), (a.pendingSave = null));
      a.save(b);
    };
    a.addWaypoint = function (b) {
      b = r.getNewWaypoint(b);
      a.mission.definition.waypoints.push(b);
      a.clearResults();
      var e = u(b, a.mission.definition.waypoints.length - 1);
      a.waypointMarkers.push(e);
      a.setSelectedWaypoint(b, !0);
    };
    a.removeWaypoint = function (b) {
      a.mission.definition.waypoints.splice(b, 1);
      for (a.waypointMarkers.splice(b, 1); b < a.waypointMarkers.length; b++)
        a.waypointMarkers[b] = u(a.mission.definition.waypoints[b], b);
    };
    a.changeWaypointPosition = function (b, e) {
      var c = a.mission.definition.waypoints[b];
      a.mission.definition.waypoints.splice(b, 1);
      a.mission.definition.waypoints.splice(e, 0, c);
      a.waypointMarkers[b] = u(a.mission.definition.waypoints[b], b);
      a.waypointMarkers[e] = u(a.mission.definition.waypoints[e], e);
    };
    a.moveWaypointUp = function (b) {
      a.changeWaypointPosition(b, b - 1);
    };
    a.moveWaypointDown = function (b) {
      a.changeWaypointPosition(b, b + 1);
    };
    a.scrollToWaypoint = function (b) {
      var e = jQuery("#waypoint-0");
      b = a.mission.definition.waypoints.indexOf(b);
      b = jQuery("#waypoint-" + b);
      jQuery("#waypoints").scrollTop(b.offset().top - e.offset().top);
    };
    a.getWaypointObjectiveOptions = function (a) {
      if (a._poi.type == q.PORTAL) return e.portal;
      if (a._poi.type == q.FT) return e.ft;
    };
    a.getWaypointObjectiveDescription = function (b) {
      var e;
      angular.forEach(a.getWaypointObjectiveOptions(b), function (a) {
        b.objective.type == a.type && (e = a.description);
      });
      return e;
    };
    a.locateMe = function () {
      a.locating = !0;
      n.Geolocate().then(
        function (b) {
          a.locating = !1;
          a.map.center = {
            latitude: b.coords.latitude,
            longitude: b.coords.longitude,
          };
          a.map.zoom = 15;
        },
        function (b) {
          a.locating = !1;
        },
      );
    };
    a.maybeSetMapBoundsFromWaypoints = function () {
      if (0 != a.mission.definition.waypoints.length) {
        var b = new google.maps.LatLngBounds();
        angular.forEach(a.mission.definition.waypoints, function (a) {
          b.extend(
            new google.maps.LatLng(
              a._poi.location.latitude,
              a._poi.location.longitude,
            ),
          );
        });
        a.map.control.getGMap().fitBounds(b);
        return b;
      }
    };
    a.goToPoint = function () {
      var b = n.CheckIfStringIsLatLng(a.map.autocomplete.value);
      null !== b &&
        ((a.map.center = b),
        (a.map.zoom = 15),
        (a.map.autocomplete.value = ""),
        a.clearResults());
    };
    a.$watch("map.autocomplete.details", function (b) {
      null == b
        ? a.goToPoint()
        : b.geometry &&
          (b.geometry.location &&
            (a.map.center = {
              latitude: b.geometry.location.lat(),
              longitude: b.geometry.location.lng(),
            }),
          b.geometry.viewport
            ? (a.map.bounds = {
                northeast: {
                  latitude: b.geometry.viewport.getNorthEast().lat(),
                  longitude: b.geometry.viewport.getNorthEast().lng(),
                },
                southwest: {
                  latitude: b.geometry.viewport.getSouthWest().lat(),
                  longitude: b.geometry.viewport.getSouthWest().lng(),
                },
              })
            : (a.map.zoom = 15),
          (a.map.autocomplete.value = ""));
    });
    a.getClusters = function () {
      if (a.includeFT || a.includePortals) {
        a.setSelectedWaypoint(null);
        var b = a.map.zoom;
        (1 >= b && a.getClustersParams && a.getClustersParams.level == b) ||
          ((a.getClustersParams = {
            includeFT: a.includeFT,
            includePortals: a.includePortals,
            level: b,
          }),
          a.map.bounds.northeast &&
            (angular.extend(a.getClustersParams, {
              northLat: a.map.bounds.northeast.latitude,
              eastLng: a.map.bounds.northeast.longitude,
              southLat: a.map.bounds.southwest.latitude,
              westLng: a.map.bounds.southwest.longitude,
            }),
            c.post(p.GET_CLUSTERS, a.getClustersParams).success(
              z.Serialize(function (b) {
                a.clusters = b.clusters;
                angular.forEach(a.clusters, function (b) {
                  b.closeClick = function () {
                    a.$apply(function () {
                      a.clearResults();
                    });
                  };
                  b.onClicked = function () {
                    a.$apply(function () {
                      a.setSelectedCluster(b);
                    });
                  };
                  1 == b.count && 1 == b.ftCount
                    ? ((b.selectedIcon = g.SELECTED_FIELDTRIP_ICON),
                      (b.unselectedIcon = g.FIELDTRIP_ICON),
                      (b.icon = b.unselectedIcon),
                      (b.options = { zIndex: g.POI_MARKER_Z_INDEX }))
                    : 1 == b.count && 1 == b.portalCount
                      ? (b.the_only_poi && b.the_only_poi.isOrnamented
                          ? ((b.selectedIcon = g.PORTAL_ORNAMENT_ICON),
                            (b.unselectedIcon = g.PORTAL_ORNAMENT_ICON))
                          : ((b.selectedIcon = g.SELECTED_PORTAL_ICON),
                            (b.unselectedIcon = g.PORTAL_ICON)),
                        (b.icon = b.unselectedIcon),
                        (b.options = { zIndex: g.POI_MARKER_Z_INDEX }))
                      : ((b.unselectedIcon = N(b)),
                        (b.selectedIcon = M(b)),
                        (b.icon = b.unselectedIcon),
                        (b.labelContent =
                          1e6 < b.count
                            ? Math.floor(b.count / 1e6) + "M"
                            : 1e3 < b.count
                              ? Math.floor(b.count / 1e3) + "K"
                              : b.count),
                        (b.options = {
                          labelAnchor:
                            b.clusterPixelWidth / 2 +
                            " " +
                            g.CLUSTER_MARKER_LABEL_SIZE / 2,
                          labelClass: "cluster-label",
                          labelContent: b.labelContent,
                          labelStyle: {
                            width: b.clusterPixelWidth + "px",
                            "font-size": g.CLUSTER_MARKER_LABEL_SIZE + "px",
                          },
                          zIndex: g.CLUSTER_MARKER_Z_INDEX,
                        }));
                });
              }),
            )));
      } else a.clusters = [];
    };
    a.setSelectedCluster = function (b) {
      a.setSelectedPOI(null);
      a.selectedCluster &&
        (a.selectedCluster.icon = a.selectedCluster.unselectedIcon);
      a.selectedCluster = b;
      a.selectedCluster &&
        ((a.selectedCluster.icon = a.selectedCluster.selectedIcon),
        (a.inClusterMode = !0));
      a.inSearchMode = !1;
      a.getClusterDetails();
      a.nextCursor = null;
    };
    a.getClusterDetails = function (b) {
      a.selectedCluster &&
        (a.includeFT || a.includePortals
          ? ((a.getClusterDetailsParams = {
              id: a.selectedCluster.id,
              limit: 10,
              cursor: b ? b : "",
              includeFT: a.includeFT,
              includePortals: a.includePortals,
            }),
            c.post(p.GET_CLUSTER_DETAILS, a.getClusterDetailsParams).success(
              z.Serialize(function (e) {
                a.zoomTooCoarse = e.zoom_too_coarse;
                a.zoomTooCoarse
                  ? (w([]), (a.hasMoreResults = !1))
                  : ((a.startIndex = b ? a.startIndex + a.pois.length : 1),
                    w(e.pois, !1),
                    1 == a.pois.length && a.setSelectedPOI(a.pois[0]),
                    (a.totalPOIs = a.selectedCluster.count),
                    (a.nextCursor = e.cursor),
                    (a.hasMoreResults = e.more),
                    (a.showPOIMarkers = !1));
              }),
            ))
          : (w([]), (a.hasMoreResults = !1)));
    };
    a.clusterEvents = {
      dblclick: function (b, e, c) {
        a.map.zoom++;
      },
    };
    a.searchPOIsFromSearchBox = function (b) {
      a.inSearchMode = !0;
      a.searchPOIsParams = {
        q: a.searchQ,
        includeFT: a.includeFT,
        includePortals: a.includePortals,
        limit: 10,
        cursor: b ? b : "",
      };
      a.searchPOIs(b);
    };
    a.searchPOIsFromAutoSearch = function (b) {
      a.clusters = [];
      a.searchPOIsParams = {
        q: "",
        includeFT: a.includeFT,
        includePortals: a.includePortals,
        limit: 1e3,
        cursor: b ? b : "",
      };
      a.searchPOIs(b);
    };
    a.searchPOIs = function (b) {
      a.includeFT || a.includePortals
        ? ((a.inClusterMode = !1),
          (a.zoomTooCoarse = !1),
          a.setSelectedPOI(null),
          a.setSelectedWaypoint(null),
          2 < a.map.zoom &&
            angular.extend(
              a.searchPOIsParams,
              O(a.map.control.getGMap().getBounds()),
            ),
          c.post(p.SEARCH_POIS, a.searchPOIsParams).success(
            z.Serialize(function (e) {
              a.startIndex = b ? a.startIndex + a.pois.length : 1;
              w(e.pois, !0);
              a.totalPOIs = e.total;
              a.nextCursor = e.cursor;
              a.hasMoreResults = e.more;
              a.showPOIMarkers = !0;
            }),
          ))
        : (w([]), (a.hasMoreResults = !1));
    };
    a.clearResults = function () {
      a.searchQ = "";
      a.nextCursor = null;
      a.pois = [];
      a.poiMarkers = [];
      a.noResults = !1;
      a.inSearchMode = !1;
      a.inClusterMode = !1;
      a.hasMoreResults = !1;
      a.setSelectedPOI(null);
      a.setSelectedCluster(null);
      a.refreshMap();
    };
    a.setSelectedPOI = function (b) {
      a.selectedPOI && (a.selectedPOI.icon = a.selectedPOI.unselectedIcon);
      a.selectedPOI = b;
      a.selectedPOI && (a.selectedPOI.icon = a.selectedPOI.selectedIcon);
    };
    a.toggleSelectedPOI = function (b) {
      a.selectedPOI = a.selectedPOI == b ? null : b;
    };
    a.isPOISelected = function (b) {
      return a.selectedPOI && a.selectedPOI.guid == b.guid;
    };
    a.setSelectedWaypoint = function (b, e) {
      var c = a.selectedWaypoint;
      a.selectedWaypoint = b;
      if (c != b) {
        if (c) {
          var f = a.mission.definition.waypoints.indexOf(c);
          a.waypointMarkers[f] = u(c, f);
        }
        a.selectedWaypoint &&
          ((f = a.mission.definition.waypoints.indexOf(a.selectedWaypoint)),
          (a.waypointMarkers[f] = u(a.selectedWaypoint, f)));
      }
      e &&
        d(function () {
          a.scrollToWaypoint(b);
        }, 10);
    };
    a.isWaypointSelected = function (b) {
      return a.selectedWaypoint == b;
    };
    a.setAutoSearchMode = function () {
      a.inSearchMode
        ? (a.inAutoSearchMode = !1)
        : a.map.zoom >= y.AUTO_SEARCH_ZOOM
          ? (a.inAutoSearchMode = !0)
          : (a.inAutoSearchMode &&
              ((a.showPOIMarkers = !1), (a.poiMarkers = [])),
            (a.inAutoSearchMode = !1));
    };
    a.refreshMap = function () {
      a.setAutoSearchMode();
      a.zoomTooCoarse = !1;
      a.inSearchMode
        ? a.searchPOIsFromSearchBox()
        : a.inAutoSearchMode
          ? a.searchPOIsFromAutoSearch()
          : a.getClusters();
      v &&
        !a.overlayIsShowingPortalMissions &&
        a.fetchMissionsInCurrentBounds();
    };
    a.getMoreSearchResults = function () {
      a.searchPOIsFromSearchBox(a.nextCursor);
    };
    a.getMoreClusterPOIResults = function () {
      a.getClusterDetails(a.nextCursor);
    };
    a.getImageThumbnail = function (a, e) {
      e || (e = 64);
      return a ? (0 == a.indexOf("http://lh") ? a + "=s" + e : a) : a;
    };
    a.goBack = function () {
      a.mission.ui.view == k.NAME
        ? a.setView(k.TYPE)
        : a.mission.ui.view == k.WAYPOINTS
          ? a.setView(k.NAME)
          : a.mission.ui.view == k.PREVIEW && a.setView(k.WAYPOINTS);
    };
    a.goNext = function () {
      a.mission.ui.view == k.TYPE
        ? a.setView(k.NAME)
        : a.mission.ui.view == k.NAME
          ? a.setView(k.WAYPOINTS)
          : a.mission.ui.view == k.WAYPOINTS
            ? a.setView(k.PREVIEW)
            : a.mission.ui.view == k.PREVIEW && a.submitMission();
    };
    a.isTypeValid = function () {
      return (
        1 == a.mission.definition._sequential ||
        0 == a.mission.definition._sequential
      );
    };
    a.canGoToNext = function () {
      if (a.mission.ui.view == k.TYPE) return a.isTypeValid();
      if (a.mission.ui.view == k.NAME) return !a.detailsErrors.hasErrors;
      if (a.mission.ui.view == k.WAYPOINTS) return !a.waypointErrors.hasErrors;
      if (a.mission.ui.view == k.PREVIEW) return a.userIsAllowedToSubmitMission;
    };
    a.getPoiThumbnail = function (a) {
      if (a.imageUrl) {
        var e = a.imageUrl.search(/panoramio.com/),
          c = a.imageUrl.search(/=s/);
        return 0 <= e || 0 <= c ? a.imageUrl : a.imageUrl + "=s40-c";
      }
      return "";
    };
    a.getMissionThumbnail = function (a) {
      return D.getMissionLogoAtSize(
        a,
        C.THUMBNAIL_SIZE_FOR_MISSION_LOGO_IN_EDIT_VIEW,
      );
    };
    a.submitMission = function () {
      var b = r.convertMissionLocalToWire(a.mission),
        e = angular.copy(b);
      e.submit = !0;
      a.saving = !0;
      a.savingFailed = !1;
      a.saved = !1;
      c.post(p.SAVE_MISSION, e)
        .success(function (e) {
          a.saving = !1;
          a.saved = !0;
          a.savedWireMission = b;
          f.url("/");
        })
        .error(function (b) {
          a.saving = !1;
          a.savingFailed = !0;
        });
    };
    a.save = function (b) {
      if (a.mission.ui.view != k.PREVIEW || b) {
        var e = r.convertMissionLocalToWire(a.mission);
        a.saving = !0;
        a.savingFailed = !1;
        a.saved = !1;
        return c
          .post(p.SAVE_MISSION, e)
          .success(function (c) {
            a.saving = !1;
            a.saved = !0;
            a.mission.mission_id = c.mission_id;
            a.savedWireMission = e;
            a.savedWireMission.mission_id = c.mission_id;
            a.mission.mission_guid = c.mission_guid;
            a.savedWireMission.mission_guid = c.mission_guid;
            f.search().id || f.search("id", a.mission.mission_id);
            b && (a.mission.ui.view = b);
          })
          .error(function (e) {
            a.saving = !1;
            a.savingFailed = !0;
            b && (a.mission.ui.view = b);
          });
      }
    };
    a.needsExitConfirmation = function () {
      if (!a.savedWireMission) return a.shouldSaveMissionDraft() ? !0 : !1;
      var b = r.convertMissionLocalToWire(a.mission);
      return _.isEqual(a.savedWireMission.definition, b.definition) ? !1 : !0;
    };
    a.shouldSaveMissionDraft = function () {
      return (1 != a.mission.definition._sequential &&
        0 != a.mission.definition._sequential) ||
        !a.mission.definition.name.length
        ? !1
        : !0;
    };
    a.shouldShowBack = function () {
      return a.mission.ui.view != k.TYPE;
    };
    a.logoUploadSuccess = function (b) {
      b.data.error
        ? l.alert(b.data.error)
        : ((a.mission.definition.logo_url = b.data.logo_url),
          (a.mission.definition.badge_url = b.data.badge_url));
    };
    a.logoUploadFailure = function (a) {};
    a.ensureMissionHasGuid = function () {
      var b = h.defer();
      a.mission.mission_guid
        ? b.resolve()
        : a.save().then(
            function () {
              b.resolve();
            },
            function () {
              b.reject();
            },
          );
      return b.promise;
    };
    a.detailsErrors = { messages: [], hasErrors: !1 };
    a.waypointErrors = {
      messages: [],
      hasErrors: !1,
      waypointsFooterStyle: {},
      waypointsPanelStyle: {},
    };
    var Q = 25,
      R = 19;
    a.shouldShowWaypointList = function () {
      return a.inSearchMode
        ? !1
        : a.inClusterMode
          ? 1 == a.pois.length
            ? !0
            : !1
          : !0;
    };
    a.closePOIPreviewWindow = function () {
      a.setSelectedPOI(null);
      a.inClusterMode && 1 == a.selectedCluster.count && (a.inClusterMode = !1);
    };
    a.waypointMarkers = (function (a) {
      var e = [];
      angular.forEach(a, function (a, b) {
        var c = u(a, b);
        e.push(c);
      });
      return e;
    })(a.mission.definition.waypoints);
    a.doAutocompleteSearch = function () {
      n.GetAutocompleteResult(jQuery("#autocomplete"), function (b) {
        null == b ? a.goToPoint() : (a.map.autocomplete.details = b);
      });
    };
    a.toggleMissionOverlay = function () {
      v || a.fetchMissionsInCurrentBounds();
      v = !v;
    };
    a.shouldShowMissionOverlay = function () {
      return a.mission.ui.view != k.WAYPOINTS ? !1 : v;
    };
    a.showMissionProfile = function (a) {
      l.open("/mission/" + a, "_blank");
    };
    a.showTopMissionsForPortal = function (b, e) {
      a.overlayLoading = !0;
      a.overlayNoResults = !1;
      a.overlayIsShowingPortalMissions = !0;
      a.overlayPortalTitle = e;
      a.overlayMissions = [];
      c.post(p.GET_TOP_MISSIONS_FOR_PORTAL, { portalGuid: b }).success(
        H.Serialize(G),
      );
      v = !0;
    };
    a.fetchMissionsInCurrentBounds = function () {
      a.overlayLoading = !0;
      a.overlayNoResults = !1;
      a.overlayIsShowingPortalMissions = !1;
      a.overlayPortalTitle = null;
      a.overlayMissions = [];
      var b = a.map.bounds.northeast,
        e = a.map.bounds.southwest;
      c.post(p.GET_TOP_MISSIONS_IN_BOUNDS, {
        eastLng: b.longitude,
        southLat: e.latitude,
        westLng: e.longitude,
        northLat: b.latitude,
      }).success(H.Serialize(G));
    };
  },
]);
angular.module("MAT").controller("ListCtrl", [
  "$scope",
  "$filter",
  "$http",
  "$location",
  "$window",
  "$route",
  "FormatUtil",
  "MissionListStateNames",
  "MissionListStates",
  "MissionStates",
  "MissionTypes",
  "Api",
  "missionListResult",
  function (a, c, f, d, l, h, m, n, q, g, p, r, k) {
    function t(e) {
      if (e.has_draft)
        return e.has_published
          ? a.missionListStateNames.DRAFT_OF_PUBLISHED_MISSION
          : a.missionListStateNames.DRAFT;
      if (e.has_published && e.has_submitted)
        return a.missionListStateNames.SUBMITTED_AND_PUBLISHED;
      if (e.has_published) return a.missionListStateNames.PUBLISHED;
      if (e.has_submitted) return a.missionListStateNames.SUBMITTED;
    }
    a.missionStates = g;
    a.missionListStateNames = n;
    a.missionListStates = q;
    a.missions = (function () {
      var a = [];
      angular.forEach(k.missionLists, function (c) {
        var d;
        angular.forEach(c, function (a) {
          d || (d = a);
          a.state == g.DRAFT &&
            ((d.has_draft = !0),
            d.draft_mission_id || (d.draft_mission_id = a.mission_id));
          a.state == g.PUBLISHED &&
            ((d.has_published = !0),
            (d.published_timestamp_ms = a.published_timestamp_ms),
            a.stats && (d.stats = a.stats));
          a.state == g.SUBMITTED &&
            ((d.has_submitted = !0),
            d.submitted_mission_id || (d.submitted_mission_id = a.mission_id));
        });
        d.missionListState = t(d);
        a.push(d);
      });
      return a;
    })();
    a.createNewMission = function () {
      d.path("/edit");
    };
    a.editMission = function (a) {
      a.draft_mission_id
        ? d.path("/edit").search("id", a.draft_mission_id)
        : a.submitted_mission_id
          ? f
              .post(r.CREATE_DRAFT_MISSION, {
                mission_id: a.submitted_mission_id,
              })
              .success(function (a) {
                d.path("/edit").search("id", a.mission_id);
              })
          : a.mission_guid &&
            f
              .post(r.CREATE_DRAFT_MISSION, { mission_guid: a.mission_guid })
              .success(function (a) {
                d.path("/edit").search("id", a.mission_id);
              });
    };
    a.deleteDraftMission = function (a) {
      confirm(
        "Warning: This action permanently deletes the mission from DataStore and cannot be undone! Are you sure you want to proceed? Click okay to confirm mission deletion.",
      ) &&
        f
          .post(r.DELETE_DRAFT_MISSION, { mission_id: a.draft_mission_id })
          .success(function (a) {
            h.reload();
          })
          .error(function (a) {});
    };
    a.unpublishMission = function (a) {
      confirm(
        "Are you sure you want to proceed? Click okay to unpublish mission.",
      ) &&
        f
          .post(r.UNPUBLISH_MISSION, { mission_guid: a.mission_guid })
          .success(function (a) {
            h.reload();
          })
          .error(function (a) {});
    };
    a.cancelReview = function (a) {
      confirm(
        "Are you sure you want to proceed? Click okay to cancel review.",
      ) &&
        f
          .post(r.CANCEL_REVIEW, { mission_id: a.submitted_mission_id })
          .success(function (a) {
            h.reload();
          })
          .error(function (a) {});
    };
    a.getMissionLogo = function (a) {
      return a.definition.logo_url
        ? a.definition.logo_url + "=s60-c"
        : "/images/button_logo.png";
    };
    a.getMissionTimeString = function (a) {
      return m.formatDuration(a.stats ? a.stats.median_completion_time : null);
    };
    a.getMissionRatingString = function (a) {
      return m.formatPercent(a.stats ? a.stats.rating : null);
    };
    a.getButton1Title = function (e) {
      return a.missionListStates[e.missionListState].BUTTON1.title;
    };
    a.getButton1Description = function (e) {
      return a.missionListStates[e.missionListState].BUTTON1.description;
    };
    a.getButton2Title = function (e) {
      return a.missionListStates[e.missionListState].BUTTON2.title;
    };
    a.getButton2Description = function (e) {
      return a.missionListStates[e.missionListState].BUTTON2.description;
    };
    a.getInfoTitleSuffix = function (e) {
      return a.missionListStates[e.missionListState].titleSuffix;
    };
    a.button1Clicked = function (e) {
      a[a.missionListStates[e.missionListState].BUTTON1.onClickFunction].apply(
        l,
        [e],
      );
    };
    a.button2Clicked = function (e) {
      a[a.missionListStates[e.missionListState].BUTTON2.onClickFunction].apply(
        l,
        [e],
      );
    };
    a.getInfoTime = function (e) {
      var d = c("date")(e.modified_ms, "M.d.yyyy, h:mm a"),
        f = c("date")(e.published_timestamp_ms, "M.d.yyyy, h:mm a");
      switch (e.missionListState) {
        case a.missionListStateNames.DRAFT:
          return "Edited " + d;
        case a.missionListStateNames.DRAFT_OF_PUBLISHED_MISSION:
          return "Edited " + d + "&nbsp;&nbsp;&nbsp&nbsp;Published " + f;
        case a.missionListStateNames.SUBMITTED:
          return "Submitted " + d;
        case a.missionListStateNames.PUBLISHED:
          return "Published " + f;
        case a.missionListStateNames.SUBMITTED_AND_PUBLISHED:
          return "Edited " + d + "&nbsp;&nbsp;&nbsp&nbsp;Published " + f;
      }
    };
    a.shouldShowButton1 = function (e) {
      return a.missionListStates[e.missionListState].BUTTON1.show;
    };
    a.shouldShowButton2 = function (e) {
      return a.missionListStates[e.missionListState].BUTTON2.show;
    };
    a.shouldShowHr = function (e) {
      return a.shouldShowButton1(e) && a.shouldShowButton2(e);
    };
    a.getMissionType = function (a) {
      switch (a.definition.mission_type) {
        case p.SEQUENTIAL:
          return "Sequential";
        case p.HIDDEN_SEQUENTIAL:
          return "Sequential: Hidden";
        case p.NON_SEQUENTIAL:
          return "Any Order";
      }
    };
  },
]);
angular.module("MAT").controller("MainCtrl", [
  "$scope",
  "$rootScope",
  "$location",
  "$window",
  "$route",
  "HeaderText",
  function (a, c, f, d, l, h) {
    a.init = function (f) {
      a.user = angular.fromJson(d.atob(f));
      a.headerText = h;
      c.botguardInstance = new d.BotGuard();
      c.botguardInstance.init(B, CS);
    };
    a.$on("$viewContentLoaded", function (a) {
      d._gaq && d._gaq.push(["_trackPageview", f.path()]);
    });
  },
]);
angular.module("MAT").controller("MissionProfileCtrl", [
  "$scope",
  "mission",
  "MissionPreviewStates",
  "IntelMapMissionUrlPrefix",
  function (a, c, f, d) {
    a.mission = c;
    a.MissionPreviewStates = f;
    a.getIntelMapLinkUrl = function (a) {
      return d + a.definition.guid;
    };
  },
]);
var nemesis = { missionAuthor: {} };
nemesis.missionAuthor.data = {};
nemesis.missionAuthor.data.Location = function () {};
nemesis.missionAuthor.data.Mission = function () {};
nemesis.missionAuthor.data.MissionHistory = function () {
  this.flatMissionHistory = {};
};
nemesis.missionAuthor.data.MissionSummaries = function () {};
nemesis.missionAuthor.data.MissionSummary = function () {};
nemesis.missionAuthor.data.Poi = function () {
  this.location = {};
};
nemesis.missionAuthor.data.PoiCluster = function () {
  this.more = this.zoom_too_coarse = !1;
};
nemesis.missionAuthor.data.PoiClusterSummary = function () {
  this.portalCount = this.ftCount = this.count = 0;
};
nemesis.missionAuthor.data.UserMapParams = function () {};
nemesis.missionAuthor.data.Waypoint = function () {};
angular.module("MAT").directive("confirmExit", function () {
  return {
    scope: { callback: "&confirmCallback", message: "=confirmMessage" },
    link: function (a, c, f) {
      window.onbeforeunload = function () {
        return a.callback() ? a.message : null;
      };
      a.$on("$locationChangeStart", function (c, f, h) {
        a.callback() &&
          (confirm(a.message + "\n\nDo you want to leave the page?") ||
            c.preventDefault());
      });
    },
  };
});
angular.module("MAT").directive("httpHandler", function () {
  return {
    restrict: "A",
    replace: !1,
    scope: {},
    templateUrl: "views/http_handler.html",
    controller: [
      "$scope",
      "$window",
      "$element",
      "$attrs",
      "$transclude",
      "$rootScope",
      "MatErrorKey",
      function (a, c, f, d, l, h, m) {
        h.$on("event:applicationError", function (c, d) {
          a.errorTitle = d.data[m].title;
          a.errorDescription = d.data[m].description;
          a.isAuthenticationError = "Authentication Error" === a.errorTitle;
          f.find(".mat-application-error-modal").modal("show");
        });
        f.find(".mat-application-error-modal").on(
          "hidden.bs.modal",
          function () {
            a.isAuthenticationError && (c.location.href = "/login");
          },
        );
        h.$on("event:responseError", function (c, d) {
          a.errorCode = d.status;
          a.errorHTML = d.data;
          f.find(".mat-uncaught-error-modal").modal("show");
        });
        a.hasPendingRequests = function () {
          return 0 < h.pendingAPIRequests;
        };
      },
    ],
    link: function (a, c, f, d) {},
  };
});
angular.module("MAT").directive("missionLogoUpload", function () {
  return {
    restrict: "A",
    replace: !1,
    scope: { error: "=", success: "=", mission: "=", prePost: "=" },
    templateUrl: "views/logo_upload.html",
    controller: [
      "$scope",
      "$element",
      "$attrs",
      "$transclude",
      "$upload",
      "$q",
      "LogoParams",
      function (a, c, f, d, l, h, m) {
        function n(c) {
          angular.forEach(c, function (c, d) {
            l.upload({
              url: "/logo_upload/",
              file: c,
              data: { missionGuid: a.mission.mission_guid },
            }).then(a.success, a.error);
          });
        }
        a.LogoParams = m;
        a.clearLogo = function () {
          a.mission.definition.logo_url = "";
          a.mission.definition.badge_url = "";
        };
        a.uploadFile = function (c) {
          var d = [];
          angular.forEach(c, function (c, f) {
            c.size > a.maxSize && angular.isDefined(a.error)
              ? a.error(
                  "File too large (" +
                    Math.floor(a.maxSize / 1048576) +
                    "MB limit).",
                )
              : d.push(c);
          });
          0 < d.length &&
            (angular.isFunction(a.prePost)
              ? a.prePost().then(function () {
                  n(d);
                })
              : n(d));
        };
      },
    ],
    link: function (a, c, f, d, l) {
      a.acceptedTypes = f.accept;
      a.maxSize = parseInt(f.maxSize || a.LogoParams.MAX_SIZE_BYTES, 10);
    },
  };
});
angular.module("MAT").directive("missionHistory", function () {
  return {
    restrict: "A",
    replace: !0,
    scope: { history: "=" },
    templateUrl: "views/mission_history.html",
    controller: "MissionHistoryCtrl",
    link: function (a, c, f, d) {},
  };
});
angular.module("MAT").directive("previewMission", function () {
  return {
    restrict: "A",
    replace: !0,
    scope: { mission: "=", missionPreviewState: "=" },
    templateUrl: "views/preview_mission.html",
    controller: [
      "$scope",
      "POITypes",
      "WaypointObjectives",
      "WaypointObjectiveTypes",
      "MapParams",
      "LogoParams",
      "AddDiffSuffix",
      "Styles",
      "MissionRevisionCssStrings",
      "FormatUtil",
      "ImageSizes",
      "ImageUtil",
      "MissionPreviewStates",
      function (a, c, f, d, l, h, m, n, q, g, p, r, k) {
        function t() {
          return a.missionPreviewState == a.MissionPreviewStates.PROFILE;
        }
        a.LogoParams = h;
        a.WaypointObjectiveTypes = d;
        a.Styles = n;
        a.AddDiffSuffix = m;
        a.MissionRevisionCssStrings = q;
        a.FormatUtil = g;
        a.ImageUtil = r;
        a.ImageSizes = p;
        a.MissionPreviewStates = k;
        a.getWaypointObjectiveDescription = function (e) {
          var c = "";
          angular.forEach(a.getWaypointObjectiveOptions(e), function (a) {
            e.objective && e.objective.type == a.type && (c = a.description);
          });
          return c;
        };
        a.getWaypointObjectiveOptions = function (a) {
          if (a._poi.type == c.PORTAL) return f.portal;
          if (a._poi.type == c.FT) return f.ft;
        };
        a.getMissionThumbnail = function (e) {
          return e.definition.logo_url
            ? a.missionPreviewState == a.MissionPreviewStates.OPS
              ? r.getMissionLogoAtSize(
                  a.mission,
                  p.THUMBNAIL_SIZE_FOR_MISSION_LOGO_IN_OPS_REVIEW,
                )
              : a.missionPreviewState == a.MissionPreviewStates.AUTHOR ||
                  a.missionPreviewState == a.MissionPreviewStates.PROFILE
                ? r.getMissionLogoAtSize(
                    a.mission,
                    p.THUMBNAIL_SIZE_FOR_MISSION_LOGO_IN_PREVIEW,
                  )
                : ""
            : "";
        };
        a.getAuthorBlockVisibility = function () {
          return t();
        };
        a.getMissionStatsBlockVisibility = function () {
          return t();
        };
        a.getMissionTypeDescriptionVisibility = function () {
          return t();
        };
        a.getMissionThumbnailClass = function (e) {
          return e.definition.logo_url &&
            a.missionPreviewState == a.MissionPreviewStates.OPS
            ? "img-ops"
            : "img-author";
        };
        a.getPoiThumbnail = function (a) {
          return a.imageUrl
            ? 0 <= a.imageUrl.search(/panoramio.com/)
              ? a.imageUrl
              : a.imageUrl + "=s40-c"
            : "";
        };
        a.maybeAddRevisedClass = function (e, c) {
          return e[c + a.AddDiffSuffix]
            ? a.MissionRevisionCssStrings.REVISED
            : a.MissionRevisionCssStrings.UNREVISED;
        };
        a.maybeAddRevisedBadgeClass = function (e) {
          return a.maybeAddRevisedClass(e, "badge_url") ==
            a.MissionRevisionCssStrings.REVISED
            ? a.MissionRevisionCssStrings.MISSION_IMAGE_REVISED
            : a.MissionRevisionCssStrings.MISSION_IMAGE_UNREVISED;
        };
        a.waypointMarkers = (function (a) {
          var c = [];
          angular.forEach(a, function (a, e) {
            if (a._poi && a._poi.location) {
              var d = "" + (e + 1),
                d = {
                  id: Math.floor(1e10 * Math.random()),
                  location: a._poi.location,
                  icon: n.WAYPOINT_ICON,
                  options: {
                    zIndex: n.WAYPOINT_MARKER_Z_INDEX,
                    labelAnchor: n.WAYPOINT_LABEL_ANCHOR,
                    labelClass: "waypoint-label",
                    labelContent: d,
                  },
                  latitude: a._poi.location.latitude,
                  longitude: a._poi.location.longitude,
                };
              c.push(d);
            }
          });
          return c;
        })(a.mission.definition.waypoints);
        a.map = {
          center: { latitude: 0, longitude: 0 },
          zoom: 1,
          control: {},
          options: {
            panControl: !1,
            streetViewControl: !1,
            mapTypeControl: !1,
            zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_TOP,
            },
            styles: n.GOOGLE_MAP_STYLES,
            maxZoom: l.MAX_ZOOM,
          },
          events: {},
        };
        a.getFormattedMissionType = function (a) {
          return a.definition
            ? a.definition._sequential
              ? "Complete waypoints in sequence."
              : "Complete waypoints in any order."
            : "";
        };
        a.getMissionTimeString = function (a) {
          return g.formatDuration(
            a.stats ? a.stats.median_completion_time : null,
          );
        };
        a.getMissionRatingString = function (a) {
          return g.formatPercent(a.stats ? a.stats.rating : null);
        };
        a.getMissionNumberOfCompletions = function (a) {
          return a.stats && a.stats.num_completed ? a.stats.num_completed : 0;
        };
        a.getMissionAuthor = function (a) {
          return a.definition && a.definition.author_nickname
            ? a.definition.author_nickname
            : "unknown author";
        };
        a.getWaypointIconVisibility = function (a) {
          return !a.hidden;
        };
        a.getWaypointTitle = function (a) {
          return a._poi ? a._poi.title : "unknown";
        };
        a.getQuestionAndAnswerVisibility = function () {
          return !t();
        };
        a.getWaypointCustomDescriptionVisibility = function () {
          return !t();
        };
      },
    ],
    link: function (a, c, f, d) {},
  };
});
angular.module("MAT").factory("httpInterceptor", [
  "$q",
  "$location",
  "$rootScope",
  "MatErrorKey",
  "ApiPrefix",
  function (a, c, f, d, l) {
    function h(a) {
      return !a || a.headers["X-niantic-no-progress"]
        ? !1
        : 0 == a.url.indexOf("/api/") || 0 == a.url.indexOf("/logo_upload/")
          ? !0
          : !1;
    }
    function m(a, c) {
      c && 0 == a.indexOf(l) && f.botguardInstance.a(c.a, c.b, c.c);
    }
    f.pendingAPIRequests = 0;
    return {
      request: function (c) {
        h(c) && f.pendingAPIRequests++;
        0 == c.url.indexOf(l) &&
          (c.data || (c.data = {}),
          (c.data.b = f.botguardInstance.b()),
          (c.data.c = f.botguardInstance.c()));
        return c || a.when(c);
      },
      response: function (c) {
        m(c.config.url, c.data);
        h(c.config) && f.pendingAPIRequests--;
        return c.data[d]
          ? (f.$broadcast("event:applicationError", c), a.reject(c))
          : c || a.when(c);
      },
      responseError: function (c) {
        m(c.config.url, c.data);
        h(c.config) && f.pendingAPIRequests--;
        f.$broadcast("event:responseError", c);
        return a.reject(c);
      },
    };
  },
]);
angular.module("MAT").service("FormatUtil", [
  "TimeConversionConstants",
  function (a) {
    this.formatDuration = function (c) {
      if (!c) return a.MISSING_TIME_PLACEHOLDER;
      var f = a.MS_IN_ONE_HOUR;
      if (0 == c) return a.MISSING_TIME_PLACEHOLDER;
      if (c >= a.MS_IN_ONE_DAY - (6e4 * a.HOUR_GRANULARITY_MINUTES) / 2) {
        var f = a.DAY_GRANULARITY_HOURS,
          d = 36e5 * f;
        c = Math.floor(Math.max(1, (c + d / 2) / d));
        c =
          1 == c
            ? "1" + a.TEMPLATE_DAYS_SINGULAR
            : Math.round((c * f) / 24) + a.TEMPLATE_DAYS_PLURAL;
        return c;
      }
      if (c >= f - (6e4 * a.MINUTE_GRANULARITY_MINUTES) / 2)
        return (
          (f = a.HOUR_GRANULARITY_MINUTES),
          (d = 6e4 * a.HOUR_GRANULARITY_MINUTES),
          (c = (Math.floor(Math.max(1, (c + d / 2) / d)) * f) / 60),
          (c =
            Math.floor(c) == c
              ? c + a.TEMPLATE_HOURS
              : Math.round(10 * c) / 10 + a.TEMPLATE_HOURS),
          c
        );
      f = a.MINUTE_GRANULARITY_MINUTES;
      d = 6e4 * a.MINUTE_GRANULARITY_MINUTES;
      return Math.floor(Math.max(1, (c + d / 2) / d)) * f + a.TEMPLATE_MINUTES;
    };
    this.formatPercent = function (c) {
      return c ? c + "%" : a.MISSING_TIME_PLACEHOLDER;
    };
  },
]);
angular.module("MAT").service("Geolocation", [
  "$q",
  "$window",
  "$rootScope",
  function (a, c, f) {
    var d =
      /^[ ]*([-+]?[0-9]+([.][0-9]+)?)[ ]*,[ ]*([-+]?[0-9]+([.][0-9]+)?)[ ]*$/;
    this.Geolocate = function () {
      var d = a.defer();
      c.navigator
        ? c.navigator.geolocation.getCurrentPosition(
            function (a) {
              f.$apply(function () {
                d.resolve(a);
              });
            },
            function (a) {
              f.$apply(function () {
                d.reject(a);
              });
            },
          )
        : f.$apply(function () {
            d.reject(Error("Geolocation is not supported"));
          });
      return d.promise;
    };
    this.CheckIfStringIsLatLng = function (a) {
      return d.test(a)
        ? ((a = a.split(",")),
          { latitude: parseFloat(a[0]), longitude: parseFloat(a[1]) })
        : null;
    };
    this.GetAutocompleteResult = function (a, c) {
      function d(m, g) {
        g != google.maps.places.PlacesServiceStatus.OK
          ? c(null)
          : new google.maps.places.PlacesService(a[0]).getDetails(
              { reference: m[0].reference },
              function (a, d) {
                a &&
                  f.$apply(function () {
                    c(a);
                  });
              },
            );
      }
      this.autocompleteService ||
        (this.autocompleteService =
          new google.maps.places.AutocompleteService());
      var n = a.val();
      n &&
        this.autocompleteService.getPlacePredictions(
          { input: n, types: ["geocode"] },
          d,
        );
    };
  },
]);
angular.module("MAT").service("ImageUtil", function () {
  this.isFIFEImage = function (a) {
    return 0 == a.indexOf("http://lh") || 0 == a.indexOf("https://lh")
      ? !0
      : !1;
  };
  this.getImageResizeUrl = function (a, c) {
    return this.isFIFEImage(a) ? a + "=s" + c + "-c" : a;
  };
  this.getMissionLogoAtSize = function (a, c) {
    return a && a.definition.logo_url
      ? this.getImageResizeUrl(a.definition.logo_url, c)
      : "";
  };
});
angular
  .module("MAT")
  .factory("ResolveMissionList", [
    "$http",
    "$q",
    "Api",
    function (a, c, f) {
      return function () {
        var d = c.defer();
        a.post(f.GET_MISSIONS_LIST, {})
          .success(function (a) {
            d.resolve(a);
          })
          .error(function (a) {
            d.reject(a);
          });
        return d.promise;
      };
    },
  ])
  .factory("ResolveUserMapParams", [
    "$http",
    "$q",
    "Api",
    function (a, c, f) {
      return function () {
        var d = c.defer();
        a.post(f.GET_USER_MAP_PARAMS, {})
          .success(function (a) {
            d.resolve(a);
          })
          .error(function (a) {
            d.reject(a);
          });
        return d.promise;
      };
    },
  ])
  .factory("ResolveMission", [
    "$http",
    "$location",
    "$q",
    "Api",
    "WireUtil",
    function (a, c, f, d, l) {
      return function () {
        var h = f.defer();
        if (c.search().id)
          return (
            a
              .post(d.GET_MISSION, { mission_id: c.search().id })
              .success(function (a) {
                a = l.convertMissionWireToLocal(a.mission, a.pois);
                h.resolve(a);
              })
              .error(function (a) {
                h.reject(a);
              }),
            h.promise
          );
      };
    },
  ])
  .factory("ResolveMissionProfile", [
    "$http",
    "$route",
    "$q",
    "Api",
    "WireUtil",
    function (a, c, f, d, l) {
      return function () {
        var h = f.defer();
        a.post(d.GET_MISSION_FOR_PROFILE, {
          mission_guid: c.current.params.missionGuid,
        })
          .success(function (a) {
            a = l.convertMissionWireToLocal(a.mission, a.pois);
            h.resolve(a);
          })
          .error(function (a) {
            h.reject(a);
          });
        return h.promise;
      };
    },
  ])
  .factory("ResolveIsUserAllowedToSubmitMission", [
    "$http",
    "$location",
    "$q",
    "Api",
    "WireUtil",
    function (a, c, f, d, l) {
      return function () {
        var h = f.defer(),
          m = c.search().id;
        a.post(d.IS_USER_ALLOWED_TO_SUBMIT_MISSION, { mission_id: m })
          .success(function (a) {
            h.resolve(a.result);
          })
          .error(function (a) {
            h.reject(a);
          });
        return h.promise;
      };
    },
  ]);
angular.module("MAT").service("Serializer", function () {
  function a() {
    var a = this;
    this._id = 0;
    this.Serialize = function (f) {
      a._id += 1;
      var d = a._id;
      return function (l) {
        a._id == d && f(l);
      };
    };
  }
  this.Create = function () {
    return new a();
  };
});
angular.module("MAT").service("Validation", [
  "POITypes",
  "WaypointObjectiveTypes",
  "MissionTypes",
  "MissionRules",
  function (a, c, f, d) {
    this.getMissionDetailsErrors = function (a) {
      var c = [];
      if (a.name)
        a.name.length > d.MAX_MISSION_NAME_LENGTH &&
          ((f =
            "Mission name is too long (" +
            d.MAX_MISSION_NAME_LENGTH +
            " chars max)"),
          c.push(f));
      else {
        var f;
        c.push("Mission name is missing.");
      }
      a.description
        ? a.description.length > d.MAX_MISSION_DESCRIPTION_LENGTH &&
          ((f =
            "Mission description is too long (" +
            d.MAX_MISSION_DESCRIPTION_LENGTH +
            " chars max)"),
          c.push(f))
        : c.push("Mission description is missing.");
      return c;
    };
    this.getMissionWaypointErrors = function (f) {
      var h = [];
      if (f.waypoints.length < d.MIN_WAYPOINTS) {
        var m = "A minimum of " + d.MIN_WAYPOINTS + " waypoints is required.";
        h.push(m);
      }
      f.waypoints.length > d.MAX_WAYPOINTS &&
        ((m = "A maximum of " + d.MAX_WAYPOINTS + " waypoints is allowed."),
        h.push(m));
      0 < f.waypoints.length &&
        f.waypoints[0].poi_type != a.PORTAL &&
        h.push("The first waypoint must be a Portal.");
      var n = {};
      angular.forEach(f.waypoints, function (a, g) {
        if (
          a._show_custom_description &&
          a.custom_description &&
          a.custom_description.length > d.MAX_CUSTOM_DESCRIPTION_LENGTH
        ) {
          var p =
            "Waypoint #" +
            (g + 1) +
            ": Custom description too long (" +
            d.MAX_CUSTOM_DESCRIPTION_LENGTH +
            " chars max)";
          h.push(p);
        }
        a.objective.type == c.PASSPHRASE &&
          (a.objective.passphrase_params.question
            ? a.objective.passphrase_params.question.length >
                d.MAX_PASSPHRASE_QUESTION_LENGTH &&
              ((p =
                "Waypoint #" +
                (g + 1) +
                ": Passphrase question too long (" +
                d.MAX_PASSPHRASE_QUESTION_LENGTH +
                " chars max)"),
              h.push(p))
            : h.push("Waypoint #" + (g + 1) + ": Passphrase question missing."),
          a.objective.passphrase_params._single_passphrase
            ? a.objective.passphrase_params._single_passphrase.length >
                d.MAX_PASSPHRASE_ANSWER_LENGTH &&
              ((p =
                "Waypoint #" +
                (g + 1) +
                ": Passphrase answer too long (" +
                d.MAX_PASSPHRASE_ANSWER_LENGTH +
                " chars max)"),
              h.push(p))
            : h.push(
                "Waypoint #" + (g + 1) + ": Passphrase answer is missing.",
              ));
        f._hidden &&
          0 < g &&
          (a.hidden_location_clue
            ? a.hidden_location_clue.length >
                d.MAX_HIDDEN_LOCATION_CLUE_LENGTH &&
              ((p =
                "Waypoint #" +
                (g + 1) +
                ": Hidden location clue too long (" +
                d.MAX_HIDDEN_LOCATION_CLUE_LENGTH +
                " chars max)"),
              h.push(p))
            : h.push(
                "Waypoint #" + (g + 1) + ": Hidden location clue missing",
              ));
        n[a.poi_guid] &&
          h.push("Waypoint #" + (g + 1) + ": Waypoint already added.");
        n[a.poi_guid] = !0;
      });
      return h;
    };
  },
]);
angular.module("MAT").service("WireUtil", [
  "POITypes",
  "MissionTypes",
  "EditorScreenViews",
  "AddDiffSuffix",
  function (a, c, f, d) {
    var l = this;
    this.convertMissionLocalToWire = function (a) {
      var d = angular.copy(a);
      angular.forEach(d.definition.waypoints, function (a) {
        delete a._poi;
        a._show_custom_description || delete a.custom_description;
        delete a._show_custom_description;
        d.definition._hidden || delete a.hidden_location_clue;
        a.objective.type == WaypointObjectiveTypes.PASSPHRASE
          ? ((a.objective.passphrase_params.accepted_passphrases = [
              a.objective.passphrase_params._single_passphrase,
            ]),
            delete a.objective.passphrase_params._single_passphrase)
          : delete a.objective.passphrase_params;
      });
      1 == d.definition._sequential
        ? (d.definition.mission_type = d.definition._hidden
            ? c.HIDDEN_SEQUENTIAL
            : c.SEQUENTIAL)
        : 0 == d.definition._sequential &&
          (d.definition.mission_type = c.NON_SEQUENTIAL);
      delete d.definition._sequential;
      delete d.definition._hidden;
      return d;
    };
    this.convertMissionWireToLocal = function (a, f) {
      var n = {};
      angular.forEach(f, function (a) {
        n[a.guid] = a;
      });
      var q = angular.copy(a);
      q.definition.mission_type &&
        ((q.definition._sequential =
          q.definition.mission_type == c.SEQUENTIAL ||
          q.definition.mission_type == c.HIDDEN_SEQUENTIAL),
        (q.definition._hidden =
          q.definition.mission_type == c.HIDDEN_SEQUENTIAL));
      delete q.definition.mission_type;
      var g = [];
      angular.forEach(q.definition.waypoints, function (a, c) {
        if (!a.hidden) {
          var f = n[a.poi_guid];
          f
            ? ((a._poi = f),
              (a.poi_type = a._poi.type),
              (a._show_custom_description = !!a.custom_description),
              a.objective.passphrase_params
                ? a.objective.passphrase_params.accepted_passphrases &&
                  ((a.objective.passphrase_params._single_passphrase = a
                    .objective.passphrase_params.accepted_passphrases
                    ? a.objective.passphrase_params.accepted_passphrases[0]
                    : ""),
                  a.objective.passphrase_params["accepted_passphrases" + d] &&
                    ((a.objective.passphrase_params["_single_passphrase" + d] =
                      !0),
                    delete a.objective.passphrase_params[
                      "accepted_passphrases" + d
                    ]),
                  delete a.objective.passphrase_params.accepted_passphrases)
                : (a.objective.passphrase_params = l.getNewPassphraseParams()))
            : g.unshift(c);
        }
      });
      angular.forEach(g, function (a) {
        q.definition.waypoints.splice(a, 1);
      });
      return q;
    };
    this.convertMissionHistoryWireToLocal = function (a) {
      return a.flatMissionHistory;
    };
    this.getNewPassphraseParams = function () {
      return { question: "", _single_passphrase: "" };
    };
    this.getNewWaypoint = function (c) {
      return {
        _poi: c,
        poi_guid: c.guid,
        poi_type: c.type,
        _show_custom_description: !1,
        custom_description: c.type == a.PORTAL ? c.description : "",
        objective: {
          type:
            c.type == a.PORTAL
              ? WaypointObjectiveTypes.HACK_PORTAL
              : WaypointObjectiveTypes.VIEW_FIELD_TRIP_CARD,
          passphrase_params: l.getNewPassphraseParams(),
        },
      };
    };
    this.getNewMission = function () {
      return {
        definition: {
          name: "",
          description: "",
          _sequential: null,
          _hidden: !1,
          waypoints: [],
        },
        ui: { view: f.TYPE },
      };
    };
  },
]);
angular
  .module("MAT")
  .constant("Sha1", "9f4ad30ae4f8b7fe0dbe23ef5eebfb47616d5fea")
  .constant("IntelMapMissionUrlPrefix", "https://ingress.com/mission/");
