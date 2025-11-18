let users = [];
let currentUser = null;

let vehicles = [
  { id: 1, type: "Car", location: "Delhi", rent: 1500, available: true },
  { id: 2, type: "Bike", location: "Delhi", rent: 500, available: true },
  { id: 3, type: "SUV", location: "Mumbai", rent: 2500, available: true },
  { id: 4, type: "Car", location: "Chennai", rent: 1400, available: true },
];

// 1️⃣ Register User
function registerUser() {
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let msg = document.getElementById('registerMsg');

  if (!name || !email || !password) {
    msg.textContent = "All fields required!";
    msg.className = "error";
    return;
  }

  if (users.find(u => u.email === email)) {
    msg.textContent = "Email already registered!";
    msg.className = "error";
    return;
  }

  users.push({ name, email, password, rentalHistory: [] });
  msg.textContent = "Registration successful!";
  msg.className = "msg";

  document.getElementById('registrationSection').classList.add('hidden');
  document.getElementById('loginSection').classList.remove('hidden');
}

// 2️⃣ Login Validation
function loginUser() {
  let email = document.getElementById('loginEmail').value;
  let password = document.getElementById('loginPassword').value;
  let msg = document.getElementById('loginMsg');

  let user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    msg.textContent = "Invalid credentials!";
    msg.className = "error";
    return;
  }

  currentUser = user;
  msg.textContent = `Welcome, ${user.name}!`;
  msg.className = "msg";

  document.getElementById('loginSection').classList.add('hidden');
  document.getElementById('vehicleSection').classList.remove('hidden');
  displayVehicles();
  displayRentalHistory();
}

// 3️⃣ Display Vehicles
function displayVehicles() {
  let tbody = document.querySelector("#vehicleTable tbody");
  tbody.innerHTML = "";
  let typeFilter = document.getElementById('filterType').value;
  let locFilter = document.getElementById('filterLocation').value;

  vehicles
    .filter(v => v.available &&
      (!typeFilter || v.type === typeFilter) &&
      (!locFilter || v.location === locFilter))
    .forEach(v => {
      let row = `<tr>
          <td>${v.id}</td>
          <td>${v.type}</td>
          <td>${v.location}</td>
          <td>${v.rent}</td>
          <td><button onclick="rentVehicle(${v.id})">Rent</button></td>
        </tr>`;
      tbody.innerHTML += row;
    });
}

// 4️⃣ Rent Vehicle
function rentVehicle(id) {
  let vehicle = vehicles.find(v => v.id === id && v.available);
  if (!vehicle) return alert("Vehicle not available!");
  let days = prompt("Enter number of days:");
  if (!days || days <= 0) return alert("Invalid input!");

  vehicle.available = false;
  let total = vehicle.rent * days;
  currentUser.rentalHistory.push({
    type: vehicle.type,
    location: vehicle.location,
    days,
    total
  });

  alert(`You rented a ${vehicle.type} for ₹${total}`);
  displayVehicles();
  displayRentalHistory();
}

// 5️⃣ Show Rental History
function displayRentalHistory() {
  let tbody = document.querySelector("#rentalHistoryTable tbody");
  tbody.innerHTML = "";
  currentUser.rentalHistory.forEach(r => {
    let row = `<tr>
        <td>${r.type}</td>
        <td>${r.location}</td>
        <td>${r.days}</td>
        <td>${r.total}</td>
      </tr>`;
    tbody.innerHTML += row;
  });
}
