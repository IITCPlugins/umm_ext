import { EM_MouseEdit } from "./EM_MouseEdit";
import { MissionImage } from "./MissionsImage";

export class EM_MassEdit extends EM_MouseEdit {

    private getImages(eventTrigger: MissionImage): MissionImage[] {

        const selection = this.getSelectedImages();
        if (selection.length > 0) return selection;

        const id = eventTrigger.mission.imageID;
        return this.images.filter(pic => pic.mission.imageID === id);
    }

    move(image: MissionImage, dx: number, dy: number) {
        const tomove = this.getImages(image);
        tomove.forEach(i => i.move(dx, dy));
    };

    zoom(image: MissionImage, delta: number, cx: number, cy: number) {
        const tomove = this.getImages(image);
        tomove.forEach(i => i.zoomAroundCenter(cx, cy, delta));
    };

}
