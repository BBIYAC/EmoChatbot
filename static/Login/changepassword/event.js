const ID = document.getElementById("id");
const email = document.getElementById("email");
const old_password = document.getElementById("old-ps");
const new_password = document.getElementById("new-ps");
const getReissuedPassword = document.getElementById("btn-changepassword");
getReissuedPassword.addEventListener('click', () => {
    var header = new Headers();
    header.append('Content-Type', 'application/json');

    fetch('http://ec2-54-180-100-94.ap-northeast-2.compute.amazonaws.com:8000/findyouraccount/', {
        method: 'PUT',
        headers: header,
        credentials: 'include',
        body: JSON.stringify({
            "username": ID.value,
            "email": email.value,
            "original_password": old_password.value,
            "password":new_password.value,
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