"use strict";

import { cl } from "helpers";
import {
  cookieEnabled,
  getUserAgentController,
  getUserAgentData,
  getUserLanguages,
  insertUserLocation,
} from "hints";

export default class User {

  static async clientInfo() {
    return ({
      cookieEnabled: await cookieEnabled(),
      clientController: getUserAgentController(),
      clientLocation: await insertUserLocation(),
      clientLanguages: await getUserLanguages(),
      clientData: await getUserAgentData(),
    });
  }

  static get keys() {
    return ["credentials", "profile", "client", "visit"];
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

  static get defaultProfile() {
    return {
      email: null,
      address: {
        number: 129,
        street: "Seymour Road",
        postcode: "E10 7LZ",
        city: "London",
        country: "United Kingdom"
      },
    };
  }

  static get defaultClient() {
    return User.clientInfo();
  }

  static get defaultVisit() {
    return {
      id: Math.random(2).toString(21).substring(2, 12),
      uid: Math.random().toString(36).replace(/[^a-z]+/g, ""),
      time: new Date(),
      visit: "Welcome to prjctX",
    };
  }

  constructor(
    userCredentials = User.defaultCredentials,
    userProfile = User.defaultProfile,
    userClient = User.defaultClient,
    userVisit = User.defaultVisit
  ) {
    this.clear;
    Object.assign(this.credentials, userCredentials);
    Object.assign(this.profile, userProfile);
    Object.assign(this.client, userClient);
    Object.assign(this.visit, userVisit);
    let type = this.constructor.name,
      user = this.credentials;
    cl(`Creating new ${type}...`);
    cl(`New ${type} has been created successfully...`);
    cl(`Welcome aboard, ${user.name}...`);
    cl(this.loginDetails);
    cl(this.visitDetails);
  }

  get clear() {
    const { defaultCredentials, defaultProfile, defaultClient, defaultVisit } = User;
    Object.assign(this, {
      credentials: defaultCredentials,
      profile: defaultProfile,
      client: defaultClient,
      visit: defaultVisit,
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
    let creds = this.credentials;
    return JSON.stringify({
      username: creds.id,
      password: creds.password,
    }, null, "\t");
  }

  get visitDetails() {
    let visit = this.visit;
    return JSON.stringify({
      id: visit.id,
      time: visit.time,
    }, null, "\t");
  }

}
