"use strict";

class Patients {
  constructor() {
    this.patients = loadJSON("patients.json");
  }

  get patients() {
    return this.patients;
  }
}
