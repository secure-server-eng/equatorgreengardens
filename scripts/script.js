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
// Disable Right-Click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Disable Key Shortcuts (F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S)
document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === "F12") {
        e.preventDefault();
    }
    // Ctrl+Shift+I or Ctrl+Shift+J (DevTools)
    if (e.ctrlKey && (e.key === 'I' || e.key === 'J') && e.shiftKey) {
        e.preventDefault();
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'U') {
        e.preventDefault();
    }
    // Ctrl+S (Save Page)
    if (e.ctrlKey && e.key === 'S') {
        e.preventDefault();
    }
});
