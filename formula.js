for(let i=0; i<rows;i++){
  for(let j=0; j<cols; j++){
    let cell = document.querySelector(`.excel-grid-cell[rid='${i}'][cid='${j}']`);
    cell.addEventListener('blur', (e) => {
      let address = addressBar.value;
      let [activecell, cellProp] = getCellAndCellProp(address);
      let enteredData = activecell.innerText;
      if(enteredData === cellProp.value) return
      cellProp.value = enteredData;
      //IF data modified remove P-C relatio, formula empty, update children with new harcoded (modified) value
      removeChildFromParent(cellProp.formula);
      cellProp.formula = '';
      updateChildrenCells(address)
    });
  }
}

let formulaBar = document.querySelector('.formula-bar');
formulaBar.addEventListener('keydown',(e) => {
  let inputFormaula = formulaBar.value;
  if(e.key == 'Enter' && formulaBar.value){
    let evaluatedValue = evaluateFormula(inputFormaula);

    // if change in formula, brea old P-C relation, evalutaes new formula, add new P-C formula
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address)
    if(inputFormaula !== cellProp.formula) removeChildFromParent(cellProp.formula);
    //to update Ui and Cell Properties
    setCellUIAndCellProp(evaluatedValue, inputFormaula, address);
    addChildtoParent(inputFormaula);
    console.log(sheetDB);

    updateChildrenCells(address)
  }
})

function updateChildrenCells(parentAddress){
  let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);
  let children = parentCellProp.children;

  for (let i=0; i<children.length; i++){
    let childAddress = children[i];
    let [childCell, childCellProp] = getCellAndCellProp(childAddress);
    let childFormula = childCellProp.formula;

    let evaluatedValue = evaluateFormula(childFormula);
    setCellUIAndCellProp(evaluatedValue, childFormula, childAddress);
    updateChildrenCells(childAddress);
  }
}

function addChildtoParent(formula){
  let chilAaddress = addressBar.value
  let encodedFormula = formula.split(' ');
  for (let i=0;i<encodedFormula.length; i++){
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if(asciiValue >=65 && asciiValue <=90) {
      let [cell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
      parentCellProp.children.push(chilAaddress);
    }
  }
}

function removeChildFromParent(oldFormula){
  let chilAaddress = addressBar.value
  let encodedFormula = oldFormula.split(' ');
  for (let i=0;i<encodedFormula.length; i++){
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if(asciiValue >=65 && asciiValue <=90) {
      let [cell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
      let idx = parentCellProp.children.indexOf(chilAaddress);
      parentCellProp.children.splice(idx, 1);
    }
  }
}

function evaluateFormula(formula){
  let encodedFormula = formula.split(' ');
  for(let i=0; i<encodedFormula.length; i++){
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if(asciiValue >=65 && asciiValue <=90) {
      let [cell, cellProp] = getCellAndCellProp(encodedFormula[i]);
      encodedFormula[i] = cellProp.value
    }
  }
  let decoderFormula = encodedFormula.join(' ');
  return eval(decoderFormula);
}

function setCellUIAndCellProp(evaluatedValue, formula, address){
  let[cell, cellProp] = getCellAndCellProp(address);
  //UI Update
  cell.innerText = evaluatedValue;
  //DB update
  cellProp.value = evaluatedValue;
  cellProp.formula  = formula;

}
