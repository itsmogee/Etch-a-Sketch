const body = document.querySelector("body");
const container = document.querySelector("#container")

function createGrid() {
  for (let i = 0; i < 16; i++) {
    const gridElement = document.createElement("div");
    gridElement.style.width = "100px";
    gridElement.style.height = "100px";
    gridElement.textContent = "Grid : " + parseInt(i + 1);
    container.appendChild(gridElement);
  };
};

createGrid();
