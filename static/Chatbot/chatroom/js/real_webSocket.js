const chatSocket = new WebSocket(
    'ws://'
    + "ec2-54-180-100-94.ap-northeast-2.compute.amazonaws.com:8000" //"ec2-3-35-207-163.ap-northeast-2.compute.amazonaws.com:8000"
    +'/ws/chat/'
    + localStorage.getItem('login_token') +"A"+window.location.href.split('/')[5] //test : 285bd93d27b4aa4f76495ded9f14e94fa4226f2d localStorage.getItem('login_token')
    +'/'
);

chatSocket.onmessage = function(e){
    const data = JSON.parse(e.data);
    console.log(data);
    if(data.nickname === localStorage.getItem('nickname')){
        appendMessage(PERSON_NAME, PERSON_IMG, "right",data.message, formatDate(new Date()));
        saveUserSentences(data.message,localStorage.getItem('login_token'))
    }else{
        appendMessage(data.nickname, "/static/Chatbot/chatlist/images/consultation.svg", "left",data.message, formatDate(new Date()));
    }
};

chatSocket.onclose = function(e){
    console.error('Chat socket closed unexpectedly');
};



async function saveUserSentences(text,login_token,image=null){
    var myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
    return await fetch(`http://ec2-54-180-100-94.ap-northeast-2.compute.amazonaws.com:8000/chatroominfo/${login_token}/${window.location.href.split('/')[5]}/conversation-sentences/`,{
      method: 'POST',
      headers: myHeader,
      credentials: 'include',
      body:JSON.stringify({
          "text": text,
          "is_read": true               
        })
    })
    .then((event)=>{
      event.json().then((data)=>{
        console.log(data);
        if(image != null){
          saveUserImage(data.id,image)
        }
      })
    }).catch((error)=>{
  
    });
}
