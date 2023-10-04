document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);
//ipotayari
function onDeviceReady() {
  let progressBar = document.querySelector(".progress-bar");
  let loadPercentage = 0;

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
        loaderDiv.style.display = "none";

        // Display the levelsDiv
        document.getElementById("levelsDiv").style.display = "block";
      }
    }, 50);
  }
  if (window.AndroidFullScreen) {
    window.AndroidFullScreen.immersiveMode(successFunction, errorFunction);
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