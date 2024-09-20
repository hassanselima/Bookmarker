const siteName = document.getElementById("siteName");
const siteUrl = document.getElementById("siteUrl");
const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");
const searchInput = document.getElementById("searchInput");
const tableData = document.getElementById("tableData");

let index = 0;
let bookmarkedwebsites;

addBtn.addEventListener("click", addWebsite);
updateBtn.addEventListener("click", updateBookmark);
searchInput.addEventListener("input", searchBookmarks);

if (localStorage.getItem("bookmarkWebsites")) {
  bookmarkedwebsites = getBookmarks();
  displayBookmarks();
} else {
  bookmarkedwebsites = [];
}

function addWebsite(e) {
  e.preventDefault();
  const bookmark = {
    name: siteName.value,
    url: siteUrl.value,
  };
  if (siteName.value != "" && siteUrl.value != "") {
    bookmarkedwebsites.push(bookmark);
  }
  clearFormInputs();
  setLocalStorage();
  displayBookmarks();
}

function updateBookmark() {
  const bookmark = {
    name: siteName.value,
    url: siteUrl.value,
  };
  bookmarkedwebsites.splice(index, 1, bookmark);
  clearFormInputs();
  setLocalStorage();
  displayBookmarks();
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
}

function setLocalStorage() {
  localStorage.setItem("bookmarkWebsites", JSON.stringify(bookmarkedwebsites));
}

function getBookmarks() {
  return JSON.parse(localStorage.getItem("bookmarkWebsites"));
}

function clearFormInputs() {
  siteName.value = null;
  siteUrl.value = null;
}

function searchBookmarks() {
  displayBookmarks();
}

function update(idx) {
  console.log("updated " + idx);
  index = idx;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  siteName.value = bookmarkedwebsites[idx].name;
  siteUrl.value = bookmarkedwebsites[idx].url;
}
function deleteBookmark(idx) {
  console.log("deleted " + idx);
  bookmarkedwebsites.splice(idx, 1);
  setLocalStorage();
  displayBookmarks();
}

function displayBookmarks() {
  let data = "";
  let term = searchInput.value.toLowerCase();

  for (let i = 0; i < bookmarkedwebsites.length; i++) {
    if (bookmarkedwebsites[i].name.toLowerCase().includes(term)) {
      data += `<tr>
              <td>${i}</td>
              <td>${bookmarkedwebsites[i].name.toLowerCase()}</td>
              <td>
                <a
                  href="${bookmarkedwebsites[i].url}"
                  target="_blank"
                  class="btn btn-primary btn-sm visitSite shadow"
                >
                  Visit <i class="fa-regular fa-eye"></i>
                </a>
              </td>
              <td>
                <button class="btn btn-warning btn-sm shadow" onClick="update(${i})">
                  Update <i class="fa-regular fa-pen-to-square"></i>
                </button>
              </td>
              <td>
                <button class="btn btn-danger btn-sm shadow" onClick="deleteBookmark(${i})">
                  Delete <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>`;
    }
  }
  tableData.innerHTML = data;
}
