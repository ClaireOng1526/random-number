// Get the modal
var modal = document.getElementById("PrizeModal");

// Get the button that opens the modal
var btn = document.getElementById("ViewPrizeBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//Enter digit
// Get the input field element
var inputField = document.getElementById("name");

// Add event listener to the input field
inputField.addEventListener("input", function() {
    var input = inputField.value;
    // Remove any non-digit characters
    var sanitizedInput = input.replace(/\D/g, "");
    // Truncate input to 5 digits
    var truncatedInput = sanitizedInput.slice(0, 5);
    // Update the input field value
    inputField.value = truncatedInput;
});

var remainingChances = 2; // Initialize with the total number of chances

// Function to update UI with remaining chances
function updateChancesUI() {
    var chancesElement = document.querySelector("p");
    chancesElement.textContent = "You have " + remainingChances + " chance(s) left today";
}

// Function to calculate the number of matching digits
function calculateMatch(input, random) {
    var matchCount = 0;
    for (var i = 0; i < input.length; i++) {
        if (random.includes(input[i])) {
            matchCount++;
        }
    }
    return matchCount;
}

// Function to start generating random numbers and calculate match
function startGenerating() {
    console.log("startGenerating() function is called");

    // Check if chances are still remaining
    if (remainingChances > 0) {
        remainingChances--; // Deduct a chance
        updateChancesUI(); // Update UI to display remaining chances

        // Get reference to display elements
        var displayElements = [];
        for (var i = 1; i <= 5; i++) {
            displayElements.push(document.getElementById("numberDisplay" + i));
        }

        // Get the input field element
        var inputField = document.getElementById("name");
        var input = inputField.value;

        // Check if input field contains exactly 5 digits
        if (input.length === 5 && /^\d+$/.test(input)) {
            // Generate random number every 100 milliseconds for each display element
            var random = '';
            for (var i = 1; i <= 5; i++) {
                var randomNumber = Math.floor(Math.random() * 10); // Generates a random number between 0 and 9
                displayElements[i - 1].textContent = randomNumber;
                random += randomNumber.toString();
            }

            // Calculate match count
            var matchCount = calculateMatch(input, random);

            // Display the match result modal
            var resultModal = document.getElementById("ResultModal");
            var matchResult = document.getElementById("matchResult");
            matchResult.textContent = matchCount.toString();
            resultModal.style.display = "block";
        } else {
            alert("Please enter a 5-digit number before starting.");
        }
    } else {
        alert("You have used all your chances for today. Please come back tomorrow!");
        // Disable the start button when all chances are used up
        document.querySelector(".startbtn").disabled = true;
    }
}

// Get the close button for the result modal
var resultModal = document.getElementById("ResultModal");
var resultCloseBtn = document.getElementById("resultClose");
resultCloseBtn.onclick = function() {
    resultModal.style.display = "none";
}

// Update UI with initial chances
updateChancesUI();
