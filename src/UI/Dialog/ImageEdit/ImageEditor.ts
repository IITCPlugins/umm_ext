import { main } from "../../../Main";
import { State } from "../../../State/State";
import { checkbox } from "../Checkbox";
import { Bimage } from "../../../Helper/Image";
import { MissionImage } from "./MissionsImage";
import { EditMode, EditModeNone } from "./EditMode";
import { EM_MassEdit } from "./EM_MassEdit";
import { EM_DragEdit } from "./EM_Drag";
import { EM_Single } from "./EM_Single";
import { Mission } from "../../../State/Mission";

const tiles: MissionImage[] = [];

const enum EM {
    None,
    MassEdit,
    SingleEdit,
    DragEdit
}
let currentEditMode: EditMode = new EditModeNone([]);

export const showImageEditor = () => {

    const state = main.state;

    state.missions.forEach(mission => {
        tiles[mission.id] = new MissionImage(mission);
    })
    tiles.reverse();


    const html = $("<div>", { class: "container" }).append(
        $("<div>", { class: "imageContainer" }).append(
            [...tiles.map(t => t.createImage())]
        ),
        $("<div>", { class: "umm_group_container" }).append(
            $("<fieldset>", { class: "umm_group" }).append(
                $("<legend>", { text: "Edit mode" }),
                $("<div>").append(
                    $("<input>", { type: "radio", id: "EM_noEdit", name: "editmode", click: () => setEditMode(EM.None) }),
                    $("<label>", { for: "EM_noEdit", text: "no edit" }),
                ),
                $("<div>").append(
                    $("<input>", { type: "radio", id: "EM_massedit", name: "editmode", click: () => setEditMode(EM.MassEdit) }).prop('checked', true),
                    $("<label>", { for: "EM_massedit", text: "one image" })
                ),
                $("<div>").append(
                    $("<input>", { type: "radio", id: "EM_singleedit", name: "editmode", click: () => setEditMode(EM.SingleEdit) }),
                    $("<label>", { for: "EM_singleedit", text: "seperated images" }),
                ),
                $("<div>").append(
                    $("<input>", { type: "radio", id: "EM_swapedit", name: "editmode", click: () => setEditMode(EM.DragEdit) }),
                    $("<label>", { for: "EM_swapedit", text: "swap images" }),
                ),
            ),
            $("<fieldset>", { class: "umm_group" }).append(
                $("<legend>", { text: "View options" }),
                checkbox("temp2", "show mask", true).on("change", event => onMaskChanged($(event.target as HTMLElement).is(":checked"))),
                checkbox("temp2", "show border", false).on("change", event => onBorderChanged($(event.target as HTMLElement).is(":checked"))),
            ),
            $("<fieldset>", { class: "umm_group" }).append(
                $("<legend>", { text: "Import / Export" }),
                $("<input>", {
                    type: "file",
                    multiple: true,
                    accept: "image/png, image/jpeg",
                    change: loadImage
                }),
                $("<hr>").css({ width: "80%" }),
                $("<div>").append(
                    $("<button>", { id: "download-image", type: "button", text: "Download PNG", click: downloadCurrentImage }),
                    // checkbox("temp3", "as ZIP", true),
                )
            )
        )
    );

    window.dialog({
        title: "UUM-Image Edit",
        id: "umm_image_edit",
        width: 600,
        html,
        closeCallback: onDialogClose,
        classes: { "ui-dialog": "dialog-umm_image_edit" }
    });

    updatePreview();
    setEditMode(EM.MassEdit)
};


const setEditMode = (newMode: EM) => {
    currentEditMode.destroy();

    switch (newMode) {
        case EM.SingleEdit: currentEditMode = new EM_Single(tiles); break;
        case EM.MassEdit: currentEditMode = new EM_MassEdit(tiles); break;
        case EM.DragEdit: currentEditMode = new EM_DragEdit(tiles); break;

        default:
            currentEditMode = new EditModeNone([]);
    }
};


const onDialogClose = () => {
    setEditMode(EM.None);
    void main.state.save();
};


const loadImage = async (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (!files || files.length === 0) return;

    const state = main.state;

    let selected = currentEditMode.getSelected();
    if (selected.length === 0) selected = state.missions.getAll();
    console.assert(selected.length > 0, "there are no missions?!?");

    // selected.sort((a, b) => a.id - b.id);

    const chunks = selected.length / files.length;
    // eslint-disable-next-line unicorn/no-for-loop
    for (let index = 0; index < files.length; index++) {
        const missions = selected.slice(index * chunks, (index + 1) * chunks);
        await loadImageFile(state, missions, files[index]);
    }

    state.removeUnusedImages();
    updatePreview();
    currentEditMode.imageReloaded();
};


const loadImageFile = async (state: State, missions: Mission[], inputFile: File): Promise<void> => {
    const image = await Bimage.fromFile(inputFile);

    // split
    const count = missions.length;
    const rows = Math.ceil(count / 6);
    const columnCount = Math.min(count, 6);
    const imgSize = Math.min(image.width / columnCount, image.height / rows);

    const offsetX = (image.width - imgSize * columnCount) / 2;
    const offsetY = (image.height - imgSize * rows) / 2;

    const imageIndex = state.addImage(image);
    missions.forEach((mission, index) => {
        const id = count - index - 1; // reverse
        const x = id % 6;
        const y = Math.floor(id / 6);
        mission.setImage(imageIndex, {
            x: offsetX + x * imgSize,
            y: offsetY + y * imgSize,
            width: imgSize,
            height: imgSize,
        });
    })
};


const updatePreview = (): void => {
    tiles.forEach(t => t.update());
};



const downloadCurrentImage = async (): Promise<void> => {
    let missions = currentEditMode.getSelected();
    if (missions.length === 0) missions = main.state.missions.getAll();

    // eslint-disable-next-line @typescript-eslint/prefer-for-of, unicorn/no-for-loop
    for (let i = 0; i < missions.length; i++) {
        const mission = missions[i];
        const file = await mission.getImage().toFile(mission.getImageFilename(), 'image/png');
        saveAs(file, file.name, 'image/png');
    }

    /*
    const readableStream = new ZIP({
        start(ctrl) {
            ctrl.enqueue(file1)
            ctrl.enqueue(file2)
            ctrl.close()
        }
    })
    */
};


const onMaskChanged = (status: boolean) => {
    tiles.forEach(t => t.showMask(status));
}

const onBorderChanged = (status: boolean) => {
    tiles.forEach(t => t.showBorder(status));
}

