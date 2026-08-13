/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { loadFileInput } from "../src/ImportExport";
import { State } from "../src/State/State";
import { notification } from "../src/UI/Notification";
import { doImport } from "./ME_Wrapper";
import { hideProgress, showProgress } from "./ProgressDialog";


class UMM_Editor {
    public state!: State;


    init() {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("./styles.pcss");

        // not logged in
        if (document.querySelector(".landing-page") !== null) return;


        $('.navbar-header').append(
            $("<div>", { id: "umm-badge", text: "UMM:" }),
            $("<div>", { id: "umm-mission-editor-bar" }).append(
                $("<div>", { id: "umm-mission-title", click: () => $("#umm-import-file").trigger("click") }),
                $("<div>", { style: "margin-top: 0.3em;" }).append(
                    $("<input>", { id: "umm-import-file", type: "file", accept: "application/JSON" }),
                    $("<label>", { for: "umm-import-file", class: "umm-upload-label" })
                ),
                $("<div>", { id: "umm-mission-picker-wrapper" }).append(
                    $("<select>", { id: "umm-mission-picker", class: "umm-mission-picker" }),
                    $("<button>", { id: "umm-mission-picker-btn", class: "umm-mission-picker-btn", text: "Import", click: () => this.importMission() /*, disabled: true*/ }),
                )
            ),
            $("<button>", { id: "umm-mission-picker-btn", class: "umm-mission-picker-btn", text: "show", click: () => showProgress("loading") }),
            $("<button>", { id: "umm-mission-picker-btn", class: "umm-mission-picker-btn", text: "hide", click: () => hideProgress() }),
        );

        this.state = new State();

        this.setActiveBannerTitle();
        this.bindFileImport();
        this.generateMissionSelect();
    }


    setActiveBannerTitle() {
        if (this.state.getBannerName() === "") {
            $("#umm-mission-title").text('Please load a mission file...');
        } else {
            $("#umm-mission-title").text(this.state.getBannerName());
        }
    }


    bindFileImport() {
        $("#umm-import-file")[0].addEventListener('change', async (event: Event) => {
            if (this.state.getBannerName() !== "") {
                if (!confirm("Are you sure you want to load this file? Doing so will overwrite any previously imported UMM data. Your existing missions will not be affected.")) {
                    return;
                }
            }
            $("#umm-mission-title").text("Loading banner... ");
            await loadFileInput(event, this.state);
            this.setActiveBannerTitle();
            this.generateMissionSelect();
        });
    }

    generateMissionSelect() {
        const selectedMission = this.state.getCurrent();

        const container = $("#umm-mission-picker");
        container.empty();

        this.state.missions.forEach(mission => {
            container.append(
                $("<option>", { value: mission.id, text: `${mission.id + 1}: ${mission.title}` })
            )
        })

        $("#umm-mission-picker").val(selectedMission);

        if (this.state.missions.count() > 0) {
            $("#umm-mission-picker-btn").prop("disabled", false);
        }
    }


    importMission() {
        const selectedMission = parseInt($("#umm-mission-picker").val() as string);
        main.state.setCurrent(selectedMission);
        void main.state.save();

        const mission = main.state.getEditMission();
        if (!mission || mission.isEmpty()) {
            notification('Mission has no text or portals');
            return;
        }

        void doImport(mission);
    }

}


export const main = new UMM_Editor();

// this is not IITC. just run it
(() => {
    (window as any).UMM = main; // if anybody else would like to interact
    main.init();
})();

