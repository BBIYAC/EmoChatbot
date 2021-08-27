const signup = document.getElementById('btn-signup');
const login = document.getElementById('btn-login');

var header = new Headers();
header.append('Content-Type', 'application/json');
// https://emochatserver.herokuapp.com/chatroominfo/

// console.log(localStorage.getItem('login_token'))


// location.href = "/chatting/"

function checkIfPassed2DaysORNot(){
    var currentTime = new Date();
    let passedHours = currentTime.getTime()/(1000*3600) - localStorage.getItem('logined_time')/(1000*3600);
  
    if(passedHours > 48){
      localStorage.removeItem('logined_time');
      localStorage.removeItem('login_token');
      localStorage.removeItem('nickname');
    }
  
  }

function ifLogined(){
    let loginPromise = new Promise((resolve,reject)=>{
        if (localStorage.getItem('login_token') != null){
            resolve(localStorage.getItem('login_token'))
        }else{
            reject("failed")
        }
    }).then((logined)=>{
        location.href = "/chatting/"
    }).catch((error)=>{})

    
}

checkIfPassed2DaysORNot()
ifLogined()

signup.addEventListener('click', () => {
    console.log("안녕")
    location.href = "/signup/"
})

login.addEventListener('click', () => {
    const username = document.getElementById('id');
    const password = document.getElementById('ps');
    var header = new Headers();
    header.append('Content-Type', 'application/json');

    let data ={
        username : username.value,
        password : password.value
    }

    fetch('http://ec2-3-35-207-163.ap-northeast-2.compute.amazonaws.com:8000/login/', {
        method: 'POST',
        headers: header,
        credentials: 'include',
        body: JSON.stringify({
            "username": username.value,
            "password": password.value,
        })

    }).then(event => {
        event.json().then((data) => {
            if(data.login_token == undefined){
                alert(data.non_field_errors);
            }else{
                alert("로그인 성공");
                let today = new Date();
                localStorage.setItem('nickname',data.nickname);
                localStorage.setItem('login_token',data.login_token);
                localStorage.setItem('logined_time',today.getTime());
                location.href = "/chatting/";
            }
        })
    }).catch((error) => {
        alert(error)
    })


})





