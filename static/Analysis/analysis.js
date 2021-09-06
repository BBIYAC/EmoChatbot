const analysis_emotion_icon = get('.analysis-image-emotion-icon');
const analysis_emotion_text = get('.analysis-image-emotion-text');
const analysis_text = get('.analysis-image-text');
const analysis_sentence_text = get('.analysis-sentence-text');
const analysis_positive_bg = get('.analysis-positive-bg');
const analysis_positive = get('.analysis-positive');


window.onload = () => {
    analysis_facial_emotion('happy');
    analysis_sentence_emotion(90);
}

// 얼굴 이미데의 감정 분석 결과
function analysis_facial_emotion(emotion){
    if(emotion == 'happy'){
        analysis_emotion_icon.src = 'https://cdn150.picsart.com/upscale-237111998107212.png?type=webp&to=min&r=640';
        analysis_emotion_text.innerHTML = 'Happy';
        analysis_text.innerHTML = '당신과 같은 감정을 가진 사용자가 135명 더 있습니다.';
    }
}

// 문장의 감정 분석 결과
function analysis_sentence_emotion(rate){
    analysis_sentence_text.innerHTML = '는 ' + String(rate) + '% 입니다. ';
    analysis_positive.style.width = String(rate) + '%';
}




// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}