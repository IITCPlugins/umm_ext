import { EM_MouseEdit } from "./EM_MouseEdit";
import { MissionImage } from "./MissionsImage";

export class EM_Single extends EM_MouseEdit {


    move(image: MissionImage, dx: number, dy: number) {
        image.move(dx, dy);
    };

    zoom(image: MissionImage, delta: number, cx: number, cy: number) {
        image.zoomAroundCenter(cx, cy, delta);
    };
}