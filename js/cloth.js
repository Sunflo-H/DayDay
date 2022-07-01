// JSON을 받아오는 함수
const getJSON = function(url, callback){
    const xhr = new XMLHttpRequest();
    xhr.open('GET',url,true);
    xhr.responseType='json';
    // console.log("JSON 받아오기");
    xhr.onload=function(){
        //접속이 성공이면 null반환, 그 외는 status 반환
        const status=xhr.status;
        if(status===200){
            callback(null,xhr.response);
        }else{
            callback(status,xhr.response);
        }
    };
    xhr.send();
}

let cityList = document.querySelector("#city_list");
function getWeather(){
    console.log("실행");
    let temper = document.querySelector('#temper');
    console.log(cityList.value);
    getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${cityList.value}&appid=b9482d122895622742fa0faaa664cf32&units=metric`, 
    function(err,data){
        if(err !==null){
            alert('죄송합니다 오류가 발생했습니다.'+err);
        }else{
            // console.log(data.weather[0].main);
            // console.log(data.weather[0].description);
            temper.innerHTML=`오늘의 온도 : ${data.main.temp}`
        }
    });
}



function getCloth(){
    let clothText = document.querySelector('.cloth-text');
    let clothImage = document.querySelector('.cloth-image');
    const clothTextArr =['민소매, 반팔, 반바지, 짧은치마, 린넨 옷',
                    '반팔, 얇은 셔츠, 반바지, 면바지',
                    '블라우스, 긴팔 티, 면바지, 슬랙스',
                    '얇은 가디건이나 니트, 맨투맨, 후드, 긴 바지',
                    '자켓, 가디건, 청자켓, 니트, 스타킹, 청바지',
                    '트렌치코트, 야상, 점퍼, 스타킹, 기모바지',
                    '울 코드, 히트텍, 가죽 옷, 기모',
                    '패딩, 두꺼운 코트, 누빔 옷, 기모, 목도리']
    const clothImageArr =['28~','23~27','20~22','17~19','12~16','9~11','5~8','~4'];
    
    
    
    getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${cityList.value}&appid=b9482d122895622742fa0faaa664cf32&units=metric`, 
    function(err,data){
        let temp = data.main.temp;
        if(err !==null){
            alert('죄송합니다 오류가 발생했습니다.'+err);
        }else{
            console.log(temp);
            if(28<=temp){
                clothText.innerHTML=clothTextArr[0];
                clothImage.innerHTML=clothImageArr[0];
            }else if(23<=temp){
                clothText.innerHTML=clothTextArr[1];
                clothImage.innerHTML=clothImageArr[1];
            }else if(20<=temp){
                clothText.innerHTML=clothTextArr[2];
                clothImage.innerHTML=clothImageArr[2];
            }else if(17<=temp){
                clothText.innerHTML=clothTextArr[3];
                clothImage.innerHTML=clothImageArr[3];
            }else if(12<=temp){
                clothText.innerHTML=clothTextArr[4];
                clothImage.innerHTML=clothImageArr[4];
            }else if(9<=temp){
                clothText.innerHTML=clothTextArr[5];
                clothImage.innerHTML=clothImageArr[5];
            }else if(5<=temp){
                clothText.innerHTML=clothTextArr[6];
                clothImage.innerHTML=clothImageArr[6];
            }else {
                clothText.innerHTML=clothTextArr[7];
                clothImage.innerHTML=clothImageArr[7];
            }            
        }
    });
}

// getCloth();
window.addEventListener('load',getWeather);
window.addEventListener('load',getCloth);
cityList.addEventListener('change',getWeather);
cityList.addEventListener('change',getCloth);
