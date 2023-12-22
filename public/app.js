
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
                    $("body").removeClass("login").addClass("homepage")
                    createHomePage();

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
    let genderDiv = $('<div>').addClass('gender');
    var maleRadio = $('<div>').addClass('form-check');
    var maleInput = $('<input>').addClass('form-check-input').attr({
        'type': 'radio',
        'name': 'gender',
        'value': 'male'

    });
    var maleLabel = $('<label>').addClass('form-check-label').attr('for', 'male').text('Male');
    var femaleRadio = $('<div>').addClass('form-check');
    var femaleInput = $('<input>').addClass('form-check-input').attr({
        'type': 'radio',
        'name': 'gender',
        'value': 'female'
    });
    var femaleLabel = $('<label>').addClass('form-check-label').attr('for', 'female').text('Female');
    let registerBtn = $('<button>').addClass('btn btn-light register').text('Register');
    genderDiv.append(maleRadio.append(maleInput, maleLabel),femaleRadio.append(femaleInput, femaleLabel));
    nameDiv.append(labelFirstname, labelLastname);
    inputDiv.append(inputFirstname, inputLastname);
    form.append(nameDiv, inputDiv, labelUsername,inputUsername, labelEmail, inputEmail, labelPassword, inputPassword, genderDiv, registerBtn);
    loginDiv.append(heading1, heading6, form);
    loginContainer.append(loginDiv);

}

function createHeader(){
    let nav = $('<nav>').addClass('navbar header');
    let navdiv = $('<div>').addClass('container-fluid');
    let brandLink = $('<a>').addClass('navbar-brand header').text('Rizzler').attr('href', '/').css('margin-left', '20px');
    

    navdiv.append(brandLink);
    nav.append(navdiv);
    
    $('body').prepend(nav);
}

function editBio(info, response){
    let editButton = $('<button>').addClass('edit').text('edit')
                    const {f_name, l_name, bio, interest, personality, pic} = response.data[0];
                    console.log(response);
                    let image = $('<img>').attr('src', pic).attr('height', '100px').attr('width', '100px');
                    let name = $('<h3>').text(f_name + ' ' + l_name);
                    let characteristics = $('<em>').text(personality);
                    let pbio= $('<p>').text(bio);
                    let interestedIn = $('<p>').text(`Interested in: ${interest}`);
                    info.append(editButton, image, name, characteristics, pbio, interestedIn);

                    editButton.on('click', function(){
                        info.empty();
                        let saveButton = $('<button>').addClass('edit').text('Save')
                        let image = $('<img>').attr('src', pic).attr('height', '100px').attr('width', '100px');
                        let name2 = $('<h3>').text(f_name + ' ' + l_name);
                        let form = $('<form>').addClass("info-form");
                        let traitsLabel = $('<label>').text("Personality Traits:");
                        let characteristics2 = $('<input>').attr("name", "personality").attr("value", personality);
                        let bioLabel = $('<label>').text("Bio:");
                        let newBio = $('<textarea>').attr({"name":"bio", "rows":"3"}).text(bio);
                        let interestsLabel = $('<label>').text("Interested in:");
                        let newInterest = $('<select>').attr("name", "gender");
                        let option1 = $('<option>').attr("value", "Men").text("Men");
                        let option2 = $('<option>').attr("value", "Women").text("Women");
                        if(interest==='Men'){
                                option1.prop("selected", "selected");
                        } else{
                            option2.prop("selected","selected");
                        }
                        newInterest.append(option1,option2);
                        info.append(saveButton,image, name2, form.append(traitsLabel,characteristics2,bioLabel, newBio,interestsLabel, newInterest))

                        saveButton.on('click', function(){
                            axios.patch("/user",{
                                "personality": characteristics2.val(),
                                bio: newBio.val(),
                                interest: newInterest.val()
                            })
                                .then(response => {
                                    console.log("response")
                                    info.empty();
                                    editBio(info, response);
                                    createHomePage();
                                    })
                            // info.empty()
                            // editBio(info, response);
                        })
                    })
}

async function createLeftColumn(container){
    let div1 = $('<div>').css('background-color','yellow').addClass('left');
    let info = $('<div>').css('border', '1px solid red')
    div1.append(info);
    await axios.get('/user')
            .then((response) => {
                    editBio(info, response)
                    
                })
            .catch(error => {
                message.text('Incorrect Username/Password')
                slogan.css("margin-top", "3.6em");
                
             });
    return div1
}

function createProfile(response, div, count){
    let profile = $('<div>').addClass('profile');
    if (count < 0){
        let noMatch = $('<img>').attr("src", "pictures/rizz-meter.jpg").addClass("rizzler-pic")
        let sorry = $('<h2>').text("Sorry, your rizz has ran out").addClass("matchless")
        div.append(profile.append(noMatch, sorry))
    } else {
        const { bio, f_name, l_name, personality, pic } = response.data[count]
    
        let left= $('<img>').attr("src", "pictures/left.png").addClass("left-swipe")
    let picture = $('<img>').attr("src", pic).addClass("rizzler-pic");
    let right = $('<img>').attr("src", "pictures/right.png").addClass("right-swipe")
    let infoDiv = $('<div>').addClass("profile-info");

    let h2 = $('<h2>').text(f_name + " " + l_name);
    let hr = $('<hr>')
    let persona = $('<em>').text(personality)
    let bioP =$('<p>').text(bio)
    infoDiv.append(hr, persona, bioP);
    profile.append(left,picture, right, h2, infoDiv);
    div.append(profile);
    right.on('click', function(){
        div.empty();
        count--;
        createProfile(response, div,count);
    })
    left.on('click', function(){
        div.empty();
        count--;
        createProfile(response, div,count);
    })

    }
    
}

async function createCenterColumn(){
    let div2 = $('<div>').addClass('center');
    
    await axios.get('/profile')
        .then(response => {
            console.log(response)
            let count =response.data.length - 1;
            createProfile(response, div2, count)
            })
        
    return div2;
}

async function createHomePage(){
    $('body').empty();
    createHeader();
    let container = $('<container>').addClass('home')
    let div1 = await createLeftColumn(container);
    let div2 = await createCenterColumn();
    let div3 = $('<div>').css('background-color','blue').text("div").addClass('right');
    container.append(div1, div2, div3)
    $('body').append(container)
}

$(document).ready(function() {
    //createLoginPage();
    $("body").removeClass("login").addClass("homepage")
    createHomePage()
})