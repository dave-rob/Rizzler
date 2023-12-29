
let loginContainer = $('<container>').addClass('login');
let overallId = 0;
const pickupLines = ["Math is so confusing. It's always talking about x and y and never you and I.",
"Are you a vape? Because I'd never use you.",
"Are you the school stairs? Because you take my breath away.",
"Are you iron? Because I don't get enough of you?",
"Are you John Cena? Because I've never Cena girl like you before.",
"Are you chicken fingers and fries? Because I don't care how many options I have, I will always choose you.",
"Are you Japan? Because I just Tok-yo heart.",
"Are you my future? Because my parents told me to focus on you.",
"I want you ... to look at the first three words.",
"I don’t play cards but I feel like I’m about to pull a queen.",
"I can be wonder woman, cat woman, or your woman.",
"I can be Batman, Iron Man, Spiderman, or your man.",
"All the rizz lines are taken ... but are you taken?",
"No pen, no paper. But you still draw my attention.",
"I don’t have a pickup line but I’ll pick you up at nine.",
"Are you anxiety? Because my heart races every time I see you.",
"I guess I’m a photographer because I can picture us together.",
"I’m a pen, you're a highlighter. I write the future, you make it brighter.",
"Are you a library book? Because I'm checking you out.",
"I couldn't fall asleep, so I fell for you instead.",
"Are you a piano? Because I won’t ever play you.",
"Ouch! Did you just come out of an oven? Because you are so hot.",
"I'm so mad at Spotify. I searched for the the hottest single and you weren't there.",
"Are you a high test score? Because I want to take you home and show you to my mom.",
"Are you a test? Because my mom said don't cheat on important things.",
"My phone is 4G, but my heart is 4U.",
"Hey, is your mom an artist? Because she made a masterpiece?",
"Are you Captain Hook? Because I'm trying to play hooky with you.",
"If you were poison, you would be the death of me.",
"Matching outfits are cool, but matching last names is cooler.",
"Are you a camera? Because when I look at you I smile.",
"The alphabet starts with ABC. The numbers start with 123, but the universe starts with U N I.",
"Are you Amazon? Because in three hours you'll be at my door.",
"I'm not Abraham, but when are we Lincoln?",
"Albert Einstein said that 'there is nothing faster than lightning.' But he hasn’t seen how fast I fell for you.",
"Do you play soccer? Because you're definitely a keeper?",
"Are you my bed? Because I never want to leave you.",
"Do you like soccer? My favorite player is Ronaldo, but we can still get Messi.",
"Are you French? Because Eiffel for you?"]

function randomPickupLine(){
    let randomNumber = Math.floor(Math.random()*pickupLines.length)
    return pickupLines[randomNumber];
}

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
                    const {id} = response.data;
                    overallId = id;
                    $("body").empty();
                    $("body").removeClass("login").addClass("homepage")
                    loginContainer.empty();
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
    let form = $('<form>').addClass('register').attr("method", "post").attr({"action": '/register', "enctype": "multipart/form-data"});
    let uploaddiv = $('<div>').addClass("upload");
    let fileInput = $('<input>').attr({
        'type': 'file',
        'accept': 'image/*',
        'name': 'image',
        'id': 'file',
    });
    let label = $('<label>').attr({
        'for': 'file',
        'style': 'cursor: pointer;'
    }).text('Upload Image');
    let image = $('<img>').attr('id', 'picture');
    fileInput.on('change', function(event) {
        let reader = new FileReader();
        reader.onload = function() {
            image.attr('src',reader.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    });
    uploaddiv.append(fileInput, image, label);

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
    form.append(uploaddiv, nameDiv, inputDiv, labelUsername,inputUsername, labelEmail, inputEmail, labelPassword, inputPassword, genderDiv, registerBtn);
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
    let editButton = $('<img>').addClass('edit').attr('src', 'pictures/editing.png')
                    const { f_name, l_name, bio, interest, personality, pic} = response.data[0];
                    //console.log(response);
                    let image = $('<img>').attr('src', pic).addClass("infoPic");
                    let name = $('<h3>').text(f_name + ' ' + l_name).css("margin-bottom", "0");
                    let characteristics = $('<em>').text(personality);
                    let pbio= $('<p>').text(bio).css("margin-top","1em");
                    let interestedIn = $('<p>').text(`Interested in: ${interest}`).css("margin-bottom", "0");
                    
                    info.append(editButton, image, name, characteristics, pbio, interestedIn);

                    editButton.on('click', function(){
                        info.empty();
                        let saveButton = $('<img>').addClass('edit').attr('src', 'pictures/diskette.png')
                        let image = $('<img>').attr('src', pic).addClass("infoPic");
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
                        let deletebutton = $('<button>').text('Delete Account').addClass('btn delete');
                        info.append(saveButton,image, name2, form.append(traitsLabel,characteristics2,bioLabel, newBio,interestsLabel, newInterest), deletebutton)

                        deletebutton.on('click', function(){
                            axios.delete(`/user/${overallId}`)
                                .then(response => {
                                    console.log(response)
                                    $('body').empty();
                                    $('body').removeClass().addClass('login')
                                    createLoginPage();
                                })
                        })

                        saveButton.on('click', function(){
                            axios.patch(`/user/${overallId}`,{
                                "personality": characteristics2.val(),
                                bio: newBio.val(),
                                interest: newInterest.val()
                            })
                                .then(response => {
                                    //console.log("response")
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
    let div1 = $('<div>').addClass('left');
    let info = $('<div>').addClass('info');
    let pickUpLineGenerator = $('<div>').addClass('generator');
    let title = $('<h4>').text("Need help with your rizz?");
    let button = $('<button>').text("Generate a pickup line").addClass('btn delete');
    let line = $('<p>').text(' ').addClass('line');
    button.on('click', function(){
        line.text(randomPickupLine())
    })
    div1.append(info, pickUpLineGenerator.append(title, button, line));
    await axios.get(`/user/${overallId}`)
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
    // div.addClass('puffIn')
    let profile = $('<div>').addClass('profile');
    // setTimeout(function(){
    //     div.removeClass('magictime puffIn')
    // }, 2000);
    if (count < 0){
        let noMatch = $('<img>').attr("src", "pictures/rizz-meter.jpg").addClass("rizzler-pic")
        let sorry = $('<h2>').text("Sorry, your rizz has ran out").addClass("matchless")
        div.append(profile.append(noMatch, sorry))
    } else {
        const { id, bio, f_name, l_name, personality, pic } = response.data[count]
    
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
        //div.removeClass('puffIn')
        div.addClass('openDownRightOut');
        
        count--;
        setTimeout(function(){
            div.removeClass('openDownRightOut') 
            div.empty();
            createProfile(response, div,count)
        }, 1000);
        axios.patch(`/swipe-right/${overallId}`, {
            profile_id : id,
        })
        .then(res => {
            //console.log(res)
            
        });
        
        
        
        
    })
    
    left.on('click', function(){
        div.addClass('openDownLeftOut');
        count--;
        setTimeout(function(){
            div.removeClass('openDownLeftOut') 
            div.empty();
            createProfile(response, div,count)
        }, 1000);
        
        axios.patch(`/swipe-left/${overallId}`, {
            profile_id : id,
        })
        
    })

    }
    
}

async function createCenterColumn(){
    let div2 = $('<div>').addClass('center magictime');
    
    await axios.get(`/profile/${overallId}`)
        .then(response => {
            //console.log(response)
            let count =response.data.length - 1;
            createProfile(response, div2, count)
            })
        
    return div2;
}

function createRightColumn(){
    let div3 = $('<div>').addClass('right');
    let h3 = $('<h3>').text("Matches").addClass("messages-header");
    div3.append(h3)
    axios.get(`/matches/${overallId}`)
        .then(response => {
            //console.log(response);
            let data = response.data
            for(let i = 0; i < data.length; i++){
                let div= $('<div>').addClass("match").attr("id", `match${i}`)
                let img = $('<img>').attr('src', data[i].pic).addClass("message-pic");
                let name = $('<h6>').text(data[i].f_name + " " + data[i].l_name);
                let textDiv = $('<div>').addClass("messagebox")
                let input = $('<textarea>').attr({"name":"messages", "rows":"1"}).addClass("message");
                let send = $('<button>').text('send').addClass("message")
                textDiv.append(input,send)
                let messagesDiv = $('<div>').addClass('messages-div').attr('id', `messages${i}`);
                let dropDown = $('<div>').hide();
                div3.append(div.append(img, name), dropDown.append(messagesDiv, textDiv))
                let match_id=data[i].match_id;
                axios.get(`/messages/${match_id}`)
                        .then(response => {
                            for(let i = 0; i < response.data.length; i++){
                                if(response.data[i].user_id == overallId){
                                    let text = $('<p>').text(response.data[i].message).addClass("right-message");
                                    messagesDiv.append(text);
                                } else {
                                    let text = $('<p>').text(response.data[i].message).addClass("left-message");
                                    messagesDiv.append(text);
                                }
                                
                                
                            };   
                        })
                div.on('click', function(){
                    
                    dropDown.toggle();
                    
                    if (dropDown.is(':visible')) {
                        messagesDiv.scrollTop(messagesDiv.prop('scrollHeight'));
                    }
                })
                send.on('click', function(){
                    let text = $('<p>').text(input.val()).addClass("right-message");
                    messagesDiv.append(text)
                    axios.post(`messages/${match_id}`,{
                        user_id: overallId,
                         text: input.val()
                    })
                        //.then(response => console.log(response));
                    input.val('')
                    
                })
            }

        })
    
    
    
    return div3;
}

async function createHomePage(){
    $('body').empty();
    createHeader();
    let container = $('<container>').addClass('home')
    let div1 = await createLeftColumn(container);
    let div2 = await createCenterColumn();
    let div3 = createRightColumn();
    container.append(div1, div2,div3)
    $('body').append(container)
}

$(document).ready(function() {
    createLoginPage();
})