import { Buffer } from "buffer";

export const fileToBase64 = file => new Promise((resolve, reject) => {
    const render = new FileReader();
    render.readAsDataURL(file);
    render.onload = () => resolve(render.result)
    render.onerror = (error) => reject(error)
})

export const blobToBase64 = blob => {
    if(blob) return new Buffer(blob, 'base64').toString('binary');
    else return false;
}

