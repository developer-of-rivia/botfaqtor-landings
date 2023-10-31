document.addEventListener('DOMContentLoaded', () => {
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
});