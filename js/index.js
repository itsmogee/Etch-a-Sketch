const body = document.querySelector("body");
body.style.backgroundColor = "black";
const container = document.querySelector("#container")

function createGrid() {
  for (let i = 0; i < 16; i++) {
    const gridElement = document.createElement("div");
    gridElement.style.width = "100px";
    gridElement.style.height = "100px";
    gridElement.textContent = "Grid : " + parseInt(i + 1);
    gridElement.style.backgroundColor = "orange";
    gridElement.style.borderColor = "white";
    gridElement.style.borderWidth = "thin";
    gridElement.style.borderStyle = "solid";
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
    element.style.backgroundColor = "orange";
  })
});
