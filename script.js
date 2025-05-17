$(document).ready(function() {
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Mobile menu toggle
    $('.hamburger').click(function() {
        $(this).toggleClass('active');
        $('.nav-links').toggleClass('active');
    });

    // Close mobile menu when clicking a link
    $('.nav-links a').click(function() {
        $('.hamburger').removeClass('active');
        $('.nav-links').removeClass('active');
    });

    $(document).ready(function(){
        $('#loginBtn').click((()=>window.location.href='./Admin/adminLogin.html'))
    })
$(document).ready(function() {
    $('#bookBtn').click(function() {
        openBookingModal();
    });

    $('.close-btn').click(function() {
        closeBookingModal();
    });

    $(window).click(function(event) {
        if ($(event.target).hasClass('modal')) {
            closeBookingModal();
        }
    });

    function openBookingModal() {
        $('#bookingModal').addClass('show');
        $('body').css('overflow', 'hidden');
    }

    function closeBookingModal() {
        $('#bookingModal').removeClass('show');
        $('body').css('overflow', 'auto');
    }

    // Form validation and submission logic
    $('#bookingForm').submit(function(event) {
        event.preventDefault();
        alert('Booking submitted successfully!');
        closeBookingModal();
        this.reset();
    });
});

    // Carousel functionality
    let currentSlide = 0;
    const slides = $('.carousel-slide');
    const dots = $('.dot');
    const totalSlides = slides.length;

    let slideInterval = setInterval(nextSlide, 5000);

    function showSlide(index) {
        slides.removeClass('active');
        dots.removeClass('active');
        $(slides[index]).addClass('active');
        $(dots[index]).addClass('active');
        currentSlide = index;
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % totalSlides);
    }

    function prevSlide() {
        showSlide((currentSlide - 1 + totalSlides) % totalSlides);
    }

    // Next and previous buttons
    $('.next').click(function() {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });

    $('.prev').click(function() {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Dot navigation
    $('.dot').click(function() {
        clearInterval(slideInterval);
        const slideIndex = $(this).data('slide');
        showSlide(slideIndex);
        slideInterval = setInterval(nextSlide, 5000);
    });


    // Check-in date change handler
    $('#checkIn').change(function() {
        const checkIn = new Date($(this).val());
        const nextDay = new Date(checkIn);
        nextDay.setDate(nextDay.getDate() + 1);
        
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        
        $('#checkOut').attr('min', formatDate(nextDay));
        
        // If current check-out date is before new check-in date, update it
        const checkOut = new Date($('#checkOut').val());
        if (checkOut <= checkIn) {
            $('#checkOut').val(formatDate(nextDay));
        }
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').click(function(event) {
        event.preventDefault();
        
        const target = $($(this).attr('href'));
        
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // Animation on scroll
    $(window).scroll(function() {
        $('.feature-card, .room-card, .service-card').each(function() {
            const elementTop = $(this).offset().top;
            const elementVisible = 150;
            const windowHeight = $(window).height();
            const scrollTop = $(window).scrollTop();
            
            if (elementTop < (scrollTop + windowHeight - elementVisible)) {
                $(this).css('opacity', '1');
                $(this).css('transform', 'translateY(0)');
            }
        });
    });

    // Initialize elements with opacity 0 for scroll animation
    $('.feature-card, .room-card, .service-card').css('opacity', '0');
    $('.feature-card, .room-card, .service-card').css('transform', 'translateY(20px)');
    $('.feature-card, .room-card, .service-card').css('transition', 'all 0.5s ease');

    // Trigger scroll once to initialize visible elements
    $(window).trigger('scroll');
});

document.getElementById('bookingForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
        full_name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        check_in: document.getElementById('checkIn').value,
        check_out: document.getElementById('checkOut').value,
        adults: parseInt(document.getElementById('adults').value),
        children: parseInt(document.getElementById('children').value),
        room_type: document.getElementById('roomType').value,
        special_requests: document.getElementById('specialRequests').value
    };

    try {
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.text();
        alert(result); // or show a success message
    } catch (error) {
        alert('Failed to book room.');
        console.error('Error:', error);
    }
    try{
        const response = await fetch('/api/allbookings');
        const bookings = await response.json()
        alert('Fetched ' + bookings.length + ' bookings!');
    }catch(error){
        alert('Failed to get bookings')
        console.error('Error:',error)
    }
});