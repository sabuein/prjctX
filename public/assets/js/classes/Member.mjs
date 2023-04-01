"use strict";

import { cl } from "../modules/helpers.mjs";

export default class Member {
    
    static get keys() {
        return `${["credentials", "address", "details"].join(", ")}.`;
    }

    static get defaultCredentials() {
        return {
            credentials: {
                id: null,
                name: null,
                password: null
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
        return {};
    }

    constructor(
        credentials = Member.defaultCredentials,
        address = Member.defaultAddress,
        details = Member.defaultDetails
    ) {
        this.clear;
        Object.assign(this.credentials, credentials);
        Object.assign(this.address, address);
        Object.assign(this.details, details);
        cl(`---| Creating new ${this.constructor.name}...\r\n`);
        cl(`---| New ${this.constructor.name} has been created. Enjoy your visit.`);
    }

    get clear() {
        const { defaultCredentials, defaultAddress, defaultDetails } = Member;
        Object.assign(this, {
            credentials: defaultCredentials,
            address: defaultAddress,
            details: defaultDetails
        });
    }

    set id(newId) {
        this.credentials.credentials.id = newId;
    }

    get id() {
        return this.credentials.credentials.id;
    }

    get whois() {
        cl(`[*${this.constructor.name}] Calling someone's whois...\r\n`);
        /*cl(`[*${this.constructor.name}]\r\n${JSON.stringify(
                { ...this.credentials, ...this.address, ...this.details },
                null,
                "\t"
            )}`
        );
        cl(`------------------ Now returning:`);*/
        let result = JSON.stringify({ ...this.credentials, ...this.address, ...this.details }, null, "\t");
        return result;
    }

    get fullAddress() {
        const result = [];
        Object.keys(this.address.address).forEach((key) => {
            result.push(`${key}: ${this.address.address[key]}`);
        });
        cl(`[*${this.constructor.name}] Calling someone's fullAddress...\r\n`);
        cl(`[*${this.constructor.name}] ${result.join(", ")}`);
        return result.join(", ");
    }

    get extra() {
        // cl(`[*${this.constructor.name}] ${JSON.stringify({ ...this.defaultDetails }, null, "\t")}`);
        cl(`[*${this.constructor.name}]: ${JSON.stringify({ ...this.defaultDetails }, null, "\t")}`);
    }
}
