let num = "";
let elem = "";

let calendarMain = document.querySelector("#calendar"); //основной див календаря;
let datesData = calendarMain.querySelector(".dates"); //таблица;
let tds = calendarMain.querySelectorAll("#datesData"); //ячейки, поиск внутри основного дива. ;

//тест на клик по ячейкам календаря
// for (let td of tds) {td.addEventListener('click', function () {console.log('true');})};

drawCalendar(2018, 4, datesData); //основная функция;

//рисуем таблицу, принимаем параметры год, месяц, домЭлемент.;
function drawCalendar(year, month, datesData) {
  let arr = []; //создаем массив;
  let startMonth = 1; //месяц всегда начинается с 1-го числа;
  let endMonth = lastDayOfMonth(year, month); //получаем функцией последнее число кнкретного месяца (29, 30, 31 или?), параметры год и месяц. Не забудь о том, что год может быть високосным (проблема февраля)
  let unshiftElemsCalc = getUnshiftElemsNum(year, month); //создаём переменную в которую функцией получим кол-во элементов в начало массива дат.

  let pushElemsCalc = getPushElemsNum(year, month); //создаём переменную в которую функцией получим число числе в конец массива дат.

  arr = createDateArr(startMonth, endMonth); //заполняем массив данным;

  arr = unshiftCalendarBeggins(unshiftElemsCalc, "", arr); //добавляем числа в начало;

  arr = pushCalendarEnd(pushElemsCalc, "", arr); //добавляем числа в конец массива

  arr = splitSubArr(7, arr); //разбиваем массив на подмассивы. 7 дней в неделе, кратно.
  // console.log(arr);
  createMainTable(arr, datesData);
}

//создаем таблицу с массива с подмасивом: [['', '', 1, 2,3],[],];
function createMainTable(arr, parent) {
  for (let i = 0; i < arr.length; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < arr[i].length; j++) {
      let td = document.createElement("td");
      td.innerHTML = arr[i][j];
      tr.appendChild(td);
    }
    parent.appendChild(tr);
  }
}

//создаём массив с числами дат от 1 до 31/30;
function createDateArr(startMonth, endMonth) {
  let arr = [];
  for (let i = startMonth; i <= endMonth; i++) {
    arr.push(i);
  }
  return arr;
}

//функция создает числа в начале массива. Принимает параметром кол-во числе и массив, в который необходимо записать числа. ;
function unshiftCalendarBeggins(num, elem, arr) {
  for (let i = 0; i < num; i++) {
    arr.unshift(elem);
  }
  return arr;
}

//функция создаёт числа в конце календаря (пустые ячейки);
function pushCalendarEnd(num, elem, arr) {
  for (let i = 0; i < num; i++) {
    arr.push(elem);
  }
  return arr;
}

//Функция получает последний день месяца (кол-во дней в месяце)
function lastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0); //в объекте дэйт сочетание параметра месяц  + 1 и нулевого дня даёт последний день предыдущего месяца.
  return date.getDate();
}
//считаем сколько элементов необходимо добавить в начало календаря
function getUnshiftElemsNum(year, month) {
  let jsDayNum = firstWeekDayOfMonth(year, month);
  let realDayNum = currentDay(jsDayNum);

  return realDayNum - 1;
}
//считаем сколько элементов необходимо добавить в конец календаря
function getPushElemsNum(year, month) {
  let jsDayNum = lastWeekDayOfMonth(year, month);
  let realDayNum = currentDay(jsDayNum);

  return 7 - realDayNum;
}

// делим массив.
function splitSubArr(num, arr) {
  let result = [];
  let splitPart = [];
  let iterCount = arr.length / num;

  for (let i = 0; i < iterCount; i++) {
    splitPart = arr.splice(0, num);
    result.push(splitPart);
  }

  return result;
}

//определяем текущий день. Параметром принимаем число(номер дня). 0 - Воскресенье (в js)
function currentDay(jsNumOfDay) {
  if (jsNumOfDay == 0) {
    return 7; //получаем воскресенье
  } else {
    return jsNumOfDay;
  }
}

//функция возвращает номер первого дня в месяце
function firstWeekDayOfMonth(year, month) {
  let date = new Date(year, month, 1);
  return date.getDay();
}

// вернем номер последнего дня месяца
function lastWeekDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDay();
}
