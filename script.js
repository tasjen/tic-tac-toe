const Gameboard = (function () {
  let player = "x";
  const cells = new Array(9);

  const getCell = (i) => cells[i];
  const setCell = (i, player) => cells[i] = player;
  const nextPlayer = () => {
    player = player === "x" ? "o" : "x";
  };
  const checkWinner = ()=>{};

  const board = document.querySelectorAll("#board button");
  board.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (!getCell(cell.id-1)) {
        setCell(cell.id - 1, player);
        cell.textContent = player;
        checkWinner();
        nextPlayer();
      }
      console.log(cells.toString());
      console.log('current player is', player)
    });
  });

  return {};
})();


