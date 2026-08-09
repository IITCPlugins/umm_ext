import { toggleMissionMode } from "../../Edits";
import { main } from "../../Main";
import { Missions } from "../../State/Missions";
import { bannerNotification } from "../Notification";
import { dialogButton, dialogButtonClose } from "./Button";
import { showUmmOptions } from "./MainDialog";

let currentDialog: JQuery;
interface FormValues {
    name: string;
    description: string;
    length: number;
    format: string;
    sequential: boolean;
    hiddenLocation: boolean;
}

const MAX_TITLE_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 200;

export const editMissionSetDetails = (toggleMissionModeAfterSave = false) => {
    const state = main.state;

    let html = '<div class="umm-edit-mission-set-details">';
    html += '<b>Banner details</b>';
    html += '<p>Please enter the details for your banner. All fields are required.</p><br>';

    html += createLabel("umm-mission-set-name", "Banner name", `(max. ${MAX_TITLE_LENGTH} characters)`, "Please enter a valid banner name");
    html += `<input id="umm-mission-set-name" name="umm-mission-set-name" type="text" placeholder="Enter name for the banner" maxlength="${MAX_TITLE_LENGTH}">`

    html += createLabel("umm-mission-set-description", "Banner description", `(max. ${MAX_DESCRIPTION_LENGTH} characters)`, "Please enter a valid banner description");
    html += `<textarea id="umm-mission-set-description" name="umm-mission-set-description" placeholder="Enter description for the banner" maxlength="200" rows="5"></textarea>`

    html += createLabel("umm-mission-planned-banner-length", "Planned banner length", `, min. ${Math.max(state.missions.count(), 1)} mission(s)`, "Please enter a valid banner length");
    html += `<input id="umm-mission-planned-banner-length" name="umm-mission-planned-banner-length" type="number" placeholder="Enter length of banner set" min="1">`

    html += `<label><input id="umm-mission-sequential" name="umm-mission-sequential" type="checkbox" checked />
        <b>Sequential Missions</b>(Sequential or Anyorder)</label>`;

    html += `<label><input id="umm-mission-hide-waypoint" name="umm-mission-hide-waypoint" type="checkbox" style="margin-left:2em;"/>
        <b>Hide waypoint location</b>(only for Sequential missions)</label>`;

    html += createLabel("umm-mission-title-format", "Title format", "", "Please enter a valid title-format");
    html += `<table>
      <tr><td>$T = Mission title</td><td>additional flags:</td></tr>
      <tr><td>$N = Current Missione number</td><td>$0n = with leading zeros</td></tr>
      <tr><td>$M = Banner length</td><td>$3n = minimum length</td></tr>
      </table>
      <br><br>Examples: "$T $N / $M" or "$0n.$m $t"  or "$T $03N-$03M" </p>
      <input id="umm-mission-title-format" name="umm-mission-title-format" type="text" placeholder="Enter a title format" style="margin-bottom: 5px;">
      <b>Preview: </b><span id="umm-mission-title-preview"></span>`

    html += '</div>';

    currentDialog = window.dialog({
        html: html,
        title: `Edit banner details - UMM ${VERSION}`,
        id: 'umm-options',
        width: 400,
        buttons: [
            dialogButton("< Main Menu", showUmmOptions),
            dialogButton("Save", () => successfulSave(toggleMissionModeAfterSave)),
            dialogButtonClose()
        ]
    });

    updateFormValues({
        name: state.getBannerName(),
        description: state.getBannerDesc(),
        length: Math.max(state.getPlannedLength(), 1),
        format: state.getTitleFormat() ?? "$T $N / $M",
        sequential: state.getSequential().sequential,
        hiddenLocation: state.getSequential().hiddenLocation,
    })
    updateMissionTitlePreview();

    $('#umm-mission-set-name, #umm-mission-set-description, #umm-banner-length, #umm-title-format').on('input', updateMissionTitlePreview);
};


const createLabel = (forID: string, title: string, description: string, error: string) => {
    return `<label for="${forID}"><b>${title}</b>${description}</label>
      <span class="umm-error" id="${forID}-error"><b>Error: </b>${error}</span>`
}


const successfulSave = (toggleMissionModeAfterSave: boolean) => {
    const values = getFormValues();
    const isSavedSuccessful = saveMissionSetDetails(values);

    if (isSavedSuccessful) {
        bannerNotification(main.state, `Mission details saved`);
        if (toggleMissionModeAfterSave) {
            toggleMissionMode();
        }
        $("#dialog-umm-options").dialog("close");
    }
}


const updateMissionTitlePreview = () => {
    const values = getFormValues();
    const plannedLength = values.length;

    if (values.name.length > 0 && values.format.length > 0 && !isNaN(plannedLength)) {
        const missionTitle = Missions.generateMissionTitle(values.format, {
            misison: 1,
            title: values.name,
            total: plannedLength
        });
        $('#umm-mission-title-preview').text(missionTitle);
    } else {
        $('#umm-mission-title-preview').text("Fill in all required fields");
    }
}


const saveMissionSetDetails = (data: FormValues): boolean => {
    const isValid = validateForm(data);

    if (isValid) {
        main.state.setBannerName(data.name);
        main.state.setBannerDesc(data.description);
        main.state.setPlannedLength(data.length);
        main.state.setTitleFormat(data.format);
        main.state.setSequential(data.sequential,data.hiddenLocation);
        main.state.save();
    }

    return isValid;
}


const validateForm = (data: FormValues): boolean => {
    let isValid = true;

    isValid = validate('umm-mission-set-name', 
            data.name !== undefined && data.name.length > 0 && data.name.length <= MAX_TITLE_LENGTH)
            && isValid;

    isValid = validate('umm-mission-set-description', 
            data.description !== undefined && data.description.length > 0 && data.description.length <= MAX_DESCRIPTION_LENGTH)
            && isValid;

    isValid = validate('umm-mission-planned-banner-length', 
            data.length>0 && !isNaN(data.length))
            && isValid;

    isValid = validate('umm-mission-title-format', 
            data.format !== undefined && data.format.length > 0)
            && isValid;

    return isValid;
}

const validate = (elementId: string, isValid: boolean): boolean => {
    $(`#${elementId}-error`, currentDialog).toggle(!isValid);
    return isValid;
};


const getFormValues = ():FormValues => ({
    name: $('#umm-mission-set-name', currentDialog).val() as string,
    description: $('#umm-mission-set-description', currentDialog).val() as string,
    length: parseInt($('#umm-mission-planned-banner-length', currentDialog).val() as string ?? ""),
    format: $('#umm-mission-title-format', currentDialog).val() as string,
    sequential: $('#umm-mission-sequential', currentDialog).is(":checked"),
    hiddenLocation: $('#umm-mission-hide-waypoint', currentDialog).is(":checked")
});


const updateFormValues = (data: FormValues) => {
    $('#umm-mission-set-name', currentDialog).val(data.name);
    $('#umm-mission-set-description', currentDialog).val(data.description);
    $('#umm-mission-planned-banner-length', currentDialog).val(data.length);
    $('#umm-mission-title-format', currentDialog).val(data.format);
    $('#umm-mission-sequential', currentDialog).prop(":checked", data.sequential);
    $('#umm-mission-hide-waypoint', currentDialog).prop(":checked", data.hiddenLocation);
};

