function ifLogined(){
    let loginPromise = new Promise((resolve,reject)=>{
        if (localStorage.getItem('login_token') != null){
            resolve(localStorage.getItem('login_token'))
        }else{
            console.log("하이")
            reject("failed")
        }
    }).then((login_token)=>{
        getChatRoomList(login_token);
        getConversationSentences(login_token);

    }).catch((error)=>{
        console.log(error);
        alert("로그인 하세요");
        location.href = "/";
    })



    
}

function checkIfPassed2DaysORNot(){
    var currentTime = new Date();
    let passedHours = currentTime.getTime()/(1000*3600) - localStorage.getItem('logined_time')/(1000*3600);
  
    if(passedHours > 48){
      localStorage.removeItem('logined_time');
      localStorage.removeItem('login_token');
      localStorage.removeItem('nickname');
    }
  
  }
function getConversationSentences(login_token){
    var header = new Headers();
    header.append('Content-Type', 'application/json');
    // http://ec2-3-35-207-163.ap-northeast-2.compute.amazonaws.com:8000/chatroominfo/f36192fbf818b87a77ccc64641dca8564db2c568/1/conversation-sentences
    fetch(`http://ec2-3-35-207-163.ap-northeast-2.compute.amazonaws.com:8000/chatroominfo/${login_token}/${window.location.href.split('/')[4]}/conversation-sentences/`, {
        method: 'GET',
        headers: header,
        credentials: 'include',

    }).then(event => {
        event.json().then((data) => {
            if(data.message !== "no data"){
                console.log(data); //데이터가 있다면 지금까지의 대화들을 화면에 뿌려준다.
                showPreviouschatRecords(data);
            }else{
                console.log(data); //데이터가 없으면 아무것도 하지 않는다.
            }
            appendImageButton('오늘의 기분을 표현하는 사진을 보내주세요!', '이미지 업로드');
        })
    }).catch((error) => {
        alert(`room number is not exist on the list`);
    })
}


function showPreviouschatRecords(chatData){
    chatData.forEach((value,index,array)=>{
        if(value.UserInformation_id == 5){
            if(value.text.includes("http")){
                texts = value.text.split('<br>');
                appendLinkButton(texts);
                return
            }
            appendMessage("EmoChatBot","https://image.flaticon.com/icons/svg/327/327779.svg", "left",value.text);
        }else{
            appendMessage(localStorage.getItem('nickname'), "https://image.flaticon.com/icons/svg/145/145867.svg", "right",value.text);
        }
    })
}


function getChatRoomList(login_token){
    var header = new Headers();
    header.append('Content-Type', 'application/json');
    fetch(`http://ec2-3-35-207-163.ap-northeast-2.compute.amazonaws.com:8000/chatroominfo/${login_token}/`, {
        method: 'GET',
        headers: header,
        credentials: 'include',

    }).then(event => {
        event.json().then((datas) => {
            let valArr = []
            datas.forEach((value,index,array)=>{
                valArr[valArr.length] = value.id
            })
            var cnt = 0;
            for(let item of valArr){
                if( window.location.href.split('/')[4] == item){
                    cnt += 1;
                }
            }
            if(cnt == 0){
                location.href = "/";
            }

        })
    }).catch((error) => {
        alert(`room number is not exist on the list `)
    })
}


checkIfPassed2DaysORNot();
ifLogined();