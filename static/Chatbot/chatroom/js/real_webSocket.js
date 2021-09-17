const chatSocket = new WebSocket(
    'ws://'
    + "ec2-3-35-207-163.ap-northeast-2.compute.amazonaws.com:8000"
    +'/ws/chat/'
    + localStorage.getItem('login_token') +"A"+window.location.href.split('/')[5]
    +'/'
);

chatSocket.onmessage = function(e){
    const data = JSON.parse(e.data);
    console.log(data);
    if(data.nickname === localStorage.getItem('nickname')){
        appendMessage(PERSON_NAME, PERSON_IMG, "right",data.message, formatDate(new Date()));
    }else{
        appendMessage(PERSON_NAME, PERSON_IMG, "left",data.message, formatDate(new Date()));
    }
};

chatSocket.onclose = function(e){
    console.error('Chat socket closed unexpectedly');
};



