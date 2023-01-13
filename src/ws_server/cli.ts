import { actions } from "./controlsActions";

interface CommandsMap {
    [index: string]: (dim1: number, dim2: number) => void | Promise<string> ;
}

export const runCommand = (command: string) => {
    const [cmd, dim1, dim2] = command.split(' ');
    
    const commands: CommandsMap = {
        'mouse_right' : (offset: number) => { actions.moveMouse('right', offset) },
        'mouse_left' : (offset: number) => { actions.moveMouse('left', offset) },
        'mouse_down' : (offset: number) => { actions.moveMouse('down', offset) },
        'mouse_up' : (offset: number) => { actions.moveMouse('up', offset) },

        'draw_rectangle' : (width: number, length: number) => { actions.drawRect(width, length) },
        'draw_square' : (size: number) => { actions.drawRect(size) },
        'draw_circle' : (radius: number) => { actions.drawCircle(radius) },

        'mouse_position' : () => { return actions.getPos() },
    };

    if (Object.keys(commands).includes(cmd)) {
        return commands[cmd](+dim1, +dim2);
    };

}