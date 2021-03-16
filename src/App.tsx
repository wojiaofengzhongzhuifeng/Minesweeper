import React, {useEffect, useState} from 'react';
import './App.css';
import {
  getUserSelectAreaResult,
  initMineClearanceData,
  LimitNumber,
  MineClearance,
  SelectResult,
  SelectRowCol
} from './utils';


// 一行
// todo
function AreaRow(
  {
    rowData,
    rowIndex,
    handleClick,
    selectResult,
    selectRowCol
  }: {rowData: LimitNumber[], rowIndex: number, handleClick: (rowIndex: number, colIndex: number, e: any)=>void, selectResult: SelectResult |undefined, selectRowCol: SelectRowCol | undefined}
  ){
  console.log(selectResult);
  console.log(selectRowCol);

  const renderAreaContent = ()=>{
    return (
    <div></div>
    )
  }

  return (
    <div style={{border: '10px solid red', display: 'flex'}}>
      {
        rowData.map((col, colIndex)=>(
          <div
            style={{width: '50px', height: '50px', border: '1px solid red', cursor: 'pointer'}}
            key={`${rowIndex}-${colIndex}`}
            onClick={(e)=>{handleClick(rowIndex, colIndex, e)}}
          >
            {renderAreaContent()}
          </div>
        ))
      }
    </div>
  )
}

function App() {
  const [rowAndColMinClearance, setRowAndColMinClearance] = useState<MineClearance>();
  const [selectResult, setSelectResult] = useState<SelectResult>();
  const [selectRowCol, setSelectRowCol] = useState<SelectRowCol>();
  useEffect(()=>{
    setRowAndColMinClearance(initMineClearanceData(5, 6));
  }, []);

  const handleClick = (rowIndex: number, colIndex: number, e: any)=>{
    let selectResult = rowAndColMinClearance && getUserSelectAreaResult(rowAndColMinClearance, {row:rowIndex, col:colIndex});
    console.log(selectResult);
    console.log(rowIndex);
    console.log(colIndex);
    setSelectResult(selectResult);
    setSelectRowCol({
      row: rowIndex,
      col: colIndex,
    })
  }

  return (
    <div className="App">
      <div>
        {
          rowAndColMinClearance &&
          rowAndColMinClearance.map((mineClearanceRow, index)=>(
            <AreaRow
              rowData={mineClearanceRow}
              rowIndex={index}
              key={index}
              handleClick={handleClick}
              selectResult={selectResult}
              selectRowCol={selectRowCol}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
