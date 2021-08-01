const tableBody = document.querySelector("tbody");
const pageList = document.querySelector(".link-list");
const buttons = document.getElementsByClassName("table-button");
const active = document.getElementsByClassName("active");
const buttonList = pageList.children;

let list = [];
let displayList = [];
let openPage = 1;
const numPerPage = 5;
let numOfPages = 0;

//function that takes data displayed on /books route and pushes it into list array
const showPage = (arr) => {
    for(let i = 0; i < arr.length; i++){
        const row = `
            <tr>
                <td>
                    <a href="/books/${document.getElementsByClassName("id-num")[i].innerText}">${document.getElementsByClassName("title")[i].innerText}</a>
                </td>
                <td>${document.getElementsByClassName("author")[i].innerText}</td>
                <td>${document.getElementsByClassName("genre")[i].innerText}</td>
                <td>${document.getElementsByClassName("year")[i].innerText}</td>
            </tr>
        `;
        list.push(row);
    }
    numOfPages = Math.ceil(arr.length/numPerPage);
};

//Funtion that pushes table rows into DOM
const drawList = () =>{
    tableBody.innerHTML = null;
    for(let i = 0; i < displayList.length; i++){
        tableBody.innerHTML += displayList[i];
    }
};

//Function that adds buttons to view parts of data
const addPagination = () => {
   for(let i = 0; i < numOfPages; i++){
   const tableButton = `
      <li>
        <button type="button" class="table-button">${[i + 1]}</button>
      </li>
   `;
   pageList.innerHTML += tableButton;
   }
   for(let i = 0; i < buttons.length; i++){
      buttons[i].addEventListener("click", ()=>{
         active[0].classList.remove("active");
         openPage = 0;
         openPage = i + 1;
         loadList();
    });
  }
}

//Function that organizes data into table body
const loadList = () => {
  buttons[openPage - 1].classList.toggle("active");
  let start = ((openPage - 1) * numPerPage);
  let finish = start + numPerPage;
  displayList = list.slice(start, finish);
  drawList();
}

const load = () => {
  showPage(document.getElementsByClassName("data-row"));
  addPagination();
  loadList();
}

window.onload = load();