const href = window.location.href;

if (href.indexOf("/apps/omega-search/") > -1) {
  document.addEventListener("DOMContentLoaded", overrides, false);
}

function overrides() {
  const column = document.getElementsByClassName("col-lg-8 col-sm-11 col-12");
  if (column) {
    column[0].classList.add("omega-app-override");
  }
}

/*
const listItems = document.getElementsByClassName("os-e bucket");
for (let index = 0; index < listItems.length; index++) {
  const element = listItems[index];
  const usePos = element.innerHTML.indexOf("use-");
  const skinPos = element.innerHTML.indexOf("skin-");
  if (usePos > -1) {
    element.innerHTML = element.innerHTML.replace("use-", "");
  } else if (skinPos > -1) {
    element.innerHTML = element.innerHTML.replace("skin-", "");
  }
} */
