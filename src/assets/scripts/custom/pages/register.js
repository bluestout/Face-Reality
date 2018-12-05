import $ from "jquery";

const elements = {
  errorText: "[data-register-error-message]",
  formSubmit: "[data-register-submit]",
  passwordInput: "[data-register-password]",
  passwordCheckInput: "[data-register-password-check]",
  emailInput: "[data-register-email]",
  nameInput: "[data-register-name]",
};

let showErrorEvent;

function passwordConfirm() {
  const password = $(elements.passwordInput).val();
  const passwordCheck = $(elements.passwordCheckInput).val();
  if (password.length === 0) {
    passwordError(true);
    submitError(1);
    disableForm();
  } else if (password.length < 6) {
    passwordError(true);
    submitError(2);
    disableForm();
  } else if (password === passwordCheck) {
    passwordError(false);
    enableForm();
  } else {
    passwordError(true);
    submitError(3);
    disableForm();
  }
}

function emailConfirm() {
  const emailInput = $(elements.emailInput).val();
  if (emailInput.length === 0 || !emailInput.includes("@")) {
    $(elements.emailInput).addClass("error");
    submitError(5);
  } else {
    $(elements.emailInput).removeClass("error");
  }
}

function nameConfirm() {
  const nameInput = $(elements.nameInput).val();
  if (nameInput.length === 0) {
    $(elements.nameInput).addClass("error");
    submitError(4);
  } else {
    $(elements.nameInput).removeClass("error");
  }
}

function disableForm() {
  $(elements.formSubmit).prop("disabled", true);
}
function enableForm() {
  $(elements.formSubmit).prop("disabled", false);
}

$(document).ready(() => {
  if ($(elements.passwordInput).length > 0) {
    disableForm();
  }
});

function passwordError(haserror) {
  if (haserror) {
    $(elements.passwordInput).addClass("error");
    $(elements.passwordCheckInput).addClass("error");
  } else {
    $(elements.passwordInput).removeClass("error");
    $(elements.passwordCheckInput).removeClass("error");
  }
}

function submitError(error) {
  switch (error) {
    case 1:
      $(elements.errorText).text("Please enter a password.");
      break;
    case 2:
      $(elements.errorText).text(
        "Password must be at least 6 characters long.",
      );
      break;
    case 3:
      $(elements.errorText).text("Passwords do not match.");
      break;
    case 4:
      $(elements.errorText).text("Please enter a name.");
      break;
    case 5:
      $(elements.errorText).text("Please enter a valid email.");
      break;
  }
  showError();
}

function showError() {
  if (!$(elements.errorText).hasClass("active")) {
    $(elements.errorText).addClass("active");
    $(elements.errorText).slideDown("fast");
  }
  clearTimeout(showErrorEvent);
  showErrorEvent = setTimeout(() => {
    $(elements.errorText).removeClass("active");
    $(elements.errorText).slideUp("fast");
  }, 3000);
}

$(document).on(
  "keyup",
  `${elements.passwordInput}, ${elements.passwordCheckInput}`,
  passwordConfirm,
);
$(document).on("keyup", elements.emailInput, emailConfirm);
$(document).on("keyup", elements.nameInput, nameConfirm);
