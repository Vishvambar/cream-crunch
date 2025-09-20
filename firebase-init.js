  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey:"AIzaSyCfQoSWrD3MgszZk7bUKVuOQGrHm8lQNgY",
    authDomain: "finalyearproject-c903e.firebaseapp.com",
    databaseURL: "https://finalyearproject-c903e-default-rtdb.firebaseio.com",
    projectId: "finalyearproject-c903e",
    storageBucket: "finalyearproject-c903e.firebasestorage.app",
    messagingSenderId: "973186077279",
    appId: "1:973186077279:web:e8351c7b851c9f50d841ea",
    measurementId: "G-R8ZWZB515R"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);