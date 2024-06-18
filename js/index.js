const body = document.querySelector("body");
body.style.backgroundColor = "rgb(0, 60, 50)";
const container = document.querySelector("#container");
const gridButton = document.querySelector("#changeGrid");

const MAXSIZE = 100;
let containerWidth = 40;
container.style.width = (containerWidth) + "vw";


function createGrid(gridSize = 16) {
  let blockSize = (containerWidth) / gridSize;
  let opacityValues = [];
  const numGrids = gridSize * gridSize;
  for (let i = 0; i < numGrids; i++) {
    const gridElement = document.createElement("div");
    gridElement.className = "GridItem";
    gridElement.title = i;
    gridElement.style.display = "flex";
    gridElement.style.width = blockSize + "vw";
    gridElement.style.height = blockSize * (16 / 9) + "vh";
    gridElement.style.backgroundColor = "white";
    gridElement.style.padding = 0;
    gridElement.style.margin = 0;
    gridElement.style.gap = 0;
    opacityValues.push(1);
    gridElement.addEventListener("mouseenter", () => {
      gridElement.style.backgroundColor = rgbRandomizer(opacityValues, gridElement);
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
  } else if (size <= 0) {
    alert("Invalid size entered");
  }
  createGrid(size);
})

function rgbRandomizer(opacityValues, gridElement) {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);

  if (opacityValues[gridElement.title] > 0) {
    opacityValues[gridElement.title] -= 0.1;
  }

  return "rgba(" + r + "," + g + "," + b + "," + opacityValues[gridElement.title] + ")";
}
