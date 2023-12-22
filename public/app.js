
let loginContainer = $('<container>').addClass('login');

function createLoginPage(){
    
    let image = $('<img>').attr('src', 'pictures/front-image.jpg').attr('height', '500px').attr('width', '400px');
    let loginDiv = $('<div>').addClass('login');
    let heading1 = $('<h1>').html('<strong>Find the one.</strong>');
    let heading6 = $('<h6>').text('Truly be yourself here at Rizzler.');
    let form = $('<form>').addClass('login');
    let labelUsername = $('<label>').text('Username:');
    let inputUsername = $('<input>').attr('name', 'username');
    let labelPassword = $('<label>').text('Password:');
    let inputPassword = $('<input>').attr('name', 'password').attr('type', 'password');
    let btnDiv = $('<div>').addClass('btns');
    let loginBtn = $('<button>').addClass('btn btn-light').attr('type', 'button').text('Login');
    let registerBtn = $('<button>').addClass('btn btn-light').attr('type', 'button').text('Register');
    let message = $('<p>').text(' ').addClass('error');
    let slogan = $('<p>').addClass('slogan').text("Get your rizz on with some class.");
    let copyright = $('<p>').addClass('copy').html('© Rizzler 2024');
    
    form.append(labelUsername, inputUsername, labelPassword, inputPassword, btnDiv.append(loginBtn, registerBtn));
    loginDiv.append(heading1, heading6, form, message,slogan, copyright);
    loginContainer.append(image, loginDiv);

    $('body').append(loginContainer);

    loginBtn.on('click', function(){

        const requestBody = {
            username:inputUsername.val(),
            password:inputPassword.val()
        }

        axios.post('/login', requestBody)
            .then(response => {
                    $("body").empty();
                    $("body").removeClass("login")

                })
            .catch(error => {
                message.text('Incorrect Username/Password')
                slogan.css("margin-top", "3.6em");
                
             });
    })

    
    registerBtn.on('click', function(){
        loginContainer.empty();
        createRegisterPage();
    })
}

function createRegisterPage(){
    let loginDiv = $('<div>').addClass('register');
    let heading1 = $('<h1>').html('<strong>Lets get started!</strong>');
    let heading6 = $('<h6>').text('Lets create an account.');
    let form = $('<form>').addClass('register').attr("method", "post").attr("action", '/register');
    let nameDiv = $('<div>').addClass('names');
    let inputDiv = $('<div>').addClass('inputs');
    let labelFirstname = $('<label>').text('First Name:');
    let inputFirstname = $('<input>').attr('name', 'f_name');
    let labelLastname = $('<label>').text('Last Name:').addClass("lastName");
    let inputLastname = $('<input>').attr('name', 'l_name');
    let labelUsername = $('<label>').text('Username:');
    let inputUsername = $('<input>').attr('name', 'username');
    let labelEmail = $('<label>').text('Email:');
    let inputEmail = $('<input>').attr('name', 'email');
    let labelPassword = $('<label>').text('Password:');
    let inputPassword = $('<input>').attr('name', 'password').attr('type', 'password');
    let registerBtn = $('<button>').addClass('btn btn-light register').text('Register');
    
    nameDiv.append(labelFirstname, labelLastname);
    inputDiv.append(inputFirstname, inputLastname);
    form.append(nameDiv, inputDiv, labelUsername,inputUsername, labelEmail, inputEmail, labelPassword, inputPassword, registerBtn);
    loginDiv.append(heading1, heading6, form);
    loginContainer.append(loginDiv);

}



$(document).ready(function() {
    createLoginPage();
})