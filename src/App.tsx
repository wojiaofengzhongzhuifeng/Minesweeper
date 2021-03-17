import React, {useEffect, useState} from 'react';
import './App.css';
import {
  getUserSelectAreaResult,
  initMineClearanceData,
  MineAreaData,
  MineClearance,
  SafeAreaData,

} from './utils';


// 一行
// todo
function AreaRow(
  {
    rowData,
    rowIndex,
    handleClick,
  }: {rowData: (SafeAreaData | MineAreaData)[], rowIndex: number, handleClick: (rowIndex: number, colIndex: number, e: any)=>void}
  ){

  const renderAroundDangerousNumber = (areaData: SafeAreaData | MineAreaData)=>{
    if(areaData.number === 0 && areaData.clicked){
      return (
        <span>附近雷区: {areaData.aroundDangerous}</span>
      )
    } else {
      return null
    }
  }


  const renderAreaContent = (areaData: SafeAreaData | MineAreaData)=>{
    return (
    <div>
      <p>
        {areaData.number === 1 ? `地雷${areaData.number}` : `安全${areaData.number}`}
      </p>
      <p>
        {areaData.tag ? `被标记${areaData.tag}` : `未被标记${areaData.tag}`}
      </p>
      <p>
        {areaData.clicked ? `被点击${areaData.clicked}` : `未被点击${areaData.clicked}`}
      </p>
      {
        renderAroundDangerousNumber(areaData)
      }
    </div>
    )
  }

  return (
    <div style={{border: '10px solid red', display: 'flex'}}>
      {
        rowData.map((col, colIndex)=>(
          <div
            style={{width: '200', height: '200px', border: '1px solid red', cursor: 'pointer'}}
            key={`${rowIndex}-${colIndex}`}
            onClick={(e)=>{handleClick(rowIndex, colIndex, e)}}
          >
            {renderAreaContent(col)}
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

  // 判断用户的结果
  const checkGameResult = ()=>{
    let resultArray = rowAndColMinClearance?.flat();
    // eslint-disable-next-line array-callback-return
    let clickMineAreaFlag = resultArray && resultArray.find((areaData)=>{
      if(areaData.number === 1 && areaData.clicked){
        return true
      }
    }) !== undefined

    //
    let passGameFlag = resultArray && resultArray.find((areaData)=>{
      if((areaData.number === 0 && areaData.clicked !== true) || (areaData.number === 1 && areaData.tag !== true)){
        return true
      }
    }) === undefined

    if(clickMineAreaFlag){
      console.log('点击雷区, 游戏结束');
    }

    if(passGameFlag){
      console.log('通过游戏');
    }



  }

  useEffect(()=>{
    console.log('新 data', rowAndColMinClearance);
    checkGameResult();
  }, [rowAndColMinClearance]);

  const handleClick = (rowIndex: number, colIndex: number, e: any)=>{
    let afterSelectResult = rowAndColMinClearance && getUserSelectAreaResult(rowAndColMinClearance, {row:rowIndex, col:colIndex}, 'left');
    setRowAndColMinClearance(afterSelectResult);
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
              // selectResult={selectResult}
              // selectRowCol={selectRowCol}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
