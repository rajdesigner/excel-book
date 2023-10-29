let sheetDB = [];

for (let i = 0; i < rows; i++) {

  let sheetRow = [];

  for (let j = 0; j < cols; j++) {

    // setting default values of cell properties
    let cellProp = {
      bold: false,
      italic: false,
      underline: false,
      alignment: 'left',
      fontFamily: 'Lato',
      fontSize: '14',
      fontColor: '#000000',
      bgColor: '#ffffff'
    }

    sheetRow.push(cellProp);
  }

  sheetDB.push(sheetRow);
}

// selector for cell properies
let bold = document.querySelector('.bold');
let italic = document.querySelector('.italic');
let underline = document.querySelector('.underline');
let fontSize = document.querySelector('.font_size_select');
let fontFamily = document.querySelector('.font_family_select');
let fontColor = document.querySelector('.font-color-prop');
let bgColor = document.querySelector('.bg-color-prop');
let alignment = document.querySelectorAll('.alignment');
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];
let activeColorProp = '#d1d8e0';
let inactiveColorProp = '#fff'

//Application of 2-way-binding
//Attach property-listener
bold.addEventListener('click', (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  //Modefication

  cellProp.bold = !cellProp.bold; // Data Change
  cell.style.fontWeight = cellProp.bold ? 'bold' : 'normal' // UI Change
  bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
})

italic.addEventListener('click', (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  //Modefication

  cellProp.italic = !cellProp.italic; // Data Change
  cell.style.fontStyle = cellProp.italic ? 'italic' : 'normal' // UI Change
  italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
})

underline.addEventListener('click', (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  //Modefication

  cellProp.underline = !cellProp.underline; // Data Change
  cell.style.textDecoration = cellProp.underline ? 'underline' : 'none' // UI Change
  underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
})

fontSize.addEventListener('change', (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  //Modefication

  cellProp.fontSize = fontSize.value; // Data Change
  cell.style.fontSize = `${cellProp.fontSize}px` // UI Change
  fontSize.value = cellProp.fontSize
})

fontFamily.addEventListener('change', (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  //Modefication

  cellProp.fontFamily = fontFamily.value; // Data Change
  cell.style.fontFamily = `${cellProp.fontFamily}` // UI Change
  fontFamily.value = cellProp.fontFamily
})

fontColor.addEventListener('change', (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  //Modefication

  cellProp.fontColor = fontColor.value; // Data Change
  cell.style.color = `${cellProp.fontColor}` // UI Change
  fontColor.value = cellProp.fontColor
})

bgColor.addEventListener('change', (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  //Modefication

  cellProp.bgColor = bgColor.value; // Data Change
  cell.style.backgroundColor = `${cellProp.bgColor}` // UI Change
  bgColor.value = cellProp.bgColor;
})

alignment.forEach((alignElem) => {
  alignElem.addEventListener('click', (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);

    let alignValue = e.target.classList[0]
    cellProp.alignment = alignValue // Data
    cell.style.textAlign = cellProp.alignment; // UI CHange
    switch (alignValue) {
      case "left":
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp
        rightAlign.style.backgroundColor = inactiveColorProp
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = activeColorProp
        rightAlign.style.backgroundColor = inactiveColorProp
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp
        rightAlign.style.backgroundColor = activeColorProp
        break;
    }

  })
})

let allCells = document.querySelectorAll('.excel-grid-cell');

for (let i = 0; i < allCells.length; i++) {
  addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell) {
  cell.addEventListener('click', (e) => {
    let address = addressBar.value;
    let [rid, cid] = decodeRIDCIDFromAddress(address);
    let cellProp = sheetDB[rid][cid];

    // Apply cell Properties
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor = cellProp.bgColor === "#000000" ? "transparent" : cellProp.BGcolor;
    cell.style.textAlign = cellProp.alignment;

    // Apply Properties to UI container
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
    fontColor.value = cellProp.fontColor;
    bgColor.value = cellProp.bgColor;
    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;
    switch (cellProp.alignment) { // UI change (2)
      case "left":
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = activeColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = activeColorProp;
        break;
    }
  })
}



function activeCell(address) {
  let [rid, cid] = decodeRIDCIDFromAddress(address);
  //Access cell and Storage.

  let cell = document.querySelector(`.excel-grid-cell[rid='${rid}'][cid='${cid}']`);
  let cellProp = sheetDB[rid][cid];
  return [cell, cellProp];
}

function decodeRIDCIDFromAddress(address) {
  //address -> 'A1';
  let rid = Number(address.slice(1) - 1) //"1"
  let cid = Number(address.charCodeAt(0)) - 65 // "A" -> 
  return [rid, cid]
}