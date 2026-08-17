

export const show = (message = "Please wait…", prefix?: string) => {
    if ($("#userscript-progress-overlay").length > 0) {
        throw new Error("progress already visible");
    }

    const overlay = $("<div>", { id: "userscript-progress-overlay" }).append(
        $("<div>", { class: "progress-dialog" }).append(
            '<canvas id="progress-anim" width="250" height="250"></canvas>',
            $("<div>", { class: "progress-prefix", text: prefix ?? "" }),
            $("<div>", { class: "progress-message", }),
            $("<button>", { id: "progress-cancel", text: "cancel", click: () => hide() })
        ),
    );

    $("body").append(overlay);
    startAnim();

    $(".progress-message").text(message);
}

export const update = (message = "Please wait…") => {
    if ($("#userscript-progress-overlay").length === 0) {
        throw new Error("progress termiated");
    }
    $(".progress-message").text(message);
}

export const setPrefix = (text: string) => {
    $(".progress-prefix").text(text);
}


export const hide = () => {
    (anim_context as any) = undefined;
    $("#userscript-progress-overlay").remove();
}


export const isTerminated = (): boolean => {
    const existing = $("#userscript-progress-overlay");
    return (existing.length === 0);
}


interface Point { x: number, y: number, vx: number, vy: number };
let points: Point[] = [];
let startTime: number;
let anim_context: CanvasRenderingContext2D; // can be null/undefined
const radius = 5;
const boundaryX = 250;
const boundaryY = 250;
const speed = 1 / 2000;
const movementSpeed = 0.05;
const maxPoints = 10;


const startAnim = () => {
    const canvas = document.getElementById('progress-anim') as HTMLCanvasElement;
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    anim_context = canvas?.getContext('2d')!;

    (startTime as any) = undefined;
    points = [];

    createPoint();
    createPoint();

    requestAnimationFrame(animate);
}


const createPoint = () => {
    let point: Point;
    let distance;
    do {
        point = {
            x: radius + Math.random() * (boundaryX - radius * 2),
            y: radius + Math.random() * (boundaryY - radius * 2),
            vx: movementSpeed * (Math.random() * 2 - 1),
            vy: movementSpeed * (Math.random() * 2 - 1),
        }
        distance = points.reduce((md, v) => {
            const a = point.x - v.x;
            const b = point.y - v.y;
            const d = a * a + b * b;
            return Math.min(md, d);
        }, 200 * 200)
    } while (distance < 1000 * Math.random());

    points.push(point);
}


const drawCircle = (p: Point) => {
    anim_context.beginPath();
    anim_context.arc(p.x, p.y, radius, 0, 2 * Math.PI, false);
    anim_context.fillStyle = '#97badc';
    anim_context.fill();
}

const drawLine = (p1: Point, p2: Point) => {

    anim_context.save()
    anim_context.beginPath();
    anim_context.shadowColor = "red";
    anim_context.shadowBlur = 25;
    anim_context.moveTo(p1.x, p1.y);
    anim_context.lineTo(p2.x, p2.y);
    anim_context.lineWidth = 5;
    anim_context.strokeStyle = 'rgba(200, 20, 20, 0.1)'
    anim_context.stroke();
    anim_context.restore();

    anim_context.beginPath();
    anim_context.moveTo(p1.x, p1.y);
    anim_context.lineTo(p2.x, p2.y);
    anim_context.strokeStyle = '#8ab2d8'
    anim_context.stroke();


}


const draw = (timestamp: number) => {
    startTime ??= timestamp;
    let elapsed = (timestamp - startTime) * speed;

    if (elapsed > maxPoints + 1) {
        points = [];
        startTime = timestamp;
        createPoint();
        createPoint();
        return;
    }
    if (elapsed > maxPoints) {
        elapsed = maxPoints;
    }

    if (elapsed >= points.length - 1) {
        createPoint();
    }

    movement();

    const rest = Math.min(elapsed - Math.floor(elapsed), 1);

    for (let i = 0; i < points.length - 2; i++) {
        drawLine(points[i], points[i + 1]);
    }

    const source = points.at(-2)!;
    const destination = points.at(-1)!;
    const t = rest * rest * (3 - 2 * rest);

    const x = source.x + (destination.x - source.x) * t
    const y = source.y + (destination.y - source.y) * t
    drawLine(source, { x, y, vx: 0, vy: 0 });

    for (let i = 0; i < points.length - 1; i++) {
        drawCircle(points[i]);
    }
}

const movement = () => {
    points.forEach(p => {
        if (p.x + p.vx - radius < 0 || p.x + p.vx + radius > boundaryX) p.vx = -p.vx;
        if (p.y + p.vy - radius < 0 || p.y + p.vy + radius > boundaryY) p.vy = -p.vy;
        p.x += p.vx;
        p.y += p.vy;
    })

}


const animate = (time: number) => {
    if (!anim_context) return;
    anim_context.clearRect(0, 0, boundaryX, boundaryY);
    draw(time);
    requestAnimationFrame(animate);
}