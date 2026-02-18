import { main } from "../Main";
import { getPassphrase, isPassphraseEmpty, setPassphrase } from "../State/Portals";
import { generateQuestion } from "../Text/QuestionGen";
import { Action, UMM_Portal } from "../UMM_types";

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

    const missions = main.state.missions.getMissionsOfPortal(window.selectedPortal ?? "");
    if (missions.length === 0) return;

    appendEditor(missions);

    const current = main.state.getCurrent();
    const preSelect = missions.includes(current) ? current : missions[0];
    $("#umm-mission-select").val(preSelect);

    onMisisonSelect();
}


const appendEditor = (missions: number[]) => {

    const misisonSelect = $("<select>", { id: "umm-mission-select" });
    const actionSelect = $("<select>", { id: "umm-action-select" });

    const container = $("<div>", { id: "umm-waypoint-editor" }).append(
        $("<span>", { text: "UMM Waypoint Editor", class: "umm-waypoint-editor-title" }),
        $("<div>", { class: "umm-waypoint-select-container" }).append(
            misisonSelect, actionSelect
        ),
        $("<div>", { id: "umm-passphrase-container" }).css('display', 'flex').append(
            $("<span>", { text: "Question" }),
            $("<textarea>", { id: "umm-passphrase-question", type: "text", row: 1 }).css({ "overflow-y": "hidden" })
                .on("blur", () => savePassPhrase())
                .on("focus", (event: JQuery.FocusEvent) => onFocus(event))
            ,
            $("<span>", { text: "Passphrase" }),
            $("<input>", { type: "text", id: "umm-passphrase-passphrase" })
                .on("blur", () => savePassPhrase())
                .on("focus", (event: JQuery.FocusEvent) => onFocus(event))
        )
    );


    addMissionOptions(misisonSelect, missions);
    addActionOptions(actionSelect);

    misisonSelect.on('change', onMisisonSelect);
    actionSelect.on('change', onActionSelect);

    $("#portaldetails #randdetails").before(container);
}


const addMissionOptions = (missionSelect: JQuery, validMissionIds: number[]) => {
    const missionOption = $("<option>", { value: NO_MISSION, text: "Select mission" })
    missionSelect.append(missionOption);

    validMissionIds.forEach(id => {
        const missionOption = $("<option>", { value: id, text: id + 1 })
        missionSelect.append(missionOption);
    })
}


const addActionOptions = (actionSelect: JQuery) => {
    ActionLabels.forEach((label, action) => {
        const option = $("<option>", { value: action, text: label });
        actionSelect.append(option);
    });
}


const onMisisonSelect = () => {
    const portal = currentPortal();
    if (portal) {

        const action = portal.objective.type;
        const { question, answer } = getPassphrase(portal);

        $("#umm-action-select").val(action);
        $("#umm-passphrase-question").val(question);
        $("#umm-passphrase-passphrase").val(answer);

        $("#umm-passphrase-container").toggle(action === Action.PASSPHRASE);
        onActionSelect();
    } else {
        $("#umm-action-select").prop("disabled", true)
        $("#umm-passphrase-container").hide();
    }
};


const onActionSelect = () => {
    const action = $("#umm-action-select").val() as Action;
    const portal = currentPortal();
    if (!portal) return;

    $("#umm-passphrase-container").toggle(action === Action.PASSPHRASE);
    if (action === Action.PASSPHRASE) pregenerateQuestion(portal);

    portal.objective.type = action;
    main.state.save();
};


const onFocus = (event: JQuery.FocusEvent) => {
    const element = $(event.target);
    if (element.attr("selectAll")) {
        // eslint-disable-next-line unicorn/no-null
        element.attr("selectAll", null);
        element.trigger("select");
    }
}

const pregenerateQuestion = (portal: UMM_Portal) => {
    // don't overwrite existing
    if (!isPassphraseEmpty(portal)) return;

    const missionId = parseInt($("#umm-mission-select").val() as string);
    const mission = main.state.missions.get(missionId);
    if (!mission) return;

    const { question, answer } = generateQuestion(missionId, mission.portals.isStart(portal));

    $("#umm-passphrase-question").val(question).attr("selectAll", "true");
    $("#umm-passphrase-passphrase").val(answer).attr("selectAll", "true");

    setPassphrase(portal, question, answer);
}


const currentPortal = (): UMM_Portal | undefined => {
    const missionId = parseInt($("#umm-mission-select").val() as string);
    const portals = main.state.missions.get(missionId)?.portals;
    return portals?.find(window.selectedPortal!);
}


const savePassPhrase = () => {
    const portal = currentPortal();
    if (!portal) return;

    setPassphrase(portal,
        $("#umm-passphrase-question").val() as string,
        $("#umm-passphrase-passphrase").val() as string
    )
    main.state.save();
}


