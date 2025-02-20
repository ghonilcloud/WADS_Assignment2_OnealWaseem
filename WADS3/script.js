document.addEventListener('DOMContentLoaded', () => {
    const memberImages = document.querySelectorAll('.member-image');

    // Add event listeners for hover effects
    memberImages.forEach(image => {
        image.addEventListener('mouseenter', () => {
            image.classList.add('scale-up'); // Add the scale-up class on hover
        });

        image.addEventListener('mouseleave', () => {
            image.classList.remove('scale-up'); // Remove the scale-up class when not hovering
        });
    });

    // Fade-in effect for other elements
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 300); // Stagger the fade-in effect
    });

    // Function to display ratings on the homepage
    const displayRatings = () => {
        const ratingDisplays = document.querySelectorAll('.rating-display');
        ratingDisplays.forEach(display => {
            const memberName = display.getAttribute('data-member');
            const savedRating = localStorage.getItem(memberName);
            display.innerHTML = ''; // Clear previous stars
            if (savedRating) {
                for (let i = 0; i < savedRating; i++) {
                    display.innerHTML += '<span class="star selected">★</span>'; // Add filled star
                }
                for (let i = savedRating; i < 5; i++) {
                    display.innerHTML += '<span class="star">☆</span>'; // Add empty star
                }
            } else {
                display.innerHTML = 'No ratings yet'; // Optional: Display a message if no rating exists
            }
        });
    };

    // Check if we are on the homepage or individual member page
    if (document.body.classList.contains('body-indiv')) {
        // Rating system for individual member pages
        const ratings = document.querySelectorAll('.rating-indiv');
        ratings.forEach(rating => {
            const stars = rating.querySelectorAll('.star');
            const memberName = rating.getAttribute('data-member');

            // Load saved rating from localStorage
            const savedRating = localStorage.getItem(memberName);
            if (savedRating) {
                for (let i = 0; i < savedRating; i++) {
                    stars[i].classList.add('selected');
                }
            }

            stars.forEach(star => {
                star.addEventListener('click', () => {
                    const value = star.getAttribute('data-value');
                    // Remove selected class from all stars
                    stars.forEach(s => s.classList.remove('selected'));
                    // Add selected class to the clicked star and all previous stars
                    for (let i = 0; i < value; i++) {
                        stars[i].classList.add('selected');
                    }
                    // Save the rating to localStorage
                    localStorage.setItem(memberName, value);
                });
            });
        });
    }

    // Pink mode toggle functionality
    const toggleButton = document.getElementById('toggle-pink-mode');
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('pink-mode'); // Toggle the pink-mode class on the body
    });

});