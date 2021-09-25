let ListForm = (title, roomNumber, last_sentence, created_time) => {
  return `<li class="room ${roomNumber}">
  <a class="chatlist_link ${roomNumber}">
  <div class="thumbnail_wrap">
    <img src="${iconSrc}" alt="채팅방프로필" class="thumbnail">
  </div>
  <div class="text_wrap">
    <div class="nameAndDate">
      <span class="name">${title}</span>
      <span class="date">${created_time}</span>
    </div>
    <div class="text_area">
      <p class="message">${last_sentence}
      </p>
    </div>
  </div>
  </a>
</li>
`;
}
let counsellingButton = document.querySelector('.fa-weixin');
let analysisButton = document.querySelector('.fa-chart-bar');
counsellingButton.addEventListener('click', () => {
  const chatlist = document.querySelector('.chatlist');
  const rooms = document.querySelectorAll('.room');
  console.log(chatlist,rooms);
  rooms.forEach((item, index)=>{
    chatlist.removeChild(item);
  })
  createRealtimeRoom(localStorage.getItem('login_token'), '상담 채팅방');
  getChatRoomList(localStorage.getItem('login_token'));


});
analysisButton.addEventListener('click', () => {
  location.href = '/analysis/';
});
function ifLogined() {
  let loginPromise = new Promise((resolve, reject) => {
    if (localStorage.getItem('login_token') != null) {
      resolve(localStorage.getItem('login_token'));
    } else {
      reject("failed");
    }
  }).then((login_token) => {
    getChatRoomList(login_token);
  }).catch((error) => { location.href = '/' })
}
// http://127.0.0.1:8000/chatroominfo/285bd93d27b4aa4f76495ded9f14e94fa4226f2d/
// http://ec2-3-35-207-163.ap-northeast-2.compute.amazonaws.com:8000/chatroominfo/${login_token}/
function getChatRoomList(login_token) {
  var header = new Headers();
  header.append('Content-Type', 'application/json');
  fetch(`http://ec2-3-35-207-163.ap-northeast-2.compute.amazonaws.com:8000/chatroominfo/${login_token}/`, { //임시사용 사용 후 다시 위에있는 주소로 교체
    method: 'GET',
    headers: header,
    credentials: 'include',

  }).then(event => {
    event.json().then((datas) => {
      console.log(datas)
      var is_real_time_list = Array();
      for (var data of datas) {
        var chatList = document.querySelector('.chatlist');
        let created_time = ''
        if (data.created_time) {
          created_time = showRecordedTime(data.created_time);
        }
        chatList.innerHTML += ListForm(data.chatting_room_name, data.id, data.last_sentence, created_time);
        is_real_time_list.push(data.is_real_time)
      }
      const rooms = document.querySelectorAll('.room');
      // console.log(is_real_time_list,"리얼타임");
      // console.log(rooms);
      clickRoomButton(rooms, is_real_time_list);
    })
  }).catch((error) => {
    alert(error);
  })
}
// {
//   "chatting_room_name":"1번째",
//   "is_real_time" : true
// }
function createRealtimeRoom(login_token, chatting_room_name) {
  var header = new Headers();
  header.append('Content-Type', 'application/json');
  fetch(`http://ec2-3-35-207-163.ap-northeast-2.compute.amazonaws.com:8000/chatroominfo/${login_token}/`, { //임시사용 사용 후 다시 위에있는 주소로 교체
    method: 'POST',
    headers: header,
    credentials: 'include',
    body: JSON.stringify({
      "chatting_room_name": chatting_room_name,
      "is_real_time": true
    })

  }).then(event => {
    event.json().then((datas) => {
      console.log(datas);
    })
  }).catch((error) => {
    alert(error);
  })
}

function showRecordedTime(created_time) {
  console.log(created_time);
  const Y = created_time.slice(0, 4);
  const M = created_time.slice(5, 7);
  const D = created_time.slice(8, 10);
  const h = created_time.slice(11, 13);
  const m = created_time.slice(14, 16);
  return `${Y}/${M}/${D}`;
}

function clickRoomButton(rooms, is_real_time_list) {
  rooms.forEach((item, index) => {
    item.addEventListener('click', (event) => {
      if (is_real_time_list[Number(index)] === false) {
        location.href = `/chatting/${item.className.split(' ')[1]}`;
      } else {
        location.href = `/chatting/realChat/${item.className.split(' ')[1]}`;
      }
    })
  })
}




//프로필정보박스 이벤트
let user_btn = document.querySelector("#info");
let userbox = document.querySelector(".user_info_box");

user_btn.addEventListener('click', () => {
  userbox.classList.toggle('active');
})

//로그아웃
let logout_btn = document.querySelector('.logout_area');
logout_btn.addEventListener('click', () => {
  localStorage.removeItem('logined_time');
  localStorage.removeItem('login_token');
  localStorage.removeItem('nickname');
  location.href = "/";
})

let user = localStorage.getItem('nickname');
let username_container = document.querySelector('.username');
username_container.textContent = `${user}님 안녕하세요!`;

function ifLogined() {
  let loginPromise = new Promise((resolve, reject) => {
    // console.log(localStorage.getItem('login_token'));
    if (localStorage.getItem('login_token') != null) {
      resolve(localStorage.getItem('login_token'));
    } else {
      reject("failed")
    }
  }).then((login_token) => {
    // console.log("들어가진다.")
    getChatRoomList(login_token);
  }).catch((error) => { alert("로그인하세요"); location.href = '/'; })
}



function checkIfPassed2DaysORNot() {
  var currentTime = new Date();
  let passedHours = currentTime.getTime() / (1000 * 3600) - localStorage.getItem('logined_time') / (1000 * 3600);

  if (passedHours > 48) {
    localStorage.removeItem('logined_time');
    localStorage.removeItem('login_token');
    localStorage.removeItem('nickname');
  }

}



checkIfPassed2DaysORNot()
ifLogined()
