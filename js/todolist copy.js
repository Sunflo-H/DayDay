window.addEventListener('load',()=>{
    let toDid = document.getElementById('toDid');
    
    let enrollBtn = document.querySelector('#enroll-btn');
    let listBox = document.querySelector('.list-box'); 

    let saveBtn = document.querySelector('#save-btn');

    let modalBox = document.querySelector('.modal-box');
    let historyBtn = document.querySelector('#history-btn')
    let delBtn;

    let index = 0;
    if(localStorage.length!==0){
        for(let i=0;i<localStorage.length;i++){
            let html = `<div class="list "> \
                    <div class="list-name">${localStorage.getItem(i)}</div> \
                    <input type="button" class='del' value='X'></div>`;
            listBox.insertAdjacentHTML("beforeend",html);
            delBtn = document.querySelectorAll('.del')
            delBtn[i].onclick = function(){
                delBtn[i].parentElement.remove();
                localStorage.removeItem(i)
            }
        }
    }
    
    //등록 버튼 클릭 이벤트
    enrollBtn.addEventListener('click',(event)=>{
        index=localStorage.length;
        event.preventDefault();
        console.log(toDid.value); 
        
        let html = `<div class="list "> \
                    <div class="list-name">${toDid.value}</div> \
                    <input type="button" class='del' value='X'></div>`;
        listBox.insertAdjacentHTML("beforeend",html);
        let delBtn = document.querySelectorAll('.del')
        console.log(delBtn);
        localStorage.setItem(index,toDid.value)
        index++;
        
        
        for(let i=0;i<index;i++){

            delBtn[i].onclick = function(){
                delBtn[i].parentElement.remove();
                localStorage.removeItem(i)
            }
        }
        toDid.value="";  
    })

    historyBtn.addEventListener('click',()=>{
        // modalBox.classList.toggle(hide);
        console.log(modalBox.classList);
        modalBox.classList.toggle('hide');
        console.log(modalBox.classList);
    })
    
    

})