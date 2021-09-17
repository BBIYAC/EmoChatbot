let ListForm = (title, roomNumber,last_sentence,created_time) => {
  return ` <li class="room ${roomNumber}">
<a class="chat_list_link ${roomNumber}">
  <div class="info_area">
    <!--채팅방 체크, 썸네일, 텍스트 영역 => info_area 3요소-->
    <div class="check_wrap">
      <input type="checkbox" />
      <label for="check_delete1">
        <span class="check_delete"
          ><span class="img_alarm_checkbox_on"></span
        ></span>
      </label>
    </div>
    <div class="thumbnail_wrap" aria-hidden="true">
      <img src="${iconSrc}"/>
    </div>
    <div class="text_wrap">
      <div class="name_area">
        <strong class="name">${title}</strong>
        <span class="date_area">${created_time}</span>
      </div>
      <div class="text_area">
        <p class="message">
          ${last_sentence}
        </p>
        <span class="status_area">
          <span class="blind">안읽은 메시지</span>
        </span>
      </div>
    </div>
  </div>
</a>
</li>
`;
}





function ifLogined() {
  let loginPromise = new Promise((resolve, reject) => {
    if (localStorage.getItem('login_token') != null) {
      resolve(localStorage.getItem('login_token'));
    } else {
      reject("failed")
    }
  }).then((login_token) => {
    getChatRoomList(login_token);
  }).catch((error) => { location.href = '/' })
}
// http://127.0.0.1:8000/chatroominfo/1589685ec15b73a08c17262a1fc43246727cfff0/
// http://ec2-3-35-207-163.ap-northeast-2.compute.amazonaws.com:8000/chatroominfo/${login_token}/
function getChatRoomList(login_token) {
  fetch(`http://ec2-3-35-207-163.ap-northeast-2.compute.amazonaws.com:8000/chatroominfo/${login_token}/`, { //임시사용 사용 후 다시 위에있는 주소로 교체
    method: 'GET',
    headers: header,
    credentials: 'include',

  }).then(event => {
    event.json().then((datas) => {
      var is_real_time_list = Array();
      for (var data of datas) {
        console.log(data)
        var chatList = document.querySelector('.chat_list');
        chatList.innerHTML += ListForm(data.chatting_room_name, data.id,data.last_sentence,data.created_time);
        is_real_time_list.push(data.is_real_time)
      }
      const rooms = document.querySelectorAll('.room');
      console.log(is_real_time_list)
      clickRoomButton(rooms,is_real_time_list);

    })
  }).catch((error) => {
    alert(error)
  })
}


function clickRoomButton(rooms,is_real_time_list) {
  rooms.forEach((item, index) => {
    item.addEventListener('click', (event) => {
      console.log(index)
      if (is_real_time_list[Number(index)] === false){
        location.href = `/chatting/${item.className.split(' ')[1]}`;
      }else{
        location.href = `/chatting/realChat/${item.className.split(' ')[1]}`;        
      }
    })
  })
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


