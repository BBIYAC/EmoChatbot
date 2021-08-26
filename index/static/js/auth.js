
// SIGN UP & LOGIN API
const signup = document.getElementById('btn-signup');
const login = document.getElementById('btn-login');

var header = new Headers();
header.append('Content-Type', 'application/json');



signup.addEventListener('click', () => {
    console.log("안녕")
    location.href = "/signup/"
})

login.addEventListener('click', () => {
    const username = document.getElementById('id');
    const password = document.getElementById('ps');
    var header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', 'http://ec2-3-35-207-163.ap-northeast-2.compute.amazonaws.com:8000');
    header.append('Access-Control-Allow-Credentials', 'true');
    header.append('Access-Control-Allow-Headers', 'Origin');
    header.append('Access-Control-Allow-Headers', 'Accept');
    header.append('GET', 'POST', 'OPTIONS');


    let data ={
        username : username.value,
        password : password.value
    }


    // axios.post("http://127.0.0.1:8080/signup/",data,{
    //     headers:{'Content-Type':'application/json'}
    // },
    //     { withCredentials: true }
    // ).then(response => {
    //     console.log(response)
    // }).catch(error => {
    //     console.log(error);
    // });
    fetch('http://ec2-3-35-207-163.ap-northeast-2.compute.amazonaws.com:8000/login/', {
        method: 'POST',
        headers: header,
        credentials: 'include',
        body: JSON.stringify({
            "username": username.value,
            "password": password.value,
        })

    }).then(event => {
        console.log(event);
        event.json().then((data) => {
            if (data.message != undefined) {
                console.log(data)
                alert("로그인 성공");
            }
            else {
                alert("로그인 실패");
            }
        })
    }).catch((error) => {
        alert(error)
    })


})
