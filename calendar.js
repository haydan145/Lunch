// calendar.js — robust keyboard + button navigation
document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.getElementById("prevMonth");
  const nextBtn = document.getElementById("nextMonth");
  const monthYear = document.getElementById("monthYear");
  const calendarRoot = document.getElementById("calendar");

  if (!prevBtn || !nextBtn || !monthYear || !calendarRoot) {
    console.error("Calendar: required DOM elements not found (prevMonth, nextMonth, monthYear, calendar).");
    return;
  }

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  // start at Sept 2025
  let currentDate = new Date(2025, 8, 1);

  function renderCalendar(date) {
    calendarRoot.innerHTML = ""; // clear

    const year = date.getFullYear();
    const month = date.getMonth();
    monthYear.textContent = `${monthNames[month]} ${year}`;

    // header: day names
    const header = document.createElement("div");
    header.className = "day-names";
    dayNames.forEach(d => {
      const el = document.createElement("div");
      el.className = "day-name";
      el.textContent = d;
      header.appendChild(el);
    });
    calendarRoot.appendChild(header);

    // grid container
    const grid = document.createElement("div");
    grid.className = "days-grid";

    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // blank cells before the 1st
    for (let i = 0; i < firstWeekday; i++) {
      const blank = document.createElement("div");
      blank.className = "day-cell empty";
      grid.appendChild(blank);
    }

    // day cells
    for (let d = 1; d <= daysInMonth; d++) {
      const cell = document.createElement("div");
      cell.className = "day-cell";
      // structure: date + content placeholder
      const dateEl = document.createElement("div");
      dateEl.className = "date";
      dateEl.textContent = d;
      const content = document.createElement("div");
      content.className = "content";
      // keep empty for now - future events can go in content
      cell.appendChild(dateEl);
      cell.appendChild(content);
      grid.appendChild(cell);
    }

    calendarRoot.appendChild(grid);
  }

  function goPrevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  }
  function goNextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  }

  // button clicks
  prevBtn.addEventListener("click", goPrevMonth);
  nextBtn.addEventListener("click", goNextMonth);

  // keyboard navigation — robust:
  // - listens on document
  // - ignores when focus is inside input/textarea/contenteditable
  // - prevents default arrow behavior so it doesn't scroll the page
  document.addEventListener("keydown", (e) => {
    // ignore if typing in inputs
    const active = document.activeElement;
    if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable)) {
      return;
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrevMonth();
      // helpful debug log if you open the console
      console.debug("Calendar: ArrowLeft pressed → previous month");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNextMonth();
      console.debug("Calendar: ArrowRight pressed → next month");
    }
  });

  // initial render
  renderCalendar(currentDate);
});
