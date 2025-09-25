document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.getElementById("prevMonth");
  const nextBtn = document.getElementById("nextMonth");
  const monthYear = document.getElementById("monthYear");
  const calendarRoot = document.getElementById("calendar");

  if (!prevBtn || !nextBtn || !monthYear || !calendarRoot) {
    console.error("Calendar elements missing");
    return;
  }

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  let currentDate = new Date(2025, 8, 1); // September 2025

  const calendarData = {
    "2025-09": {
      "1": "No School","2": "Meatballs and Marinara","3": "Shredded Chicken","4": "Pulled Pork","5": "Cheese Pizza",
      "6": "","7": "","8": "Chicken Drumsticks","9": "Tacos","10": "Noodle Bar",
      "11": "Beef Bolognese","12": "Hamburgers","13": "","14": "","15": "General Tso's Chicken",
      "16": "Hot Dogs","17": "Mac and Cheese","18": "Apple Pork Chops","19": "Cheese Quesadillas","20": "",
      "21": "","22": "Chicken Tenders","23": "Tacos","24": "Breakfast for Lunch","25": "Spicy Korean Chicken",
      "26": "Pasta and French Fries","27": "","28": "","29": "Meatballs and Marinara","30": "Roasted Chicken"
    }
  };

  function renderCalendar(date) {
    calendarRoot.innerHTML = "";

    const year = date.getFullYear();
    const month = date.getMonth();
    const monthKey = `${year}-${String(month + 1).padStart(2,"0")}`;

    monthYear.textContent = `${monthNames[month]} ${year}`;

    // Day headers
    dayNames.forEach(d => {
      const header = document.createElement("div");
      header.className = "day-name";
      header.textContent = d;
      calendarRoot.appendChild(header);
    });

    // Blank cells before first day
    const firstWeekday = new Date(year, month, 1).getDay();
    for (let i = 0; i < firstWeekday; i++) calendarRoot.appendChild(document.createElement("div"));

    // Day cells
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const cell = document.createElement("div");
      cell.className = "day-cell";

      const dateEl = document.createElement("div");
      dateEl.className = "date";
      dateEl.textContent = d;

      const content = document.createElement("div");
      content.className = "content";
      if (calendarData[monthKey] && calendarData[monthKey][d]) content.textContent = calendarData[monthKey][d];

      cell.appendChild(dateEl);
      cell.appendChild(content);
      calendarRoot.appendChild(cell);
    }
  }

  function goPrevMonth() { currentDate.setMonth(currentDate.getMonth()-1); renderCalendar(currentDate); }
  function goNextMonth() { currentDate.setMonth(currentDate.getMonth()+1); renderCalendar(currentDate); }

  prevBtn.addEventListener("click", goPrevMonth);
  nextBtn.addEventListener("click", goNextMonth);

  document.addEventListener("keydown", (e) => {
    const active = document.activeElement;
    if (active && (active.tagName==="INPUT"||active.tagName==="TEXTAREA"||active.isContentEditable)) return;
    if (e.key==="ArrowLeft") { e.preventDefault(); goPrevMonth(); }
    if (e.key==="ArrowRight") { e.preventDefault(); goNextMonth(); }
  });

  renderCalendar(currentDate);
});
