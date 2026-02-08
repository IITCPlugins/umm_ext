import { main } from "../Main";
import { PortalActions } from "../State/Portals";
import { UMM_Passphrase, UMM_Portal } from "../UMM_types";
import { notification } from "./Notification";


export const addWaypointEditorToPortal = () => {

    const state = main.state;

    const missions = state.missions.getMissionsOfPortal(window.selectedPortal ?? "");
    if (missions.length === 0) return;

    const wayPointHtml = $("<div>", { id: "umm-waypoint-editor" });

    // Construct waypoint editor HTML
    const ummTitle = $("<span>", { text: "UMM Waypoint Editor", class: "umm-waypoint-editor-title" });
    wayPointHtml.append(ummTitle)

    const waypointSelectContainer = $("<div>", { class: "umm-waypoint-select-container" });
    waypointSelectContainer.append(portalMissionSelectFactory(missions));
    const actionSelect = $("<select>", { id: "umm-action-select" });
    waypointSelectContainer.append(actionSelect);

    wayPointHtml.append(waypointSelectContainer);

    const passPhraseHtml = $("<div>", { id: "umm-passphrase-container" }); // Placeholder to be replaced with updatePassPhraseContent
    wayPointHtml.append(passPhraseHtml);

    $("#portaldetails #randdetails").insertBefore(wayPointHtml);

    // Make mission dropdown functional
    $("#umm-mission-select").on('change', () => {
        if ($("#umm-mission-select").val() === "#") {
            // If no mission is selected, disable other dropdowns
            $("#umm-action-select").prop("disabled", true)
            $("#umm-passphrase-container").hide();
        } else {
            // If a different mission is selected, update the waypoint selector and action selector to reflect the new portal(s)
            updateActionSelect();
            updatePassPhraseContent();
        }
    });

    updateActionSelect(); // Replace action placeholder
    updatePassPhraseContent(); // Replace passphrase placeholder
}


const portalMissionSelectFactory = (validMissionIds: number[]): JQuery => {
    const missionSelect = $("<select>", { id: "umm-mission-select" });

    const missionOption = $("<option>", { value: "#", text: "Select mission" })
    missionSelect.append(missionOption);

    validMissionIds.forEach(id => {
        const missionOption = $("<option>", { value: id, text: id + 1 })
        missionSelect.append(missionOption);
    })

    // TODO select current Mission if possible
    $("option", missionSelect).first().prop("selected", true);// For now select first mission as default

    return missionSelect;
}


const portalActionSelectFactory = (portal: UMM_Portal): JQuery => {

    const actionSelect = $("<select>", { id: "umm-action-select" });

    PortalActions.forEach(({ action, label }) => {
        const option = $("<option>", { value: action, text: label });
        if (portal.objective.type === action) option.prop("selected", true);
        actionSelect.append(option);
    })

    return actionSelect;
}


const updatePassPhraseContent = () => {
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


const passCodeBoxFactory = (portal: UMM_Portal): JQuery => {

    const questionSpan = $("<span>", { text: "Question" });

    const ppQuestion = portal.objective.passphrase_params.question ?? "";
    const question = $("<textarea>", { id: "umm-passphrase-question", type: "text", row: 1, value: ppQuestion });
    question.on("blur", () => savePassPhrase());

    const passPhraseSpan = $("<span>", { text: "Passphrase" });

    // eslint-disable-next-line no-underscore-dangle
    const spQuestion = portal.objective.passphrase_params._single_passphrase ?? "";
    const passPhrase = $("<input>", { type: "text", id: "umm-passphrase-passphrase", value: spQuestion });
    passPhrase.on("blur", () => savePassPhrase());

    const passPhraseHtml = $("<div>", { id: "umm-passphrase-container" });
    passPhraseHtml.append(questionSpan, question, passPhraseSpan, passPhrase);

    return passPhraseHtml;
}


const currentPortal = (): UMM_Portal | undefined => {
    const missionId = parseInt($("#umm-mission-select").val() as string);
    const portals = main.state.missions.get(missionId)?.portals;
    return portals?.find(window.selectedPortal!);
}


const savePassPhrase = () => {
    const portal = currentPortal();
    if (!portal) return;

    // eslint-disable-next-line unicorn/prevent-abbreviations
    const passphrase_params: UMM_Passphrase = {
        question: $("#umm-passphrase-question").val() as string,
        _single_passphrase: $("#umm-passphrase-passphrase").val() as string
    };
    portal.objective.passphrase_params = passphrase_params;
    main.state.save();
    notification("Question and passphrase saved");
}



const updateActionSelect = () => {
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

