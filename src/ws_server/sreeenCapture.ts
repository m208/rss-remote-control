import { FileType, screen, Region, mouse } from "@nut-tree/nut-js";
import { resolve } from "path";

const screenShotPath = resolve(__dirname, "..", "temp");
const screenShotFileName = "screenshot";

export const makeScreenShot = async () => {
    const cursorPos = await mouse.getPosition();
    const region = new Region(cursorPos.x, cursorPos.y, 200, 200 );
    let imgPath = '';

    try {
        imgPath = await screen.captureRegion(screenShotFileName, region, FileType.PNG, screenShotPath);
    } catch {
        console.log('Error: Captured region is outside of display');
    }

    return imgPath;
} 


 
