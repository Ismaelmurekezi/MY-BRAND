const hamburgerMenu = document.getElementById('hamburgerMenu');
const navLinks = document.getElementById('navLinks');
let likeIcon=document.querySelectorAll('.likeIcon');

hamburgerMenu.addEventListener('click', () => {
    if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
      
    } else {
        navLinks.classList.add('show');

    }

});

//Like icon functionality
 
likeIcon.addEventListener('click',function(){
    alert("hello")
  

})





