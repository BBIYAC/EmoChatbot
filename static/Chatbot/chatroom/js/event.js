function ifLogined() {
    let loginPromise = new Promise((resolve, reject) => {
        if (localStorage.getItem('login_token') != null) {
            resolve(localStorage.getItem('login_token'))
        } else {
            console.log("하이")
            reject("failed")
        }
    }).then((login_token) => {
        getChatRoomList(login_token).then(() => {
            getConversationSentences(login_token);
        })
    }).catch((error) => {
        console.log(error);
        alert("로그인 하세요");
        location.href = "/";
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
async function getConversationSentences(login_token) {
    var header = new Headers();
    header.append('Content-Type', 'application/json');
    // http://ec2-54-180-100-94.ap-northeast-2.compute.amazonaws.com:8000/chatroominfo/f36192fbf818b87a77ccc64641dca8564db2c568/1/conversation-sentences
    return await fetch(`http://ec2-54-180-100-94.ap-northeast-2.compute.amazonaws.com:8000/chatroominfo/${login_token}/${window.location.href.split('/')[4]}/conversation-sentences/`, {
        method: 'GET',
        headers: header,
        credentials: 'include',

    }).then(event => {
        event.json().then((data) => {
            if (data.message !== "no data") {
                console.log(data); //데이터가 있다면 지금까지의 대화들을 화면에 뿌려준다.
                showPreviouschatRecords(data);
            }
            else {
                console.log(data); //데이터가 없으면 아무것도 하지 않는다.
            }

            appendImageButton('오늘의 기분을 표현하는 사진을 보내주세요!', '이미지 업로드');
        })
    }).catch((error) => {
        alert(`room number is not exist on the list`);
    })
}


function showPreviouschatRecords(chatData) {
    chatData.forEach((value, index, array) => {
        if (value.UserInformation_id == 12) {
            if (value.text.includes("http")) {
                texts = value.text.split('<br>');
                appendLinkButton(texts);
                console.log("하이");
                return;
            }
            appendMessage("EmoChatBot", "https://image.flaticon.com/icons/svg/327/327779.svg", "left", value.text, showRecordedTime(value.created_date));
        } else {
            if (value.text == "eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('이미지',2,0,''.split('|'),0,{}))") {
                appendImage('/',`${value.id}`)
                getImage(value)
                return
            }
            appendMessage(localStorage.getItem('nickname'), "https://image.flaticon.com/icons/svg/145/145867.svg", "right", value.text, showRecordedTime(value.created_date));

        }
    })

}


async function getImage(value) {
    return await fetch(`http://ec2-54-180-100-94.ap-northeast-2.compute.amazonaws.com:8000/chatroominfo/${localStorage.getItem('login_token')}/${window.location.href.split('/')[4]}/conversation-sentences/image/`, {
        method: 'GET',
        credentials: 'include',

    }).then(event => {
        event.json().then((data) => {
            let obj =Object(data);
            var img = document.getElementById(`${value.id}`);
            img.src = 'http://ec2-54-180-100-94.ap-northeast-2.compute.amazonaws.com:8000'+obj[value.id][0].image;
        })
    }).catch((error) => {
        console.error(error)
    })
}

//2021-08-25T14:38:11.280429+09:00
function showRecordedTime(created_date) {
    const Y = created_date.slice(0, 4);
    const M = created_date.slice(5, 7);
    const D = created_date.slice(8, 10);
    const h = created_date.slice(11, 13)
    const m = created_date.slice(14, 16)
    return `${M}/${D}/${h}:${m}`;
}


async function getChatRoomList(login_token) {
    var header = new Headers();
    header.append('Content-Type', 'application/json');
    return await fetch(`http://ec2-54-180-100-94.ap-northeast-2.compute.amazonaws.com:8000/chatroominfo/${login_token}/`, {
        method: 'GET',
        headers: header,
        credentials: 'include',

    }).then(event => {
        event.json().then((datas) => {
            let valArr = []
            datas.forEach((value, index, array) => {
                valArr[valArr.length] = value.id
            })
            var cnt = 0;
            for (let item of valArr) {
                if (window.location.href.split('/')[4] == item) {
                    cnt += 1;
                }
            }
            if (cnt == 0) {
                location.href = "/";
            }

        })
    }).catch((error) => {
        alert(`room number is not exist on the list `)
    })
}


checkIfPassed2DaysORNot();
ifLogined();