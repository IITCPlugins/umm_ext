import { EM_MouseEdit } from "./EM_MouseEdit";
import { MissionImage } from "./MissionsImage";

export class EM_MassEdit extends EM_MouseEdit {

    move(_image: MissionImage, dx: number, dy: number) {
        this.images.forEach(i => i.move(dx, dy));
    };

    zoom(_image: MissionImage, delta: number, cx: number, cy: number) {
        this.images.forEach(i => i.zoomAroundCenter(cx, cy, delta));
    };

}
