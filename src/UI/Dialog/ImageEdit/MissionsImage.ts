import { Mission } from "../../../State/Mission";
import imgMask from "../../../../images/mask.png";


export class MissionImage {
    public mission: Mission;
    public tile!: JQuery;


    constructor(mission: Mission) {
        this.mission = mission;
    }


    public createImage(): JQuery {
        this.tile = $("<div>", { class: "umm-tile" }).append(
            $("<img>", { class: "image" }),
            $("<img>", { class: "overlay", src: imgMask }),
        );

        this.update();

        return this.tile;
    }

    getImageElement(): JQuery {
        return $(".image", this.tile)
    }

    public update() {
        const picture = this.mission.getImage(this.state);
        const image = $(".image", this.tile).get(0) as HTMLImageElement;

        picture.render(image);
    }

    public showMask(status: boolean = true) {
        $(".overlay", this.tile).toggle(status);
    }

    public showBorder(status: boolean = true) {
        $(this.tile).toggleClass("border", status);
    }


    public move(dx: number, dy: number) {
        const rect = this.mission.imageRect;

        if (!rect) return;
        rect.x += dx;
        rect.y += dy;

        this.update();
    }

    public zoom(z: number) {
        const rect = this.mission.imageRect;
        if (!rect) return;

        const newwidth = rect.width * z;
        const newheight = rect.height * z;

        rect.x = rect.x + (rect.width - newwidth) / 2;
        rect.y = rect.y + (rect.height - newheight) / 2;
        rect.width = newwidth;
        rect.height = newheight;

        this.update();
    }


    public zoomAroundCenter(cx: number, cy: number, s: number) {
        const rect = this.mission.imageRect;
        if (!rect) return;

        rect.width = rect.width * s;
        rect.height = rect.height * s;

        rect.x = cx + (rect.x - cx) * s;
        rect.y = cy + (rect.y - cy) * s;

        this.update();
    }
}
