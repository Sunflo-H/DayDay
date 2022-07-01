
var count = 1;
const section = document.querySelector('#s2');
var btn = section.querySelector('#button');
var btn2 = section.querySelector('#button2');
var btn3 = section.querySelector('#button3');
var inp = section.querySelector('#input');
var li = section.querySelector('#list');
btn.addEventListener('click', clickButton1);
btn2.addEventListener('click',clickButton2);
btn3.addEventListener('click',clickButton3);

function clickButton1(){
  var temp = document.createElement('li');
  temp.setAttribute("id","li"+count);
  
  
  temp.innerHTML = `${inp.value} 
                    <input type="button" 
                           value="삭제" 
                           onclick='remove2(${count})'>`
  li.appendChild(temp);
  count++;
  console.log(temp);
  inp.value='';
  inp.focus();
}

function remove2(cnt) {  
  var li_id = section.querySelector('#li'+cnt);
  li.removeChild(li_id);
}
//html에서 onclick을 이용하는 방법
function clickButton2(){
  let item = `<li id="li${count}">
                ${inp.value} 
                <input type="button" 
                       value="삭제" 
                       onclick='remove2(${count})'>
              </li>`
  li.insertAdjacentHTML('beforeend',item);
  count++;
  inp.value='';
  inp.focus();
}
// html없이 js로만 삭제버튼 제어하기
function clickButton3(){
  let item = `<li id="li${count}">
                ${inp.value} 
                <input type="button" 
                       value="삭제"
                       id="input_btn">
              </li>`
  li.insertAdjacentHTML('beforeend',item);
  let inputBtn = section.querySelectorAll('#input_btn');
  console.log(inputBtn);
  for(var i =0;i<inputBtn.length;i++){
    inputBtn[i].addEventListener('click',remove3);    
  }
  
  count++;
  inp.value='';
  inp.focus();
}
function remove3(event){
  let delbutton = event.target;
  let tag_li_num = delbutton.parentNode;
  let tag_ul = delbutton.parentNode.parentNode;
  tag_ul.removeChild(tag_li_num);
}

let one = document.querySelector('.one');
let two = document.querySelector('.two');
let three = document.querySelector('.three');
one.addEventListener('click',function(event){
  console.log(event.currentTarget);
})
two.addEventListener('click',function(event){
  console.log(event.currentTarget);
})
three.addEventListener('click',function(event){
  event.stopPropagation();
  console.log(event.currentTarget);
})
// const divs = document.querySelectorAll('div');

// for(var i =0;i<divs.length;i++){
//     divs[i].addEventListener('click',logEvent);
// }

// function logEvent(event) {
//     console.log(event.currentTarget.className);
// }