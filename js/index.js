const body = document.querySelector("body");
const container = document.querySelector("#sketchpad");
const gridButton = document.querySelector("#changeGrid");
const clearButton = document.querySelector("#clearButton");

const MAXSIZE = 100;
let containerWidth = 1920 / 3.5;
container.style.width = containerWidth + "px";

var slider = document.getElementById("gridSlider");
var slidecontainer = document.querySelector(".slide-container");
let value = document.createElement("div");
value.textContent = slider.value + " x " + slider.value;
value.style.fontSize = "24px";
value.style.fontFamily = "sans-serif";
slidecontainer.appendChild(value);

let gridElements = [];

function createGrid(gridSize = 16) {
  let blockSize = containerWidth / gridSize;
  let opacityValues = [];
  const numGrids = gridSize * gridSize;
  for (let i = 0; i < numGrids; i++) {
    const gridElement = document.createElement("div");
    gridElement.className = "GridItem";
    gridElement.id = i;
    gridElement.style.display = "flex";
    gridElement.style.width = blockSize + "px";
    gridElement.style.height = blockSize + "px";
    gridElement.style.backgroundColor = "white";
    gridElement.style.padding = 0;
    gridElement.style.margin = 0;
    gridElement.style.gap = 0;
    opacityValues.push(1);
    gridElement.addEventListener("mouseenter", () => {
      gridElement.style.backgroundColor = rgbRandomizer(
        opacityValues,
        gridElement,
      );
    });
    container.appendChild(gridElement);
    gridElements.push(gridElement);
  }
}

clearButton.addEventListener("click", () => {
  if (gridElements.length > 0) {
    gridElements.forEach((element) => {
      element.style.backgroundColor = "white";
    });
  }
});

function deleteGrid() {
  var element = document.getElementById("sketchpad");
  while (element.firstChild) {
    element.firstChild.remove();
  }
}

createGrid();

gridButton.addEventListener("click", () => {
  let size = parseInt(prompt("Enter a grid size (Max : 100)"));
  deleteGrid();
  if (!Number.isInteger(size)) {
    alert("Entered value is not a number");
  } else if (size > MAXSIZE) {
    alert("Defaulting to size 100");
    size = 100;
  } else if (size <= 0) {
    alert("Invalid size entered");
  }
  createGrid(size);
});

function rgbRandomizer(opacityValues, gridElement) {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);

  if (opacityValues[gridElement.id] > 0) {
    opacityValues[gridElement.id] -= 0.1;
  }

  return (
    "rgba(" + r + "," + g + "," + b + "," + opacityValues[gridElement.id] + ")"
  );
}

slider.oninput = function () {
  value.textContent = this.value + " x " + this.value;
  deleteGrid();
  createGrid(parseInt(value.textContent));
};
