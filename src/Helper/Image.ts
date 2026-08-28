export class Bimage {
    private canvas: HTMLCanvasElement;

    private constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        if (!canvas.getContext('2d')) {
            throw new Error('Unable to get 2D rendering context');
        }
    }

    public static empty(): Bimage {
        const canvas = Bimage.createDummyCanvas();
        return new Bimage(canvas);
    }


    private static createDummyCanvas() {
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error('Unable to get 2D rendering context for placeholder canvas');
        }

        context.fillStyle = '#efefef';
        context.fillRect(0, 0, canvas.width, canvas.height);

        const size = 16;
        context.fillStyle = '#e0e0e0';
        for (let y = 0; y < canvas.height; y += size) {
            for (let x = (y / size) % 2 ? 0 : size; x < canvas.width; x += size * 2) {
                context.fillRect(x, y, size, size);
            }
        }

        context.strokeStyle = '#c0c0c0';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(canvas.width, canvas.height);
        context.moveTo(canvas.width, 0);
        context.lineTo(0, canvas.height);
        context.stroke();

        context.fillStyle = '#666';
        context.font = '16px sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('No image', canvas.width / 2, canvas.height / 2);
        return canvas;
    }

    public static async fromString(dataString: string): Promise<Bimage> {
        const image = await this.loadImage(dataString);
        return this.fromImageElement(image);
    }

    public static async fromFile(file: File | Blob): Promise<Bimage> {
        const bitmap = await createImageBitmap(file);
        return this.fromImageBitmap(bitmap);
    }

    public static async fromURL(url: string): Promise<Bimage> {
        const response = await fetch(url, { cache: "default", });
        if (!response.ok) {
            throw new Error(`Failed to load image: ${response.status}`);
        }

        return Bimage.fromFile(await response.blob());
    }


    private static async loadImage(source: string): Promise<HTMLImageElement> {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = () => reject(new Error(`Failed to load image from string`));
            image.src = source;
        });
    }

    private static fromImageElement(image: HTMLImageElement): Bimage {
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth || image.width;
        canvas.height = image.naturalHeight || image.height;

        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error('Unable to get 2D rendering context');
        }

        context.drawImage(image, 0, 0);
        return new Bimage(canvas);
    }

    private static fromImageBitmap(bitmap: ImageBitmap): Bimage {
        const canvas = document.createElement('canvas');
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;

        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error('Unable to get 2D rendering context');
        }

        context.drawImage(bitmap, 0, 0);
        bitmap.close();
        return new Bimage(canvas);
    }

    public get width(): number {
        return this.canvas.width;
    }

    public get height(): number {
        return this.canvas.height;
    }

    public toString(type = 'image/png', quality?: number): string {
        return this.canvas.toDataURL(type, quality);
    }

    public async toBlob(type = 'image/png', quality?: number): Promise<Blob> {
        return new Promise<Blob>((resolve, reject) => {
            this.canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('Failed to convert canvas to Blob'));
                }
            }, type, quality);
        });
    }

    public async toFile(filename = 'image.png', type = 'image/png', quality?: number): Promise<File> {
        const blob = await this.toBlob(type, quality);
        return new File([blob], filename, { type });
    }

    public crop(x: number, y: number, width: number, height: number): Bimage {

        let needbackground = false;
        let sx = x;
        let sy = y;
        let sw = width;
        let sh = height;
        let dx = 0;
        let dy = 0;
        let dw = width;
        let dh = height;

        if (sx < 0) {
            dx = -sx;
            sx = 0;
            needbackground = true;
        }

        if (sy < 0) {
            dy = -sy;
            sy = 0;
            needbackground = true;
        }

        if (sx + sw > this.width) {
            sw = this.width - sx;
            dw = sw;
            needbackground = true;
        }
        if (sy + sh > this.height) {
            sh = this.height - sy;
            dh = sh;
            needbackground = true;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error('Unable to get 2D rendering context for crop');
        }

        if (needbackground) {
            context.save();
            context.filter = 'blur(20px)';
            const bx = Math.max(0, Math.min(x, this.width - width));
            const by = Math.max(0, Math.min(y, this.height - height));
            context.drawImage(this.canvas, bx, by, width, height, 0, 0, width, height);
            context.restore();
        }

        context.drawImage(this.canvas, sx, sy, sw, sh, dx, dy, dw, dh);
        return new Bimage(canvas);
    }


    public render(element: HTMLImageElement | HTMLCanvasElement): void {
        if (element instanceof HTMLImageElement) {
            element.src = this.toString();
            element.width = this.width;
            element.height = this.height;
            return;
        }

        if (element instanceof HTMLCanvasElement) {
            element.width = this.width;
            element.height = this.height;
            const context = element.getContext('2d');
            if (!context) {
                throw new Error('Unable to get 2D rendering context for target canvas');
            }
            context.clearRect(0, 0, this.width, this.height);
            return;
        }

        throw new Error('Unsupported render target: expected HTMLImageElement or HTMLCanvasElement');
    }


    private getPixels(width: number, height: number): ImageDataArray {

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d")!;
        if (!context) {
            throw new Error('Unable to get 2D rendering context for crop');
        }

        context.drawImage(this.canvas, 0, 0, width, height);
        return context.getImageData(0, 0, width, height).data;
    }


    public difference(b: Bimage): number {
        const width = 64;
        const height = 64;

        const aPixels = this.getPixels(width, height);
        const bPixels = b.getPixels(width, height);

        let score = 0;
        let pixels = 0;

        for (let i = 0; i < aPixels.length; i += 4) {
            const r1 = aPixels[i];
            const g1 = aPixels[i + 1];
            const b1 = aPixels[i + 2];

            const r2 = bPixels[i];
            const g2 = bPixels[i + 1];
            const b2 = bPixels[i + 2];

            // use YUV colorsapce with Luma weighted to compensate rescale and compression error
            const y1 = 0.299 * r1 + 0.587 * g1 + 0.114 * b1;
            const y2 = 0.299 * r2 + 0.587 * g2 + 0.114 * b2;
            const u1 = -0.168736 * r1 - 0.331264 * g1 + 0.5 * b1 + 128;
            const u2 = -0.168736 * r2 - 0.331264 * g2 + 0.5 * b2 + 128;
            const v1 = 0.5 * r1 - 0.418688 * g1 - 0.081312 * b1 + 128;
            const v2 = 0.5 * r2 - 0.418688 * g2 - 0.081312 * b2 + 128;

            score += Math.abs(y1 - y2) / 255 * 0.7;
            score += Math.abs(u1 - u2) / 255 * 0.15;
            score += Math.abs(v1 - v2) / 255 * 0.15;
            pixels += 1;
        }

        return score / pixels;
    }
}
