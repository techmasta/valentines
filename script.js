const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const buttons = document.getElementById("buttons");
const message = document.getElementById("message");
const celebration = document.getElementById("celebration");

const getSafePosition = (pointerX, pointerY) => {
  const padding = 16;
  const buttonRect = noButton.getBoundingClientRect();
  const maxX = window.innerWidth - buttonRect.width - padding;
  const maxY = window.innerHeight - buttonRect.height - padding;

  const buttonCenterX = buttonRect.left + buttonRect.width / 2;
  const buttonCenterY = buttonRect.top + buttonRect.height / 2;
  const targetX = pointerX ?? buttonCenterX;
  const targetY = pointerY ?? buttonCenterY;

  const vectorX = buttonCenterX - targetX || (Math.random() - 0.5);
  const vectorY = buttonCenterY - targetY || (Math.random() - 0.5);
  const length = Math.hypot(vectorX, vectorY) || 1;
  const distance = 140 + Math.random() * 160;

  const proposedX = buttonCenterX + (vectorX / length) * distance;
  const proposedY = buttonCenterY + (vectorY / length) * distance;

  const clampedX = Math.min(Math.max(proposedX - buttonRect.width / 2, padding), maxX);
  const clampedY = Math.min(Math.max(proposedY - buttonRect.height / 2, padding), maxY);

  return { x: clampedX, y: clampedY };
};

const moveNoButton = (event) => {
  const { x, y } = getSafePosition(event?.clientX, event?.clientY);
  noButton.style.position = "fixed";
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
};

noButton.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  moveNoButton(event);
});

noButton.addEventListener("pointerenter", (event) => {
  moveNoButton(event);
});

const createHeartsBurst = () => {
  const burstCount = 24;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let i = 0; i < burstCount; i += 1) {
    const heart = document.createElement("span");
    heart.classList.add("celebration-heart");

    const angle = Math.random() * Math.PI * 2;
    const radius = 40 + Math.random() * 120;
    const offsetX = Math.cos(angle) * radius;
    const offsetY = Math.sin(angle) * radius;

    heart.style.left = `${centerX + offsetX}px`;
    heart.style.top = `${centerY + offsetY}px`;
    heart.style.animationDelay = `${Math.random() * 0.3}s`;

    celebration.appendChild(heart);

    heart.addEventListener("animationend", () => {
      heart.remove();
    });
  }
};

yesButton.addEventListener("click", () => {
  buttons.setAttribute("hidden", "");
  message.hidden = false;
  requestAnimationFrame(() => {
    message.classList.add("show");
  });
  createHeartsBurst();
});

const createFloatingHearts = () => {
  const heartsContainer = document.querySelector(".hearts");
  const heartCount = 22;

  for (let i = 0; i < heartCount; i += 1) {
    const heart = document.createElement("span");
    heart.classList.add("floating-heart");
    const size = 12 + Math.random() * 22;
    const left = Math.random() * 100;
    const delay = Math.random() * 6;
    const duration = 12 + Math.random() * 10;

    heart.style.setProperty("--size", `${size}px`);
    heart.style.setProperty("--delay", `${delay}s`);
    heart.style.setProperty("--duration", `${duration}s`);
    heart.style.left = `${left}vw`;
    heart.style.top = `${-20 - Math.random() * 40}vh`;

    heartsContainer.appendChild(heart);
  }
};

createFloatingHearts();

window.addEventListener("resize", () => {
  noButton.style.position = "relative";
  noButton.style.left = "";
  noButton.style.top = "";
});
