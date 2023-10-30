const Board = document.querySelector("#board");
const Gameboard = (function () {
  const players = [player("x"), player("o")];
  const cells = new Array(9);
  const winnerMove = ["123", "456", "789", "147", "258", "369", "159", "357"];
  let playerTurn = players[Math.floor(Math.random() * 2)];

  const getCell = (i) => cells[i];
  const setCell = (i, player) => (cells[i] = player);
  const nextPlayer = () => {
    playerTurn = players[(players.indexOf(playerTurn) + 1) % players.length];
  };
  const checkGameOver = () => {
    //check the winner (from stackoverflow)
    for (let move of winnerMove) {
      if (move.split("").every((e) => playerTurn.getMove().includes(e))) {
        alert(`${playerTurn.getName()} wins`);
        return restartGame();
      }
    }
    if (!cells.includes(undefined)) {
      alert("tie");
      return restartGame();
    }
  };
  const restartGame = () => {
    clearBoard();
    renderBoard();
  };
  const clearBoard = () => {
    [players[0], players[1]] = [player("x"), player("o")];
    while (Board.firstChild) {
      Board.removeChild(Board.firstChild);
    }
    cells.fill(undefined);
    playerTurn = players[Math.floor(Math.random() * 2)];
  };
  const renderBoard = () => {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("button");
      cell.id = i + 1;
      cell.addEventListener("click", () => {
        //if the cell is not taken by any player
        if (!getCell(cell.id - 1)) {
          setCell(cell.id - 1, playerTurn.getName());
          cell.textContent = playerTurn.getName();
          playerTurn.addMove(cell.id);
          checkGameOver();
          nextPlayer();
        }
      });
      Board.appendChild(cell);
    }
  };
  renderBoard();
  return {};
})();

function player(name) {
  const move = new Array(5);
  const getName = () => name;
  const getMove = () => move;
  const addMove = (cellNumber) => move.push(cellNumber);
  return { getName, getMove, addMove };
}
