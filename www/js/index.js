document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);
//ipotayari
function onDeviceReady() {
  let progressBar = document.querySelector(".progress-bar");
  let loadPercentage = 0;
  $("#levelsDiv").hide();

  let loadingInterval = setInterval(() => {
    loadPercentage += 10;
    progressBar.style.width = loadPercentage + "%";
    progressBar.setAttribute("aria-valuenow", loadPercentage);

    if (loadPercentage >= 100) {
      clearInterval(loadingInterval);
      fadeOutLoader();
    }
  }, 500);

  function fadeOutLoader() {
    let loaderDiv = document.getElementById("gameLoader");
    let fadeOutInterval = setInterval(() => {
      if (!loaderDiv.style.opacity) {
        loaderDiv.style.opacity = 1;
      }
      if (loaderDiv.style.opacity > 0) {
        loaderDiv.style.opacity -= 0.05;
      } else {
        clearInterval(fadeOutInterval);
        loaderDiv.remove();

        // Display the levelsDiv
        $("#levelsDiv").show();
      }
    }, 50);
  }
  if (window.AndroidFullScreen) {
    window.AndroidFullScreen.immersiveMode(successFunction, errorFunction);
  }
  //geme
  // Array of levels
  const levels = [
    // Level 1
    {
      words: ["cat", "dog", "fish"],
      grid: [
        ["c", "t", "a"],
        ["d", "o", "g"],
        ["f", "i", "s"],
      ],
    },
    // Level 2
    {
      words: ["house", "car", "tree"],
      grid: [
        ["h", "o", "u"],
        ["c", "a", "r"],
        ["t", "r", "e"],
      ],
    },
    // Level 3
    {
      words: ["computer", "television", "refrigerator"],
      grid: [
        ["c", "o", "m"],
        ["p", "u", "t"],
        ["e", "r", "f"],
      ],
    },
    // ...
  ];

  // Current level
  let currentLevel = 0;

  // Start the game
  function startGame() {
    // Get the current level
    const level = levels[currentLevel];

    // Create the game grid
    const grid = document.createElement("table");
    grid.classList.add("table", "table-hover", "table-bordered", "table-responsive");
    for (let i = 0; i < level.grid.length; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < level.grid[i].length; j++) {
        const cell = document.createElement("td");
        cell.innerHTML = level.grid[i][j];
        row.appendChild(cell);
      }
      grid.appendChild(row);
    }

    // Display the game grid
    var pad = document.getElementById("w-buttons");
    pad.appendChild(grid);

    // Create the word list
    const wordList = document.createElement("ul");
    for (let i = 0; i < level.words.length; i++) {
      const word = document.createElement("li");
      word.innerHTML = level.words[i];
      wordList.appendChild(word);
    }

    // Display the word list
    var wdlist = document.getElementById("w-list");
    wdlist.appendChild(wordList);

    // Add event listeners to the game grid
    grid.addEventListener("click", function (event) {
      // Get the clicked cell
      const cell = event.target;

      // Get the letter in the clicked cell
      const letter = cell.innerHTML;

      // Add the letter to the current word
      const currentWord = document.getElementById("currentWord");
      currentWord.value += letter;
    });

    // Add an event listener to the submit button
    document.getElementById("submit").addEventListener("click", function () {
      // Get the current word
      const currentWord = document.getElementById("currentWord");

      // Check if the current word is a valid word
      if (level.words.includes(currentWord.value)) {
        // Mark the word as found
        const word = document.querySelector(`li[innerHTML="${currentWord.value}"]`);
        word.classList.add("found");

        // Check if all words have been found
        if (document.querySelectorAll(".found").length === level.words.length) {
          // Go to the next level
          currentLevel++;
          startGame();
        }
      } else {
        // Clear the current word
        currentWord.value = "";
      }
    });
  }
  const shuffleButton = document.getElementById('shuffle');

  shuffleButton.addEventListener('click', function () {
    // Shuffle the words in the game grid
    shuffleWords();
  });

  // Start the game
  startGame();
  function shuffleWords() {
    // Get the game grid
    const gameGrid = document.getElementById('grid');

    // Get all of the cells in the game grid
    const cells = gameGrid.querySelectorAll('td');

    // Convert the NodeList to an Array
    const cellsArray = Array.from(cells);

    // Shuffle the Array
    cellsArray.sort(() => Math.random() - 0.5);

    // Update the game grid with the shuffled cells
    for (let i = 0; i < cellsArray.length; i++) {
      gameGrid.appendChild(cellsArray[i]);
    }
  }



}
//kipoziwa
function onPause() {
  // Handle the pause event
}
//iki reusume
function onResume() {
  // Re-enter immersive mode when the app is brought back to the foreground
  if (window.AndroidFullScreen) {
    window.AndroidFullScreen.immersiveMode(successFunction, errorFunction);
  }
}

function successFunction() {
  console.log("Entered immersive mode successfully");
}

function errorFunction(error) {
  console.log("Error entering immersive mode: " + error);
}
//game logic
