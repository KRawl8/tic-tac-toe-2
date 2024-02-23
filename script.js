const Gameboard = (function () {
  const boardArea = document.querySelector(".game-board");

  let board = [];
  const getBoard = () => board;

  const populateBoard = () => {
    for (let i = 0; i < 9; i++) {
      board.push(i);
    }
  };
  populateBoard();

  const renderBoard = () => {
    board.forEach((value) => {
      const square = document.createElement("div");
      square.className = "square";
      square.dataset.index = value;
      square.addEventListener("click", (target) => {
        if (target.currentTarget.textContent == "") {
          value = target.currentTarget.dataset.index;
          // When I have the gamplay set up I need to update the boardItem, changePlayer and check for winner
        }
      });
      boardArea.appendChild(square);
    });
  };
  renderBoard();

  const clearBoard = () => {
    while (boardArea.firstChild) {
      boardArea.removeChild(boardArea.firstChild);
      console.log(boardArea.firstChild + "Removed");
    }
  };

  const resetBoard = () => {};

  return { getBoard, populateBoard, renderBoard, clearBoard };
})();
