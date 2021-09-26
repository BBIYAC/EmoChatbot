const create_account = document.getElementById('btn-create-account');

create_account.addEventListener('click', (event) => {
  const username = document.getElementById('id');
  const password = document.getElementById('ps');
  const email = document.getElementById('email');
  const nickname = document.getElementById('nickname');

  makeAccount(username,password,email,nickname)

})

async function makeAccount(username,password,email,nickname){
  var header = new Headers();
  header.append('Content-Type', 'application/json');
  return await fetch('http://ec2-54-180-100-94.ap-northeast-2.compute.amazonaws.com:8000/signup/', {
    method: 'POST',
    headers: header,
    body: JSON.stringify({
      "username": username.value,
      "password": password.value,
      "email": email.value,
      "nickname": nickname.value
    })

  }).then(event => {
    event.json().then((data) => {
      console.log(data)
      if (data.Token == undefined) {
        alert("계정 생성 실패");
      } else {
        alert("계정 생성 완료");
        createAIChatRoom(data.Token);
      }

    })
  }).catch((error) => {
    alert(error)
  })
}


async function createAIChatRoom(token) {
  var header = new Headers();
  header.append('Content-Type', 'application/json');
  return await fetch(`http://ec2-54-180-100-94.ap-northeast-2.compute.amazonaws.com:8000/chatroominfo/${token}/`, {
    method: 'POST',
    headers: header,
    body: JSON.stringify({
      "chatting_room_name": "담이와의 채팅방"
    })

  }).then(event => {
    event.json().then((data) => {
      console.log(data)
      location.href = "/";
    })
  }).catch((error) => {
    alert(error)
  })
}

