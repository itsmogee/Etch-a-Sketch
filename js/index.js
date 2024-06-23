const body = document.querySelector("body");
const container = document.querySelector("#sketchpad");
const gridButton = document.querySelector("#changeGrid");
const clearButton = document.querySelector("#clearButton");
const paintBrush = document.getElementById("paintBrush");
const eraser = document.getElementById("eraser");
const rainbowBrush = document.getElementById("rainbowBrush");
const darkenButton = document.getElementById("darken");
const toggleGridButton = document.getElementById("toggleGrid");

// --------------  Useful variables--------------------------------------------
let paintBrushColor = "white";
let rainbowChoice = true;
let darkening = false;
let grid = false;

const MAXSIZE = 100;
let containerWidth = 1920.0 / 3.0;

var slider = document.getElementById("gridSlider");
var slidecontainer = document.querySelector(".slide-container");
let value = document.createElement("div");

let gridElements = [];
let opacityValues = [];
// ---------------------------------------------------------------------------

value.textContent = slider.value + " x " + slider.value;
value.style.fontSize = "24px";
value.style.fontFamily = "sans-serif";
slidecontainer.appendChild(value);

function createGrid(gridSize = 16) {
  const numGrids = gridSize * gridSize;
  for (let i = 0; i < numGrids; i++) {
    const gridElement = document.createElement("div");
    gridElement.className = "GridItem";
    gridElement.id = i;
    gridElement.style.display = "flex";
    gridElement.style.width = `calc(100% / ${gridSize})`;
    gridElement.style.height = `calc(100% / ${gridSize})`;
    gridElement.style.backgroundColor = "white";
    gridElement.style.padding = 0;
    gridElement.style.margin = 0;
    gridElement.style.gap = 0;
    if (grid) {
      gridElement.style.outline = "1px solid black";
    }
    opacityValues.push(1);
    if (rainbowChoice) {
      gridElement.addEventListener("mouseenter", rgbRandomizer);
    } else {
      gridElement.addEventListener("mouseenter", changeColor);
    }
    container.appendChild(gridElement);
    gridElements.push(gridElement);
  }
  value.textContent = gridSize + " x " + gridSize;
  slider.value = gridSize;
}

function deleteGrid() {
  var element = document.getElementById("sketchpad");
  opacityValues = [];
  while (element.firstChild) {
    element.firstChild.remove();
  }
}

const rgbRandomizer = function (event) {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);

  if (darkening) {
    if (opacityValues[event.currentTarget.id] > 0) {
      opacityValues[event.currentTarget.id] -= 0.1;
    }
    event.currentTarget.style.backgroundColor =
      "rgba(" +
      r +
      "," +
      g +
      "," +
      b +
      "," +
      opacityValues[event.currentTarget.id] +
      ")";
  } else {
    event.currentTarget.style.backgroundColor =
      "rgb(" + r + "," + g + "," + b + ")";
  }
};

const changeColor = function (element) {
  element.currentTarget.style.backgroundColor = paintBrushColor;
  if (darkening) {
    if (opacityValues[element.currentTarget.id] > 0) {
      opacityValues[element.currentTarget.id] -= 0.1;
    }
    element.currentTarget.style.opacity =
      opacityValues[element.currentTarget.id];
  } else {
    element.currentTarget.style.opacity = 1;
    opacityValues[element.currentTarget.id] = 1;
  }
};

clearButton.addEventListener("click", () => {
  if (gridElements.length > 0) {
    gridElements.forEach((element) => {
      element.style.backgroundColor = "white";
      opacityValues[element.id] = 1;
      element.style.opacity = 1;
    });
  }
});

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
  value.textContent = size + " x " + size;
  createGrid(size);
});

slider.oninput = function () {
  value.textContent = this.value + " x " + this.value;
  deleteGrid();
  createGrid(parseInt(value.textContent));
};

eraser.onclick = function () {
  eraser.style.border = "solid";
  eraser.style.borderColor = "#b8bb26";
  eraser.style.borderWidth = "5px";

  paintBrush.style.border = "none";
  rainbowBrush.style.border = "none";

  darkenButton.style.border = "none";

  rainbowChoice = false;
  darkening = false;
  paintBrushColor = "white";

  removeListeners();
  gridElements.forEach((element) => {
    element.addEventListener("mouseenter", changeColor);
    opacityValues[element.id] = 1;
  });
};

const paintBrushFx = function () {
  rainbowChoice = false;
  darkening = false;

  paintBrush.style.border = "solid";
  paintBrush.style.borderWidth = "5px";
  paintBrush.style.borderColor = "#b8bb26";
  rainbowBrush.style.border = "none";
  darkenButton.style.border = "none";
  eraser.style.border = "none";

  removeListeners();
  gridElements.forEach((element) => {
    paintBrushColor = this.value;
    element.addEventListener("mouseenter", changeColor);
  });
};

paintBrush.addEventListener("change", paintBrushFx);

rainbowBrush.onclick = function () {
  rainbowBrush.style.border = "solid";
  rainbowBrush.style.borderColor = "#b8bb26";
  rainbowBrush.style.borderWidth = "5px";
  paintBrush.style.border = "none";

  darkening = false;

  darkenButton.style.border = "none";

  eraser.style.border = "none";
  removeListeners();

  rainbowChoice = true;
  gridElements.forEach((element) => {
    opacityValues[element.id] = 1;
    element.addEventListener("mouseenter", rgbRandomizer);
  });
};

darkenButton.onclick = function () {
  darkening = !darkening;
  if (darkening) {
    this.style.border = "solid";
    this.style.borderWidth = "5px";
    this.style.borderColor = "#b8bb26";
  } else {
    this.style.border = "none";
    gridElements.forEach((element) => {
      opacityValues[element.id] = 1;
    });
  }
};

function removeListeners() {
  if (gridElements.length > 0) {
    gridElements.forEach((element) => {
      element.removeEventListener("mouseenter", changeColor);

      element.removeEventListener("mouseenter", rgbRandomizer);
    });
  }
}

toggleGridButton.onclick = () => {
  if (!grid) {
    grid = true;
    toggleGridButton.style.outline = "5px solid #b8bb26";
    gridElements.forEach((element) => {
      element.style.outline = "1px solid #b8bb26";
    });
  } else {
    grid = false;
    toggleGridButton.style.outline = "none";
    gridElements.forEach((element) => {
      element.style.outline = "none";
    });
  }
};
