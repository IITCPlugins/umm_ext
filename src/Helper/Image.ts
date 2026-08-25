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


    async equal(a: Blob): Promise<boolean> {
        const b = await this.toBlob();
        if (a.size !== b.size || a.type !== b.type) {
            return false;
        }

        const [aBuffer, bBuffer] = await Promise.all([
            a.arrayBuffer(),
            b.arrayBuffer(),
        ]);

        const aBytes = new Uint8Array(aBuffer);
        const bBytes = new Uint8Array(bBuffer);

        if (aBytes.length !== bBytes.length) {
            return false;
        }

        return aBytes.every((value, i) => value === bBytes[i]);
    }

}
