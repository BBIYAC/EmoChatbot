const analysis_emotion_icon = get('.analysis-image-emotion-icon');
const analysis_emotion_text = get('.analysis-image-emotion-text');
const analysis_text = get('.analysis-image-text');
const analysis_sentence_text = get('.analysis-sentence-text');
const analysis_positive_bg = get('.analysis-positive-bg');
const analysis_positive = get('.analysis-positive');


window.onload = () => {
    analysis_facial_emotion('sad');
    analysis_sentence_emotion(90);

    // 한 주 데이터 DB에서 가져오기 -> line 106 같이 수정
    var weekly_datas = [65, 59, 80, 81, 56, 55, 40];
    analysis_weekly_emotion(weekly_datas);

    // 한 달 데이터 DB에서 가져오기
    var monthly_datas = [];
    analysis_monthly_emotion(monthly_datas);
}

// 얼굴 이미데의 감정 분석 결과
function analysis_facial_emotion(emotion){
    if(emotion == 'happy'){
        analysis_emotion_icon.src = 'https://cdn150.picsart.com/upscale-237111998107212.png?type=webp&to=min&r=640';
        analysis_emotion_text.innerHTML = 'Happy';
        analysis_text.innerHTML = '당신과 같은 감정을 가진 사용자가 522명 더 있습니다.';
    }
    else if(emotion == 'sad'){
        analysis_emotion_icon.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSJEFrnU_T0q7Jka8ZZyA3hXrwNj3hl_TS4EfT-_Iu0nZYKQnaJ-Cug7Axty9OD3uEoq8&usqp=CAU';
        analysis_emotion_text.innerHTML = 'Sad';
        analysis_text.innerHTML = '당신과 같은 감정을 가진 사용자가 1120명 더 있습니다.';
    }
}

// 문장의 감정 분석 결과
function analysis_sentence_emotion(rate){
    analysis_sentence_text.innerHTML = '는 ' + String(rate) + '% 입니다. ';
    analysis_positive.style.width = String(rate) + '%';
}

// 일주일 간의 분석 결과
function analysis_weekly_emotion(weekly_datas){
    var weekly_data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
            scales:{
                y:{
                    beginAtZero: true
                }
            },
            plugins: {
                legend:{
                    display:false
                },
            }
        }
    });
}



// 한 달간의 분석 결과
function analysis_monthly_emotion(monthly_datas){
    var monthly_data = {
        labels: [],
        datasets: [{
            label: 'Monthly Records',
            data: monthly_datas,
            backgroundColor: 'rgb(68, 146, 250)',
            borderColor: 'rgb(68, 146, 250)',
        }]
    };

    // 한 달 데이터 추가
    for(let i=1; i<=31; i++){
        monthly_data['labels'].push(i);
        // 한 달 데이터는 DB에서 가져오기
        monthly_data['datasets'][0]['data'].push(Math.floor(Math.random()*100))
    }

    var monthly_ctx = document.getElementById('monthly').getContext('2d'); // 캔버스 id값 가져오기
    var monythly = new Chart(monthly_ctx, {
        type: 'bar',
        data: monthly_data,
        options: {
            plugins: {
                legend:{
                    display:false
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