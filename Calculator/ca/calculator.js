"use strict"

let numbers = document.querySelectorAll(".number")
let opText = document.querySelectorAll(".op")
let numInput = document.querySelector("#numInput")
let acBtn = document.querySelector("#acBtn")
let equalBtn = document.querySelector("#equal")
let showBox = document.querySelector(".show-box")
let checkBtn = false
let checkPreNum = false
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', inputNum)
}
function inputNum() {
  if (checkBtn)
    clearNum()
  if (cal.preOp === '=' && checkBtn === true)
    clearShowBox()
  var inputText = this.innerHTML
  numInput.value += inputText
  showBox.innerHTML += inputText
  checkBtn = false
}
function clearNum() {
    numInput.value = ""
    console.log("clear")
}
function clearShowBox() {
  showBox.innerHTML = ""
}

let cal = {
  result: 0,
  preNum: 0,
  nextNum: 0,
  preOp: null,
  op: null,
  calculator: function() {
    var inputText = this.innerHTML
    cal.op = inputText
    showBox.innerHTML += inputText
    checkBtn = true
    if (!checkPreNum) {
      cal.preNum = Number(numInput.value)
      console.log(cal.preNum)
      checkPreNum = true
    } else {
      cal.nextNum = Number(numInput.value)
      console.log(cal.nextNum)
      clearNum()
      cal.resultFn(cal.preOp)
      cal.preNum = cal.result
      if (cal.op == '=') {
        checkPreNum = false
        showBox.innerHTML += cal.result +', '
      }
    }
    cal.preOp = cal.op
  },
  resultFn: function(op) {
    switch (op) {
    case '+':
    cal.result = cal.preNum + cal.nextNum
    console.log("result"+cal.result)
    break;
    case '-':
    cal.result = cal.preNum - cal.nextNum
    console.log("result"+cal.result)
    break;
    case '*':
    cal.result = cal.preNum * cal.nextNum
    console.log("result"+cal.result)
    break;
    case '/':
    cal.result = cal.preNum / cal.nextNum
    console.log("result"+cal.result)
    break;
    }
    numInput.value = cal.result
  }
}

for (let i = 0; i < opText.length; i++) {
  opText[i].addEventListener('click', cal.calculator)
}
acBtn.addEventListener('click', function() {
  numInput.value = ""
  showBox.innerHTML = ""
  cal.result, cal.preNum, cal.nextNum = 0
  checkPreNum = false
})