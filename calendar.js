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
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create header (day names)
  const headerRow = document.createElement("div");
  headerRow.classList.add("day-names");
  dayNames.forEach(d => {
    const cell = document.createElement("div");
    cell.classList.add("day-name");
    cell.textContent = d;
    headerRow.appendChild(cell);
  });
  calendar.appendChild(headerRow);

  // Create grid for days
  const grid = document.createElement("div");
  grid.classList.add("days-grid");

  // Blank slots before the first day
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    blank.classList.add("day-cell", "empty");
    grid.appendChild(blank);
  }

  // Add actual days
  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement("div");
    cell.classList.add("day-cell");
    cell.textContent = d;
    grid.appendChild(cell);
  }

  calendar.appendChild(grid);
}

// Navigation functions
function goPrevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
}

function goNextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
}

// Button listeners
prevBtn.addEventListener("click", goPrevMonth);
nextBtn.addEventListener("click", goNextMonth);

// Arrow key listener
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    goPrevMonth();
  } else if (e.key === "ArrowRight") {
    goNextMonth();
  }
});

// Initial render
renderCalendar(currentDate);
