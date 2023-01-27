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
  return urlParams.get(param);

}

export function renderlistwithtemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
  ) {
    const htmlStrings=list.map(templateFn);
    if (clear) {
      parentElement.innerHTML - "";
      parentElement.insertAdjacentHTML (position,HTMLsTRINGS.JOIN(""));
    }
     
  }
  export function setClick(selector, callback) {
    qs(selector).addEvenListener("louchend", (Event) =>{
      Event.preventDefault();
      callback();
    });
    qs(selector).addEventListener("click", callback);
  }
