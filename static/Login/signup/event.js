const create_account = document.getElementById('btn-create-account');

create_account.addEventListener('click',(event)=>{
    const username = document.getElementById('id');
    const password = document.getElementById('ps');
    const email = document.getElementById('email');
    const nickname = document.getElementById('nickname');

    var header = new Headers();
    header.append('Content-Type', 'application/json');

   

    fetch('http://ec2-3-35-207-163.ap-northeast-2.compute.amazonaws.com:8000/signup/',{
        method:'POST',
        headers:header,
        body:JSON.stringify({
          "username":username.value,
          "password":password.value,
          "email":email.value,
          "nickname":nickname.value
        })

    }).then(event=>{
        event.json().then((data)=>{
          console.log(data)
          if(data.Token == undefined){
            alert("계정 생성 실패");
          }else{
            alert("계정 생성 완료");
            location.href = "/"
          }
            
        })
    }).catch((error)=>{
        alert(error)
    })

})

