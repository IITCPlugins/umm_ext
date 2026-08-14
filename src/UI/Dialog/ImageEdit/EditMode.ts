import { Mission } from "../../../State/Mission";
import { MissionImage } from "./MissionsImage";

const SELECTED_CLASS = "selected";
export abstract class EditMode {

    protected images: MissionImage[];
    private lastClicked: number;
    private disableSelection: boolean;

    constructor(images: MissionImage[]) {
        this.images = images;
        this.lastClicked = -1;
        this.disableSelection = false;

        this.images.forEach(i => i.tile.on("click", this.onClick));
    }

    destroy(): void {
        this.images.forEach(i => {
            i.tile.off("click", this.onClick);
            i.tile.removeClass(SELECTED_CLASS);
        });
    }

    imageReloaded(): void { /* overload */ }

    onClick = (event: JQuery.ClickEvent) => {
        if (this.disableSelection) return;

        const image = this.getImage(event.target);
        if (!image) return;
        const index = this.getImageIndex(image);

        if (index === -1) return;

        if (event.shiftKey && this.lastClicked !== -1) {
            const start = Math.min(index, this.lastClicked);
            const end = Math.max(index, this.lastClicked);
            const toggle = this.images[this.lastClicked].tile.hasClass(SELECTED_CLASS);
            for (let i = start; i <= end; i++)
                this.images[i].tile.toggleClass(SELECTED_CLASS, toggle);
        } else {
            this.images[index].tile.toggleClass(SELECTED_CLASS);
        }

        this.lastClicked = index;
    }

    getSelectedImages(): MissionImage[] {
        return this.images.filter(i => i.tile.hasClass(SELECTED_CLASS));
    }

    getSelected(): Mission[] {
        return this.getSelectedImages()
            .map(i => i.mission)
            .reverse()
    }

    toggleSelectionMode(status: boolean) {
        this.disableSelection = !status;
        if (this.disableSelection) {
            this.images.forEach(i => i.tile.removeClass(SELECTED_CLASS));
        }
    }

    getImage(element: HTMLElement): MissionImage | undefined {
        return this.images.find(i => i.tile.is(element) || i.tile.is(element.parentElement!));
    }


    getImageIndex(image: MissionImage): number {
        return this.images.indexOf(image);
    }
}


export class EditModeNone extends EditMode {
}