// 处理Excel
const XLSX = require('xlsx-style')
const wb = XLSX.readFile('./template.xlsx', {
  cellStyles: true,
  bookFiles: true
});
const sheets = wb.SheetNames

// const worksheet0 = wb.Sheets[sheets[0]] //工作表页
// const worksheet1 = wb.Sheets[sheets[1]] //工作表页

function getTwoWeeks(date) {

  let curWeek = date.getDay(); //获取当前是周几，周日为0

  if (curWeek == 0) {
    curWeek = 7;
  }
  // 
  let stDay = 1 - curWeek; //周一和当前差多少天，得出为非正数
  let curMonDayDate1 = addDate(date, stDay); //获取当前周的周一日期
  let curMonDayDate5 = addDate(date, stDay + 4); //获取当前周的周五日期
  let curMonDayDate7 = addDate(date, stDay + 7); //获取下周的周一日期
  let curMonDayDate11 = addDate(date, stDay + 11); //获取下周的周五日期
  return [curMonDayDate1, curMonDayDate5, curMonDayDate7, curMonDayDate11]
}


//增加天数
function addDate(date, days) {
  let d = new Date(date);
  d.setDate(d.getDate() + days);
  let m = d.getMonth() + 1;
  return {
    y: d.getFullYear(),
    m,
    d: d.getDate()
  }
}
let day = getTwoWeeks(new Date())
for (let i = 0; i < sheets.length; i++) {
  let worksheet = wb.Sheets[sheets[i]]
  if (worksheet['A1']['v'].indexOf('总结表') > -1) {
    worksheet['A1']['v'] = `${day[0].y}年${day[0].m}月${day[0].d}日—${day[1].m}月${day[1].d}日工作总结表`
  } else {
    worksheet['A1']['v'] = `${day[2].y}年${day[2].m}月${day[2].d}日—${day[3].m}月${day[3].d}日工作计划表`
  }
  for (let item in worksheet) {
    if (typeof worksheet[item].v == 'string' && worksheet[item].v.length > i) {
      worksheet[item].v = worksheet[item].v.replace(/&#10;/g, '')
    }
  }
}

XLSX.writeFile(wb, `./${day[0].y}年${day[0].m}月${day[0].d}日-${day[1].m}月${day[1].d}日周总结及下周计划.xlsx`)