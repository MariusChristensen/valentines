let noButtonSize = 100;
let yesButtonSize = 100;
let noClickCount = 0;
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

function updateEffects() {
  const yesBtn = document.getElementById("yesBtn");

  // Remove all previous glow classes
  yesBtn.classList.remove("glow-1", "glow-2", "glow-3", "glow-4");

  // Remove existing arrows
  document.querySelectorAll(".arrow").forEach((arrow) => arrow.remove());

  // Add effects based on click count
  if (noClickCount >= 4) {
    // Maximum effects with shaking arrows
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

  // Scale arrow size based on noClickCount (starting from size 40px)
  const baseSize = 40;
  const size = baseSize + noClickCount * 10;
  arrow.style.fontSize = `${size}px`;

  arrow.innerHTML = direction === "left" ? "→" : "←";

  yesBtn.parentNode.appendChild(arrow);
  requestAnimationFrame(() => arrow.classList.add("show"));
}

function rejected() {
  noClickCount++;
  noButtonSize -= 10;
  yesButtonSize = Math.min(yesButtonSize + 10, 500);

  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  // Keep the yes button growing from its original position
  yesBtn.style.transform = `scale(${yesButtonSize / 100})`;

  // Update effects based on click count
  updateEffects();

  // Get viewport dimensions instead of container
  const maxX = window.innerWidth - noBtn.offsetWidth;
  const maxY = window.innerHeight - noBtn.offsetHeight;

  // Keep button within viewport bounds with some padding
  const padding = 50;
  const randomX = Math.random() * (maxX - 2 * padding) + padding;
  const randomY = Math.random() * (maxY - 2 * padding) + padding;

  noBtn.style.position = "fixed";
  noBtn.style.transform = `scale(${noButtonSize / 100}) rotate(${
    noClickCount * 10
  }deg)`;
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;

  showMessage();
}

function showMessage() {
  const existingMessage = document.querySelector(".message-popup");
  if (existingMessage) existingMessage.remove();

  const message = document.createElement("div");
  message.className = "message-popup";
  message.textContent =
    messages[Math.min(noClickCount - 1, messages.length - 1)];

  // Add to container instead of Totoro image
  document.querySelector(".container").appendChild(message);

  // Force a reflow before adding the show class
  message.offsetHeight;
  message.classList.add("show");

  setTimeout(() => {
    message.classList.remove("show");
    setTimeout(() => message.remove(), 300);
  }, 2000);
}

function accepted() {
  // Remove effects when accepted
  document.querySelectorAll(".arrow").forEach((arrow) => arrow.remove());
  document.getElementById("yesBtn").classList.remove("highlight");

  document.getElementById("normalTotoro").classList.add("hidden");
  document.getElementById("happyTotoro").classList.remove("hidden");
  document.getElementById("acceptedMessage").classList.remove("hidden");
  document.querySelector(".buttons").classList.add("hidden");
  document.querySelector(".question").classList.add("hidden");
}
