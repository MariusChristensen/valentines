// Constants and state
const INITIAL_BUTTON_SIZE = 100;
const MAX_YES_BUTTON_SIZE = 500;
const BUTTON_SHRINK_RATE = 10;
const PADDING = 50;

let noButtonSize = INITIAL_BUTTON_SIZE;
let yesButtonSize = INITIAL_BUTTON_SIZE;
let noClickCount = 0;

// Messages for each "no" click
const messages = [
  "Du bomma på ja",
  "Oi, du var dårlig til å trykke på ja",
  "Dette er litt sus",
  "Okei nå starter jeg å gråte",
  "Jamen bare trykk på ja?",
  "Hallooooooooooooooo",
  "Nå begynner jeg å bli lei meg 😢",
  "Er du sikker på at du ikke vil trykke ja?",
  "HALLOOOOOOOOOOOOOO?????",
  "Kanskje prøv den store røde knappen i stedet? 🤔",
];

// Visual effects functions
function updateEffects() {
  const yesBtn = document.getElementById("yesBtn");
  yesBtn.classList.remove("glow-1", "glow-2", "glow-3", "glow-4");
  clearArrows();

  if (noClickCount >= 4) {
    yesBtn.classList.add("glow-4");
    addArrow("left", true);
    addArrow("right", true);
  } else
    switch (noClickCount) {
      case 1:
        yesBtn.classList.add("glow-1");
        break;
      case 2:
        yesBtn.classList.add("glow-2");
        addArrow("left");
        break;
      case 3:
        yesBtn.classList.add("glow-3");
        addArrow("left");
        addArrow("right");
        break;
    }
}

function addArrow(direction, shouldPulse = false) {
  const yesBtn = document.getElementById("yesBtn");
  const arrow = document.createElement("div");
  arrow.className = `arrow arrow-${direction}`;
  if (shouldPulse) arrow.classList.add("pulse");

  const baseSize = 40;
  const size = baseSize + noClickCount * 10;
  arrow.style.fontSize = `${size}px`;
  arrow.innerHTML = direction === "left" ? "→" : "←";

  yesBtn.parentNode.appendChild(arrow);
  requestAnimationFrame(() => arrow.classList.add("show"));
}

function clearArrows() {
  document.querySelectorAll(".arrow").forEach((arrow) => arrow.remove());
}

// Message handling
function showMessage() {
  const existingMessage = document.querySelector(".message-popup");
  if (existingMessage) existingMessage.remove();

  // Create a wrapper div for Totoro and message if it doesn't exist
  let totoroWrapper = document.querySelector(".totoro-wrapper");
  if (!totoroWrapper) {
    totoroWrapper = document.createElement("div");
    totoroWrapper.className = "totoro-wrapper";
    totoroWrapper.style.position = "relative";

    // Get the Totoro image and wrap it
    const totoro = document.getElementById("normalTotoro");
    const totoroParent = totoro.parentElement;
    totoroWrapper.appendChild(totoro);
    totoroParent.appendChild(totoroWrapper);
  }

  // Create and add message
  const message = document.createElement("div");
  message.className = "message-popup";
  message.textContent =
    messages[Math.min(noClickCount - 1, messages.length - 1)];
  totoroWrapper.appendChild(message);

  message.offsetHeight;
  message.classList.add("show");

  setTimeout(() => {
    message.classList.remove("show");
    setTimeout(() => {
      // Only remove the message, keep the wrapper
      message.remove();
    }, 300);
  }, 2000);
}

// Button event handlers
function rejected() {
  noClickCount++;
  noButtonSize -= BUTTON_SHRINK_RATE;
  yesButtonSize = Math.min(
    yesButtonSize + BUTTON_SHRINK_RATE,
    MAX_YES_BUTTON_SIZE
  );

  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  updateYesButton(yesBtn);
  updateNoButton(noBtn);
  updateEffects();
  showMessage();
}

function accepted() {
  clearArrows();
  document.getElementById("yesBtn").classList.remove("highlight");

  // Remove any existing messages
  const existingMessage = document.querySelector(".message-popup");
  if (existingMessage) existingMessage.remove();

  // Create wrapper for happy Totoro and message
  const totoroWrapper = document.createElement("div");
  totoroWrapper.style.position = "relative";

  // Get and wrap happy Totoro
  const happyTotoro = document.getElementById("happyTotoro");
  const totoroParent = happyTotoro.parentElement;
  totoroWrapper.appendChild(happyTotoro);

  // Create permanent message
  const message = document.createElement("div");
  message.className = "message-popup permanent show";
  message.textContent = "YAY! Send nudes! 🎉❤️";
  totoroWrapper.appendChild(message);

  // Update display
  document.getElementById("normalTotoro").classList.add("hidden");
  happyTotoro.classList.remove("hidden");
  document.querySelector(".buttons").classList.add("hidden");
  document.querySelector(".question").classList.add("hidden");

  // Add wrapper to container
  totoroParent.appendChild(totoroWrapper);
}

// Button update functions
function updateYesButton(yesBtn) {
  yesBtn.style.transform = `scale(${yesButtonSize / 100})`;
}

function updateNoButton(noBtn) {
  const { randomX, randomY } = getRandomPosition(noBtn);

  // Only set fixed position when we start moving the button
  noBtn.style.position = "fixed";
  noBtn.style.zIndex = "9999"; // Add z-index when it starts moving
  noBtn.style.transform = `scale(${noButtonSize / 100}) rotate(${
    noClickCount * 10
  }deg)`;
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

function getRandomPosition(element) {
  const maxX = window.innerWidth - element.offsetWidth;
  const maxY = window.innerHeight - element.offsetHeight;

  return {
    randomX: Math.random() * (maxX - 2 * PADDING) + PADDING,
    randomY: Math.random() * (maxY - 2 * PADDING) + PADDING,
  };
}
