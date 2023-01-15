import { rm } from "fs/promises";
import { resolve } from "path";

export const removeTempDirectory = async (path: string) => {
    const dirPath = resolve(path, '..');
   
    if (!dirPath) return;
    try {
        await rm(dirPath, { recursive: true });
    } catch (err) {
        console.log('FS operation failed');
    }
}