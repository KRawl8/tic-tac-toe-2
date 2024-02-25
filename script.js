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
          board[value] = Gameplay.getCurrentPlayer().token;

          Gameplay.changePlayer(target);
          Gameplay.checkForWins();
        }
      });
      boardArea.appendChild(square);
    });
  };
  renderBoard();

  const clearBoard = () => {
    while (boardArea.firstChild) {
      boardArea.removeChild(boardArea.firstChild);
    }
    board = [];
    populateBoard();
  };

  const resetBoard = () => {
    clearBoard();
    renderBoard();
  };

  return { getBoard, populateBoard, resetBoard };
})();

const newPlayer = (name, token) => {
  return { name, token };
};

const Gameplay = (function () {
  const header = document.querySelector(".header");
  const titleText = document.querySelector("h1");
  const currentPlayerNumber = document.querySelector(".player-number");
  const currentPlayerCounter = document.querySelector(".player-counter");
  let resetButton = document.querySelector(".reset-button");

  const playerOne = newPlayer("1", "X");
  const playerTwo = newPlayer("2", "O");

  let currentPlayer = playerOne;
  const getCurrentPlayer = () => currentPlayer;

  const changePlayer = (e) => {
    if (currentPlayer === playerOne) {
      e.currentTarget.textContent = currentPlayer.token;
      currentPlayer = playerTwo;
      currentPlayerNumber.textContent = currentPlayer.name;
      currentPlayerCounter.textContent = currentPlayer.token;
    } else if (currentPlayer === playerTwo) {
      e.currentTarget.textContent = currentPlayer.token;
      currentPlayer = playerOne;
      currentPlayerNumber.textContent = currentPlayer.name;
      currentPlayerCounter.textContent = currentPlayer.token;
    }
  };

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkForWins = () => {
    winConditions.forEach((winCon) => {
      if (
        Gameboard.getBoard()[winCon[0]] === Gameboard.getBoard()[winCon[1]] &&
        Gameboard.getBoard()[winCon[0]] === Gameboard.getBoard()[winCon[2]] &&
        titleText.textContent === "Tic-Tac-Toe"
      ) {
        winner = getCurrentPlayer() === playerOne ? playerTwo : playerOne;
        titleText.textContent = "Player " + winner.name + " Wins!";
        header.style.backgroundColor = "rgb(221, 174, 20)";
      }
    });
  };

  resetButton.addEventListener("click", () => {
    Gameboard.resetBoard();
    titleText.textContent = "Tic-Tac-Toe";
    header.style.backgroundColor = "rgb(17, 161, 36)";
  });

  return { getCurrentPlayer, changePlayer, checkForWins };
})();
