import {getUserSelectAreaResult, initMineClearanceData} from '../utils';

test('生成扫雷所需数据', () => {
  let row = 3;
  let col = 4;
  let result = initMineClearanceData(row, col);
  let afterFlatResult = result.flat();
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

test('根据用户所选, 返回正确结果', () => {



  let row = 3;
  let col = 4;
  let result = initMineClearanceData(row, col);
  let select1 = getUserSelectAreaResult(result, {col: 0, row: 0})
  let select2 = getUserSelectAreaResult(result, {col: 3, row: 0})
  let select3 = getUserSelectAreaResult(result, {col: 0, row: 2})
  let select4 = getUserSelectAreaResult(result, {col: 3, row: 2})
  let select5 = getUserSelectAreaResult(result, {col: 2, row: 1})

  let area1 = result[0][0];
  let area2 = result[0][3];
  let area3 = result[2][0];
  let area4 = result[2][3];
  let area5 = result[1][2];


  console.log('area1', area1);
  console.log('area2', area2);
  console.log('area3', area3);
  console.log('area4', area4);
  console.log('area5', area5);

  console.log('result', result);

  console.log('select1', select1);
  console.log('select2', select2);
  console.log('select3', select3);
  console.log('select4', select4);
  console.log('select5', select5);




});