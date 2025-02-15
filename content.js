let isKeyPressed = false; // Tracks if the 'Alt' key is pressed
let isScrolling = false; // Tracks if scrolling is active
let startY = 0; // Initial Y position of the mouse
let scrollTop = 0; // Initial scroll position of the page

// Detect when the 'Alt' key is pressed
document.addEventListener("keydown", (event) => {
  if (event.key === "Alt") {
    isKeyPressed = true;
    // Add a class to body to help with styling while in scroll mode
    document.body.classList.add('scroll-mode');
  }
});

// Detect when the 'Alt' key is released
document.addEventListener("keyup", (event) => {
  if (event.key === "Alt") {
    isKeyPressed = false;
    isScrolling = false;
    document.body.classList.remove('scroll-mode');
  }
});

// Start scrolling and block all mouse interactions when mouse is pressed
document.addEventListener("mousedown", (event) => {
  if (isKeyPressed) {
    isScrolling = true;
    startY = event.clientY;
    scrollTop = window.scrollY;
    
    // Prevent all default mouse behavior
    event.preventDefault();
    event.stopPropagation();
    
    // Temporarily disable pointer events on all links
    const links = document.getElementsByTagName('a');
    Array.from(links).forEach(link => {
      link.style.pointerEvents = 'none';
    });
  }
}, true); // Use capture phase to ensure this runs before other handlers

// Perform scrolling while the mouse is moved
document.addEventListener("mousemove", (event) => {
  if (isScrolling) {
    const deltaY = startY - event.clientY;
    window.scrollTo(0, scrollTop + deltaY);
    
    // Prevent any potential drag events
    event.preventDefault();
    event.stopPropagation();
  }
}, true);

// Stop scrolling when mouse is released
document.addEventListener("mouseup", () => {
  if (isScrolling) {
    isScrolling = false;
    
    // Re-enable pointer events on all links
    const links = document.getElementsByTagName('a');
    Array.from(links).forEach(link => {
      link.style.pointerEvents = 'auto';
    });
  }
});

// Additional protection against clicks during scroll mode
document.addEventListener("click", (event) => {
  if (isScrolling || isKeyPressed) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
}, true);

// Prevent default drag behavior during scroll mode
document.addEventListener("dragstart", (event) => {
  if (isScrolling || isKeyPressed) {
    event.preventDefault();
    event.stopPropagation();
  }
}, true);
