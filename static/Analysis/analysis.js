const analysis_emotion_icon = get('.analysis-image-emotion-icon');
const analysis_emotion_text = get('.analysis-image-emotion-text');
const analysis_text = get('.analysis-image-text');
const analysis_sentence_text = get('.analysis-sentence-text');
const analysis_positive_bg = get('.analysis-positive-bg');
const analysis_positive = get('.analysis-positive');
function ifLogined() {
    let loginPromise = new Promise((resolve, reject) => {
        if (localStorage.getItem('login_token') != null) {
            resolve(localStorage.getItem('login_token'));
        } else {
            reject("failed");
        }
    }).then((logined) => {
        getAnalysisResult(localStorage.getItem('login_token'));
    }).catch((error) => {alert("로그인하세요"); location.href = '/'; })


}
window.onload = () => {
    ifLogined();
}

// 얼굴 이미데의 감정 분석 결과
function analysis_facial_emotion(emotion,sameEmotionCount) {
    if (emotion == 'happy') {
        analysis_emotion_icon.src = 'https://cdn150.picsart.com/upscale-237111998107212.png?type=webp&to=min&r=640';
        analysis_emotion_text.innerHTML = 'Happy';
        analysis_text.innerHTML = `당신과 같은 감정을 가진 사용자가 ${sameEmotionCount}명 더 있습니다.`;
    }
    else if (emotion == 'sad') {
        analysis_emotion_icon.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSJEFrnU_T0q7Jka8ZZyA3hXrwNj3hl_TS4EfT-_Iu0nZYKQnaJ-Cug7Axty9OD3uEoq8&usqp=CAU';
        analysis_emotion_text.innerHTML = 'Sad';
        analysis_text.innerHTML = `당신과 같은 감정을 가진 사용자가 ${sameEmotionCount}명 더 있습니다.`;
    }
    else if (emotion == 'fear') {
        analysis_emotion_icon.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSJEFrnU_T0q7Jka8ZZyA3hXrwNj3hl_TS4EfT-_Iu0nZYKQnaJ-Cug7Axty9OD3uEoq8&usqp=CAU';
        analysis_emotion_text.innerHTML = 'Fear';
        analysis_text.innerHTML = `당신과 같은 감정을 가진 사용자가 ${sameEmotionCount}명 더 있습니다.`;
    }
    else if (emotion == 'disgust') {
        analysis_emotion_icon.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSJEFrnU_T0q7Jka8ZZyA3hXrwNj3hl_TS4EfT-_Iu0nZYKQnaJ-Cug7Axty9OD3uEoq8&usqp=CAU';
        analysis_emotion_text.innerHTML = 'Disgust';
        analysis_text.innerHTML =`당신과 같은 감정을 가진 사용자가 ${sameEmotionCount}명 더 있습니다.`;
    }
    else if (emotion == 'angry') {
        analysis_emotion_icon.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSJEFrnU_T0q7Jka8ZZyA3hXrwNj3hl_TS4EfT-_Iu0nZYKQnaJ-Cug7Axty9OD3uEoq8&usqp=CAU';
        analysis_emotion_text.innerHTML = 'Angry';
        analysis_text.innerHTML =`당신과 같은 감정을 가진 사용자가 ${sameEmotionCount}명 더 있습니다.`;
    }
    else if (emotion == 'neutral') {
        analysis_emotion_icon.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSJEFrnU_T0q7Jka8ZZyA3hXrwNj3hl_TS4EfT-_Iu0nZYKQnaJ-Cug7Axty9OD3uEoq8&usqp=CAU';
        analysis_emotion_text.innerHTML = 'Neutral';
        analysis_text.innerHTML = `당신과 같은 감정을 가진 사용자가 ${sameEmotionCount}명 더 있습니다.`;
    }
}

// 문장의 감정 분석 결과
function analysis_sentence_emotion(rate) {
    analysis_sentence_text.innerHTML = '는 ' + String(rate) + '% 입니다. ';
    analysis_positive.style.width = String(rate) + '%';
}

// 일주일 간의 분석 결과
function analysis_weekly_emotion(weekly_datas,dates) {
    var weekly_data = {
        labels: dates,
        datasets: [{
            label: 'Weekly Records',
            data: weekly_datas,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };
    var weekly_ctx = document.getElementById('weekly').getContext('2d'); // 캔버스 id값 가져오기
    var weekly = new Chart(weekly_ctx, {
        type: 'bar',
        data: weekly_data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                },
            }
        }
    });
}



// 한 달간의 분석 결과
function analysis_monthly_emotion(monthly_datas,dates) {
    var monthly_data = {
        labels: dates,
        datasets: [{
            label: 'Monthly Records',
            data: monthly_datas,
            backgroundColor: 'rgb(62, 162, 255)',
            borderColor: 'rgb(62, 162, 255)',
        }]
    };

    var monthly_ctx = document.getElementById('monthly').getContext('2d'); // 캔버스 id값 가져오기
    var monythly = new Chart(monthly_ctx, {
        type: 'bar',
        data: monthly_data,
        options: {
            plugins: {
                legend: {
                    display: false
                },
            },
            scales: {
                xAxes: {
                    ticks: {
                        maxTicksLimit: 5,
                        fontSize: 100
                    }
                },
            }
        }
    });
}



// Utils
function get(selector, root = document) {
    return root.querySelector(selector);
}


function setting_prev() {
    location.href = "/chatting/";
}


function getAnalysisResult(login_token) {
    var header = new Headers();
    header.append('Content-Type', 'application/json');
    fetch(`http://ec2-3-35-207-163.ap-northeast-2.compute.amazonaws.com:8000/chatroominfo/${login_token}/analysis/`, { //임시사용 사용 후 다시 위에있는 주소로 교체
        method: 'GET',
        headers: header,
        credentials: 'include',

    }).then(event => {
        event.json().then((datas) => {

            var same_emotion_cnt = 0;
            for(var data of datas[3].everyone_emotion){
                if(datas[0].imageEmotionRate == data.imageEmotionRate){
                    same_emotion_cnt += 1;
                }
            }
            analysis_facial_emotion(datas[0].imageEmotionRate,same_emotion_cnt);


            analysis_sentence_emotion(calculateScoreInPercent(datas[0].textEmotionRate));        
            var weekly_datas = new Array()
            var dates = new Array()
            for(var data of datas[1].one_week){
                if (dates.length <= 6){
                    dates.push(`${dateFormat(data.created_time)[0]}/${dateFormat(data.created_time)[1]}`);
                    weekly_datas.push(calculateScoreInPercent(data.textEmotionRate))
                }
            }
            analysis_weekly_emotion(weekly_datas.reverse(),dates.reverse());

            var monthly_datas = new Array();
            var dates = new Array();
            for(var data of datas[2].one_month){
                if (dates.length <= 30){
                    monthly_datas.push(calculateScoreInPercent(data.textEmotionRate));
                    dates.push(`${dateFormat(data.created_time)[0]}/${dateFormat(data.created_time)[1]}`);
                }
            }

            analysis_monthly_emotion(monthly_datas.reverse(),dates.reverse());

        })
    }).catch((error) => {
        alert(error)
    })
}

function calculateScoreInPercent(textEmotionRate){
    return (textEmotionRate + 100) / 2 ;
}

function dateFormat(date){
    var month = parseInt(date.split('-')[1]);
    var day = parseInt(date.split('-')[2]);
    return [month,day];
}


