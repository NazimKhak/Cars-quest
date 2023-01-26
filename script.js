const refs = {
  draggble_list: document.querySelector("#draggble-list"),
  check_button: document.querySelector(".check-btn"),
  resetButton: document.querySelector(".reset-btn"),
};

const richestPeople = [
  "Koenigsegg Jesko Absolut",
  "Hennessey Venom F5",
  "SSC Tuatara",
  "Bugatti Chiron Super Sport",
  "Koenigsegg Agera RS",
  "Hennessey Venom GT",
  "Bugatti Veyron Super Sport",
  "Bugatti Chiron",
  "SSC Ultimate Aero TT",
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
    .forEach((cars, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
      <span class="number">${index + 1}</span> 
          <div class ="draggable" draggable="true">
          <p class="car-name">${cars}</p>
          <i>
          <svg style="width:24px; heigth:24px" viewBox="0 0 24 24">
          <path fill= "currentColor" d="M22 2V4H2V2H22M7 10.5V13.5H17V10.5H7M2 20V22H22V20H22" /<>/<svg>
          </i>
          </div>
          `;
      listItems.push(listItem);
      refs.draggble_list.appendChild(listItem);
    });
  addEventListeners();
}

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  this.classList.add("over");
}
function dragLeave() {
  this.classList.remove("over");
}
function dragDrop(e) {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
}
function dragOver(e) {
  e.preventDefault();
}

function checkorder() {
  listItems.forEach((listItem, index) => {
    const carName = listItem.querySelector(".draggable").innerText.trim();
    if (carName !== richestPeople[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

refs.check_button.addEventListener("click", checkorder);
refs.resetButton.addEventListener("click", reset);
