// admin.js
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, ref, set, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const auth = getAuth();
const db = getDatabase();

// Logout Functionality
document.getElementById('logout-btn').addEventListener('click', () => {
    signOut(auth).then(() => {
        alert("Logged out successfully!");
        window.location.href = "login.html"; // Redirect to login
    });
});

// Load Users
function loadUsers() {
    const userTable = document.getElementById('user-table');
    userTable.innerHTML = ''; // Clear table
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const user = childSnapshot.val();
            const row = `
                <tr>
                    <td>${childSnapshot.key}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="editUser('${childSnapshot.key}')">Edit</button>
                        <button onclick="deleteUser('${childSnapshot.key}')">Delete</button>
                    </td>
                </tr>
            `;
            userTable.insertAdjacentHTML('beforeend', row);
        });
    });
}

// Add User
document.getElementById('add-user-btn').addEventListener('click', () => {
    const userId = prompt("Enter User ID:");
    const name = prompt("Enter Name:");
    const email = prompt("Enter Email:");
    if (userId && name && email) {
        set(ref(db, 'users/' + userId), {
            name,
            email
        });
        alert("User added successfully!");
        loadUsers();
    }
});

// Edit User
function editUser(userId) {
    const name = prompt("Enter new name:");
    const email = prompt("Enter new email:");
    if (name && email) {
        update(ref(db, 'users/' + userId), { name, email });
        alert("User updated successfully!");
        loadUsers();
    }
}

// Delete User
function deleteUser(userId) {
    if (confirm("Are you sure you want to delete this user?")) {
        remove(ref(db, 'users/' + userId));
        alert("User deleted successfully!");
        loadUsers();
    }
}

// Load Water Usage Data
function loadUsageData() {
    const usageTable = document.getElementById('usage-table');
    usageTable.innerHTML = ''; // Clear table
    const usageRef = ref(db, 'waterUsage');
    onValue(usageRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const usage = childSnapshot.val();
            const row = `
                <tr>
                    <td>${childSnapshot.key}</td>
                    <td>${usage.name}</td>
                    <td>${usage.usage} L</td>
                    <td>${usage.lastUpdated}</td>
                </tr>
            `;
            usageTable.insertAdjacentHTML('beforeend', row);
        });
    });
}

// Send Notification
document.getElementById('send-notification-btn').addEventListener('click', () => {
    const message = document.getElementById('notification-text').value;
    if (message) {
        set(ref(db, 'notifications/' + Date.now()), { message });
        alert("Notification sent successfully!");
        document.getElementById('notification-text').value = ''; // Clear textarea
    } else {
        alert("Please enter a notification message!");
    }
});

// Initialize
loadUsers();
loadUsageData();