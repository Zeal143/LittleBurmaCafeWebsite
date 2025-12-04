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
           // Show Contact Success Modal
		   const contactModalEl = document.getElementById("contactSuccessModal");
		   if (contactModalEl) {
			   const contactModal = new bootstrap.Modal(contactModalEl);
			   contactModal.show();
		   }
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
            const thankYouModalEl = document.getElementById("thankYouModal");
            if (thankYouModalEl) {
				const thankYouModal = new bootstrap.Modal(thankYouModalEl);
				thankYouModal.show();
			}
			
			jobForm.reset();
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
    /* ===================================================
       RESERVATION FORM VALIDATION
    =================================================== */
    const bookingForm = document.getElementById("booking-form");

    if (bookingForm) {
        bookingForm.addEventListener("submit", function (e) {

            e.preventDefault();

            bookingForm.querySelectorAll(".error").forEach(el => el.textContent = "");

            let valid = true;

            const name     = document.getElementById("name").value.trim();
            const email    = document.getElementById("email").value.trim();
            const phone    = document.getElementById("phone").value.trim();
            const date     = document.getElementById("date").value.trim();
            const time     = document.getElementById("time").value.trim();
            const guests   = document.getElementById("guests").value.trim();
            const special  = document.getElementById("special-requests").value.trim();

            if (name.length < 2) {
                document.getElementById("err-name").textContent = "Name must be at least 2 characters.";
                valid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                document.getElementById("err-email").textContent = "Please enter a valid email address.";
                valid = false;
            }

            const phoneDigits = phone.replace(/\D/g, "");
            if (phoneDigits.length < 7) {
                document.getElementById("err-phone").textContent = "Please enter a valid phone number.";
                valid = false;
            }

            if (date === "") {
                document.getElementById("err-date").textContent = "Please select a reservation date.";
                valid = false;
            }

            if (time === "") {
                document.getElementById("err-time").textContent = "Please select a reservation time.";
                valid = false;
            }

            if (guests === "") {
                document.getElementById("err-guests").textContent = "Please select the number of guests.";
                valid = false;
            }

            if (special.length > 0 && special.length < 5) {
                document.getElementById("err-special").textContent =
                    "Special requests must be at least 5 characters.";
                valid = false;
            }

            // if (!valid) e.preventDefault();
            // else {
            //     e.preventDefault();
            //     alert("Your reservation has been submitted!");
            //     bookingForm.reset();
            // }

            // STOP if not valid
            if (!valid) return;

            // SUCCESS — Show Modal
            const reservationModalEl = document.getElementById("reservationSuccessModal");
            if (reservationModalEl) {
                const reservationModal = new bootstrap.Modal(reservationModalEl);
                reservationModal.show();
            }

            // Reset the form
            bookingForm.reset();            
        });

    }

});

