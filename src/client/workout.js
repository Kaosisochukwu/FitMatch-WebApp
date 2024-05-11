document.addEventListener('DOMContentLoaded', function() {
    const workoutInput = document.getElementById('workoutInput');

    // Load saved workout data
    workoutInput.value = sessionStorage.getItem('workoutData') || " ";

    // Initialize with correct height
    autoResize.call(workoutInput);

    // Save data on input
    let autosaveTimer;
    workoutInput.addEventListener('input', function() {
        // Clear any existing autosave timer
        clearTimeout(autosaveTimer);

        // Set a new autosave timer
        autosaveTimer = setTimeout(() => {
            // Save data to sessionStorage
            sessionStorage.setItem('workoutData', workoutInput.value);
            // Trigger the setText function to save data to the server
            setText(JSON.parse(sessionStorage.getItem("user-info")).user, workoutInput.value);
        }, 1000); // Adjust the delay as needed (e.g., 1000ms = 1 second)
    });
});

// Function to dynamically adjust the height of the textarea
function autoResize() {
    this.style.height = 'auto';
    this.style.height = Math.max(this.scrollHeight, 200) + 'px'; // Use 200px as the minimum height
}

// setText function remains unchanged
async function setText(user, text) {
    try {
        const response = await fetch('/setText', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: user, text: text })
        });
        if (!response.ok) {
            throw new Error('Failed to set text for user');
        }
        console.log("Text set successfully for user:", user);
    } catch (error) {
        console.error("Error setting text for user:", error);
        throw error;
    }
}
