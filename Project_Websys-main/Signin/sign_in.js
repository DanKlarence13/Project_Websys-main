const emailForm = document.getElementById('emailForm');
const passwordForm = document.getElementById('passwordForm');

/*
    This js was created in order to avoid absolute positionings as this can cause inconsistencies in the layout on different screen sizes.
*/
emailForm.onfocus = function() {
    this.parentNode.style.background = 'white'; 
}

emailForm.onblur = function() {
    this.parentNode.style.background = 'rgba(255, 255, 255, .3)'; 
}

passwordForm.onfocus = function() {
    this.parentNode.style.background = 'white'; 
}

passwordForm.onblur = function() {
    this.parentNode.style.background = 'rgba(255, 255, 255, .3)'; 
}

const credentials = {
    email: 'a',
    password: 'a'
}

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault(); // prevent reload
    const email = emailForm.value;
    const password = passwordForm.value;



    if (email === credentials.email && password === credentials.password) {
        window.location.replace('../Dashboard/index.html');
    } else {
        alert('Invalid credentials');
    }}
)

