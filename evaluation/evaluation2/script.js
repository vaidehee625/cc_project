// Dummy flight data
const flights = [
  { id: 1, source: "Delhi", destination: "London", date: "2025-11-01", seats: 5 },
  { id: 2, source: "Delhi", destination: "Paris", date: "2025-11-02", seats: 2 },
  { id: 3, source: "Mumbai", destination: "New York", date: "2025-11-01", seats: 3 },
  { id: 4, source: "Bangalore", destination: "Tokyo", date: "2025-11-03", seats: 4 },
  { id: 5, source: "Chennai", destination: "Dubai", date: "2025-11-01", seats: 6 }
];

let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = null;

// ---------- Registration ----------
function register() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("auth-msg");

  if (!username || !password) {
    msg.textContent = "Please enter username and password.";
    return;
  }

  if (users.find(u => u.username === username)) {
    msg.textContent = "User already exists. Please login.";
    return;
  }

  users.push({ username, password, bookings: [] });
  localStorage.setItem("users", JSON.stringify(users));
  msg.textContent = "Registration successful! You can now log in.";
}

// ---------- Login ----------
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("auth-msg");

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    msg.textContent = "Invalid credentials!";
    return;
  }

  currentUser = user;
  msg.textContent = "";
  document.getElementById("auth-section").classList.add("hidden");
  document.getElementById("flight-section").classList.remove("hidden");
  document.getElementById("history-section").classList.remove("hidden");
  displayBookingHistory();
}

// ---------- Search Flights ----------
function searchFlights() {
  const source = document.getElementById("source").value.trim().toLowerCase();
  const destination = document.getElementById("destination").value.trim().toLowerCase();
  const date = document.getElementById("date").value.trim();
  const results = document.getElementById("flight-results");

  results.innerHTML = "";

  if (!source || !destination || !date) {
    results.innerHTML = "<p>Please fill all fields.</p>";
    return;
  }

  // Case-insensitive match
  const matchedFlights = flights.filter(f =>
    f.source.toLowerCase() === source &&
    f.destination.toLowerCase() === destination &&
    f.date === date &&
    f.seats > 0
  );

  if (matchedFlights.length === 0) {
    results.innerHTML = "<p>No flights found for the selected route/date.</p>";
    return;
  }

  matchedFlights.forEach(f => {
    const div = document.createElement("div");
    div.className = "flight-card";
    div.innerHTML = `
      <p><strong>Flight ID:</strong> ${f.id}</p>
      <p>${f.source} → ${f.destination}</p>
      <p>Date: ${f.date}</p>
      <p>Seats Available: ${f.seats}</p>
      <button onclick="bookFlight(${f.id})">Book Flight</button>
    `;
    results.appendChild(div);
  });
}

// ---------- Book Flight ----------
function bookFlight(flightId) {
  const flight = flights.find(f => f.id === flightId);
  if (flight && flight.seats > 0) {
    flight.seats--;
    currentUser.bookings.push({
      id: flight.id,
      source: flight.source,
      destination: flight.destination,
      date: flight.date
    });
    localStorage.setItem("users", JSON.stringify(users));
    alert(`✅ Flight booked successfully!\n${flight.source} → ${flight.destination}`);
    searchFlights(); // Refresh flight list
    displayBookingHistory();
  } else {
    alert("❌ No seats available for this flight.");
  }
}

// ---------- Booking History ----------
function displayBookingHistory() {
  const container = document.getElementById("booking-history");
  container.innerHTML = "";

  if (!currentUser || currentUser.bookings.length === 0) {
    container.innerHTML = "<p>No bookings yet.</p>";
    return;
  }

  currentUser.bookings.forEach(b => {
    const div = document.createElement("div");
    div.className = "flight-card";
    div.innerHTML = `
      <p>Flight ${b.id}: ${b.source} → ${b.destination}</p>
      <p>Date: ${b.date}</p>
    `;
    container.appendChild(div);
  });
}
