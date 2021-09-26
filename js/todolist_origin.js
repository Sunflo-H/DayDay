//현재 날짜
const currentDate = document.getElementById('currentDate');
currentDate.innerHTML = new Date().toISOString().substring(0, 10);
//섹션 일간/주간/월간
const day = document.querySelector('.day');
const week = document.querySelector('.week');
const month = document.querySelector('.month');

let arr_day = [];
let arr_week = [];
let arr_month = [];

getList(day);
getList(week);
getList(month);

// finish 하려면 체크상태도 저장해줘야되는데 이건 굳이싶다.
// finish 배열 만들어서 check 상태를 0또는 1로 저장해서 불러오면 되긴할듯

// getList()를 먼저 호출해서 저장소에서 배열을 불러온 다음
// 길이를 얻어 count에 저장한다.
// {key : day +count , value : value} 의 형태로 배열에 저장되어있다.
// 길이가 1이면 1개 있는거니까 {key:day0,vlaue:value} 상태
// 다음 키값은 day1이 되야하니까 길이만큼 그대로 count에 저장하면 된다.
let count_day=arr_day.length;
let count_week=arr_week.length;
let count_month=arr_month.length;

// 하나의 함수로 3개의 섹션이 작동하는 리스트추가함수
function addList(section){
    //입력된 값으로 새 리스트를 생성
    const input = section.querySelector('.input-list');
    const item = `<li>
                    <div> 
                        <div>
                            <span id="content">${input.value}</span>
                        </div>
                        <input type="button" value="삭제" id="delButton">
                    </div>
                  </li>`;
    section.insertAdjacentHTML('beforeend',item);

    //리스트 내용을 배열에 저장후 배열을 로컬 저장소에 저장
    //배열의 모습 [{key:'day0', value:'운동'} ]
    let key;
    switch (section) { //section은 .day, .week .month야 key를 따로 만들어줘야해
        case day :  key = 'day'; 
                    //배열에 키와 값 추가
                    arr_day.push({key : key+count_day, 
                                  value : input.value});
                    //배열을 기반으로 저장소에 저장
                    for(var i =0; i<arr_day.length;i++){
                        localStorage.setItem(arr_day[i].key,arr_day[i].value);
                    }

                    localStorage.setItem('day_length',arr_day.length);
                    count_day++;
                    break;

        case week : key = 'week'; 
                    arr_week.push({key : key+count_week, 
                                value : input.value});
                    
                    for(var i =0; i<arr_week.length;i++){
                        localStorage.setItem(arr_week[i].key,arr_week[i].value);
                    }
                    localStorage.setItem('week_length',arr_week.length);
                    count_week++;
                    break;

        case month :key = 'month'; 
                    arr_month.push({key : key+count_month, 
                                value : input.value});
                    
                    for(var i =0; i<arr_month.length;i++){
                        localStorage.setItem(arr_month[i].key,arr_month[i].value);
                    }
                    localStorage.setItem('month_length',arr_month.length);
                    count_month++;
                    break;
    }
    //리스트의 추가로 생성된 삭제버튼과 입력받은 리스트 내용에 클릭 이벤트 추가
    const delButton = section.querySelectorAll('#delButton');
    const content = section.querySelectorAll('#content');
    for(var i = 0; i<delButton.length;i++){
        delButton[i].addEventListener('click',delList);
        content[i].addEventListener('click',finish);
    }

    //리스트 등록후 인풋 초기화 및 포커스
    input.value=''
    input.focus();
}

//삭제버튼이 눌리면
//이벤트 타겟의 부모노드를 찾아 삭제하는 함수
function delList(event){
    const delButton = event.target;
    const list = delButton.parentNode;   
    const content = list.querySelector('#content');
    
    //event.target이 어느 섹션인지 판단하여 switch 문으로 배열과 저장소 삭제 구현
    //section을 찾으려면 list의 부모의 부모의 class를 찾아 day, week, month를 구해야되
    let section = list.parentNode.parentNode.classList[0];// classList = [day or week or month, box]; 0번째 인덱스를 구하면된다.
    console.log(section);
    switch (section){
        case 'day' : //현재 삭제할 리스트의 값과 동일한 값을 갖는 배열의 인덱스를 검색
                        var current_index = arr_day.findIndex(item => item.value === content.innerText);
                        var key = 'day'+current_index;
                    
                        //저장소에서 삭제를 했으면 배열에서도 저 값을 갖는거를 삭제해줘야해
                        //그다음 저장소에 배열과 배열길이를 다시 저장
                        var arr_temp = arr_day.filter(arr=>arr.key !== key); //삭제하려는 키를 제외한 배열 생성
                        var temp_count = 0;
                        var arr_temp_sort=arr_temp.map(arr=>{//삭제된 배열 key 재정비 (이빨 빠진걸 제거하는 작업)
                            temp_count++; //return 된 후에 ++ 하고싶은데 그게 안됨 방법을 모름 그래서 return 하기전에 하고 key에 넣을때는 1을 빼서 0부터 시작되게 맞춰줌
                            return {key:'day'+(temp_count-1), value:arr.value};  
                        })
                    
                        arr_day=arr_temp_sort; //삭제된 배열을 정렬까지 싹 해서 arr_day에 저장
                        
                        //배열을 다시 저장소에 저장
                        localStorage.setItem('day_length',arr_day.length);
                        for(var i =0; i<arr_day.length;i++){
                            localStorage.setItem(arr_day[i].key,arr_day[i].value);
                        }
                        //day0 , day1, day2 에서 day1을 지우면 
                        //day0과 day2가 남아 => day0, day1로 재정비가 되어 저장소에 저장된다. 하지만 day2는 저장소에 남아있다. 
                        //즉 삭제하려는 키가 가장 뒤에 오게 되는것과 동일하다
                        //삭제후 길이는 3에서 2가 되고 이때 2는 마지막 키의 인덱스와 동일하므로 길이를 이용해 삭제할 수 있다.
                        localStorage.removeItem('day'+arr_day.length);
                    
                        list.remove();
                        break;

        case 'week' :   var current_index = arr_week.findIndex(item => item.value === content.innerText);
                        var key = 'week'+current_index;
                    
                        //저장소에서 삭제를 했으면 배열에서도 저 값을 갖는거를 삭제해줘야해
                        //그다음 저장소에 배열과 배열길이를 다시 저장
                        var arr_temp = arr_week.filter(arr=>arr.key !== key); //삭제하려는 키를 제외한 배열 생성
                        var temp_count = 0;
                        var arr_temp_sort=arr_temp.map(arr=>{//삭제된 배열 key 재정비 (이빨 빠진걸 제거하는 작업)
                            temp_count++; //return 된 후에 ++ 하고싶은데 그게 안됨 방법을 모름 그래서 return 하기전에 하고 key에 넣을때는 1을 빼서 0부터 시작되게 맞춰줌
                            return {key:'week'+(temp_count-1), value:arr.value};  
                        })
                    
                        arr_week=arr_temp_sort; //삭제된 배열을 정렬까지 싹 해서 arr_day에 저장
                        
                        //배열을 다시 저장소에 저장
                        localStorage.setItem('week_length',arr_week.length);
                        for(var i =0; i<arr_week.length;i++){
                            localStorage.setItem(arr_week[i].key,arr_week[i].value);
                        }
                        //day0 , day1, day2 에서 day1을 지우면 
                        //day0과 day2가 남아 => day0, day1로 재정비가 되어 저장소에 저장된다. 하지만 day2는 저장소에 남아있다. 
                        //즉 삭제하려는 키가 가장 뒤에 오게 되는것과 동일하다
                        //삭제후 길이는 3에서 2가 되고 이때 2는 마지막 키의 인덱스와 동일하므로 길이를 이용해 삭제할 수 있다.
                        localStorage.removeItem('week'+arr_week.length);
                    
                        list.remove();
                        break;
        case 'month' :
                        var current_index = arr_month.findIndex(item => item.value === content.innerText);
                        var key = 'month'+current_index;
                    
                        //저장소에서 삭제를 했으면 배열에서도 저 값을 갖는거를 삭제해줘야해
                        //그다음 저장소에 배열과 배열길이를 다시 저장
                        var arr_temp = arr_month.filter(arr=>arr.key !== key); //삭제하려는 키를 제외한 배열 생성
                        var temp_count = 0;
                        var arr_temp_sort=arr_temp.map(arr=>{//삭제된 배열 key 재정비 (이빨 빠진걸 제거하는 작업)
                            temp_count++; //return 된 후에 ++ 하고싶은데 그게 안됨 방법을 모름 그래서 return 하기전에 하고 key에 넣을때는 1을 빼서 0부터 시작되게 맞춰줌
                            return {key:'month'+(temp_count-1), value:arr.value};  
                        })
                    
                        arr_month=arr_temp_sort; //삭제된 배열을 정렬까지 싹 해서 arr_day에 저장
                        
                        //배열을 다시 저장소에 저장
                        localStorage.setItem('month_length',arr_month.length);
                        for(var i =0; i<arr_month.length;i++){
                            localStorage.setItem(arr_month[i].key,arr_month[i].value);
                        }
                        //day0 , day1, day2 에서 day1을 지우면 
                        //day0과 day2가 남아 => day0, day1로 재정비가 되어 저장소에 저장된다. 하지만 day2는 저장소에 남아있다. 
                        //즉 삭제하려는 키가 가장 뒤에 오게 되는것과 동일하다
                        //삭제후 길이는 3에서 2가 되고 이때 2는 마지막 키의 인덱스와 동일하므로 길이를 이용해 삭제할 수 있다.
                        localStorage.removeItem('month'+arr_month.length);
                    
                        list.remove();
                        break;
                
    }
    
}

//컨텐츠를 클릭하면 확인창이 뜨고 확인시 리스트 완료하는 함수
function finish(event){
    const content = event.target;
    const content_box = content.parentNode;
    const list = content.parentNode.parentNode;
    const delButton = content_box.nextElementSibling;
    
    //배경이 빨강이면 한번 완료한거니까 확인창 안뜨게한다.
    if(list.style.background != "rgb(234, 67, 53)"){
        let result = confirm('다 하셨나요?');
        if(result === true){
            list.style.background = "#ea4335";
            delButton.style.display="none";
        }
    }
}

//저장소에 있는 키 불러와 리스트 목록을 출력하는 함수
function getList(section){
    switch (section){
        case day :  //로컬 저장소에서 arr_day의 길이를 가지고온다. 
                    //day_length : arr_day.length
                    let arr_day_length = localStorage.getItem('day_length');
                    
                    //저장소 값을 찾는데 쓰일 저장소index// 키로 값을 구한다.
                    //저장소의 값을 가지고와서 배열에저장할때 배열의 키에 쓰일 배열index
                    var storage_index=0;
                    var arr_index=0;
                    while(arr_index<arr_day_length){
                        let key = 'day'+storage_index;
                        let value = localStorage.getItem(key);
                        //저장소에 해당키가 없으면 값은 null이다.
                        if(value !== null){
                            
                            //현재 저장소인 storage_index와 arr_index값이 다르면
                            //key에 storage_index대신 arr_index를 사용하여 배열에 이빨이 빠지지 않게 한다.
                            //배열에 항상 day1,day2,day3 이렇게 저장될수 있게
                            if(storage_index !== arr_index){
                                key='day'+arr_index
                            }
                            arr_day.push({key:key,value:value});
                            
                            storage_index++;
                            arr_index++;
                            //arr_index를 1 더했을때 배열의 길이와 같으면 마지막 저장소인덱스를 의미하고
                            //이때 마지막 저장소 인덱스는 삭제한다.
                            if(arr_index === arr_day_length){
                                localStorage.removeItem('day'+storage_index);
                            }
                        }else{
                            storage_index++;
                        }
                    }
                    //배열을 토대로 리스트를 만들고, 저장소에 저장
                    
                    for(var i =0; i<arr_day.length;i++){
                        localStorage.setItem(arr_day[i].key,arr_day[i].value);
                        const item =`<li>
                                            <div> 
                                                <div>
                                                    <span id="content">${arr_day[i].value}</span>
                                                </div>
                                                <input type="button" value="삭제" id="delButton">
                                            </div>
                                         </li>`;
                            section.insertAdjacentHTML('beforeend',item);
                    }
                    

                    //삭제버튼과 입력받은 리스트 값에 각각 클릭 이벤트 추가
                    var delButton = section.querySelectorAll('#delButton');
                    var content = section.querySelectorAll('#content');
                    for(var i = 0; i<delButton.length;i++){
                        delButton[i].addEventListener('click',delList);
                        content[i].addEventListener('click',finish);
                    }
                    
                    break;

        case week : let arr_week_length = localStorage.getItem('week_length');
                    
                    var storage_index=0;
                    var arr_index=0;
                    while(arr_index<arr_week_length){
                        let key = 'week'+storage_index;
                        let value = localStorage.getItem(key);
                        if(value !== null){

                            if(storage_index !== arr_index){
                                key='week'+arr_index
                            }
                            arr_week.push({key:key,value:value});
                            
                            storage_index++;
                            arr_index++;

                            if(arr_index === arr_week_length){
                                localStorage.removeItem('week'+storage_index);
                            }
                        }else{
                            storage_index++;
                        }
                    }
                    
                    for(var i =0; i<arr_week.length;i++){
                        localStorage.setItem(arr_week[i].key,arr_week[i].value);
                        const item =`<li>
                                            <div> 
                                                <div>
                                                    <span id="content">${arr_week[i].value}</span>
                                                </div>
                                                <input type="button" value="삭제" id="delButton">
                                            </div>
                                     </li>`;
                            section.insertAdjacentHTML('beforeend',item);
                    }
                    

                    var delButton = section.querySelectorAll('#delButton');
                    var content = section.querySelectorAll('#content');
                    for(var i = 0; i<delButton.length;i++){
                        delButton[i].addEventListener('click',delList);
                        content[i].addEventListener('click',finish);
                    }
                    
                    break;

        case month : let arr_month_length = localStorage.getItem('month_length');

                    var storage_index=0;
                    var arr_index=0;
                    while(arr_index<arr_month_length){
                        let key = 'month'+storage_index;
                        let value = localStorage.getItem(key);

                        if(value !== null){
                            if(storage_index !== arr_index){
                                key='month'+arr_index
                            }
                            arr_month.push({key:key,value:value});
                            
                            storage_index++;
                            arr_index++;

                            if(arr_index === arr_month_length){
                                localStorage.removeItem('month'+storage_index);
                            }
                        }else{
                            storage_index++;
                        }
                    }
                    
                    for(var i =0; i<arr_month.length;i++){
                        localStorage.setItem(arr_month[i].key,arr_month[i].value);
                        const item =`<li>
                                            <div> 
                                                <div>
                                                    <span id="content">${arr_month[i].value}</span>
                                                </div>
                                                <input type="button" value="삭제" id="delButton">
                                            </div>
                                         </li>`;
                            section.insertAdjacentHTML('beforeend',item);
                    }
                    
                    var delButton = section.querySelectorAll('#delButton');
                    var content = section.querySelectorAll('#content');
                    for(var i = 0; i<delButton.length;i++){
                        delButton[i].addEventListener('click',delList);
                        content[i].addEventListener('click',finish);
                    }
                    
                    break; 
    }
}

//각 버튼마다 이벤트 등록 일간/주간/월간
const inputButton = document.querySelectorAll('.input-button');
inputButton[0].addEventListener('click',event=>addList(day));
inputButton[1].addEventListener('click',event=>addList(week));
inputButton[2].addEventListener('click',event=>addList(month));

