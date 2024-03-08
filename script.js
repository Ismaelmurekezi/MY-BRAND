const hamburgerMenu = document.getElementById('hamburgerMenu');
const navLinks = document.getElementById('navLinks');
let likeIcon=document.getElementById('likeIcon');

hamburgerMenu.addEventListener('click', () => {
    if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
      
    } else {
        navLinks.classList.add('show');

    }

});

likeIcon.addEventListener('click',()=>{
    likeIcon.style.color="#36C0C9";
    // alert("Thanks for your like")
})


