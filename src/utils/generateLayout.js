export default function generateLayout (rows, columns, mines) {
  const layout = [];

  for (let i = 0; i < rows; i++) {
    layout.push([])
  }

  layout.map((row, index) => {
    for (let i = 0; i < columns; i++) {
      row.push({
        x: i,
        y: index,
        hasMine: false,
        isOpen: false,
        hasFlag: false,
        minesAround: 0
      })
    }
    return row;
  });

  for (let i = 0; i < mines; i++) {
    const randomX = Math.floor(Math.random() * columns);
    const randomY = Math.floor(Math.random() * rows);

    const cellWithMine = layout[randomY][randomX];

    cellWithMine.hasMine ? i-- : cellWithMine.hasMine = true;
  }
  // console.log(rows, columns, mines);
  return layout;
}

// export default generateLayout;
