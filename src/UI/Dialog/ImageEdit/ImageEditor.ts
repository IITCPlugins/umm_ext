import { main } from "../../../Main";
import { State } from "../../../State/State";
import { checkbox } from "../Checkbox";
import { Bimage } from "../../../Helper/Image";
import { MissionImage } from "./MissionsImage";
import { EditMode, EditModeNone } from "./EditMode";
import { EM_MassEdit } from "./EM_MassEdit";
import { EM_DragEdit } from "./EM_Drag";
import { EM_Single } from "./EM_Single";

let dialog: JQuery;
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
                $("<button>", { id: "download-image", type: "button", text: "Download PNG", click: downloadCurrentImage }),
            )
        )
    );

    dialog = window.dialog({
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

    // TODO load multiple
    void loadImageFile(main.state, files[0]);
};


const loadImageFile = async (state: State, inputFile: File): Promise<void> => {
    const image = await Bimage.fromFile(inputFile);

    // split
    const count = state.getPlannedLength();
    const rows = Math.ceil(count / 6);
    const imgSize = Math.min(image.width / 6, image.height / rows);

    const offsetX = (image.width - imgSize * 6) / 2;
    const offsetY = (image.height - imgSize * rows) / 2;

    state.clearImages();
    const imageIndex = state.addImage(image);
    state.missions.forEach(mission => {
        const id = count - mission.id - 1; // reverse
        const x = id % 6;
        const y = Math.floor(id / 6);
        mission.setImage(imageIndex, {
            x: offsetX + x * imgSize,
            y: offsetY + y * imgSize,
            width: imgSize,
            height: imgSize,
        });
    })

    updatePreview();
    currentEditMode.imageReloaded();
};


const updatePreview = (): void => {
    tiles.forEach(t => t.update());
};



const downloadCurrentImage = async (): Promise<void> => {
    /*    if (!currentImage) return;
    
        const file = await currentImage.toFile('umm-image.png', 'image/png');
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name;
        link.click();
        URL.revokeObjectURL(url);*/
};


const onMaskChanged = (status: boolean) => {
    tiles.forEach(t => t.showMask(status));
}

const onBorderChanged = (status: boolean) => {
    tiles.forEach(t => t.showBorder(status));
}

