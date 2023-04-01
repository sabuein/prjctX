"use strict";

import { cl } from "../modules/helpers.mjs";

export default class User {
    
    static get keys() {
        return ["userCredentials", "userAddress", "clientDetails"];
    }

    static get defaultCredentials() {
        return {
            credentials: {
                type: null,
                id: null,
                email: null,
                password: null,
                name: null,
                iconURL: null
            }
        };
    }
    
    static get defaultAddress() {
        return {
            address: {
                number: null,
                street: null,
                postcode: null,
                city: null,
                country: null
            }
        };
    }

    static get defaultDetails() {
        return {
            client: null
        };
    }

    constructor(
        userCredentials = User.defaultCredentials,
        userAddress = User.defaultAddress,
        clientDetails = User.defaultDetails
    ) {
        this.clear;
        Object.assign(this.userCredentials, userCredentials);
        Object.assign(this.userAddress, userAddress);
        Object.assign(this.clientDetails, clientDetails);
        cl(`---| Creating new ${this.constructor.name}...\r\n`);
        cl(`---| New ${this.constructor.name} has been created. Welcome aboard, ${this.userCredentials.credentials.name}.`);
    }

    get clear() {
        const { defaultCredentials, defaultAddress, defaultDetails } = User;
        Object.assign(this, {
            userCredentials: defaultCredentials,
            userAddress: defaultAddress,
            clientDetails: defaultDetails
        });
    }

    set id(newId) {
        this.userCredentials.credentials.id = newId;
    }

    get id() {
        return this.userCredentials.credentials.id;
    }

    get whois() {
        return JSON.stringify({ ...this.userCredentials, ...this.userAddress, ...this.clientDetails }, null, "\t");
    }

    get fullAddress() {
        const result = [];
        Object.keys(this.userAddress.address).forEach((key) => {
            result.push(`${key}: ${this.userAddress.address[key]}`);
        });
        return result.join(", ");
    }

    get extra() {
        return `${JSON.stringify({ ...this.defaultDetails }, null, "\t")}`;
    }
}
