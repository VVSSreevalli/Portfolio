document.addEventListener('DOMContentLoaded', ()=>{

// =========================
// SCROLL REVEAL
// =========================

const animatedElements =
document.querySelectorAll('[data-animate]');

if(animatedElements.length){

    const observer =
    new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add('active');

            }

        });

    },{

        threshold:0.15

    });

    animatedElements.forEach(el=>{

        observer.observe(el);

    });

}

// =========================
// THEME TOGGLE
// =========================

const themeToggle =
document.getElementById('themeToggle');

if(themeToggle){

    themeToggle.addEventListener('click', ()=>{

        document.body.classList.toggle('light-mode');

        const isLight =
        document.body.classList.contains('light-mode');

        themeToggle.innerHTML =
        isLight ? '☀' : '☾';

        localStorage.setItem(
            'theme',
            isLight ? 'light' : 'dark'
        );

    });

    const savedTheme =
    localStorage.getItem('theme');

    if(savedTheme === 'light'){

        document.body.classList.add('light-mode');

        themeToggle.innerHTML = '☀';

    }

}

// =========================
// HERO PARALLAX
// =========================

const heroImage =
document.querySelector('.hero-image-wrapper');

window.addEventListener('scroll', ()=>{

    if(heroImage){

        const scrollY = window.scrollY;

        heroImage.style.transform =
        `translateY(${scrollY * 0.08}px)`;

    }

});

// =========================
// CERTIFICATE STACK
// =========================

const certCards =
document.querySelectorAll('.cert-card');

certCards.forEach((card,index)=>{

    card.style.zIndex = index + 1;

    // stagger sticky positions
    card.style.top =
    `${120 + (index * 18)}px`;

});

window.addEventListener('scroll', ()=>{

    certCards.forEach((card)=>{

        const rect =
        card.getBoundingClientRect();

        if(rect.top < window.innerHeight){

            card.style.transform =
            'scale(1)';

        }

    });

});

// =========================
// ACTIVE NAV
// =========================

const sections =
document.querySelectorAll('section');

const navLinks =
document.querySelectorAll('.nav-links a');

if(sections.length && navLinks.length){

    window.addEventListener('scroll', ()=>{

        let current = '';

        sections.forEach(section=>{

            const sectionTop =
            section.offsetTop - 180;

            if(window.scrollY >= sectionTop){

                current =
                section.getAttribute('id');

            }

        });

        navLinks.forEach(link=>{

            link.classList.remove('active-link');

            if(
                link.getAttribute('href')
                .includes(current)
            ){

                link.classList.add('active-link');

            }

        });

    });

}

// =========================
// CONTACT FORM
// =========================

const contactForm =
document.getElementById('contactForm');

const successBanner =
document.getElementById('successBanner');

const errorBanner =
document.getElementById('errorBanner');

const submitBtn =
document.getElementById('submitBtn');

if(contactForm && submitBtn){

    contactForm.addEventListener('submit',

    async (e)=>{

        e.preventDefault();

        const name =
        document.getElementById('name')
        ?.value
        .trim();

        const email =
        document.getElementById('email')
        ?.value
        .trim();

        const message =
        document.getElementById('message')
        ?.value
        .trim();

        if(!name || name.length < 3){

            return showError(
            "Enter valid name."
            );

        }

        const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailPattern.test(email)){

            return showError(
            "Enter valid email."
            );

        }

        if(!message || message.length < 10){

            return showError(
            "Message too short."
            );

        }

        submitBtn.disabled = true;

        submitBtn.textContent =
        "Sending...";

        try{

            await emailjs.send(

                "service_mvw3xhq",

                "template_1zy43qb",

                {
                    from_name:name,
                    from_email:email,
                    message:message
                }

            );

            showSuccess(
            "Message sent successfully!"
            );

            contactForm.reset();

        }

        catch(error){

            console.log(error);

            showError(
            "Email failed."
            );

        }

        finally{

            submitBtn.disabled = false;

            submitBtn.textContent =
            "Send Message";

        }

    });

}

// =========================
// ALERTS
// =========================

function showError(msg){

    if(!errorBanner) return;

    errorBanner.textContent = msg;

    errorBanner.style.display = 'block';

    setTimeout(()=>{

        errorBanner.style.display = 'none';

    },4000);

}

function showSuccess(msg){

    if(!successBanner) return;

    successBanner.textContent = msg;

    successBanner.style.display = 'block';

    setTimeout(()=>{

        successBanner.style.display = 'none';

    },4000);

}

});