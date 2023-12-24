// ملف منه
var users, posts;
var currentUserData;
var postData ={};
var numberOfPost;

window.onload = function(){
  readData();
 currentUserData = getLocalStorageInfo(["IDuser","NameUser","userImg"]);
  console.log(currentUserData);
  setUserProfileData();
};
//json function

function readData(){
  fetchData("./users.json", function (userData) {
      users = userData;

  });

  fetchData("./posts.json", function (postData) {
      posts = postData;
      numberOfPost = posts[posts.length - 1].id;
      console.log(posts)
  });
}

function fetchData(path, callaback){
  var data;
  var xhr=new XMLHttpRequest();
  xhr.open("GET",path);

  xhr.onreadystatechange=function(){

      if(xhr.readyState==4&&xhr.status==200){

          data=xhr.response;
          data=JSON.parse(data);
          callaback(data);
      }
  
  }
  xhr.send();
}

function writeData(data) {
  fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  })
  .then((response) => response.json())
  .then((json) => console.log(json)
  );
}

function setUserProfileData(){
  document.getElementById("username").innerHTML = currentUserData.NameUser;
  document.getElementById("postImgH").src = currentUserData.userImg; 
}

//local storage  functions
function getLocalStorageInfo(info){

  var data= {}
  for(var i = 0; i < info.length; i++){
      key = info[i]
      var value= localStorage.getItem(info[i]);

      if (value !== null){
          data[info[i]] = value;
      }
  }

  
  
  return data
}

//add post functions
function updateData(){
  // writeData("./users.json", users);
  // writeData("./posts.json", posts);

}

function displaySubmitButton(element){
    postButton = document.getElementsByClassName("postButton")[0];
    if (element.value.trim() !== '') {
        postButton.style.display = 'inline-block';
      } else {
        postButton.style.display = 'none';
      }
}


function addPost(){
    generatePostData();
    console.log(postData);

    var post = createPostContainer();
    var container = document.getElementsByClassName("main-content")[0];
    container.insertBefore(post, container.children[2]);

    posts.push(postData);
    console.log(posts);
    numberOfPost++;

    writeData(posts);

    resetPostForm();
}

function resetPostForm(){
  postData = {}
  document.getElementsByTagName("textarea")[0].value = "";
  document.getElementsByClassName("postButton")[0].style.display = 'none';
}

function generatePostData(){
  postData["userId"] = parseInt(currentUserData.IDuser);
  postData["id"] = String(numberOfPost+1);
  postData["title"] = "";
  postData["body"] = document.getElementsByTagName("textarea")[0].value.trim();

  if(!postData.hasOwnProperty("imgSource")){
    postData["imgSource"] = "";
  } 
}

function createPostContainer() {
  var body=document.getElementById("body1");
  var postContainer = document.createElement("div");
  postContainer.className = "post-container";
  if (body.className === "body-dark") {
  postContainer.className = "post-container-dark";  
  }

  var postRow = document.createElement("div");
  postRow.className = "post-row";

  var userProfile = document.createElement("div");
  userProfile.className = "user-profile";

  var profileImg = createImage(currentUserData.userImg, "Profile Picture", "");

  var profileDetails = document.createElement("div");

  var userName = document.createElement("p");
  userName.textContent = currentUserData.NameUser;

  var time = document.createElement("span");
  time.textContent = formatDate(new Date());

  profileDetails.appendChild(userName);
  profileDetails.appendChild(document.createElement("br"));
  profileDetails.appendChild(time);

  userProfile.appendChild(profileImg);
  userProfile.appendChild(profileDetails);

  var linkContainer = document.createElement("a");
  linkContainer.href = "#";

  postRow.appendChild(userProfile);
  postRow.appendChild(linkContainer);

  var postText = document.createElement("p");
  postText.className = "post-text";

  var welcomeText = document.createTextNode("Welcome to ");
  var saraSpan = document.createElement("span");
  saraSpan.textContent = "SARA";
  var websiteText = document.createTextNode(" website ");
  var saraSiteLink = document.createElement("a");
  saraSiteLink.href = "#";
  saraSiteLink.textContent = "SARA SITE";

  var postParagraph = document.createElement("p");
  postParagraph.className= "post-content";
  postParagraph.textContent = postData.body;

  postText.appendChild(welcomeText);
  postText.appendChild(saraSpan);
  postText.appendChild(websiteText);
  postText.appendChild(saraSiteLink);
  postText.appendChild(postParagraph);

  var activityIcons = document.createElement("div");
  activityIcons.className = "activity-icons";

  var likeIcon = document.createElement("div");
  likeIcon.innerHTML = "<img src='images/like-blue.png'>" + 0;

  var commentsIcon = document.createElement("div");
  commentsIcon.innerHTML = "<img src='images/comments.png'>" + 0;

  var shareIcon = document.createElement("div");
  shareIcon.innerHTML = "<img src='images/share.png'>" + 0;

  activityIcons.appendChild(likeIcon);
  activityIcons.appendChild(commentsIcon);
  activityIcons.appendChild(shareIcon);

  var postProfileIcon = document.createElement("div");
  postProfileIcon.className = "post-profile-icon";

  var profileIconImg = createImage("images/profile-pic.png", "", "");

  postProfileIcon.appendChild(profileIconImg);

  var postRow2 = document.createElement("div");
  postRow2.className = "post-row";

  postRow2.appendChild(activityIcons);
  postRow2.appendChild(postProfileIcon);

  postContainer.appendChild(postRow);
  postContainer.appendChild(postText);

  var postImage;
  if (postData.imagSource != ""){
    postImage = createImage(postData.imgSource, "", "Post-img");
    postContainer.appendChild(postImage);
  }
  
  postContainer.appendChild(postRow2);

  
  return postContainer;
}

function formatDate(date) {
  const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

function createImage(src, alt, className) {
  var image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.className = className;
  return image;
}
function addImagetoPost(fileInput) {
    if (fileInput.files.length > 0) {
        var selectedFile = fileInput.files[0];
        var selectedPhotoPath = URL.createObjectURL(selectedFile);  
        postData["imgSource"] = selectedPhotoPath;
    } else {
        console.log("No file selected");
    }
}



// ملف مروان


//////////////////////////////////////////////////////////////////////////
var searchitem = document.getElementById("search");
var po = document.getElementById("demo");
var main = document.getElementById("main");

async function search() {
  try {
    // const response = await fetch("./users.json");
    // const data = await response.json();
    const data = await users;
    console.log(data);
    for (const key in data) {
      console.log("data[key]: "+data[key].name);
      console.log("value of search: " + searchitem.value);
      if (data[key].name === searchitem.value) {
        const posts = await getpost(data[key].id);
        return posts;
      }
    }

  } catch (error) {
    alert("not found")
  }
}

async function getpost(userid) {
  try {
    // const response = await fetch("./posts.json");
    // const data = await response.json();
    const data = await posts;
    console.log(data);
    let post = "";

    for (const key in data) {
      if (data[key].userId === userid) {
        post +=
          "<div class='post-container'><p class='post-text'>like and share <span>SARA</span>website <a href='#'>to your friends</a><P>" +
          data[key].title +
          "</P></p><br>" +
          data[key].body +
          "<div class='post-row'><div class='activity-icons'><div><img src='images/like.png'>120</div><div><img src='images/comments.png'>45</div><div><img src='images/share.png'>20</div></div><div class='post-profile-icon'><img src='images/profile-pic.png'></div></div></div></div>";
      }
    }

    return post;
  } catch (error) {
    throw error;
  }
}

async function showOffcanvas() {
  try {
    const result = await search();
    console.log(result);

    var offcanvas = document.getElementById("myOffcanvas");
    var overlay = document.getElementById("overlay");
    var searchResults = document.getElementById("searchResults");

    // Perform your search logic here and update searchResults content
    // For demo purposes, let's just show the entered query
    searchResults.innerHTML = result;
      console.log(searchitem.value);
    if (searchitem.value.trim() !== "") {
      console.log("in");
      offcanvas.style.display = "block";
      overlay.style.display = "block";
    } else {
      offcanvas.style.display = "none";
      overlay.style.display = "none";
    }
  } catch (error) {
    console.error(error);
    // Handle error, for example, display an error message to the user
    alert("Error: " + error.message);
  }
}





















////////////////////////////////////////////////////////////////////////////////////////
//ziad
var dark=true;
document.addEventListener('DOMContentLoaded', function () {
  const darkModeToggle = document.getElementById('darkModeToggle');
  

  // التحقق مما إذا كان وضع الظلام قد تم تمكينه بالفعل في التخزين المحلي
  const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

  // تبديل وضع الظلام عند النقر على الزر
  darkModeToggle.addEventListener('click', () => {
    if (isDarkMode) {
      enableDarkMode();
      localStorage.setItem('darkMode', null);
    } else {
      enableDarkMode();
     
    }
  });

  // وظيفة لتمكين وضع الظلام
  function enableDarkMode() {
    var nav=document.getElementById("nav");
    var condark = document.getElementById("container-dark");
    var main = document.getElementById("main");
    var postinput = document.getElementById("post-input-container");
   var addpostlinks = document.getElementById("addpostlinks");
    var body = document.getElementById("body1");
    var write_post_container = document.getElementById("write-post-container");
    var write_post= document.getElementById("write-post");
    var posts = document.getElementsByClassName("post-container");
    var right_sidebar=document.getElementById("right-sidebar");
    nav.classList.toggle("dark-mode");
    condark.classList.toggle("container-dark");
    main.classList.toggle("main-content-dark");
    postinput.classList.toggle("post-input-container-dark");
    addpostlinks.classList.toggle("add-post-links-dark");
    body.classList.toggle("body-dark")
    write_post_container.classList.toggle("write-post-container-dark")
    write_post.classList.toggle("write-post-dark");
    console.log(posts);
    for (let index = 0; index < posts.length; index++) {
      posts[index].classList.toggle("post-container-dark");
      
    }
    var newposts = document.getElementsByClassName("post-container-dark");
    if ((body.className == "body-dark")) {
      for (let index = 0; index < newposts.length; index++) {
        newposts[index].classList.add("post-container");
      }
    }
    
    right_sidebar.classList.toggle("right-side-dark");
    localStorage.setItem('darkMode', 'enabled');
  }


});

