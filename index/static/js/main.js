const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const msgerTitle = get('.msger-header-title');

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "EmoChatBot";
const PERSON_NAME = "Me";



// 채팅방 입장 시 챗봇 및 이미지 업로드 버튼 출력 => 하루 주기로 변경
window.onload = function(){
  msgerTitle.innerHTML = "😄 "+ BOT_NAME + " 😄";
  appendImageButton('오늘의 기분을 표현하는 사진을 보내주세요!', '이미지 업로드');
  const msgImg = get('.msg-image-button');
  msgImg.addEventListener("click", function(){
    get('.msger-input-image').click();
   }); 
  
  var prevBubbleWidth = msgImg.parentElement.previousElementSibling.querySelector('.msg-bubble').offsetWidth + 'px';
  msgImg.style.width = prevBubbleWidth;

}


//  이미지 업로드 시 채팅에 이미지 출력
function uploadImg(event) { 
  var reader = new FileReader(); 
  reader.onload = function(event) { 
    appendImage(event.target.result); // event.target.result : 바이트 형태

    // setTimeout(function() { // 시간 지연 함수
    //   appendMessage(BOT_NAME, BOT_IMG, "left", '이미지 분석 중입니다<br>잠시만 기다려주세요!');
    // }, 1000);

    var myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');

    fetch('analysis',{
      method: 'POST',
      headers: myHeader,
      body: event.target.result.toString(),
    })
    .then(event=>{
      event.json().then((data)=>{
        emotion = data["res"];
        msgText = `${emotion}<br>기분이 안 좋아 보이네요.<br>어떤 일이 있었나요?` // 감정별 if문 처리
        appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
        console.log(msgText);
      });
    })
    .catch(error=>{
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
  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";
  botResponse(msgText);
});


// Chat 추가 함수
function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
      <div class="msg-info-time">${formatDate(new Date())}</div>
    </div>
    `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}


// 이미지 업로드 시 이미지 업로드 버튼 생성 함수
function appendImageButton(text, button) {
  //   Simple solution for small apps
  appendMessage(BOT_NAME, BOT_IMG, "left", text);
  const msgHTML = `
    <div class="msg left-msg">
      <button class="msg-image-button">
        <div class="msg-text">${button}</div>
      </button>
      <input type="file" class="msger-input-image" accept="img/*" required multiple onchange="uploadImg(event);"></input>
    </div>
    `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}



// 업로드한 이미지 출력 함수
function appendImage(uploadImg) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg right-msg">
      <div class="msg-img" style="background-image: url(${PERSON_IMG})"></div>
      <img class="msg-upload-image" src="${uploadImg}">
      <div class="msg-info-time">${formatDate(new Date())}</div>
    </div>
    `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
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
  console.log(rawText);

  var myHeader = new Headers();
  myHeader.append('Content-Type', 'application/json');

  fetch('',{
    method: 'POST',
    headers: myHeader,
    body:JSON.stringify({
        "msgText": rawText               
      })
  })
  .then(event=>{
    event.json().then((data)=>{
    msgText = data["res"];
    console.log(msgText);
    if(msgText.includes("http")){
      texts = msgText.split('<br>');
      appendLinkButton(texts)
    }
    else{
      appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
    }
    });
  })
  .catch(error=>{
      console.log(error);
  })

}


// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

