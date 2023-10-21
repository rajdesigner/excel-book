let rows = 100;
let cols = 26;

let columns = document.querySelector('.grid-row-container');
let allRows = document.querySelector('.grid-col-cell-address');
let cellsCont = document.querySelector('.grid-col-container');

for (let i = 0; i < rows; i++) {
  let col_grid = document.createElement('div');
  col_grid.setAttribute('class', 'excel-grid-rows')
  col_grid.innerText = i + 1;
  columns.appendChild(col_grid);
}

for (let i = 0; i < cols; i++) {
  let row_grid = document.createElement('div');
  row_grid.setAttribute('class', 'excel-grid-cols')
  row_grid.innerText = String.fromCharCode(65 + i);
  allRows.appendChild(row_grid);
}

for (let i = 0; i < rows; i++) {
  let rowCount = document.createElement('div');
  rowCount.setAttribute('class', 'grid-col-cell-address-rows');
  for (let j = 0; j < cols; j++) {
    let cell = document.createElement('div');
    cell.setAttribute('class', 'excel-grid-cell');
    cell.setAttribute('contenteditable', 'true');
    rowCount.appendChild(cell);
    addListnerForAddressBar(cell, i, j)
  }
  cellsCont.appendChild(rowCount);
}

function addListnerForAddressBar(cell, i, j){
  cell.addEventListener('click', function(){
    document.querySelector('.address-bar').value = `${String.fromCharCode(65 + j)} ${i+1}`;
  })
}