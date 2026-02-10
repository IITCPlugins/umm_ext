import { toggleMissionMode } from "../../Edits";
import { main } from "../../Main";
import { Missions } from "../../State/Missions";
import { updateCurrentActiveMissionSidebar } from "../ButtonBar";
import { bannerNotification } from "../Notification";
import { version } from "../Text";
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
      <p>Title format allows:<br>N = Mission number without leading 0<br>NN = Mission number with leading 0 (if required by banner length)<br>M = Planned banner length<br>T = (banner title)<br>Examples:T NN-M (default) or NN.M T</p>
      <input id="umm-title-format" name="umm-title-format" type="text" placeholder="Enter a title format" value="${state.getTitleFormat() ?? "T NN-M"}" style="margin-bottom: 5px;">
      <b>Preview: </b><span id="umm-mission-title-preview"></span>`

    html += '</div>';

    window.dialog({
        html: html,
        title: `Edit banner details - UMM v${version}`,
        id: 'umm-options',
        width: 400,
        buttons: [
            dialogButton("< Main Menu", showUmmOptions),
            dialogButton("Save", () => succesfulSave(toggleMissionModeAfterSave)),
            dialogButtonClose()
        ]
    });

    updateMissionTitlePreview();

    $('#umm-mission-set-name, #umm-mission-set-description, #umm-banner-length, #umm-title-format').on('input', updateMissionTitlePreview);
};

const succesfulSave = (toggleMissionModeAfterSave: boolean) => {
    const isSavedSuccesful = saveMissionSetDetails(
        $('#umm-mission-set-name').val() as string,
        $('#umm-mission-set-description').val() as string,
        $('#umm-banner-length').val() as string,
        $('#umm-title-format').val() as string);

    if (isSavedSuccesful) {
        updateCurrentActiveMissionSidebar(main.state);
        bannerNotification(`Mission details saved`);
        if (toggleMissionModeAfterSave) {
            toggleMissionMode();
        }
    }
}

const updateMissionTitlePreview = () => {
    if ($('#umm-mission-set-name').val() != "" && $('#umm-title-format').val() != "" && !isNaN(parseInt($('#umm-banner-length').val() as string))) {
        const missionTitle = Missions.generateMissionTitle(
            1,
            parseInt($('#umm-banner-length').val() as string),
            $('#umm-mission-set-name').val() as string,
            $('#umm-title-format').val() as string
        );
        $('#umm-mission-title-preview').text(missionTitle);
    } else {
        $('#umm-mission-title-preview').text("Fill in all required fields");
    }
}


const saveMissionSetDetails = (missionSetName?: string, missionSetDescription?: string, plannedBannerLength?: string, titleFormat?: string): boolean => {
    let shouldStoreData = true;

    if (missionSetName && missionSetName != "") {
        main.state.setBannerName(missionSetName);
        $('#umm-mission-set-name-error').css('display', 'none');
    } else {
        shouldStoreData = false;
        $('#umm-mission-set-name-error').css('display', 'block');
    }

    if (missionSetDescription && missionSetDescription != "") {
        main.state.setBannerDesc(missionSetDescription);
        $('#umm-mission-set-description-error').css('display', 'none');
    } else {
        shouldStoreData = false;
        $('#umm-mission-set-description-error').css('display', 'block');
    }

    const plannedLength = parseInt(plannedBannerLength ?? "");
    if (plannedLength && !isNaN(plannedLength)) {
        main.state.setPlannedLength(plannedLength);
        $('#umm-mission-planned-banner-length-error').css('display', 'none');
    } else {
        shouldStoreData = false;
        $('#umm-mission-planned-banner-length-error').css('display', 'block');
    }

    if (titleFormat && titleFormat != "") {
        main.state.setTitleFormat(titleFormat);
        $('#umm-mission-title-format-error').css('display', 'none');
    } else {
        shouldStoreData = false;
        $('#umm-mission-title-format-error').css('display', 'block');
    }


    if (shouldStoreData) {
        main.state.save();
        return true;
    } else {
        return false;
    }
}
