window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = '#f4f4f4';
        header.style.color = '#8B0000';
    } else {
        header.style.backgroundColor = '#FFFFFF';
        header.style.color = '#8B0000';
    }
});
