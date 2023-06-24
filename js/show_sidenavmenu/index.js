
const nav = document.getElementById('nav');
const wrapper = document.getElementById('wrapper');
const Hamburger = document.getElementById('open_nav');

const clickHamburger = () => {
    if (nav.classList.contains('show')){
        nav.classList.remove('show');
        wrapper.classList.remove('show');

    } else {
        nav.classList.add('show');
        wrapper.classList.add('show');
    }
}

Hamburger.addEventListener("click", () => {
    clickHamburger();
})



