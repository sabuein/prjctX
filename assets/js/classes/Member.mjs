"use strict";

import { cl } from "../modules/helpers.mjs";

export default class Member {

    static get keys() {
        return ["address", "access"];
    }

    static get defaultAddress() {
        return {
            number: null,
            street: null,
            postcode: null,
            city: null,
            country: null
        };
    }

    static get defaultAccess() {
        return {
            username: null,
            password: null
        };
    }

    constructor(address = Member.defaultAddress, access = Member.defaultAccess) {
        this.clear();
        Object.assign(this.address, address);
        Object.assign(this.access, access);
    }

    clear() {
        const { defaultAddress, defaultAccess } = Member;
        Object.assign(this, { address: defaultAddress, access: defaultAccess })
    }
    
    fullAddress() {
        const result = [];
        Object.keys(this.address).forEach(key => {
            result.push(`${key}: ${this.address[key]}`);
        });
        cl(`[*Art Collector] ${result.join(", ")}`);
        return result.join(", ");
    }

    whois() {
        cl(`[*Art Collector] ${JSON.stringify({...this.address, ...this.access})}`);
    }
}