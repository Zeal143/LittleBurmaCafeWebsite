document.addEventListener("DOMContentLoaded", function () {

    /* ===================================================
       CONTACT FORM VALIDATION
    =================================================== */
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {

            // CLEAR ERRORS
            contactForm.querySelectorAll(".error").forEach(el => el.textContent = "");

            let valid = true;

            const name    = document.getElementById("contact-name").value.trim();
            const email   = document.getElementById("contact-email").value.trim();
            const phone   = document.getElementById("contact-phone").value.trim();
            const subject = document.getElementById("contact-subject").value.trim();
            const message = document.getElementById("contact-message").value.trim();

            // NAME
            if (name.length < 2) {
                document.getElementById("err-name").textContent =
                    "Name must be at least 2 characters.";
                valid = false;
            }

            // EMAIL
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                document.getElementById("err-email").textContent =
                    "Please enter a valid email address.";
                valid = false;
            }

            // PHONE
            const phoneDigits = phone.replace(/\D/g, "");
            if (phoneDigits.length < 7) {
                document.getElementById("err-phone").textContent =
                    "Please enter a valid phone number.";
                valid = false;
            }

            // SUBJECT
            if (subject.length < 3) {
                document.getElementById("err-subject").textContent =
                    "Subject must be at least 3 characters.";
                valid = false;
            }

            // MESSAGE
            if (message.length < 10) {
                document.getElementById("err-message").textContent =
                    "Message must be at least 10 characters.";
                valid = false;
            }

            if (!valid) {
                e.preventDefault();
                return;
            }

            // SUCCESS
            e.preventDefault();
            alert("Thank you! Your message has been sent.");
            contactForm.reset();
        });
    }



     /* ===================================================
       CAREERS FORM VALIDATION
    =================================================== */
    const jobForm   = document.getElementById("job-application-form");
    const cvInput   = document.getElementById("app-cv");
    const cvTrigger = document.getElementById("app-cv-trigger");
    const cvLabel   = document.getElementById("app-cv-label");

    if (jobForm) {
        jobForm.addEventListener("submit", function (e) {

            // CLEAR ERRORS
            jobForm.querySelectorAll(".error").forEach(el => el.textContent = "");

            let valid = true;

            const name       = document.getElementById("app-name").value.trim();
            const email      = document.getElementById("app-email").value.trim();
            const phone      = document.getElementById("app-phone").value.trim();
            const position   = document.getElementById("app-position").value.trim();
            const experience = document.getElementById("app-experience").value.trim();

            // NAME
            if (name.length < 2) {
                document.getElementById("err-app-name").textContent =
                    "Name must be at least 2 characters.";
                valid = false;
            }

            // EMAIL
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                document.getElementById("err-app-email").textContent =
                    "Please enter a valid email address.";
                valid = false;
            }

            // PHONE
            const phoneDigits = phone.replace(/\D/g, "");
            if (phoneDigits.length < 7) {
                document.getElementById("err-app-phone").textContent =
                    "Please enter a valid phone number.";
                valid = false;
            }

            // POSITION (dropdown)
            if (position === "") {
                document.getElementById("err-app-position").textContent =
                    "Please select the position you're applying for.";
                valid = false;
            }

            // EXPERIENCE
            if (experience.length < 10) {
                document.getElementById("err-app-experience").textContent =
                    "Experience must be at least 10 characters.";
                valid = false;
            }

            if (!valid) {
                e.preventDefault();
                return;
            }

            // SUCCESS
            e.preventDefault();
            alert("Thank you for applying! We will review your application.");
            jobForm.reset();

            // Reset CV label after successful submit
            if (cvLabel) {
                cvLabel.textContent = "Click here to choose a file (PDF, DOC, DOCX)";
            }
        });

        /* =======================
           CAREERS CV UPLOAD CLICK
        ======================== */
        if (cvInput && cvTrigger && cvLabel) {
            // Open file dialog when the pretty box is clicked
            cvTrigger.addEventListener("click", function () {
                cvInput.click();
            });

            // Show selected file name
            cvInput.addEventListener("change", function () {
                if (cvInput.files.length > 0) {
                    cvLabel.textContent = "Selected: " + cvInput.files[0].name;
                } else {
                    cvLabel.textContent = "Click here to choose a file (PDF, DOC, DOCX)";
                }
            });
        }
    }
