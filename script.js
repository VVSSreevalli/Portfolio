// ===== SCROLL ANIMATIONS =====
const animatedElements = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.2 });
animatedElements.forEach(el => observer.observe(el));

// ===== DYNAMIC YEAR =====
const yearSpan = document.getElementById('year');
if(yearSpan) yearSpan.textContent = new Date().getFullYear();

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');
const successBanner = document.getElementById('successBanner');
const errorBanner = document.getElementById('errorBanner');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.querySelector('.btn-text');
const loader = document.querySelector('.loader');

if(contactForm){
    contactForm.addEventListener('submit', function(e){
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // ===== VALIDATION =====
        if(name.length < 3) return showError("Name must be at least 3 characters.");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailPattern.test(email)) return showError("Enter a valid email address.");
        if(message.length < 10) return showError("Message must be at least 10 characters.");

        // ===== DISABLE BUTTON + SHOW LOADER =====
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        // ===== SEND VIA EMAILJS =====
        emailjs.send("service_mvw3xhq", "template_1zy43qb", {
            from_name: name,
            from_email: email,
            message: message
        })
        .then(() => {
            resetForm();
            showSuccess("Message sent successfully!");
        })
        .catch(() => {
            resetForm();
            showError("Message failed to send. Please try again.");
        });
    });
}

// ===== HELPER FUNCTIONS =====
function resetForm(){
    submitBtn.disabled = false;
    if(btnText) btnText.style.display = 'block';
    if(loader) loader.style.display = 'none';
    contactForm.reset();
}

function showError(msg){
    if(!errorBanner) return;
    errorBanner.textContent = msg;
    errorBanner.style.display = 'block';
    setTimeout(()=>{ errorBanner.style.display = 'none'; }, 4000);
}

function showSuccess(msg){
    if(!successBanner) return;
    successBanner.textContent = msg;
    successBanner.style.display = 'block';
    setTimeout(()=>{ successBanner.style.display = 'none'; }, 4000);
}

const progressBars = document.querySelectorAll(".progress-bar");


