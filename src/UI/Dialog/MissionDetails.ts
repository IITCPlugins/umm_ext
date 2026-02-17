import { toggleMissionMode } from "../../Edits";
import { main } from "../../Main";
import { Missions } from "../../State/Missions";
import { bannerNotification } from "../Notification";
import { dialogButton, dialogButtonClose } from "./Button";
import { showUmmOptions } from "./Options";


export const editMissionSetDetails = (toggleMissionModeAfterSave = false) => {
    const state = main.state;

    let html = '<div class="umm-edit-mission-set-details">';
    html += '<b>Banner details</b>';
    html += '<p>Please enter the details for your banner. All fields are required.</p><br>';

    html += `<label for="umm-mission-set-name"><b>Banner name</b> (max. 50 characters)</label>
      <span class="umm-error" id="umm-mission-set-name-error"><b>Error: </b>Please enter a valid banner name</span>
      <input id="umm-mission-set-name" name="umm-mission-set-name" type="text" placeholder="Enter name for the banner" maxlength="50" value="${state.getBannerName()}">`

    html += `<label for="umm-mission-set-description"><b>Banner description</b> (max. 200 characters)</label>
      <span class="umm-error" id="umm-mission-set-description-error"><b>Error: </b>Please enter a valid banner description</span>
      <textarea id="umm-mission-set-description" name="umm-mission-set-description" placeholder="Enter description for the banner" maxlength="200" rows="5">${state.getBannerDesc()}</textarea>`

    html += `<label for="umm-banner-length"><b>Planned banner length</b>, min. ${Math.max(state.missions.count(), 1)} mission(s)</label>
      <span class="umm-error" id="umm-mission-planned-banner-length-error"><b>Error: </b>Please enter a valid banner length</span>
      <input id="umm-banner-length" name="umm-banner-length" type="number" placeholder="Enter length of banner set" min="1" value="${Math.max(state.getPlannedLength(), 1)}">`

    html += `<label for="umm-title-format"><b>Title format</b></label>
      <span class="umm-error" id="umm-mission-title-format-error"><b>Error: </b>Please enter a valid title-format</span>
      <table>
      <tr><td>$T = Mission title</td><td>additional flags:</td></tr>
      <tr><td>$N = Current Missione number</td><td>$0n = with leading zeros</td></tr>
      <tr><td>$M = Banner length</td><td>$3n = minimum length</td></tr>
      </table>
      <br><br>Examples: "$T $N / $M" or "$0n.$m $t"  or "$T $03N-$03M" </p>
      <input id="umm-title-format" name="umm-title-format" type="text" placeholder="Enter a title format" value="${state.getTitleFormat() ?? "T NN-M"}" style="margin-bottom: 5px;">
      <b>Preview: </b><span id="umm-mission-title-preview"></span>`

    html += '</div>';

    window.dialog({
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

    updateMissionTitlePreview();

    $('#umm-mission-set-name, #umm-mission-set-description, #umm-banner-length, #umm-title-format').on('input', updateMissionTitlePreview);
};

const getFormValues = () => ({
    name: $('#umm-mission-set-name').val() as string,
    description: $('#umm-mission-set-description').val() as string,
    length: $('#umm-banner-length').val() as string,
    format: $('#umm-title-format').val() as string
});

const successfulSave = (toggleMissionModeAfterSave: boolean) => {
    const values = getFormValues();
    const isSavedSuccessful = saveMissionSetDetails(
        values.name,
        values.description,
        values.length,
        values.format);

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
    const plannedLength = parseInt(values.length);

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


const setFieldError = (elementId: string, hasError: boolean) => {
    $(elementId).css('display', hasError ? 'block' : 'none');
};

const saveMissionSetDetails = (missionSetName?: string, missionSetDescription?: string, plannedBannerLength?: string, titleFormat?: string): boolean => {
    let isValid = true;

    const hasName = missionSetName && missionSetName.length > 0;
    if (hasName) {
        main.state.setBannerName(missionSetName);
    }
    setFieldError('#umm-mission-set-name-error', !hasName);
    isValid = isValid && !!hasName;

    const hasDescription = missionSetDescription && missionSetDescription.length > 0;
    if (hasDescription) {
        main.state.setBannerDesc(missionSetDescription);
    }
    setFieldError('#umm-mission-set-description-error', !hasDescription);
    isValid = isValid && !!hasDescription;

    const plannedLength = parseInt(plannedBannerLength ?? "");
    const hasValidLength = plannedLength && !isNaN(plannedLength);
    if (hasValidLength) {
        main.state.setPlannedLength(plannedLength);
    }
    setFieldError('#umm-mission-planned-banner-length-error', !hasValidLength);
    isValid = isValid && !!hasValidLength;

    const hasFormat = titleFormat && titleFormat.length > 0;
    if (hasFormat) {
        main.state.setTitleFormat(titleFormat);
    }
    setFieldError('#umm-mission-title-format-error', !hasFormat);
    isValid = isValid && !!hasFormat;

    if (isValid) {
        main.state.save();
    }
    return isValid;
}
