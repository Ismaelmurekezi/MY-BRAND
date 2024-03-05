const hamburgerMenu = document.getElementById('hamburgerMenu');
const navLinks = document.getElementById('navLinks');

hamburgerMenu.addEventListener('click', () => {
    if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
      
    } else {
        navLinks.classList.add('show');

    }

});

