
  const students = ["kalyani", "teju", "vyshnavi", "pooja", "rubina","chetana","pranitha"];
  const dates = ["Date 1", "Date 2", "Date 3", "Date 4"];
  const tableBody = document.getElementById("tableBody");

  function createInput(cell, studentIndex) {
    const input = document.createElement("input");
    input.maxLength = 1;
    input.style.width = "30px";
    input.addEventListener("input", () => {
      const value = input.value.toUpperCase();
      input.value = value;

      // Set color
      input.className = "";
      if (value === "P") input.classList.add("present");
      else if (value === "A") input.classList.add("absent");
      else if (value === "L") input.classList.add("late");

      calculatePercentage(studentIndex);
    });
    cell.appendChild(input);
  }

  function calculatePercentage(studentIndex) {
    const row = tableBody.children[studentIndex];
    let presentCount = 0;
    let total = dates.length;

    for (let i = 1; i <= dates.length; i++) {
      const input = row.cells[i].querySelector("input");
      if (input) {
        const val = input.value.toUpperCase();
        if (val === "P" || val === "L") {
          presentCount++;
        }
      }
    }

    const percentCell = row.cells[dates.length + 1];
    const percentage = ((presentCount / total) * 100).toFixed(0);
    percentCell.textContent = `${percentage}%`;
  }

  function renderStudent(name) {
    const row = tableBody.insertRow();
    const index = tableBody.rows.length - 1;

    row.insertCell().textContent = name;

    for (let i = 0; i < dates.length; i++) {
      createInput(row.insertCell(), index);
    }

    row.insertCell().textContent = "0%"; // Percentage cell

    // Action Cell
    const actionCell = row.insertCell();
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      tableBody.deleteRow(index);
      updateAllPercentages(); // Recalculate after deletion
    };
    actionCell.appendChild(deleteBtn);
  }

  function addStudent() {
    const nameInput = document.getElementById("studentNameInput");
    const name = nameInput.value.trim();
    if (name) {
      students.push(name);
      renderStudent(name);
      nameInput.value = "";
    } else {
      alert("Please enter a valid student name.");
    }
  }

  function updateAllPercentages() {
    for (let i = 0; i < tableBody.rows.length; i++) {
      calculatePercentage(i);
    }
  }

  // Initial render
  students.forEach(renderStudent);
