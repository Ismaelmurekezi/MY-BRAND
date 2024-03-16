//HAMBURGER MENU

const hamburgerMenu = document.getElementById('hamburgerMenu');
const navLinks = document.getElementById('navLinks');
let likeIcon=document.querySelectorAll('.likeIcon');

hamburgerMenu.addEventListener('click',() => {
    if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
      
    } else {
        navLinks.classList.add('show');
    }


    if(emailValue ===""){

        setErrorFor(email,"Email can't be blank")

    }
    else if(!isEmail(emailValue)){
        setErrorFor(email,"Email is not valid")
    }
    else{
        setSuccessFor(email)
    }

});










