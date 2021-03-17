import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {
  getUserSelectAreaResult,
  initMineClearanceData,
  MineAreaData,
  MineClearance,
  SafeAreaData,

} from './utils';



// ui 一行的区块
function AreaRow(
  {
    rowData,
    rowIndex,
    handleClick,
    handleRightClick,
  }: {
      rowData: (SafeAreaData | MineAreaData)[],
      rowIndex: number,
      handleClick: (rowIndex: number, colIndex: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>void,
      handleRightClick: (rowIndex: number, colIndex: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>void}
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
        {areaData.tag ? `标记${areaData.tag}` : `标记${areaData.tag}`}
      </p>
      <p>
        {areaData.clicked ? `点击${areaData.clicked}` : `点击${areaData.clicked}`}
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
            onContextMenu={(e)=>{handleRightClick(rowIndex, colIndex, e)}}
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
  const checkGameResult = useCallback(()=>{
    let resultArray = rowAndColMinClearance?.flat();
    // eslint-disable-next-line array-callback-return
    let clickMineAreaFlag = resultArray && resultArray.find((areaData)=>{
      if(areaData.number === 1 && areaData.clicked){
        return true
      }
    }) !== undefined

    // eslint-disable-next-line array-callback-return
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

  }, [rowAndColMinClearance])

  useEffect(()=>{
    console.log('新 data', rowAndColMinClearance);
    checkGameResult();
  }, [checkGameResult, rowAndColMinClearance]);

  const handleClick = (rowIndex: number, colIndex: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{

    console.log('e', e);

    let afterSelectResult = rowAndColMinClearance && getUserSelectAreaResult(rowAndColMinClearance, {row:rowIndex, col:colIndex}, 'leftClick');
    setRowAndColMinClearance(afterSelectResult);
  }

  const handleRightClick = (rowIndex: number, colIndex: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
    console.log('handleRightClick', e);
    let afterSelectResult = rowAndColMinClearance && getUserSelectAreaResult(rowAndColMinClearance, {row:rowIndex, col:colIndex}, 'rightClick');
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
              handleRightClick={handleRightClick}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
