
var isLoggedIn = getIsLoggedIn();

//fetch data from login form in index.html
function fetchData() {
    
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log(username);
    console.log(password);
    if(username == "" || password == "") {
        alert("Please fill in all fields");
    }
    
    var data = {
        "username": username,
        "password": password
    };
    //store user data in local storage
    window.localStorage.setItem("userData", JSON.stringify(data));
    window.localStorage.setItem("isLoggedIn", true);

    isLoggedIn = true;
    window.location.href = "index.html";
    

    return data;
}

function logout() {
    localStorage.setItem("isLoggedIn", false);
    document.getElementById("logoutContainer").style.display = "none";
    localStorage.removeItem("userData");
    window.location.href = "index.html";
}

if(isLoggedIn != null) {
    //display logout container
    document.getElementById("logoutContainer").style.display = isLoggedIn ? "block" : "none";
    //set welcome message
    var userData = getUserData();
    console.log(userData);
    //display name of user
    document.getElementById("welcomeText").innerHTML = "Hi " + userData.username;
    //display login button
    document.getElementById("loginButton").style.display = "none";
}

console.log('isLoggedIn ',isLoggedIn);


$(document).ready(() => {

    modal = document.querySelector("x-modal");
    modal.addEventListener("cancel", function () {
      console.log("cancel event raised");
    });
    modal.addEventListener("ok", function () {
      console.log("ok event raised");
    });

    open = document.querySelector(".open");
    open.addEventListener("click", function () {
      modal.visible = true;
    })

    inactivityTime();
    // quick close for modal
    toggleModal(false);
    $(".modal-background").on("click", () => {
        toggleModal(false);
    });
    $(".close-modal").on("click", () => {
        toggleModal(false);
    });
    $("#yesSelectionButton").on("click", () => {
        console.log("yes");
       let url = "https://help.nickelled.com";
         openInNewTab(url);
    });
    $("#noSelectionButton").on("click", () => {
        console.log("no");
        toggleModal(false);
    });

    document.getElementById("logoutContainer").style.display =  isLoggedIn ? "block" : "none";

    // ease of use for login
  // if user presses enter while in the login boxes, will submit instead of HAVING to press submit.
  $("#username").keypress(function(event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      login();
    }
  });
  $("#password").keypress(function(event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      login();
    }
  });
});

function openInNewTab(url) {
    window.open(url, '_blank').focus();
   }

function toggleModal(active) {
    active ? $("#modal").show() : $("#modal").hide();
  }

function getUserData() {
    var userData = JSON.parse(localStorage.getItem("userData"));
    return userData;
}
function getIsLoggedIn() {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    return isLoggedIn;
}

var inactivityTime = function () {
    var time;
    window.onload = resetTimer;
    // DOM Events

    // window.addEventListener('load', resetTimer, true);
    var events = [ 'scroll', 'mousemove','keypress']; //, 'keypress', 'keydown', 'keyup', 'touchstart', 'touchmove', 'touchend
    events.forEach(function(name) {
    document.addEventListener(name, resetTimer, true);
    });


    function resetTimer() {
        clearTimeout(time);
        // 1000 milliseconds = 1 second
        time = setTimeout( toggleModal(true), 15000)
    }

    
};

export default { isLoggedIn, openInNewTab };


