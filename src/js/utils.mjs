// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {

  // gets URL parameters
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;

}

export function renderlistwithtemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
  ) {
    const htmlStrings = list.map(templateFn);

    if (clear) {
      parentElement.innerHTML - "";
    }

    parentElement.insertAdjacentHTML (position,htmlStrings.join(""));
}

export function renderWithTemplate(templateFn, parentElement, data, position = "afterbegin", callback) {
    
    parentElement.insertAdjacentHTML (position, templateFn);

    if (callback) {
      callback(data);
    }

}

async function loadTemplate(path) {
  const response = await fetch(path);
  const data = await response.text();

  return data;
}

export async function loadHeaderFooter() {
  
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const headerTemplate = await loadTemplate("../partials/header.html");

  const footerElement = document.getElementById("footer-content");
  const headerElement = document.getElementById("header-content");

  renderWithTemplate(footerTemplate, footerElement);
  renderWithTemplate(headerTemplate, headerElement);

}