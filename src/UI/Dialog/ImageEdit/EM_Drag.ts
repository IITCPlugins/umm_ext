import { EditMode } from "./EditMode";
import { MissionImage } from "./MissionsImage";

let draggingImage: MissionImage | undefined;

export class EM_DragEdit extends EditMode {


    constructor(images: MissionImage[]) {
        super(images);

        this.images.forEach(i => {
            i.tile.on("dragstart", this.onDragStart);
            i.tile.on("dragover", this.onDragOver);
            i.tile.on("drop", this.onDrop);
        });
    };


    destroy() {
        draggingImage = undefined;

        this.images.forEach(i => {
            i.tile.off("dragstart", this.onDragStart);
            i.tile.off("dragover", this.onDragOver);
            i.tile.off("drop", this.onDrop);

            i.tile.removeClass("selected");
        });

        super.destroy();
    };

    onDragStart = (event: JQuery.DragStartEvent) => {
        draggingImage = this.getImage(event.target as HTMLElement);
        if (!draggingImage) return;

        event.originalEvent?.dataTransfer?.setDragImage(draggingImage.getImageElement()[0], event.target.width! / 2, event.target.height! / 2);
    }

    onDragOver = (event: JQuery.DragOverEvent) => {
        event.preventDefault();
    }


    onDrop = (event: JQuery.DropEvent) => {
        const target = this.getImage(event.target as HTMLElement);

        if (target && draggingImage) {
            const source = target.mission;
            const destination = draggingImage.mission;

            const id = source.imageID;
            const rect = Object.assign({}, source.imageRect!);
            source.setImage(destination.imageID, destination.imageRect);
            destination.setImage(id, rect);

            target.update();
            draggingImage.update();
            draggingImage = undefined;
        }
    }

}