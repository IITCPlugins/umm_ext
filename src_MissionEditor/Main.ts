/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { loadFileInput } from "../src/ImportExport";
import { State } from "../src/State/State";
import { notification } from "../src/UI/Notification";
import { doImport, doImportAll, findMission, getRemainingMissions } from "./ME_Wrapper";
import "./PatchNia";


class UMM_Editor {
    public state!: State;
    private last_mission = -1;


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
                    $("<select>", { id: "umm-mission-picker", class: "umm-mission-picker", click: () => this.onMissionSelect() }),
                    $("<button>", { id: "umm-mission-picker-btn", class: "umm-mission-picker-btn", text: "Import", click: () => this.importMission() /*, disabled: true*/ }),
                ),
                $("<span>", { id: "umm-mission-edit" })
            ),
        );

        this.state = new State();

        this.setActiveBannerTitle();
        this.bindFileImport();
        void this.generateMissionSelect();
        void this.generateImportOptions();
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
            void this.generateMissionSelect();
            void this.generateImportOptions();
        });
    }

    async generateMissionSelect() {
        const container = $("#umm-mission-picker");
        container.empty();

        // Import All
        const remaining = await getRemainingMissions();
        if (remaining !== -1 && remaining >= this.state.missions.count()) {
            container.append($("<option>", { value: -1, text: `-- ALL MISSIONS -- (${this.state.missions.count()})` }));
        } else {
            this.last_mission = 0;
            container.append($("<option>", { value: -1, text: `-- not enough remaining missions slots --`, disable: true }));
        }

        // Single Missions
        this.state.missions.forEach(mission => {
            container.append(
                $("<option>", { value: mission.id, text: `${mission.id + 1}: ${mission.title}` })
            )
        })

        $("#umm-mission-picker").val(this.last_mission);

        if (this.state.missions.count() > 0) {
            $("#umm-mission-picker-btn").prop("disabled", false);
        }
    }

    onMissionSelect() {
        void this.generateImportOptions();
    }


    async generateImportOptions() {
        const selectedMission = parseInt($("#umm-mission-picker").val() as string);

        if (selectedMission === -1) {
            let exists = 0;
            let draft = 0;
            const allmissions = this.state.missions.getAll();
            for (const mission of allmissions) {
                const existing_mission = await findMission(mission.title);
                if (existing_mission !== undefined) {
                    exists++;
                    if (existing_mission.state !== MissionStates.PUBLISHED) {
                        draft++;
                    }
                }
            }
            const newMisison = allmissions.length - exists;
            const text = [];
            if (newMisison > 0) text.push(`${newMisison} will be created`);
            if (draft > 0) text.push(`${draft} will be skipped`);
            if (exists > 0) text.push(`${exists} will be checked and update`);

            $("#umm-mission-edit").text(text.join(", "));
        } else {

            const mission = this.state.missions.get(selectedMission);
            if (!mission) {
                $("#umm-mission-edit").text("");
                return;
            }
            const exists = await findMission(mission.title);
            if (exists) {
                if (exists.state === MissionStates.PUBLISHED) {
                    $("#umm-mission-edit").text("must be ");
                } else {
                    $("#umm-mission-edit").text("will be updated");
                }
            }
            else $("#umm-mission-edit").text("will be created")
        }
    }


    importMission() {
        const selectedMission = parseInt($("#umm-mission-picker").val() as string);

        if (selectedMission === -1) {
            void this.importAllMissions();
            return;
        }

        main.state.setCurrent(selectedMission);
        this.last_mission = selectedMission;
        void main.state.save();

        const mission = main.state.getEditMission();
        if (!mission || mission.isEmpty()) {
            notification('Mission has no text or portals');
            return;
        }

        void doImport(mission);
    }

    async importAllMissions() {
        const remaining = await getRemainingMissions();
        if (remaining < this.state.missions.count()) {
            notification('No enough missions slots remaining');
            return;
        }

        const missions = main.state.missions.getAll();
        if (missions.some(m => m.isEmpty() || !m.hasImage() || m.portals.length < 6)) {
            notification('Some Missions are missing data');
            return;
        }

        await doImportAll(missions);
    }
}


export const main = new UMM_Editor();

// this is not IITC. just run it
(() => {
    (window as any).UMM = main; // if anybody else would like to interact
    main.init();
})();

