const ID = document.getElementById("id");
const email = document.getElementById("email");
const getReissuedPassword = document.getElementById("btn-getreissuedpassword");
getReissuedPassword.addEventListener('click', () => {
    var header = new Headers();
    header.append('Content-Type', 'application/json');

    fetch('http://ec2-54-180-100-94.ap-northeast-2.compute.amazonaws.com:8000/findyouraccount/', {
        method: 'POST',
        headers: header,
        credentials: 'include',
        body: JSON.stringify({
            "username": ID.value,
            "email": email.value,
        })

    }).then(event => {
        event.json().then((data) => {
            alert(data.message);
            location.href = "/";
        })
    }).catch((error) => {
        alert(error)
    })
});