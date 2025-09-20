loginbtn = document.getElementById("openlogin");
signupbtn = document.getElementById('opensignup');

loginbtn.addEventListener('click', () => {
    window.location.href = 'login.html';
});
signupbtn.addEventListener('click', () => {
    window.location.href = 'signup.html';
});


function openlogin() {
    window.location.href = 'login.html';

}