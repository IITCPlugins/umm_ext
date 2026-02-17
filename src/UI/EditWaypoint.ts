import { main } from "../Main";
import { generateQuestion } from "../Text/QuestionGen";
import { Action, UMM_Passphrase, UMM_Portal } from "../UMM_types";

const NO_MISSION = "#";

export const ActionLabels = new Map<Action, string>([
    [Action.HACK_PORTAL, "Hack portal"],
    [Action.INSTALL_MOD, "Install mod"],
    [Action.CAPTURE_PORTAL, "Capture portal"],
    [Action.CREATE_LINK, "Create link"],
    [Action.CREATE_FIELD, "Create field"],
    [Action.PASSPHRASE, "Enter passphrase"],
]);


export const addWaypointEditorToPortal = () => {

    const state = main.state;

    const missions = state.missions.getMissionsOfPortal(window.selectedPortal ?? "");
    if (missions.length === 0) return;

    appendEditor(missions);

    $("#umm-mission-select").on('change', () => {
        if ($("#umm-mission-select").val() === NO_MISSION) {
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


const appendEditor = (missions: number[]) => {

    const ummTitle = $("<span>", { text: "UMM Waypoint Editor", class: "umm-waypoint-editor-title" });

    const waypointSelectContainer = $("<div>", { class: "umm-waypoint-select-container" });
    waypointSelectContainer.append(portalMissionSelectFactory(missions));

    const actionSelect = $("<select>", { id: "umm-action-select" });
    waypointSelectContainer.append(actionSelect);

    const passPhraseHtml = $("<div>", { id: "umm-passphrase-container" });

    const container = $("<div>", { id: "umm-waypoint-editor" }).append(
        ummTitle,
        waypointSelectContainer,
        passPhraseHtml
    );

    $("#portaldetails #randdetails").before(container);
}


const portalMissionSelectFactory = (validMissionIds: number[]): JQuery => {
    const missionSelect = $("<select>", { id: "umm-mission-select" });

    const missionOption = $("<option>", { value: NO_MISSION, text: "Select mission" })
    missionSelect.append(missionOption);

    validMissionIds.forEach(id => {
        const missionOption = $("<option>", { value: id, text: id + 1 })
        missionSelect.append(missionOption);
    })

    const current = main.state.getCurrent();
    const preSelect = validMissionIds.includes(current) ? current : validMissionIds[0];
    $(missionSelect).val(preSelect);

    return missionSelect;
}


const portalActionSelectFactory = (portal: UMM_Portal): JQuery => {

    const actionSelect = $("<select>", { id: "umm-action-select" });

    ActionLabels.forEach((label, action) => {
        const option = $("<option>", { value: action, text: label });
        if (portal.objective.type === action) option.prop("selected", true);
        actionSelect.append(option);
    });

    return actionSelect;
}


const updatePassPhraseContent = () => {
    const portal = currentPortal();
    if (!portal) return;

    $("#umm-passphrase-container").replaceWith(passCodeBoxFactory(portal));
    $("#umm-passphrase-container textarea").css({ "overflow-y": "hidden" });

    const selection = $("#umm-action-select").val() as Action;
    if (selection === Action.PASSPHRASE) {
        $("#umm-passphrase-container").css('display', 'flex');

        // eslint-disable-next-line no-underscore-dangle
        if (portal.objective.passphrase_params.question === "" && portal.objective.passphrase_params._single_passphrase === "") {
            generatePreselectedQuestion(portal);
        }
    }
}


const passCodeBoxFactory = (portal: UMM_Portal): JQuery => {

    const questionSpan = $("<span>", { text: "Question" });

    const ppQuestion = portal.objective.passphrase_params.question ?? "";
    const question = $("<textarea>", { id: "umm-passphrase-question", type: "text", row: 1 }).val(ppQuestion);
    question.on("blur", () => savePassPhrase());
    question.on("focus", (event: JQuery.FocusEvent) => onFocus(event));

    const passPhraseSpan = $("<span>", { text: "Passphrase" });

    // eslint-disable-next-line no-underscore-dangle
    const spQuestion = portal.objective.passphrase_params._single_passphrase ?? "";
    const passPhrase = $("<input>", { type: "text", id: "umm-passphrase-passphrase", value: spQuestion });
    passPhrase.on("blur", () => savePassPhrase());
    passPhrase.on("focus", (event: JQuery.FocusEvent) => onFocus(event));

    const passPhraseHtml = $("<div>", { id: "umm-passphrase-container" });
    passPhraseHtml.append(questionSpan, question, passPhraseSpan, passPhrase);

    return passPhraseHtml;
}


const onFocus = (event: JQuery.FocusEvent) => {
    const element = $(event.target);
    if (element.attr("selectAll")) {
        // eslint-disable-next-line unicorn/no-null
        element.attr("selectAll", null);
        element.trigger("select");
    }
}


const generatePreselectedQuestion = (portal: UMM_Portal) => {
    const missionId = parseInt($("#umm-mission-select").val() as string);
    const mission = main.state.missions.get(missionId);
    if (!mission) return;

    const question = generateQuestion(missionId, mission.portals.isStart(portal));

    $("#umm-passphrase-question").val(question.question).attr("selectAll", "true");
    $("#umm-passphrase-passphrase").val(question.answer).attr("selectAll", "true");

    portal.objective.passphrase_params.question = question.question;
    // eslint-disable-next-line no-underscore-dangle
    portal.objective.passphrase_params._single_passphrase = question.answer;
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
}



const updateActionSelect = () => {
    const portal = currentPortal();
    if (!portal) return;

    $("#umm-action-select").replaceWith(portalActionSelectFactory(portal));

    $("#umm-action-select").on('change', () => {
        const selection = $("#umm-action-select").val() as Action;
        if (selection === Action.PASSPHRASE) {
            updatePassPhraseContent();
        } else {
            $("#umm-passphrase-container").hide();
        }

        currentPortal()!.objective.type = selection;
        main.state.save();
    });
}

