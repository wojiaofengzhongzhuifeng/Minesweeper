export type LimitNumber = 0 | 1 // 0 代表安全区, 1 代表雷区
export type MineClearance = LimitNumber[][]

// 用户选择区域后的结果
export type SelectResult = {
  clickDangerous: boolean, // true 表示点击雷区; false 表示点击安全区
  aroundDangerous?: number // 周围八个区的雷区数量总和
}

// 用户选择的行列
 export interface SelectRowCol {
  row: number,
  col: number,
}

// 变量
const ONE_PROBABILITY = 30;

// 返回数字 1 的概率
function getOneProbability(probability: number): LimitNumber{
  return Math.random() <= (probability / 100 ) ? 1 : 0
}

// 生成扫雷所需数据
export function initMineClearanceData(row: number, col: number): MineClearance{
  let result = [];
  for(let rowIndex = 0;rowIndex <= row - 1;rowIndex++){
    let colArray = [];
    for(let colIndex = 0;colIndex <= col - 1;colIndex++){
      colArray.push(getOneProbability(ONE_PROBABILITY));
    }
    result.push(colArray);
  }
  console.log(result)
  // todo
  // @ts-ignore
  return result
}

// 计算得出周围 8 个区块雷区个数
function computedDangerousArea(mineClearance: MineClearance, row: number, col: number): number{
  let aroundArea1 = (mineClearance[row - 1] && mineClearance[row - 1][col - 1]) === undefined ? 0 : mineClearance[row - 1][col - 1];
  let aroundArea2 = (mineClearance[row - 1] && mineClearance[row - 1][col]) === undefined ? 0 : mineClearance[row - 1][col];
  let aroundArea3 = (mineClearance[row - 1] && mineClearance[row - 1][col + 1]) === undefined ? 0 : mineClearance[row - 1][col + 1];
  let aroundArea4 = (mineClearance[row] && mineClearance[row][col - 1]) === undefined ? 0 : mineClearance[row][col - 1];
  let aroundArea5 = (mineClearance[row] && mineClearance[row][col + 1]) === undefined ? 0 : mineClearance[row][col + 1];
  let aroundArea6 = (mineClearance[row + 1] && mineClearance[row + 1][col - 1]) === undefined ? 0 : mineClearance[row + 1][col - 1];
  let aroundArea7 = (mineClearance[row + 1] && mineClearance[row + 1][col]) === undefined ? 0 : mineClearance[row + 1][col];
  let aroundArea8 = (mineClearance[row + 1] && mineClearance[row + 1][col + 1]) === undefined ? 0 : mineClearance[row + 1][col + 1];

  return aroundArea1 + aroundArea2 + aroundArea3 + aroundArea4 + aroundArea5 + aroundArea6 + aroundArea7 + aroundArea8
}

// 根据用户所选, 返回结果
export function getUserSelectAreaResult(mineClearance: MineClearance, selectRowCol: SelectRowCol): SelectResult{
  let {row, col} = selectRowCol;
  const selectArea = mineClearance[row][col];

  if(selectArea === 1){
    return {
      clickDangerous: true
    }
  } else {
   // 计算周围 8 个区块 1 的数量.
    let aroundDangerousArea = computedDangerousArea(mineClearance, row, col)

    return {
      clickDangerous: false,
      aroundDangerous: aroundDangerousArea
    }
  }
}

