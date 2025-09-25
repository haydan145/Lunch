const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

let currentYear = 2025;
let currentMonth = 8; // start at Sept 2025

function renderCalendar(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  let html = `<table><tr>${daysOfWeek.map(d => `<th>${d}</th>`).join("")}</tr><tr>`;

  // Empty cells before 1st day
  for (let i = 0; i < firstDay.getDay(); i++) {
    html += "<td></td>";
  }

  // Dates
  for (let d = 1; d <= lastDay.getDate(); d++) {
    if ((firstDay.getDay() + d - 1) % 7 === 0 && d !== 1) {
      html += "</tr><tr>";
    }
    html += `<td>${d}</td>`;
  }

  html += "</tr></table>";

  document.getElementById("calendar").innerHTML = html;
  document.getElementById("monthYear").textContent = `${monthNames[month]} ${year}`;
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
