
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


document.getElementById('workoutInput').addEventListener("input", (event)=>{
    event.preventDefault();
    workoutInput = document.getElementById('workoutInput');
    localStorage.setItem('workoutData', workoutInput.value);
});

document.addEventListener('DOMContentLoaded', function() {
    const workoutInput = document.getElementById('workoutInput');

    // Load and autosave workout data
    workoutInput.value = localStorage.getItem('workoutData') || '';

    // Initialize with correct height
    autoResize(workoutInput);
});

 // Function to dynamically adjust the height of the textarea
 function autoResize() {
    this.style.height = 'auto';
    this.style.height = Math.max(this.scrollHeight, 200) + 'px'; // Use 200px as the minimum height
}