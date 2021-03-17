export type LimitNumber = 0 | 1 // 0 代表安全区, 1 代表雷区
export type SafeAreaData = {
  number: 0
  clicked: boolean
  tag: boolean // 是否被右键标记
  aroundDangerous: number | null
}
export type MineAreaData = {
  number: 1
  clicked: boolean
  tag: boolean // 是否被右键标记
} // 雷区的数据
export type MineClearance = (SafeAreaData | MineAreaData)[][]

// 用户选择区域后的结果
export type SelectResult = {
  clickDangerous: boolean, // true 表示点击雷区; false 表示点击安全区
  aroundDangerous?: number // 周围八个区的雷区数量总和
}

export type ClickType = 'left' | 'right'

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
      const randomData = getOneProbability(ONE_PROBABILITY);
      let areaData: (SafeAreaData | MineAreaData);
      if(randomData === 1){
        areaData = {
          number: 1,
          clicked: false,
          tag: false,
        }
      } else {
        areaData = {
          number: 0,
          clicked: false,
          tag: false,
          aroundDangerous: null // -1 表示初始状态
        }
      }
      colArray.push(areaData);
    }
    result.push(colArray);
  }
  console.log(result)
  // todo
  return result
}

// 计算得出周围 8 个区块雷区个数
function computedDangerousArea(mineClearance: MineClearance, row: number, col: number): number{
  let aroundArea1 = (mineClearance[row - 1] && mineClearance[row - 1][col - 1]) === undefined ? 0 : mineClearance[row - 1][col - 1].number;
  let aroundArea2 = (mineClearance[row - 1] && mineClearance[row - 1][col]) === undefined ? 0 : mineClearance[row - 1][col].number;
  let aroundArea3 = (mineClearance[row - 1] && mineClearance[row - 1][col + 1]) === undefined ? 0 : mineClearance[row - 1][col + 1].number;
  let aroundArea4 = (mineClearance[row] && mineClearance[row][col - 1]) === undefined ? 0 : mineClearance[row][col - 1].number;
  let aroundArea5 = (mineClearance[row] && mineClearance[row][col + 1]) === undefined ? 0 : mineClearance[row][col + 1].number;
  let aroundArea6 = (mineClearance[row + 1] && mineClearance[row + 1][col - 1]) === undefined ? 0 : mineClearance[row + 1][col - 1].number;
  let aroundArea7 = (mineClearance[row + 1] && mineClearance[row + 1][col]) === undefined ? 0 : mineClearance[row + 1][col].number;
  let aroundArea8 = (mineClearance[row + 1] && mineClearance[row + 1][col + 1]) === undefined ? 0 : mineClearance[row + 1][col + 1].number;

  return aroundArea1 + aroundArea2 + aroundArea3 + aroundArea4 + aroundArea5 + aroundArea6 + aroundArea7 + aroundArea8
}

// 根据用户所选, 返回结果
export function getUserSelectAreaResult(mineClearance: MineClearance, selectRowCol: SelectRowCol, clickType: ClickType): MineClearance{
  let {row, col} = selectRowCol;
  const selectArea = mineClearance[row][col].number;
  const copyMineClearance = JSON.parse(JSON.stringify(mineClearance));

  if(clickType === 'left'){
    if(copyMineClearance[row][col].tag){
      console.log('已经右键标记,请解除标记');
      return copyMineClearance
    }
    copyMineClearance[row][col] = {...mineClearance[row][col], clicked: true}
    if(selectArea === 0){
      let aroundDangerousArea = computedDangerousArea(mineClearance, row, col);
      copyMineClearance[row][col] = {...mineClearance[row][col], aroundDangerous: aroundDangerousArea}
    }
  } else {
    copyMineClearance[row][col] = {...mineClearance[row][col], tag: !mineClearance[row][col].tag}
  }
  return copyMineClearance




}

