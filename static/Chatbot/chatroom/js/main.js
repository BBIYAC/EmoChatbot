const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const msgerTitle = get('.msger-header-title');


// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "EmoChatBot";
const PERSON_NAME = localStorage.getItem('nickname');

// Loading
const msgerLoading = `
    <div class="msg left-msg loading">
      <div class="msg-img" style="background-image: url(${BOT_IMG})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${BOT_NAME}</div>
        </div>

        <div class="dot-pulse"></div>
      </div>
      <div class="msg-info-time">${formatDate(new Date())}</div>
    </div>
   `;


// const setTime = get('.msger-input-time');
var today = new Date();
var hours = today.getHours(); // 시


// 채팅방 입장 시 챗봇 및 이미지 업로드 버튼 출력 => 하루 주기로 변경
window.onload = function () {
  // msgerTitle.innerHTML = BOT_NAME;
  // appendImageButton('오늘의 기분을 표현하는 사진을 보내주세요!', '이미지 업로드');
  // saveAISentences('오늘의 기분을 표현하는 사진을 보내주세요!',localStorage.getItem('login_token'));
}

let saveCondition = {
  "saveflag" : false,
  "imageEmotion" : "",
  "text" : ""
}

//  이미지 업로드 시 채팅에 이미지 출력
function uploadImg(event) {
  const file = event.target.files[0]
  var reader = new FileReader();
  reader.onload = function (event) {
    appendImage(event.target.result); // event.target.result : 바이트 형태
    var upload = document.querySelectorAll('.msg-image-button');
    var msgImg = upload[upload.length - 1];
    var input = document.querySelectorAll('.msger-input-image');
    var inputImg = input[input.length - 1];
    inputImg.setAttribute('disabled', 'true');
    msgImg.classList.add('disabled');

    var myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
    const imgURL = event.target.result.toString();
    console.log(imgURL);
    console.log(file)

    fetch(`http://127.0.0.1:2000/chatting/analysis/`, { //배포시 배포 주소로 바꾸기
      method: 'POST',
      headers: myHeader,
      body: imgURL,
    })
      .then(event => {
        event.json().then((data) => {
          emotion = data["res"];
          console.log("emotion: " + emotion);
          var loading = document.querySelector('.loading');

          if (String(emotion) == "null") { // 감정 분석 실패한 경우
            msgerChat.removeChild(loading);
            appendImageButton('얼굴이 제대로 나오도록 다시 보내주세요!', '이미지 업로드');
            saveAISentences('얼굴이 제대로 나오도록 다시 보내주세요!', localStorage.getItem('login_token'));
            console.log('이미지 재업로드');
          }
          else {
            // angry, happy, neutral, fear, sad, disgust and surprise
            if (emotion == "angry") {
              msgText = `기분이 안 좋아 보이네요.<br>무슨 일이 있었나요?`;
            }
            else if (emotion == "happy") {
              msgText = `행복해 보이네요.<br>좋은 일이 있었나요?`;
            }
            else if (emotion == "neutral") {
              msgText = `무난한 하루였군요!<br>특별한 일은 없었나요?`;
            }
            else if (emotion == "fear") {
              msgText = `얼굴에서 두려움이 느껴져요.<br>오늘 어떤 일이 있었나요?`;
            }
            else if (emotion == "sad") {
              msgText = `오늘은 슬퍼보이네요...<br>저에게 털어놓아도 괜찮아요`;
            }
            else if (emotion == "disgust") {
              msgText = `혐오스러운 표정이네요.<br>안 좋은 일이 있었나요?`;
            }
            else {
              msgText = `오늘 놀라운 일이 있었나요?`;
            }



            //이미지 저장
            saveAISentences('오늘의 기분을 표현하는 사진을 보내주세요!', localStorage.getItem('login_token')).then(() => {
              saveUserSentences("eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('이미지',2,0,''.split('|'),0,{}))", localStorage.getItem('login_token'), file).then(() => {
                saveAISentences(msgText, localStorage.getItem('login_token'));
              });
            });

            msgerChat.removeChild(loading);
            appendMessage(BOT_NAME, BOT_IMG, "left", msgText, formatDate(new Date()));
            console.log(msgText);

            saveCondition.saveflag = true;
            saveCondition.imageEmotion = emotion;
          }
        });
      })
      .catch(error => {
        console.log(error);
      })

  };
  reader.readAsDataURL(event.target.files[0]);
}


// 사용자가 채팅 입력 시 Chat 추가 후 봇 응답 받아오기
msgerForm.addEventListener("submit", event => {
  event.preventDefault();
  const msgText = msgerInput.value;
  if (!msgText) return;
  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText, formatDate(new Date()));
  msgerChat.insertAdjacentHTML("beforeend", msgerLoading);
  msgerInput.value = "";
  botResponse(msgText);
});


// Chat 추가 함수
function appendMessage(name, img, side, text, time) {
  //   Simple solution for small apps
  if (saveCondition.saveflag === true){
    saveCondition.text = text;
    console.log(saveCondition);
    saveforAnalysis(saveCondition.text,localStorage.getItem('login_token'),saveCondition.imageEmotion)
    saveCondition.saveflag = false;
  }
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
      <div class="msg-info-time">${time}</div>
    </div>
    `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}


// 이미지 업로드 시 이미지 업로드 버튼 생성 함수
function appendImageButton(text, button) {
  //   Simple solution for small apps
  appendMessage(BOT_NAME, BOT_IMG, "left", text, formatDate(new Date()));
  const msgHTML = `
    <div class="msg left-msg">
      <button class="msg-image-button">
        <div class="msg-text">${button}</div>
      </button>
      <input type="file" class="msger-input-image" accept="img/*" required multiple onchange="uploadImg(event);" capture="camera"></input>
    </div>
    `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;

  var upload = document.querySelectorAll('.msg-image-button');
  var msgImg = upload[upload.length - 1];
  var input = document.querySelectorAll('.msger-input-image');
  var inputImg = input[input.length - 1];
  msgImg.addEventListener("click", function () {
    inputImg.click();
  });

  var prevBubbleWidth = msgImg.parentElement.previousElementSibling.querySelector('.msg-bubble').offsetWidth + 'px';
  msgImg.style.width = prevBubbleWidth;
}



// 업로드한 이미지 출력 함수
function appendImage(uploadImg, name = null) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg right-msg">
      <div class="msg-img" style="background-image: url(${PERSON_IMG})"></div>
      <img id="${name}" class=" msg-upload-image" src="${uploadImg}">
      <div class="msg-info-time">${formatDate(new Date())}</div>
    </div>
    `;
  if (uploadImg === '/') {
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  } else {
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.insertAdjacentHTML("beforeend", msgerLoading);
  }
  msgerChat.scrollTop += 500;



}


// 챗봇 링크 응답
function appendLinkButton(texts) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg left-msg">
      <div class="msg-img" style="background-image: url(${BOT_IMG})"></div>
      <a class="msg-link-button" href="${texts[1]}" target="_blank">
        <div class="msg-text">${texts[0]}</div>
      </a>
      <div class="msg-info-time">${formatDate(new Date())}</div>
    </div>
    `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}


// 사용자 입력에 따른 챗봇 응답 
function botResponse(rawText) {
  saveUserSentences(rawText, localStorage.getItem('login_token'))

  var myHeader = new Headers();
  myHeader.append('Content-Type', 'application/json');

  fetch('', {
    method: 'POST',
    headers: myHeader,
    body: JSON.stringify({
      "msgText": rawText
    })
  })
    .then(event => {
      event.json().then((data) => {
        msgText = data["res"];
        console.log(msgText);
        var loading = document.querySelector('.loading');
        msgerChat.removeChild(loading);

        if (msgText.includes("http")) {
          texts = msgText.split('<br>');
          appendLinkButton(texts);
          saveAISentences(msgText, localStorage.getItem('login_token'));
        }
        else {
          appendMessage(BOT_NAME, BOT_IMG, "left", msgText, formatDate(new Date()));
          saveAISentences(msgText, localStorage.getItem('login_token'));
        }
      });
    })
    .catch(error => {
      console.log(error);
    })

}

async function saveUserImage(stcId, image) {
  var formData = new FormData()
  formData.append("chatting_sentence_id", stcId);
  formData.append("image", image)
  console.log("stc : ", stcId);
  // http://127.0.0.1:2000/chatroominfo/${localStorage.getItem('login_token')}/${window.location.href.split('/')[4]}/conversation-sentences/image/
  // http://127.0.0.1:2000/chatroominfo/1589685ec15b73a08c17262a1fc43246727cfff0/1/conversation-sentences/image/
  return await fetch(`http://ec2-3-35-207-163.ap-northeast-2.compute.amazonaws.com:8000/chatroominfo/${localStorage.getItem('login_token')}/${window.location.href.split('/')[4]}/conversation-sentences/image/`, {
    method: 'POST',
    credentials: 'include',
    body: formData
  })
    .then((event) => {
      event.json().then((data) => {
        console.log(data);
      })
    }).catch((error) => {

    });
}

//api_save
async function saveUserSentences(text, login_token, image = null) {
  var myHeader = new Headers();
  myHeader.append('Content-Type', 'application/json');
  return await fetch(`http://ec2-3-35-207-163.ap-northeast-2.compute.amazonaws.com:8000/chatroominfo/${login_token}/${window.location.href.split('/')[4]}/conversation-sentences/`, {
    method: 'POST',
    headers: myHeader,
    credentials: 'include',
    body: JSON.stringify({
      "text": text,
      "is_read": true
    })
  })
    .then((event) => {
      event.json().then((data) => {
        console.log(data);
        if (image != null) {
          saveUserImage(data.id, image)
        }
      })
    }).catch((error) => {

    });
}

async function saveAISentences(text, login_token) {
  var myHeader = new Headers();
  myHeader.append('Content-Type', 'application/json');
  return await fetch(`http://ec2-3-35-207-163.ap-northeast-2.compute.amazonaws.com:8000/chatroominfo/${login_token}/${window.location.href.split('/')[4]}/conversation-sentences/ai/`, {
    method: 'POST',
    headers: myHeader,
    credentials: 'include',
    body: JSON.stringify({
      "text": text,
      "is_read": true
    })
  })
    .then((event) => {
      event.json().then((data) => {
        console.log(data);
      })
    }).catch((error) => {

    });
}
// var currentTime = new Date();
// console.log(getFormatDate(currentTime));

function getFormatDate(date){
  var year = date.getFullYear();
  var month = (1 + date.getMonth());
  month = month >= 10 ? month : '0' + month;
  var day = date.getDate()
  var day = day >= 10 ? day : '0' + day;
  var hour = date.getHours();
  hour = hour >= 10 ? hour : '0' + hour;
  var min = date.getMinutes();
  min = min >= 10 ? min : '0' + min;
  var sec = date.getSeconds();
  sec = sec >= 10 ? sec : '0' + sec;
  return `${year}-${month}-${day}T${hour}:${min}:${sec}+09:00`;
}


async function saveforAnalysis(text, login_token, emotion) {
  var myHeader = new Headers();
  var currentTime = new Date();
  currentTime.getDate()
  myHeader.append('Content-Type', 'application/json');
  return await fetch(`http://ec2-3-35-207-163.ap-northeast-2.compute.amazonaws.com:8000/chatroominfo/${login_token}/analysis/`, {
    method: 'POST',
    headers: myHeader,
    credentials: 'include',
    body: JSON.stringify({
      "imageEmotionRate": emotion,
      "text": text,
      "created_time": getFormatDate(currentTime)
    })
  })
    .then((event) => {
      event.json().then((data) => {
        console.log(data);
        
      })
    }).catch((error) => {

    });
}
// {
//   "text": "안녕하세요",
//   "is_read": true
// }





// Email Send Setting
const msgerSettingIcon = get('.msger-header-setting');
const msgerSetting = get('.msger-setting');
const msgerSettingSave = get('.msger-setting-save');

msgerSetting.addEventListener('click', (event) => {
  if (event.target === msgerSetting) {
    msgerSetting.classList.toggle('show');
  }
});

function setting_open() {
  msgerSetting.classList.toggle('show');
}

function setting_notice_time() {
  var myHeader = new Headers();
  myHeader.append('Content-Type', 'application/json');
  var getampm = get('.selected').innerText;
  var gethhmm = get('.time-hhmm').value;
  if (getampm == '오후') {
    gethhmm = String(parseInt(gethhmm.substr(0, 2)) + 12) + gethhmm.substr(2, 5);
  }
  else {
    if (gethhmm.substr(0, 2) == "12") {
      gethhmm = String(parseInt(gethhmm.substr(0, 2)) - 12) + gethhmm.substr(2, 5);
    }
  }
  console.log('getTime: ' + gethhmm); // 00:00

  fetch('notice', {
    method: 'POST',
    headers: myHeader,
    body: gethhmm,
  })
    .catch(error => {
      console.log(error);
    })
  msgerSetting.classList.toggle('show');
}

var am = get('.time-am');
var pm = get('.time-pm');
am.addEventListener('click', function () {
  if (!am.classList.contains('selected')) {
    am.classList.add('selected');
    pm.classList.remove('selected');
  }
});
pm.addEventListener('click', function () {
  if (!pm.classList.contains('selected')) {
    pm.classList.add('selected');
    am.classList.remove('selected');
  }
});


window.addEventListener("load", function () {
  // 처음 시작시 화면의 사이즈 값을 가진다.
  var originalHeight = $(window).height();

  // 창의 사이즈 변화가 일어났을 경우 실행된다.
  $('.msger-input').click(function () {
    setTimeout(function () {
      $('.msger').height($(window).height());
    }, 1000)

  });

  $('.msger-chat').click(function () {
    setTimeout(function () {
      $('.msger').height(originalHeight);
    }, 1000)
  });
});





// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}


function formatDate(date) {
  const Y = date.getFullYear();
  const M = "0" + date.getMonth();
  const D = "0" + date.getDate();
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${M.slice(-2)}/${D}/${h.slice(-2)}:${m.slice(-2)}`;
}


//이전페이지 이동
function setting_prev() {
  location.href = '/chatting/';
}

