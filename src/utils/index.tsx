type LimitNumber = 0 | 1 // 0 代表安全区, 1 代表雷区
type MineClearance = LimitNumber[][]

// 用户选择区域后的结果
type SelectResult = {
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

// 根据用户所选, 返回结果
export function getUserSelectAreaResult(mineClearance: MineClearance, selectRowCol: SelectRowCol): SelectResult{
  return {
    clickDangerous: true
  }
}

