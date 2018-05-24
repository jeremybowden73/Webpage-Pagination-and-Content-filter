// create a collection of all the list items with class "student-item"
const completeStudentList = document.querySelectorAll(".student-item");

// function to display a group of 10 students
// using startStudent for the first and endStudent for the last
function showPage(list, pageNumber) {
  // scroll to the top of page
  window.scrollTo(0, 0);
  // initially, hide all of the list items
  for (let i = 0; i < list.length; i++) {
    list[i].style.display = "none";
  }
  // determine the first student and the last student to be displayed, based
  // on the current page number (page 1 = 0-9; page 2 = 10-19, etc)
  let startStudent = 10 * pageNumber - 10;
  let endStudent = 10 * pageNumber - 1;
  // check if the endStudent value is greater than the number of students in
  // the complete list. If it is, make endStudent = number of students
  if (endStudent > list.length) {
    endStudent = list.length - 1;
  }
  // unhide the 10 list items we want to be visible on the page
  for (let i = startStudent; i <= endStudent; i++) {
    list[i].style.display = "block";
  }

  // call the function to add the page links pagination to the foot of the page
  appendPageLinks(completeStudentList, pageNumber);
  showSearch();
}

function showSearch() {
  // need to check if a div element with class "student-search" (i.e. the search box)
  // already exists, and if so we need to remove it because it will be replaced with a new one
  let oldSearchField = document.querySelector(".student-search");
  if (oldSearchField !== null) {
    oldSearchField.parentNode.removeChild(oldSearchField);
  }
  // select the div into which the new search box will be placed
  let pageHeader = document.querySelector(".page-header");
  // create a div element for the search field and give it a class name "student-search"
  // and drop it into pageHeader
  let searchField = document.createElement("div");
  searchField.className = "student-search";
  pageHeader.appendChild(searchField);
  // create an element for the input tag and give it a placeholder string
  // and drop it into the search field
  let input = document.createElement("input");
  input.placeholder = "Search for students...";
  searchField.appendChild(input);
  // create the search button element, give it text content
  // and drop it into the search field
  let searchButton = document.createElement("button");
  searchButton.textContent = "Search";
  searchField.appendChild(searchButton);
}

function appendPageLinks(list, active) {
  // need to check if a div element with class "pagination" (i.e. the pagination links)
  // already exists, and if so remove it because it will be replaced with a new one
  let oldPageLink = document.querySelector("div.pagination");
  if (oldPageLink !== null) {
    oldPageLink.parentNode.removeChild(oldPageLink);
  }
  // determine how many pages are needed for this student list
  let numberOfPages = Math.ceil(list.length / 10);
  // select the main page div element
  let pageDiv = document.querySelector(".page");
  // create the new page link div, with the class name "pagination"
  let pageLinkDiv = document.createElement("div");
  pageLinkDiv.className = "pagination";
  // append the page link div to the main page div
  pageDiv.appendChild(pageLinkDiv);
  // create the ul which will contain the page links
  let pageLinkUL = document.createElement("ul");
  pageLinkUL.className = "pagination-ul";
  // append the ul to the page link div
  pageLinkDiv.appendChild(pageLinkUL);
  // for every page, add a page link to the page link div
  for (let j = 1; j <= numberOfPages; j++) {
    let pageLinkLI = document.createElement("li");
    pageLinkLI.className = "pagination-li";
    pageLinkLI.style.marginRight = "0.5em";
    // create an anchor tag inside the li, and number it
    let pageLinkA = document.createElement("a");
    pageLinkA.className = "inactive";
    pageLinkA.textContent = j;
    pageLinkA.style.cursor = "pointer";
    pageLinkLI.appendChild(pageLinkA);
    // add the li to the parent ul
    pageLinkUL.appendChild(pageLinkLI);
  }
  // mark the current page as "active" by selecting the <a> tag
  // of the nth li element, where n is the active page number
  const activePage = document
    .querySelector(".pagination-ul")
    .querySelectorAll("li")
    [active - 1].querySelector("a");
  // set the class name of the <a> tag to "active" so the CSS will
  // display it in the "active" style
  activePage.className = "active";
  activePage.style.cursor = "default";

  // create the event listener on the parent <ul> for when a page link button is clicked.
  // It only works for inactive elements (i.e. all page numbers except the current one).
  // If fired, call the showPage function, passing to it the textContent (i.e. the page number)
  pageLinkUL.addEventListener("click", event => {
    if (event.target.className == "inactive") {
      let pageClicked = event.target.textContent;
      showPage(completeStudentList, pageClicked);
    }
  });
}

// to initialise, call the showPage function and pass to it the list of
// students and the initial page number to view (1)
showPage(completeStudentList, 1);
