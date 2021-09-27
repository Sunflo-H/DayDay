//JSON을 받아오는 함수
const getJSON = function(url, callback){
    const xhr = new XMLHttpRequest();
    xhr.open('GET',url,true);
    xhr.responseType='json';
    console.log("JSON 받아오기");
    xhr.onload=function(){
        //접속이 성공이면 null반환, 그 외는 status 반환
        const status=xhr.status;
        if(status===200){
            callback(null,xhr.response);
            console.log("성공");
        }else{
            callback(status,xhr.response);
            console.log("실패");
        }
    };
    xhr.send();
}

// getJSON('http://api.openweathermap.org/data/2.5/weather?q=seoul&appid=b9482d122895622742fa0faaa664cf32&units=metric', 
//         function(err,data){
//             if(err !==null){
//                 alert('죄송합니다 오류가 발생했습니다.'+err);
//             }else{
//                 alert(`현재 온도는 ${data.main.temp}도 입니다.`);
//             }
//         });

let getWeather = document.querySelector(".get_weather");
let getCityList = document.querySelector("#city_list");
getWeather.onclick = function(){
    console.log(getCityList.value);
    getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${getCityList.value}&appid=b9482d122895622742fa0faaa664cf32&units=metric`, 
    function(err,data){
        if(err !==null){
            alert('죄송합니다 오류가 발생했습니다.'+err);
        }else{
            alert(`${getCityList.value}의 현재 온도는 ${data.main.temp}도 입니다.`);
        }
    });
}
