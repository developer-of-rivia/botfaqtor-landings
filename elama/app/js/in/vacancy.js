// menu
let burgerIcon = document.querySelector('.header__toggle-burger');
let closeIcon = document.querySelector('.header__toggle-close');
let menu = document.querySelector('.header__panel');
let scrollObject = document.querySelector('.header__panel');

burgerIcon.addEventListener('click', function(){
    closeIcon.classList.remove('hidden');
    burgerIcon.classList.add('hidden');
    menu.classList.add('header__panel--open');
    scrollLock.disablePageScroll(scrollObject);
})
closeIcon.addEventListener('click', function(){
    closeIcon.classList.add('hidden');
    burgerIcon.classList.remove('hidden');
    menu.classList.remove('header__panel--open');
    scrollLock.enablePageScroll(scrollObject);
})

// fixed header
window.onscroll = function showHeader() {
    var header = document.querySelector('.header');
    if(window.pageYOffset > 100){
        header.classList.add('header_fixed');
    } else{
        header.classList.remove('header_fixed');
    }
}



// dropdown
let dropdowns = document.querySelectorAll('.nav__dropdown');
dropdowns.forEach(dropdown => {
    document.addEventListener('click', (e) => {
        if(!e.composedPath().includes(dropdown)){
            dropdown.classList.remove('nav__dropdown--open');
        }
    });

    dropdown.addEventListener('click', function(){
        dropdown.classList.toggle('nav__dropdown--open');
    });
});



// graphmodal
document.addEventListener('DOMContentLoaded', () => {
    let $modalScroll = document.querySelector('.graph-modal');
    const modal = new GraphModal({
        isOpen: (modal) => {
            scrollLock.disablePageScroll($modalScroll);
        },
        isClose: () => {
            scrollLock.enablePageScroll($modalScroll);
        }
    });
});

$('.vacancy__button').on('click', function(){
    $('.tyformail-modal').removeClass('graph-modal-open fadeInUp animate-open');
})



// vlist
let vlistContent = document.querySelectorAll('.vlist__content');

vlistContent.forEach(vlistContent => {

    let vlistText = vlistContent.querySelector('.vlist__text');
    let vlistShowmore = vlistContent.querySelector('.vlist__showmore');
    let vlistSalary = vlistContent.querySelector('.vlist__salary');

    vlistShowmore.addEventListener('click', function() {
        vlistText.classList.toggle('vlist__text_expand');
        vlistSalary.classList.toggle('vlist__salary_open');

        if(vlistShowmore.innerText == 'Показать описание полностью'){
            vlistShowmore.innerText = 'Скрыть описание';
        }
        else if(vlistShowmore.innerText == 'Скрыть описание'){
            vlistShowmore.innerText = 'Показать описание полностью';
        }
    });
});