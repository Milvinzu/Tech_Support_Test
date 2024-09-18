// const sudokuTrue = [
//   [5, 3, 4, 6, 7, 8, 9, 1, 2],
//   [6, 7, 2, 1, 9, 5, 3, 4, 8],
//   [1, 9, 8, 3, 4, 2, 5, 6, 7],
//   [8, 5, 9, 7, 6, 1, 4, 2, 3],
//   [4, 2, 6, 8, 5, 3, 7, 9, 1],
//   [7, 1, 3, 9, 2, 4, 8, 5, 6],
//   [9, 6, 1, 5, 3, 7, 2, 8, 4],
//   [2, 8, 7, 4, 1, 9, 6, 3, 5],
//   [3, 4, 5, 2, 8, 6, 1, 7, 9],
// ];

// const sudokuFalse = [
//   [5, 3, 4, 6, 7, 8, 9, 1, 2],
//   [6, 7, 2, 1, 9, 5, 3, 4, 8],
//   [1, 9, 8, 3, 4, 2, 5, 6, 7],
//   [8, 5, 9, 7, 6, 1, 4, 2, 3],
//   [4, 2, 6, 8, 5, 3, 7, 9, 1],
//   [7, 1, 3, 9, 2, 4, 8, 5, 6],
//   [9, 6, 1, 5, 3, 7, 2, 8, 4],
//   [2, 8, 7, 4, 1, 9, 6, 3, 5],
//   [3, 4, 5, 2, 8, 6, 1, 1, 9],
// ];

// alert(validSolution(sudokuTrue));

function checkSudoku() {
  const table = document.querySelectorAll("input");
  const sudoku = [];

  for (let i = 0; i < table.length; i += 9) {
    sudoku.push(
      Array.from(table)
        .slice(i, i + 9)
        .map((cell) => parseInt(cell.value) || 0)
    );
  }

  const isValid = validSolution(sudoku);
  alert(isValid ? "Судоку вирішено правильно!" : "Судоку містить помилки!");
}

function clearSudoku() {
  const cells = document.querySelectorAll("input");
  cells.forEach((cell) => (cell.value = ""));
}

function validSolution(sudokuTable) {
  function isValidSet(arr) {
    const sortedArr = arr.slice().sort();
    for (let i = 0; i < 9; i++) {
      if (sortedArr[i] !== i + 1) {
        return false;
      }
    }
    return true;
  }

  let lineSudoku = [];

  for (i = 0; i < 9; i++) {
    lineSudoku = sudokuTable[i];

    if (!isValidSet(lineSudoku)) {
      return false;
    }
  }

  let columnSudoku = [];
  for (i = 0; i < 9; i++) {
    columnSudoku = [];
    for (j = 0; j < 9; j++) {
      columnSudoku.push(sudokuTable[j][i]);
    }

    if (!isValidSet(columnSudoku)) {
      return false;
    }
  }

  for (let blockRow = 0; blockRow < 3; blockRow++) {
    for (let blockCol = 0; blockCol < 3; blockCol++) {
      let block = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          block.push(sudokuTable[blockRow * 3 + i][blockCol * 3 + j]);
        }
      }

      if (!isValidSet(block)) {
        return false;
      }
    }
  }

  return true;
}

document.addEventListener("keydown", function (e) {
  const focusedInput = document.activeElement;
  if (focusedInput.tagName.toLowerCase() === "input") {
    const cells = Array.from(document.querySelectorAll("input"));
    const index = cells.indexOf(focusedInput);

    switch (e.key) {
      case "ArrowUp":
        if (index - 9 >= 0) cells[index - 9].focus();
        break;
      case "ArrowDown":
        if (index + 9 < cells.length) cells[index + 9].focus();
        break;
      case "ArrowLeft":
        if (index % 9 !== 0) cells[index - 1].focus();
        break;
      case "ArrowRight":
        if ((index + 1) % 9 !== 0) cells[index + 1].focus();
        break;
    }
  }
});
