import { cl } from "./helpers.mjs";

const checkDevices = () => {
    let options = { filter: [{ services: ["battery_service"] }] };
    window.navigator.bluetooth.requestDevice(options).then(device => {
        cl(device.name);
    }).catch(error => cl(error));
}

export { checkDevices };