
// eslint-disable-next-line unicorn/require-module-specifiers
export { };

declare global {

    enum MissionStates {
        DRAFT = "DRAFT",
        SUBMITTED = "SUBMITTED",
        PUBLISHED = "PUBLISHED",
        DISABLED = "DISABLED",
    }

    const MissionRules: {
        MAX_MISSION_NAME_LENGTH: 50,
        MAX_MISSION_DESCRIPTION_LENGTH: 200,
        MIN_WAYPOINTS: 6,
        MAX_WAYPOINTS: 100,
        MAX_PASSPHRASE_QUESTION_LENGTH: 200,
        MAX_PASSPHRASE_ANSWER_LENGTH: 50,
        MAX_CUSTOM_DESCRIPTION_LENGTH: 500,
        MAX_HIDDEN_LOCATION_CLUE_LENGTH: 200,
    }

    enum WaypointObjectiveTypes {
        HACK_PORTAL = "HACK_PORTAL",
        INSTALL_MOD = "INSTALL_MOD",
        CAPTURE_PORTAL = "CAPTURE_PORTAL",
        CREATE_LINK = "CREATE_LINK",
        CREATE_FIELD = "CREATE_FIELD",
        TAKE_PHOTO = "TAKE_PHOTO",
        VIEW_FIELD_TRIP_CARD = "VIEW_FIELD_TRIP_CARD",
        PASSPHRASE = "PASSPHRASE",
    }

    const ImageSizes: {
        THUMBNAIL_SIZE_FOR_POI: 40,
        THUMBNAIL_SIZE_FOR_MISSION_LOGO_IN_EDIT_VIEW: 40,
        THUMBNAIL_SIZE_FOR_MISSION_LOGO_IN_LIST_VIEW: 60,
        THUMBNAIL_SIZE_FOR_MISSION_LOGO_IN_OPS_REVIEW: 242,
        THUMBNAIL_SIZE_FOR_MISSION_LOGO_IN_PREVIEW: 74,
        THUMBNAIL_SIZE_FOR_MISSION_LOGO_IN_SEARCH_RESULTS: 120,
    }

    enum MissionListStateNames {
        DRAFT = "DRAFT",
        DRAFT_OF_PUBLISHED_MISSION = "DRAFT_OF_PUBLISHED_MISSION",
        PUBLISHED = "PUBLISHED",
        SUBMITTED = "SUBMITTED",
        SUBMITTED_AND_PUBLISHED = "SUBMITTED_AND_PUBLISHED",
    }

    const MissionListStates: {
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
    };

    const TimeConversionConstants = {
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
    };
    const MissionRevisionCssStrings = {
        REVISED: "revised",
        UNREVISED: "",
        MISSION_IMAGE_REVISED: "mission-image-revised",
        MISSION_IMAGE_UNREVISED: "mission-image",
    };
    const MissionPreviewStates = { AUTHOR: "author", OPS: "ops", PROFILE: "profile" };
}

