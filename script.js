const Gameboard = (function () {
  const players = [player("x"), player("o")];
  const cells = new Array(9);
  const winnerMove = ['123','456','789','147','258','369','159','357'];
  let playerTurn = players[Math.floor(Math.random() * 2)];

  const getCell = (i) => cells[i];
  const setCell = (i, player) => (cells[i] = player);
  const nextPlayer = () => {
    playerTurn = players[(players.indexOf(playerTurn) + 1) % players.length];
  };
  const checkWinner = () => {
    //from stackoverflow
    for (let move of winnerMove){
      if (move.split("").every(e => playerTurn.getMove().includes(e))){
        alert(`${playerTurn.getName()} wins`);
        return;
      };
    }
  };

  const board = document.querySelectorAll("#board button");
  board.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (!getCell(cell.id - 1)) {
        setCell(cell.id - 1, playerTurn.getName());
        cell.textContent = playerTurn.getName();
        playerTurn.addMove(cell.id);
        console.log("current player is", playerTurn.getName());
        checkWinner();
        nextPlayer();
      }
    });
  });

  return {};
})();

function player(name) {
  const move = new Array(5);
  const getName = () => name;
  const getMove = () => move;
  const addMove = (cellNumber) => {
    move.push(cellNumber);
    move.sort();
  }
  return { getName, getMove, addMove };
}
