const body = document.querySelector("body");
body.style.backgroundColor = "black";
const container = document.querySelector("#container");
const gridButton = document.querySelector("#changeGrid");

const MAXSIZE = 100;
let containerWidth = 52;
container.style.width = (containerWidth) + "vw";


function createGrid(gridSize = 16) {
  let blockSize = (containerWidth) / gridSize;
  const numGrids = gridSize * gridSize;
  for (let i = 0; i < numGrids; i++) {
    const gridElement = document.createElement("div");
    gridElement.className = "GridItem";
    gridElement.style.display = "flex";
    gridElement.style.width = blockSize + "vw";
    gridElement.style.height = blockSize * (16 / 9) + "vh";
    gridElement.style.backgroundColor = "orange";
    gridElement.style.padding = 0;
    gridElement.style.margin = 0;
    gridElement.style.gap = 0;
    gridElement.addEventListener("mouseenter", () => {
      gridElement.style.backgroundColor = "purple";
    })
    container.appendChild(gridElement);
  };
};

function deleteGrid() {
  var element = document.getElementById("container");
  while (element.firstChild) {
    element.firstChild.remove();
  }
};

createGrid();

gridButton.addEventListener("click", () => {
  let size = parseInt(prompt("Enter a grid size (Max : 100)"));
  deleteGrid();
  if (!Number.isInteger(size)) {
    alert("Entered value is not a number");
  } else if (size >= MAXSIZE) {
    alert("Defaulting to size 100");
    size = 100;
  }
  createGrid(size);
})
