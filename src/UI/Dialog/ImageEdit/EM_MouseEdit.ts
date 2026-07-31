import { Rect } from "../../../UMM_types";
import { EditMode } from "./EditMode";
import { MissionImage } from "./MissionsImage";

export class EM_MouseEdit extends EditMode {

    private rect_backup: Rect[] = [];
    private dragging_image: MissionImage | undefined = undefined;
    private dragStartX: number = 0;
    private dragStartY: number = 0;

    move(_image: MissionImage, _dx: number, _dy: number) { /* override */ };
    zoom(_image: MissionImage, _delta: number, _cx: number, _cy: number) { /* override */ };


    constructor(images: MissionImage[]) {
        super(images);

        images.forEach(i => {
            i.tile.on("dblclick", this.onDoubleClick);
            i.tile.on("mousedown", this.onMouseDown);
            i.tile.on("wheel", this.onWheel);
        });
        this.imageReloaded();
    };


    destroy() {
        this.images.forEach(i => {
            i.tile.off("dblclick", this.onDoubleClick);
            i.tile.off("mousedown", this.onMouseDown);
            i.tile.off("wheel", this.onWheel);
        });

        super.destroy();
    };


    imageReloaded() {
        this.rect_backup = this.images.map(i => Object.assign({}, i.mission.imageRect));
    }


    onDoubleClick = (event: JQuery.DoubleClickEvent) => {
        const image = this.getImage(event?.target as HTMLElement);
        if (!image) return;

        const index = this.getImageIndex(image);

        image.mission.imageRect = this.rect_backup[index];
        image.update();
    }


    onMouseDown = (event: JQuery.MouseDownEvent) => {
        this.dragStartX = event.clientX!;
        this.dragStartY = event.clientY!;
        event.preventDefault();

        this.dragging_image = this.getImage((event?.target as HTMLElement));
        if (!this.dragging_image) return;

        $(window).on("mousemove", this.onMouseMove);
        $(window).on("mouseup", this.onMouseUp);
    };

    onMouseMove = (event: JQuery.MouseMoveEvent) => {
        if (!this.dragging_image) return;

        const scale = (this.dragging_image.mission.imageRect?.width ?? 500) / 500;

        const dx = scale * (event.clientX - this.dragStartX);
        const dy = scale * (event.clientY - this.dragStartY);
        this.dragStartX = event.clientX;
        this.dragStartY = event.clientY;

        this.move(this.dragging_image, -dx, -dy);
    };

    onMouseUp = (_event: JQuery.MouseUpEvent) => {
        this.dragging_image = undefined;

        $(window).off("mousemove", this.onMouseMove);
        $(window).off("mouseup", this.onMouseUp);
    };


    onWheel = (event: JQuery.Event) => {
        event.preventDefault();

        const delta = (event as any).originalEvent.wheelDelta;
        const image = this.getImage((event as any).target as HTMLElement);
        if (!image) return;


        const imgrect = image.mission.imageRect!;
        /*
            TODO: Take the real mouse position
            const htmlpos = image.tile.position();
            const htmlwidth = image.tile.width()!;
            const htmlheighh = image.tile.height()!;
            const rx = event.clientX! - htmlpos.left;
            const ry = event.clientY! - htmlpos.top;
            const cx = imgrect.x + rx / htmlwidth * imgrect.width;
            const cy = imgrect.y + ry / htmlheighh * imgrect.height;

            console.log("image_rect", imgrect);
            console.log("htmlpos", htmlpos, htmlwidth, htmlheighh);
            console.log("rx,ry", rx, ry);
            console.log("cx,cy", cx, cy);
        */
        const c1x = imgrect.x + imgrect.width / 2;
        const c1y = imgrect.y + imgrect.height / 2;

        const scale = (imgrect.width ?? 500) / 500;
        const zoom = 1 + delta * scale;

        this.zoom(image, zoom, c1x, c1y);
    }

}