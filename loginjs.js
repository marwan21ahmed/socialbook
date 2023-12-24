// Sara Sign UP

function gotosignUp() {
    // Hide the login form
    document.querySelector('.logIn form').classList.add('form--hidden');
    // Show the create account form
    document.getElementById('createAccount').classList.remove('form--hidden');
}
document.getElementById('signUpBtn').addEventListener('click', gotosignUp);


// Nada Log in

var passwordu;
var emailu;
var currentUserData = {};

var imgSource1;
var idUs;
var nameUs;

//get current user data and check if pass and email match
async function checkLogin() {
    emailu = document.getElementById("emailInp").value;
    passwordu = document.getElementById("passInp").value;
    try {
        var response = await fetch("./users.json");
        var data = await response.json();
        for (var i in data) {
            // if (data.hasOwnProperty(x)) {
            if (data[i].email == emailu && data[i].pass == passwordu) {
                currentUserData = data[i];

                imgSource1 = currentUserData.img ;
                idUs = currentUserData.id ;
                nameUs = currentUserData.name ;
                // console.log(imgSource1);

                // return imgSource1;

                return {
                    img : imgSource1,
                    id : idUs,
                    name : nameUs
                  };
                 
            }
            // }
        }

        return false;
    } catch (error) {
        alert("not found")
    }
}

var profileImg = document.getElementById("profileImgNav");
var sroryImg = document.getElementById("SroryImg");
var postImgH = document.getElementById("postImgH");


// set local storage function
function saveImgToLocalStorage(img , id , name) {
    localStorage.setItem('userImg', img);
    localStorage.setItem('IDuser', id);
    localStorage.setItem('NameUser', name);


}

// going to the main page
function navigateToIndexPage() {
    window.location.href = "./index2.html";
}

// change images with the current data user
function setImgSrcOnLoad(savedImg ,savedId,savedName, profileImgId, sroryImgId, postImgHId) {
    document.addEventListener('DOMContentLoaded', function () {
        var profileImg = document.getElementById(profileImgId);
        var sroryImg = document.getElementById(sroryImgId);
        var postImgH = document.getElementById(postImgHId);
        profileImg.src = savedImg;

        sroryImg.style.background = `url("${savedImg}")`;
        sroryImg.style.backgroundSize = `cover`;
        
        postImgH.src = savedImg;
    });
}

var userInfo ={};
// the main function 
async function show() {
    try {
        const result = await checkLogin();


        userInfo = result;
       var img = userInfo.img;
       var idu = userInfo.id;
       var nameu = userInfo.name;

        if ( userInfo !== false) {

        saveImgToLocalStorage(img , idu ,nameu);
        navigateToIndexPage();
        

    } else {
        alert("Email and password do not match any user.");
    }
    

    } catch (error) {
        alert("User not found");
    }
}