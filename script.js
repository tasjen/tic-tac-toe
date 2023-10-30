const gameBoard = (function () {
  const board = document.querySelector("#board");
  const turn = document.querySelector('#turn');
  const players = [player("X"), player("O")];
  const cells = new Array(9);
  const winnerMove = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
  let playerTurn = players[Math.floor(Math.random() * 2)];

  const getCell = (i) => cells[i];
  const setCell = (i, player) => (cells[i] = player);
  const nextPlayer = () => {
    playerTurn = players[(players.indexOf(playerTurn) + 1) % players.length];

  };
  const checkGameOver = () => {
    //check the winner (from stackoverflow)
    for (let move of winnerMove) {
      if (move.every((e) => playerTurn.getMove().includes(e))) {
        turn.textContent = `${playerTurn.getName()} wins`;
        return restartGame();
      }
    }
    if (!cells.includes(undefined)) {
      turn.textContent = "Tie"
      return restartGame();
    }
  };
  const restartGame = () => {
    clearBoard();
    renderBoard();
  };
  const clearBoard = () => {
    [players[0], players[1]] = [player("X"), player("O")];
    while (board.firstChild) {
      board.removeChild(board.firstChild);
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
          playerTurn.addMove(+cell.id);
          checkGameOver();
          nextPlayer();
          turn.textContent = `${playerTurn.getName()}'s turn`;
        }
      });
      board.appendChild(cell);
    }
    turn.textContent = `${playerTurn.getName()}'s turn`;
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
