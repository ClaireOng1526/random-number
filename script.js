
var modal = document.getElementById("PrizeModal");

var btn = document.getElementById("ViewPrizeBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var inputField = document.getElementById("name");

inputField.addEventListener("input", function() {
    var input = inputField.value;
    var sanitizedInput = input.replace(/\D/g, "");
    var truncatedInput = sanitizedInput.slice(0, 5);
    inputField.value = truncatedInput;
});

var remainingChances = 2; 

function updateChancesUI() {
    var chancesElement = document.querySelector("p");
    chancesElement.textContent = "You have " + remainingChances + " chance(s) left today";
}

function calculateMatch(input, random) {
    var matchCount = 0;
    for (var i = 0; i < input.length; i++) {
        if (random.includes(input[i])) {
            matchCount++;
        }
    }
    return matchCount;
}

function startGenerating() {
    console.log("startGenerating() function is called");

    if (remainingChances > 0) {
        remainingChances--; 
        updateChancesUI(); 

        var displayElements = [];
        for (var i = 1; i <= 5; i++) {
            displayElements.push(document.getElementById("numberDisplay" + i));
        }

        var inputField = document.getElementById("name");
        var input = inputField.value;

        if (input.length === 5 && /^\d+$/.test(input)) {
            var random = '';
            for (var i = 1; i <= 5; i++) {
                var randomNumber = Math.floor(Math.random() * 10);
                displayElements[i - 1].textContent = randomNumber;
                random += randomNumber.toString();
            }

            var matchCount = calculateMatch(input, random);

            var resultModal = document.getElementById("ResultModal");
            var matchResult = document.getElementById("matchResult");
            matchResult.textContent = matchCount.toString();
            resultModal.style.display = "block";
        } else {
            alert("Please enter a 5-digit number before starting.");
        }
    } else {
        alert("You have used all your chances for today. Please come back tomorrow!");
        document.querySelector(".startbtn").disabled = true;
    }
}

var resultModal = document.getElementById("ResultModal");
var resultCloseBtn = document.getElementById("resultClose");
resultCloseBtn.onclick = function() {
    resultModal.style.display = "none";
}

updateChancesUI();
