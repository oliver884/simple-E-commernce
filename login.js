function createFloatingShapes() {
  const shapeTypes = ["star", "circle", "triangle"];
  const shapeCount = 20;

  for (let i = 0; i < shapeCount; i++) {
    const shape = document.createElement("div");
    const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];

    shape.classList.add("shape");
    shape.classList.add(type);

    const posX = Math.random() * 100;
    const posY = Math.random() * 100;

    const size = Math.random() * 0.5 + 0.7;

    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;

    shape.style.left = `${posX}%`;
    shape.style.top = `${posY}%`;
    shape.style.transform = `scale(${size})`;
    shape.style.opacity = Math.random() * 0.5 + 0.5;
    shape.style.animationDuration = `${duration}s`;
    shape.style.animationDelay = `${delay}s`;

    document.body.appendChild(shape);
  }
}

function createBubbles(x, y) {
  const bubbleCount = 10;

  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    const size = Math.random() * 20 + 10;
    const posX = x + (Math.random() * 100 - 50);
    const posY = y + (Math.random() * 50 - 25);
    const speedY = Math.random() * 2 + 1;

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${posX}px`;
    bubble.style.top = `${posY}px`;
    bubble.style.animation = `floatBubble ${speedY}s forwards`;

    document.body.appendChild(bubble);

    setTimeout(() => {
      bubble.remove();
    }, speedY * 1000);
  }
}

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailGroup = document.getElementById("emailGroup");
const passwordGroup = document.getElementById("passwordGroup");
const loginButton = document.getElementById("loginButton");
const successContainer = document.getElementById("success");

emailInput.addEventListener("blur", () => {
  validateEmail();
});

passwordInput.addEventListener("blur", () => {
  validatePassword();
});

function validateEmail() {
  const emailValue = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailValue) && emailValue !== "") {
    emailGroup.classList.add("error");
    return false;
  } else {
    emailGroup.classList.remove("error");
    return true;
  }
}

function validatePassword() {
  const passwordValue = passwordInput.value.trim();

  if (passwordValue.length < 6 && passwordValue !== "") {
    passwordGroup.classList.add("error");
    return false;
  } else {
    passwordGroup.classList.remove("error");
    return true;
  }
}

loginButton.addEventListener("mousedown", (e) => {
  const x = e.clientX - e.target.getBoundingClientRect().left;
  const y = e.clientY - e.target.getBoundingClientRect().top;

  const ripple = document.createElement("span");
  ripple.classList.add("ripple");
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  loginButton.appendChild(ripple);

  createBubbles(e.clientX, e.clientY);

  setTimeout(() => {
    ripple.remove();
  }, 600);
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (
    isEmailValid &&
    isPasswordValid &&
    emailInput.value.trim() !== "" &&
    passwordInput.value.trim() !== ""
  ) {
    loginButton.disabled = true;
    loginButton.innerHTML = "WOOOSH!";

    const buttonRect = loginButton.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        createBubbles(buttonCenterX, buttonCenterY);
      }, i * 200);
    }

    setTimeout(() => {
      successContainer.classList.add("active");

      setTimeout(() => {
        loginButton.innerHTML = "JUMP IN!";
        loginButton.disabled = false;
        successContainer.classList.remove("active");
        loginForm.reset();
      }, 3000);
    }, 1500);
  } else {
    if (emailInput.value.trim() === "") {
      emailGroup.classList.add("error");
    }

    if (passwordInput.value.trim() === "") {
      passwordGroup.classList.add("error");
    }

    loginForm.style.animation = "shake 0.5s";
    setTimeout(() => {
      loginForm.style.animation = "";
    }, 500);
  }
});

createFloatingShapes();
