import { MissionImage } from "./MissionsImage";

export abstract class EditMode {

    protected images: MissionImage[];
    private selected: number = -1;

    constructor(images: MissionImage[]) {
        this.images = images;

        this.images.forEach(i => i.tile.on("click", this.onClick));
    }

    destroy(): void {
        this.images.forEach(i => {
            i.tile.off("click", this.onClick);
            i.tile.removeClass("selected");
        });
    }

    imageReloaded(): void { /* overload */ }

    onClick = (event: JQuery.ClickEvent) => {
        const image = this.getImage(event.target);
        if (!image) return;
        const index = this.getImageIndex(image);

        if (this.selected !== -1)
            this.images[this.selected].tile.removeClass("selected");

        if (this.selected === index) {
            this.selected = -1;
            return;
        }

        this.selected = index;
        if (this.selected !== -1)
            this.images[this.selected].tile.addClass("selected");
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