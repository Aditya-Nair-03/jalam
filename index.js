// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiM4skboLz0paNgwjPJXYXE1ZRKMrCSQU",
  authDomain: "my-water-meter.firebaseapp.com",
  databaseURL: "https://my-water-meter-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-water-meter",
  storageBucket: "my-water-meter.appspot.com",
  messagingSenderId: "1012052047718",
  appId: "1:1012052047718:web:5735eb5a9665f609023aa7",
  measurementId: "G-R5FTE2V3T1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
console.log("Firebase Connected!");

// Firebase references
const flowRateRef = ref(database, "FlowRate");
const sessionUsageRef = ref(database, "SessionUsage");
const totalMilliLitresRef = ref(database, "TotalMilliLitres");

// DOM elements
const flowRateElement = document.getElementById("flow-rate");
const sessionUsageElement = document.getElementById("session-usage");
const totalUsageElement = document.getElementById("total-usage");

// Update DOM with real-time data from Firebase
onValue(flowRateRef, (snapshot) => {
  console.log("Flow Rate Updated:", snapshot.val());
  flowRateElement.textContent = snapshot.val();
});

onValue(sessionUsageRef, (snapshot) => {
  console.log("Session Usage Updated:", snapshot.val());
  sessionUsageElement.textContent = snapshot.val();
});

onValue(totalMilliLitresRef, (snapshot) => {
  console.log("Total Usage Updated:", snapshot.val());
  totalUsageElement.textContent = (snapshot.val() / 1000).toFixed(2); // Convert to liters
});

// Rain Animation
const container = document.querySelector("#three-container");
const counter = 100; // Number of raindrops

for (let i = 0; i < counter; i++) {
  const hrElement = document.createElement("hr");
  hrElement.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
  hrElement.style.animationDuration = 0.2 + Math.random() * 0.3 + "s";
  hrElement.style.animationDelay = Math.random() * 5 + "s";
  container.appendChild(hrElement);
}

// Hamburger Menu Toggle
const hamburger = document.querySelector(".hamburger-menu");
const dropdownMenu = document.querySelector(".dropdown-menu");

hamburger.addEventListener("click", () => {
  dropdownMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Dynamic User Data
const userNameElement = document.getElementById("user-name");
const userProfilePicture = document.getElementById("profile-picture");

// Example dynamic user data (replace with real data if needed)
const userData = {
  name: "Nikhil Mani Reji",
  profilePicture: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-black-icon.svg",
};

userNameElement.textContent = userData.name;
userProfilePicture.src = userData.profilePicture;

// Weekly Usage Chart (Placeholder)
const ctx = document.getElementById("weeklyUsageChart").getContext("2d");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Liters Used",
        data: [12, 19, 3, 5, 2, 3, 8],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Header Gradient Effect
const header = document.querySelector("header");
header.addEventListener("mousemove", (event) => {
  const rect = header.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const xPercent = (x / rect.width) * 100;
  const yPercent = Math.min((y / rect.height) * 100 + 20, 100);

  header.style.background = `
    radial-gradient(circle at ${xPercent}% ${yPercent}%, 
    rgb(41, 58, 64), 
    rgb(0, 0, 0) 80%)
  `;
});
