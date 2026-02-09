const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const buttons = document.getElementById("buttons");
const message = document.getElementById("message");
const celebration = document.getElementById("celebration");

const getSafePosition = () => {
  const padding = 16;
  const buttonRect = noButton.getBoundingClientRect();
  const maxX = window.innerWidth - buttonRect.width - padding;
  const maxY = window.innerHeight - buttonRect.height - padding;

  const randomX = Math.max(padding, Math.random() * maxX);
  const randomY = Math.max(padding, Math.random() * maxY);

  return { x: randomX, y: randomY };
};

const moveNoButton = () => {
  const { x, y } = getSafePosition();
  noButton.style.position = "fixed";
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
};

noButton.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  moveNoButton();
});

noButton.addEventListener("mouseover", () => {
  moveNoButton();
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

window.addEventListener("resize", () => {
  noButton.style.position = "relative";
  noButton.style.left = "";
  noButton.style.top = "";
});
