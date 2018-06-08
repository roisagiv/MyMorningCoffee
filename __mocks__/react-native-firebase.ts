/* tslint:disable:no-implicit-dependencies */
import firebase from "firebase";

const mock = {
  database: firebase.database,
  initializeApp: firebase.initializeApp
};

export default mock;
