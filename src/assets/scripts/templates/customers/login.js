/**
 * Password Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Password template.
 *
 * @namespace password
 */

import $ from "jquery";

const selectors = {
  recoverPasswordForm: "#RecoverPassword",
  hideRecoverPasswordLink: "#HideRecoverPasswordLink",
};

function onShowHidePasswordForm(event) {
  event.preventDefault ? event.preventDefault() : (event.returnValue = false);
  toggleRecoverPasswordForm();
}

function checkUrlHash() {
  const hash = window.location.hash;

  // Allow deep linking to recover password form
  if (hash === "#recover") {
    toggleRecoverPasswordForm();
  }
}

/**
 *  Show/Hide recover password form
 */
function toggleRecoverPasswordForm() {
  $("#RecoverPasswordForm").toggleClass("hide");
  $("#CustomerLoginForm").toggleClass("hide");
}

/**
 *  Show reset password success message
 */
function resetPasswordSuccess() {
  const $formState = $(".reset-password-success");

  // check if reset password form was successfully submited.
  if (!$formState.length) {
    return;
  }

  // show success message
  $("#ResetSuccess").removeClass("hide");
}

if ($(selectors.recoverPasswordForm).length) {
  checkUrlHash();
  resetPasswordSuccess();

  $(selectors.recoverPasswordForm).on("click", onShowHidePasswordForm);
  $(selectors.hideRecoverPasswordLink).on("click", onShowHidePasswordForm);
}

function getUrlParams() {
  const params = {};
  if (window.location.search.length > 0) {
    document.location.search
      .substr(1)
      .split("&")
      .forEach((pair) => {
        const paramsSplit = pair.split("=");
        params[paramsSplit[0]] = paramsSplit[1];
      });
  }
  return params;
}

if (document.getElementsByClassName("template-login")[0]) {
  $(document).ready(() => {
    const params = getUrlParams();
    if (params.reset === "true") {
      toggleRecoverPasswordForm();
    }
  });
}
