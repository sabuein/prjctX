"use strict";

import { cl } from "../modules/helpers.mjs";

export default class User {
  static get keys() {
    return ["credentials", "address", "client", "optional"];
  }

  static get defaultCredentials() {
    return {
      id: null,
      name: null,
      type: null,
      iconURL: null,
      password: null
    };
  }

  static get defaultAddress() {
    return {};
  }

  static get defaultClient() {
    return {};
  }

  static get defaultOptional() {
    return {};
  }

  constructor(
    userCredentials = User.defaultCredentials,
    userAddress = User.defaultAddress,
    userClient = User.defaultClient,
    userOptional = User.defaultOptional
  ) {
    this.clear;
    Object.assign(this.credentials, userCredentials);
    Object.assign(this.address, userAddress);
    Object.assign(this.client, userClient);
    Object.assign(this.optional, userOptional);
    let type = this.constructor.name,
      user = this.credentials;
    cl(`Creating new ${type}...`);
    cl(`New ${type} has been created successfully...`);
    cl(`Welcome aboard, ${user.name}...`);
    cl(this.loginDetails);
  }

  get clear() {
    const { defaultCredentials, defaultAddress, defaultClient, defaultOptional } =
      User;
    Object.assign(this, {
      credentials: defaultCredentials,
      address: defaultAddress,
      client: defaultClient,
      optional: defaultOptional,
    });
  }

  set id(newId) {
    this.credentials.id = newId;
  }

  get id() {
    return this.userCredentials.credentials.id;
  }

  get whois() {
    const str = JSON.stringify(
      { ...this.credentials, ...this.address, ...this.client, ...this.optional },
      null,
      "\t"
    );
    const obj = JSON.parse(str);
    console.log(obj);
    return obj;
  }

  get fullAddress() {
    const result = [];
    Object.keys(this.userAddress.address).forEach((key) => {
      result.push(`${key}: ${this.userAddress.address[key]}`);
    });
    return result.join(", ");
  }

  get loginDetails() {
    let user = this.credentials;
    return JSON.stringify({ username: user.id, password: user.password }, null, "\t");
  }
}
