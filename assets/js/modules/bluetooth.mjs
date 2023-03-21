import { ce, cl } from "./helpers.mjs";

const checkDevices = () => {
  let options = { filter: [{ services: ["battery_service"] }] };
  navigator.bluetooth
    .requestDevice(options)
    .then((device) => {
      cl(`Name: ${device.name}`);
    })
    .catch((error) => {
      ce(`Something went wrong. ${error}`);
    });
};

export { checkDevices };