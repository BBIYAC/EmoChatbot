// Email Send Setting
const msgerSettingIcon = document.querySelector('.msger-header-setting');
const msgerSetting = document.querySelector('.msger-setting');
const msgerSettingSave = document.querySelector('.msger-setting-save');
const msgerForm = document.querySelector(".msger-inputarea");
const msgerInput = document.querySelector(".msger-input");
const msgerChat = document.querySelector(".msger-chat");
const PERSON_NAME = localStorage.getItem('nickname');
const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "EmoChatBot";
msgerSetting.addEventListener('click', (event) => {
  if (event.target === msgerSetting) {
    msgerSetting.classList.toggle('show');
  }
});
function setting_open() {
  msgerSetting.classList.toggle('show');
}

//이전페이지 이동
function setting_prev() {
  location.href = '/chatting/';
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


function appendMessage(name, img, side, text, time) {
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
      <div class="msg-info-time">${time}</div>
    </div>
    `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

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

function formatDate(date) {
  const Y = date.getFullYear();
  const M = "0" + date.getMonth();
  const D = "0" + date.getDate();
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${Y}/${M.slice(-2)}/${D}/${h.slice(-2)}:${m.slice(-2)}`;
}

msgerForm.addEventListener("submit", event => {
  event.preventDefault();
  const msgText = msgerInput.value;
  msgerInput.value = null
  if (!msgText) return;
  chatSocket.send(JSON.stringify({
    'message':msgText,
    'nickname' : localStorage.getItem('nickname'),
    'token' : localStorage.getItem('login_token'),
    'room_id' : window.location.href.split('/')[5]
  }));
});


function ifLogined() {
  let loginPromise = new Promise((resolve, reject) => {
      if (localStorage.getItem('login_token') != null) {
          resolve(localStorage.getItem('login_token'));
      } else {
          console.log("하이");
          reject("failed");
      }
  }).then((login_token) => {
      console.log("로그인 성공");
  }).catch((error) => {
      console.log(error);
      alert("로그인 하세요");
      location.href = "/";
  })



}
ifLogined() 
