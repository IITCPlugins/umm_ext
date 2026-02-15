export class RenderBase {

    protected layer: L.LayerGroup<any>;

    constructor(name: string) {
        this.layer = new window.L.FeatureGroup();
        window.addLayerGroup(name, this.layer, true);
        this.toggle(false);
    }

    isVisible(): boolean {
        return window.map.hasLayer(this.layer);
    }

    isLayer(layer: L.ILayer): boolean {
        return layer === this.layer;
    }

    toggle(show: boolean) {
        if (show) {
            window.map.addLayer(this.layer);
        } else {
            window.map.removeLayer(this.layer);
        }
    }
}