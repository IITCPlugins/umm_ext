import { State } from "./State/State";
import { notification } from "./UI/Notification";


export const exportData = (state: State) => {
    const data = state.asString();
    const sanitizedName = state.getBannerName().replace(/[\W_]+/g, " ");
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


export const loadFileInput = async (event: Event, state: State): Promise<boolean> => {
    const files = (event.target as HTMLInputElement).files;
    if (files?.length !== 1) {
        alert("No file selected! Please select a mission file in JSON format and try again.");
        $("#umm-import-file").val('');
        return false;
    }

    if (files[0].type != 'application/json') {
        $("#umm-import-file").val('');
        alert((files[0].name) + " has not been recognized as JSON file. Make sure you've loaded the right file.");
        return false;
    }

    return loadFile(state, files[0]);
}


export const loadFile = async (state: State, inputFile: File): Promise<boolean> => {

    const text = await inputFile.text()

    try {
        state.import(text);
    } catch (error) {
        notification(`Loadgin error: \n${error}`);
        return false;
    }

    state.save();
    notification(`Banner data loaded:\n${state.getBannerName()}`);

    return true;
};
