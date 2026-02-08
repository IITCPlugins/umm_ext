import { main } from "./Main";
import { fileFormatVersion } from "./State/State";
import { migrateUmmVersion } from "./State/StateMigration";
import { notification } from "./UI/Notification";

export const exportData = () => {
    const ummState = main.state.get();
    const data = JSON.stringify(ummState);
    const sanitizedName = ummState.missionSetName.replace(/[\W_]+/g, " ");
    const filename = sanitizedName + "-mission-data.json";

    if (typeof window.saveFile == 'function') {
        window.saveFile(data, filename, "application/json");
    } else if (typeof android !== 'undefined' && android?.saveFile) {
        android.saveFile(filename, "application/json", data);
    } else if (!window.isSmartphone()) { // pc method
        // fall back
        const a = document.createElement('a');
        a.href = "data:text/json;charset=utf-8," + encodeURIComponent(data);
        a.download = filename;
        a.click();
    }
}

export const loadFileInputIITC = async (event: Event) => {
    await loadFileInput(event);
    main.state.checkAllPortals();
    main.redrawAllTotal();
}

export const loadFileInputMission = async (event: Event) => {
    await loadFileInput(event);
    // thisPlugin.setActiveBannerTitle();
    // thisPlugin.generateMissionSelect();
}


export const loadFileInput = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (!files || files?.length === 1) {
        alert("No file selected! Please select a mission file in JSON format and try again.");
        $("#umm-import-file").val('');
        return;
    }

    if (files[0].type != 'application/json') {
        $("#umm-import-file").val('');
        alert((files[0].name) + " has not been recognized as JSON file. Make sure you've loaded the right file.");
        return;
    }

    return loadFile(files[0]);
}

export const loadFile = async (inputFile: File) => {

    const text = await inputFile.text()

    const ummState = JSON.parse(text);
    if (ummState.fileFormatVersion > fileFormatVersion) {
        alert("UMM: You've attempted to load data that's newer than what's supported by this version of UMM. Please update the plugin and try again. Data has not been loaded.");
        return;
    }
    migrateUmmVersion(main.state, ummState);
    main.state.save();

    notification(`Banner data loaded:\n${main.state.getBannerName()}`);
};
