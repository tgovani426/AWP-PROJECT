const inputs = document.querySelectorAll("input");

const nameField = document.getElementById("name"),
  emailField = document.getElementById("email"),
  passwordField = document.getElementById("password"),
  passwordConfirmField = document.getElementById("confirm-password");

const signupForm = document.forms["signup-form"].elements;
const signupFormSubmit = document.getElementById("signup-form__submit");


inputs.forEach(function (input) {
  input.addEventListener("input", function () {
    // ıf has red border, remove it
    removeRedBorder(this);

    // if has icon, remove it
    if (this.parentNode.querySelector("i")) {
      removeNode(this, "i");
    }

    // if has email error message, remove it
    if (document.getElementById("email-not-valid")) {
      document.getElementById("email-not-valid").remove();
    }

    // if has password match error message, remove it
    if (document.getElementById("password-not-match")) {
      document.getElementById("password-not-match").remove();
    }

    if (
      this.type !== "checkbox" &&
      this.type !== "button" &&
      this.value !== ""
    ) {
      addSuccessIcon(this);
    }

    if (
      this.type !== "checkbox" &&
      this.type !== "button" &&
      this.value === ""
    ) {
      addErrorIcon(this);
      addRedBorder(this);
      addRedText(this);
    }

    if (
      this.id === "email" &&
      this.value !== "" &&
      !validateEmail(this.value)
    ) {
      // if has icon, remove it
      if (this.parentNode.querySelector("i")) {
        removeNode(this, "i");
      }
      addErrorIcon(this);
      addRedBorder(this);
      addRedText(this);
      if (!document.getElementById("email-not-valid")) {
        addErrorMessage(this, "email-not-valid", "Email is not valid!");
      }
    }

    if (this.id === "confirm-password" && this.value !== passwordField.value) {
      // if has icon, remove it
      if (this.parentNode.querySelector("i")) {
        removeNode(this, "i");
      }
      addErrorIcon(this);
      addRedBorder(this);
      addRedText(this);
      if (!document.getElementById("password-not-match")) {
        addErrorMessage(this, "password-not-match", "Password must match!");
      }
    }

    
  });
});


function addRedBorder(element) {
  return element.parentNode.classList.add("border-red");
}

function removeRedBorder(element) {
  return element.parentNode.classList.remove("border-red");
}

function addRedText(element) {
  return element.parentNode
    .querySelector("label")
    .classList.add("text-red-500");
}

function removeRedText(element) {
  return element.parentNode
    .querySelector("label")
    .classList.remove("text-red-500");
}

function removeNode(element, nodeType) {
  return element.parentNode
    .querySelector(nodeType)
    .parentNode.removeChild(element.parentNode.querySelector(nodeType));
}

function addErrorIcon(element) {
  const i = document.createElement("i");
  i.classList.add(
    "absolute",
    "right-0",
    "bottom-0",
    "top-0",
    "flex",
    "items-center",
    "text-xl",
    "p-3",
    "text-red-500",
    "fas",
    "fa-times-circle"
  );
  return element.parentNode.appendChild(i);
}

function addSuccessIcon(element) {
  const i = document.createElement("i");
  i.classList.add(
    "absolute",
    "right-0",
    "bottom-0",
    "top-0",
    "flex",
    "items-center",
    "text-xl",
    "p-3",
    "text-green-500",
    "fas",
    "fa-check-circle"
  );
  return element.parentNode.appendChild(i);
}

function addErrorMessage(element, errorType, message) {
  const p = document.createElement("p");
  p.classList.add("text-red-500", "mb-2", "error-message");
  p.id = errorType;
  p.textContent = message;
  return element.parentNode.parentNode.insertBefore(p, element.parentNode);
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
