var image = document.createElement('img');
image.src = "./images/homepage.png";
image.alt = "Home Page";
image.width = "800";
image.height = "500";
var container = document.getElementById('homeContainer');
container.appendChild(image);


var image = document.createElement('img');
image.src = "./images/partnerSearch.png";
image.alt = "Partner Page";
image.width = "800";
image.height = "500";
var container = document.getElementById('partnerContainer');
container.appendChild(image);



var image = document.createElement('img');
image.src = "./images/workouttracking.png";
image.alt = "Workout Tracking Page";
image.width = "800";
image.height = "500";
var container = document.getElementById('workoutContainer');
container.appendChild(image);


var image = document.createElement('img');
image.src = "./images/community.png";
image.alt = "Community Page";
image.width = "800";
image.height = "500";
var container = document.getElementById('communityContainer');
container.appendChild(image);



// Get references to the button and word count display
var countButton = document.getElementById('countButton');
var wordCountDisplay = document.getElementById('wordCount');

// Function to count words in a given text
function countWords(text) {
    var words = text.trim().split(/\s+/);
    return words.length;
}

// Event listener for the button click
countButton.addEventListener('click', function() {
    // Get the entire text content of the document body
    var bodyText = document.body.textContent;
    // Count the words in the body text
    var wordCount = countWords(bodyText);
    // Update the word count display
    wordCountDisplay.textContent = 'Word count: ' + wordCount;
});


