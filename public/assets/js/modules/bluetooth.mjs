import { cl } from "helpers";

const checkDevices = () => {
  let options = { filter: [{ services: ["battery_service"] }] };
  navigator.bluetooth
    .requestDevice(options)
    .then((device) => {
      cl(`Name: ${device.name}`);
    })
    .catch((error) => {
      cl(`Something went wrong. ${error}`);
    });
};

export { checkDevices as checkBluetoothDevices };