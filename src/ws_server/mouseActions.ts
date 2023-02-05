import { mouse, right, down, left, up, Point, Button, straightTo } from "@nut-tree/nut-js";

type Direction = 'up' | 'down' | 'right' | 'left';
type DirectionMap = {
    [key in Direction]: (px: number) => Promise<Point[]>
}

export const actions = {
    getPos: async () => {
        const pos = await mouse.getPosition();
        return `${pos.x},${pos.y}`;
    },

    moveMouse: async (dir: Direction, px: number) => {
        const directions: DirectionMap = {
            'up': up,
            'down': down,
            'right': right,
            'left': left,
        };

        await mouse.move(directions[dir](px));
    },

    drawRect: async (width: number, length: number = width) => {
        await mouse.pressButton(Button.LEFT);

        await actions.moveMouse('right', width);
        await actions.moveMouse('down', length);
        await actions.moveMouse('left', width);
        await actions.moveMouse('up', length);

        await mouse.releaseButton(Button.LEFT);
    },

    drawCircle: async (radius: number) => {
        const currentPosition = await mouse.getPosition();
        
        const center = new Point (currentPosition.x - radius, currentPosition.y);
        const dots = getPathForCircle(radius, center);
       
        await mouse.pressButton(Button.LEFT);
        for (const dot of dots) {
             await mouse.move(straightTo(dot));
        }
        await mouse.releaseButton(Button.LEFT);
    }
}

function getPathForCircle(radius: number, center: Point) {
    const dots: Array<Point> = [];
    
    for (let i = 360; i >= 0; i--) {
        dots.push(new Point(
            center.x + radius * Math.cos(i * Math.PI / 180),
            center.y + radius * Math.sin(i * Math.PI / 180)
        ));
    }

    return dots;
}