let boardArea = document.querySelector(".game-board");

for (let i = 0; i < 9; i++) {
  const square = document.createElement("div");
  square.className = "square";
  boardArea.appendChild(square);
  console.log(i);
}
