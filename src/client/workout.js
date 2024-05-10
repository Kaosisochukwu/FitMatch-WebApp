/**
 * Clear input fields.
 */
function clearInputs() {
    wInput.value = "";
    eInput.value = "";
    bInput.value = "";
}

/**
 * Add data to local storage.
 */
function addToLocalStorage() {
    localStorage.setItem("date", JSON.stringify(date));
    localStorage.setItem("water", JSON.stringify(water));
    localStorage.setItem("exercise", JSON.stringify(exercise));
    localStorage.setItem("bloodsugar", JSON.stringify(bloodsugar));
}

/**
 * Activate edit mode for a specific row.
 * @param {number} i - Index of the row to edit.
 */
function activateEdit(i) {
    wInput.value = water[i];
    eInput.value = exercise[i];
    bInput.value = bloodsugar[i];
    editIndex = i;
    submitButton.classList.add("hidden");
    editSection.classList.remove("hidden");
}

/**
 * Cancel edit mode.
 */
function cancelEdit() {
    clearInputs();
    editIndex = -1;
    submitButton.classList.remove("hidden");
    editSection.classList.add("hidden");
}

/**
 * Edit a row.
 */
function editRow() {
    if (editIndex === -1) return;
    water[editIndex] = wInput.value;
    exercise[editIndex] = eInput.value;
    bloodsugar[editIndex] = bInput.value;
    fillTable();
    addToLocalStorage();
    cancelEdit();
}

/**
 * Delete a row.
 * @param {number} i - Index of the row to delete.
 */
function deleteRow(i) {
    if (!confirm(
        `Confirm that you want to delete the entry: 
        \n ${date[i]}: ${water[i]}ml, ${exercise[i]}min, ${bloodsugar[i]}mg/dL`
    )) return;

    date.splice(i, 1);
    water.splice(i, 1);
    exercise.splice(i, 1);
    bloodsugar.splice(i, 1);
    const row = document.querySelector(`#output > tr:nth-child(${i+1})`);
    row.classList.add("delete-animation");
    addToLocalStorage();
    setTimeout(() => {
        fillTable();
    }, 500);
}

/**
 * Fill the table with data.
 */
function fillTable() {
    const tbody = document.getElementById("output");
    const rows = Math.max(water.length, exercise.length, bloodsugar.length);
    let html = "";
    for (let i = 0; i < rows; i++) {
        let w = water[i] || "N/A";
        let e = exercise[i] || "N/A";
        let b = bloodsugar[i] || "N/A";
        let d = date[i] || "N/A";
        html += `<tr>
            <td>${d}</td>
            <td>${w}</td>
            <td>${e}</td>
            <td>${b}</td>
            <td>
                <button onclick="activateEdit(${i})" class="edit">${editIcon}</button>
            </td>
            <td>
                <button onclick="deleteRow(${i})" class="delete">${deleteIcon}</button>
            </td>
        </tr>`;
    }
    tbody.innerHTML = html;
}

// Define editIndex, date, water, exercise, bloodsugar, and DOM elements...

/**
 * Event listener for the submit button.
 */
submitButton.addEventListener("click", () => {
    const w = wInput.value || null;
    const e = eInput.value || null;
    const b = bInput.value || null;
    if (w === null || e === null || b === null) {
        alert("Please enter all the fields.");
        return;
    }
    const d = new Date().toLocaleDateString();
    date = [d, ...date];
    water = [w, ...water];
    exercise = [e, ...exercise];
    bloodsugar = [b, ...bloodsugar];
    clearInputs();
    fillTable();
    addToLocalStorage();
});

//AUTOSAVE FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function() {
    const workoutInput = document.getElementById('workoutInput');

    // Load saved workout data
    workoutInput.value = localStorage.getItem('workoutData') || '';

    // Save data on input
    workoutInput.addEventListener('input', function() {
        localStorage.setItem('workoutData', workoutInput.value);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('workoutInput');
    
    textarea.addEventListener('input', autoResize, false);

    function autoResize() {
        this.style.height = 'auto';
        if (this.scrollHeight < 50) {
            this.style.height = '50px'; // Set back to minimum height if less content
        } else {
            this.style.height = (this.scrollHeight) + 'px'; // Adjust height based on content
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const workoutInput = document.getElementById('workoutInput');

    // Load and autosave workout data
    workoutInput.value = localStorage.getItem('workoutData') || '';
    workoutInput.addEventListener('input', function() {
        localStorage.setItem('workoutData', workoutInput.value);
        autoResize.call(workoutInput);
    });

    // Function to dynamically adjust the height of the textarea
    function autoResize() {
        this.style.height = 'auto';
        this.style.height = Math.max(this.scrollHeight, 200) + 'px'; // Use 200px as the minimum height
    }

    // Initialize with correct height
    autoResize.call(workoutInput);
});