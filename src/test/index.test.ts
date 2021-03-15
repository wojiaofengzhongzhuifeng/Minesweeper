import { initMineClearanceData } from '../utils';

test('生成扫雷所需数据', () => {
  let row = 3;
  let col = 4;
  let result = initMineClearanceData(row, col);
  let afterFlatResult = result.flat();
  console.log(afterFlatResult.length);
  let onlyIncludeOneOrZero = true;

  for(let i=0;i<=afterFlatResult.length - 1;i++){
    let number = afterFlatResult[i];
    if(!([0, 1].includes(number))){
      onlyIncludeOneOrZero = false
    }
  }



  expect(result.length).toBe(row);
  expect(result[0].length).toBe(col);
  expect(onlyIncludeOneOrZero).toBe(true);

});