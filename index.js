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

// Weekly Usage Chart
const usageChartElement = document.getElementById("weeklyUsageChart").getContext("2d");
let usageData = []; // Stores last 7 minutes of usage
let previousTotal = 0; // Initially 0
let currentTotal = 0; // Current total value

// Initialize Chart.js
const usageChart = new Chart(usageChartElement, {
  type: "line",
  data: {
    labels: Array(7).fill("-"), // Placeholder labels
    datasets: [{
      label: "Usage (Liters per Minute)",
      data: usageData,
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 2,
      fill: false
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Get current total usage from Firebase
onValue(totalMilliLitresRef, (snapshot) => {
  currentTotal = parseFloat(snapshot.val() / 1000); // Convert to liters
  totalUsageElement.textContent = currentTotal.toFixed(2);
});

// Update Flow Rate in UI
onValue(flowRateRef, (snapshot) => {
  flowRateElement.textContent = snapshot.val();
});

// Update Session Usage in UI
onValue(sessionUsageRef, (snapshot) => {
  sessionUsageElement.textContent = snapshot.val();
});

// Calculate usage every minute
setInterval(() => {
  // Calculate the usage difference
  let usage = currentTotal - previousTotal;

  // Store usage in array, ensuring only positive values
  usageData.push(usage > 0 ? usage.toFixed(2) : 0);
  if (usageData.length > 7) {
    usageData.shift(); // Keep only last 7 values
  }

  // Update Chart
  updateChart();

  // Update previous total for the next minute
  previousTotal = currentTotal;
}, 60000); // Run every 60 seconds (1 minute)

// Function to Update Chart
function updateChart() {
  usageChart.data.labels = usageData.map((_, index) => `Min ${index + 1}`);
  usageChart.data.datasets[0].data = usageData;
  usageChart.update();
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

// Example dynamic user data
const userData = {
  name: "Nikhil Mani Reji",
  profilePicture: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-black-icon.svg",
};

userNameElement.textContent = userData.name;
userProfilePicture.src = userData.profilePicture;
