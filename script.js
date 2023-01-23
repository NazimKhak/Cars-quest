const refs = {
  draggble_list: document.querySelector("#draggble-list"),
  check_button: document.querySelector("check-button"),
};

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffet",
  "Bernand Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Elison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

const listItems = [];
let dragStartIndex;

createlist();

function createlist() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `<span class='number>${index + 1}</span>
          <div class ="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i>
          svg style="width:24px; heigth:24px" viewBox="0 0 24 24">
          <path fill= "currentColor" d="M22 2V4H2V2H22M7 10.5V13.5H17V10.5H7M2 20V22H22V20H22" /<>/<svg>
          </i>
          </div>
          `;
      listItems.push(listItem);
      refs.draggble_list.appendChild(listItem);
      console.log(listItems);
    });
  addEventListeners();
}

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function addEventListeners() {
  const draggables = document.querySelector(".draggable");
  const dragListItems = document.querySelector(".draggable-list li");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });
}

dragListItems.forEach((item) => {
  item.addEventListener("dragover", dragOVer);
  item.addEventListener("drop", dragDrop);
  item.addEventListener("dragenter", dragEnter);
  item.addEventListener("dragleave", dragLeave);
});

check.addEventListener("click", checkOrder);
