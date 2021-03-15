function sum (a: number, b: number): number{
  return a + b
}
type LimitNumber = 0 | 1
type MineClearance = Array<Array<LimitNumber>>

// 用户选择区域后的结果
type SelectResult = {
  clickDangerous: boolean, // true 表示点击雷区; false 表示点击安全区
  aroundDangerous?: number // 周围八个区, 雷区数量
}

// 用户选择的行列
 export interface SelectRowCol {
  row: number,
  col: number,
}

// 生成扫雷所需数据
export function initMineClearanceData(row: number, col: number): MineClearance{
  return [
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
  ]
}

// 根据用户所选, 返回结果
export function getUserSelectAreaResult(mineClearance: MineClearance, selectRowCol: SelectRowCol): SelectResult{
  return {
    clickDangerous: true
  }
}

