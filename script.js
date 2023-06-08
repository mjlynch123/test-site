const aboutSection = document.querySelector('.about-content');
const artistsSection = document.querySelector('.our-artists');

// Options for the Intersection Observer
const options = {
  root: null,
  rootMargin: '0px',
  threshold: .1, // Adjust the threshold value as needed
};

window.addEventListener("scroll", function () {
  var scrolled = window.scrollY;
  var parallax = document.querySelector(".parallax img");
  this.document.querySelector(".welcome").style.opacity = 1 - scrolled / 500;
  parallax.style.transform =
    "translateY(" + scrolled * -0.5 + "px)"; /* Adjusted the translate value */
});

// Smooth scroll to section when navigation link is clicked
document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    const offset = 0; // Adjust the offset value based on your design
    const duration = 1300; // Adjust the duration (in milliseconds) for slower scrolling

    scrollToTarget(target, offset, duration);
  });
});

function scrollToTarget(target, offset, duration) {
  const targetPosition = target.offsetTop - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  function scrollAnimation(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeOutCubic(progress);
    const scrollAmount = distance * easeProgress + startPosition;

    window.scrollTo(0, scrollAmount);

    if (progress < 1) {
      requestAnimationFrame(scrollAnimation);
    }
  }

  // Easing function for smoother scroll
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  requestAnimationFrame(scrollAnimation);
}

// ! About section

// Intersection Observer callback function
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    const slidingParagraph = entry.target.querySelector('#sliding-paragraph');
    const slidingTitle = entry.target.querySelector('#about');

    const leftImage = document.querySelector('#image-left');
    const rightImage = document.querySelector('#image-right');

    const outro = document.querySelector('#about-outro');

    if (entry.isIntersecting) {
      // About section is in view, apply fade-in effect
      slidingParagraph.classList.add('slide-up');
      slidingTitle.classList.add('slide-left');
      setTimeout(function () {
        leftImage.classList.add('left');
        rightImage.classList.add('right');
      }, 1500);
      outro.classList.add('slide-up');
      entry.target.style.opacity = 1;
       // Add slide-up class for sliding effect
    } else {
      // About section is out of view, apply fade-out effect
      entry.target.style.opacity = 0;
      slidingParagraph.classList.remove('slide-up'); // Remove slide-up class
      slidingTitle.classList.remove('slide-left');
      leftImage.classList.remove('left');
      rightImage.classList.remove('right');
      outro.classList.remove('slide-up');
    }
  });
}

// Create a new Intersection Observer
const observer = new IntersectionObserver(handleIntersection, options);

// Start observing the About section
observer.observe(aboutSection);

// ! Artists section

function Artists(entries, observer) {
  entries.forEach(entry => {
    const artHeader = document.querySelector('#artists-header');
    const artistContainer = document.querySelector('#artist-container');

    if (entry.isIntersecting) {
      // Artist section is in view, apply fade-in effect
      artistsSection.style.opacity = 1;
      artHeader.classList.add('slide-up');
      setTimeout(function () {
        artistContainer.classList.add('slide-left');
      }, 1200);
    } else {
      // Artist section is out of view, apply fade-out effect
      entry.target.style.opacity = 0;
      artHeader.classList.remove('slide-up');
      artistContainer.classList.remove('slide-left');
    }
  });
}

// Create a new Intersection Observer
const observerArtist = new IntersectionObserver(Artists, options);

// Start observing the Artists section
observerArtist.observe(artistsSection);

