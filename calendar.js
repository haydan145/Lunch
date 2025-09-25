const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

let currentYear = 2025;
let currentMonth = 8; // Sept 2025

function renderCalendar(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Update header
  document.getElementById("monthYear").textContent = `${monthNames[month]} ${year}`;

  // Days of week header
  const daysHeader = document.getElementById("daysOfWeek");
  daysHeader.innerHTML = daysOfWeek.map(d => `<div>${d}</div>`).join("");

  // Grid cells
  const grid = document.getElementById("calendarGrid");
  grid.innerHTML = "";

  // Empty cells before the first day
  for (let i = 0; i < firstDay.getDay(); i++) {
    grid.innerHTML += `<div class="calendar-cell"></div>`;
  }

  // Fill days
  for (let d = 1; d <= lastDay.getDate(); d++) {
    grid.innerHTML += `
      <div class="calendar-cell">
        <div class="date">${d}</div>
        <div class="content"></div> <!-- placeholder for events -->
      </div>
    `;
  }
}

document.getElementById("prevMonth").addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentYear, currentMonth);
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentYear, currentMonth);
});

window.onload = () => renderCalendar(currentYear, currentMonth);
const monthYear = document.getElementById("monthYear");
const calendar = document.getElementById("calendar");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

let currentDate = new Date(2025, 8); // Start at September 2025

// Month and day names
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function renderCalendar(date) {
  calendar.innerHTML = ""; // Clear previous

  const year = date.getFullYear();
  const month = date.getMonth();

  // Month & Year title
  monthYear.textContent = `${monthNames[month]} ${year}`;

  // First day & number of days
  const firstDay = n

