import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {initMineClearanceData, LimitNumber, MineClearance} from './utils';


// 一行
function AreaRow({rowData, rowIndex}: {rowData: LimitNumber[], rowIndex: number}){

  return (
    <div style={{border: '10px solid red', display: 'flex'}}>
      {
        rowData.map((col, colIndex)=>(
          <div
            style={{width: '50px', height: '50px', border: '1px solid red', cursor: 'pointer'}}
            key={`${rowIndex}-${colIndex}`}
          >
            {col} / ${rowIndex}-${colIndex}
          </div>
        ))
      }
    </div>
  )
}

function App() {
  const [rowAndColMinClearance, setRowAndColMinClearance] = useState<MineClearance>();
  useEffect(()=>{
    setRowAndColMinClearance(initMineClearanceData(5, 6));
  }, []);

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
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
