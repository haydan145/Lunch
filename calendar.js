// calendar.js — robust keyboard + button navigation with data

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

  // start at September 2025
  let currentDate = new Date(2025, 8, 1);

  // === Calendar Data ===
  const calendarData = {
    "2025-09": {
      "1": "No School",
      "2": "Meatballs and Marinara",
      "3": "Shredded Chicken",
      "4": "Pulled Pork",
      "5": "Cheese Pizza",
      "6": "",
      "7": "",
      "8": "Chicken Drumsticks",
      "9": "Tacos",
      "10": "Noodle Bar",
      "11": "Beef Bolognese",
      "12": "Hamburgers",
      "13": "",
      "14": "",
      "15": "General Tso's Chicken",
      "16": "Hot Dogs",
      "17": "Mac and Cheese",
      "18": "Apple Pork Chops",
      "19": "Cheese Quesadillas",
      "20": "",
      "21": "",
      "22": "Chicken Tenders",
      "23": "Tacos",
      "24": "Breakfast for Lunch",
      "25": "Spicy Korean Chicken",
      "26": "Pasta and French Fries",
      "27": "",
      "28": "",
      "29": "Meatballs and Marinara",
      "30": "Roasted Chicken"
    }
  };

  function renderCalendar(date) {
    calendarRoot.innerHTML = ""; // clear

    const year = date.getFullYear();
    const month = date.getMonth();
    const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;

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

      const dateEl = document.createElement("div");
      dateEl.className = "date";
      dateEl.textContent = d;

      const content = document.createElement("div");
      content.className = "content";

      // populate content if exists in calendarData
      if (calendarData[monthKey] && calendarData[monthKey][d]) {
        content.textContent = calendarData[monthKey][d];
      }

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

  // keyboard navigation — robust
  document.addEventListener("keydown", (e) => {
    const active = document.activeElement;
    if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable)) {
      return;
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrevMonth();
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
