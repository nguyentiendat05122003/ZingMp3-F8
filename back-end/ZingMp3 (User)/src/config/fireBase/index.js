const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const config = require("./firebase.config");

(function initFirebase() {
  initializeApp(config.firebaseConfig);
})();

const storage = getStorage();
module.exports = storage;
