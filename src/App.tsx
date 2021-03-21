import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {
  getUserSelectAreaResult,
  initMineClearanceData,
  MineAreaData,
  MineClearance,
  SafeAreaData,

} from './utils';

import styled from 'styled-components'

const Box = styled.div`
  width: 40px;
  height: 40px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  margin:5px
`
const SafeBox = styled(Box)`
  border: 5px solid green;
`
const DangerousBox = styled(Box)`
  border: 5px solid red;
`

const TagBOx = styled(Box)`
  border: 5px solid yellow;
`
// 1️⃣ 创建全局 context
const CountContext = React.createContext<any>(null);
CountContext.displayName = "countContext";

const useMineData = ()=>{
  const [count, setCount] = useState(0);
  return {
    count,
    setCount
  };
}

const CountProvider = ({ children }: any) => {
  const { count, setCount } = useMineData();
  return (
    <CountContext.Provider value={{ count, setCount }} children={children} />
  );
};

const useCountContext = () => {
  const context = React.useContext(CountContext);
  console.log(context);
  if (!context) {
    throw new Error("useAuth 必须在 AuthProvider 中使用");
  }
  return context;
};


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
        <span>{areaData.aroundDangerous}</span>
      )
    } else {
      return null
    }
  }


  const renderAreaContent = (areaData: SafeAreaData | MineAreaData)=>{
    if(areaData.tag){
      return (
        <TagBOx />
      )
    }
    if(!areaData.clicked){ // 未点击状态
      return (
        <Box></Box>
      )
    } else if(areaData.clicked){ // 点击状态
      if(areaData.number === 0){ // 点击安全区
        return (
          <SafeBox>
            {renderAroundDangerousNumber(areaData)}
          </SafeBox>
        )
      } else { // 点击危险区
        return (
          <DangerousBox />
        )
      }
    }
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
    <div style={{display: 'flex', justifyContent:'center'}}>
      {
        rowData.map((col, colIndex)=>(
          <div
            style={{cursor: 'pointer'}}
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

function MineArea() {
  const [rowAndColMinClearance, setRowAndColMinClearance] = useState<MineClearance>();

  const initMineData = ()=>{
    setRowAndColMinClearance(initMineClearanceData(5, 8));
  }

  useEffect(()=>{
    initMineData();
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
      if (window.confirm("游戏失败, 点击确定重新开始游戏")) {
        initMineData();
      } else {
      }
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
  );
}
function MineHeader(){
  const { setCount, count } = useCountContext();

  return (
    <div className={'mine-header'}>
      <SelectDifficulty />
      <button onClick={()=>{setCount(count + 1)}}> + 1</button>
      <Statistics />
    </div>
  )
}

function SelectDifficulty(){
  return (
    <div>
      SelectDifficulty
    </div>
  )
}
function Statistics(){
  const { setCount, count } = useCountContext();

  return (
    <div>
      ⛳: {count}
    </div>
  )
}

function App(){
  return (
    <div className={'App'}>
      <div className="mine-left">1</div>
      <div className="mine-ct">
        <MineHeader></MineHeader>
        <MineArea />
      </div>
      <div className="mine-right">2</div>
    </div>
  )
}

export const AppProviders = ({ children }: any) => {
  return <CountProvider>{children}</CountProvider>;
};

export default App;
