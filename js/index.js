const body = document.querySelector("body");
body.style.backgroundColor = "black";
const container = document.querySelector("#container");

let containerWidth = 85;
let gridSize = 64;

container.style.width = (containerWidth) + "vw";

const numGrids = gridSize * gridSize;
let blockSize = (containerWidth) / gridSize;

function createGrid() {
  for (let i = 0; i < numGrids; i++) {
    const gridElement = document.createElement("div");
    gridElement.className = "GridItem";
    gridElement.style.display = "flex";
    gridElement.style.width = blockSize + "vw";
    gridElement.style.height = blockSize + "vh";
    gridElement.style.backgroundColor = "orange";
    gridElement.style.padding = 0;
    gridElement.style.margin = 0;
    gridElement.style.gap = 0;
    container.appendChild(gridElement);
  };
};

createGrid();

const divItems = document.querySelectorAll(".GridItem");

divItems.forEach(element => {
  element.addEventListener("mouseenter", () => {
    element.style.backgroundColor = "purple";
  });
  element.addEventListener("mouseout", () => {
  })
});
