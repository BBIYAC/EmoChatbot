const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const msgerTitle = get('.msger-header-title');


// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "EmoChatBot";
const PERSON_NAME = "Me";

window.onload = function(){
  msgerTitle.innerHTML = "😄 "+ BOT_NAME + " 😄";
  appendMessage(BOT_NAME, BOT_IMG, "left", '오늘의 기분을 표현하는 사진을 보내주세요!');
  setTimeout(function() {
    appendImage("left", '이미지 업로드');
    const msgImg = get('.msg-image-button')
    msgImg.addEventListener("click", function(){
      get('.msger-input-image').click();
   }); 
  }, 1000);
  

}

msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

  botResponse(msgText);

});

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

function appendImage(side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <button class="msg-image-button">
        <div class="msg-text">${text}</div>
      </button>
      <input type="file" class="msger-input-image" accept="img/*" required multiple></input>
    </div>
    `;
  
  

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

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
    appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
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

