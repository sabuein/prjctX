"use strict";

import { cl } from "../modules/helpers.mjs";

export default class User {
    
    static get keys() {
        return ["credentials", "address", "client", "extra"];
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

    static get defaultClient() {
        return {
            client: null
        };
    }

    static get defaultExtra() {
        return {
            extra: null
        };
    }

    constructor(
        userCredentials = User.defaultCredentials,
        userAddress = User.defaultAddress,
        userClient = User.defaultClient,
        userExtra = User.defaultExtra
    ) {
        this.clear;
        Object.assign(this.credentials, userCredentials);
        Object.assign(this.address, userAddress);
        Object.assign(this.client, userClient);
        Object.assign(this.extra, userExtra);
        let type = this.constructor.name, user = this.credentials.credentials;
        cl(`Creating new ${type}...`);
        cl(`New ${type} has been created successfully with ID: ${user.id}.`);
        cl(`Welcome aboard, ${user.name}.`);
    }

    get clear() {
        const { defaultCredentials, defaultAddress, defaultClient, defaultExtra } = User;
        Object.assign(this, {
            credentials: defaultCredentials,
            address: defaultAddress,
            client: defaultClient,
            extra: defaultExtra
        });
    }

    set id(newId) {
        this.credentials.id = newId;
    }

    get id() {
        return this.userCredentials.credentials.id;
    }

    get whois() {
        const str = JSON.stringify({ ...this.credentials, ...this.address, ...this.client, ...this.extra }, null, "\t");
        const obj = JSON.parse(str);
        console.dir(obj);
        return obj;
    }

    get fullAddress() {
        const result = [];
        Object.keys(this.userAddress.address).forEach((key) => {
            result.push(`${key}: ${this.userAddress.address[key]}`);
        });
        return result.join(", ");
    }
}
