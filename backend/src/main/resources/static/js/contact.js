/**
 * Contact Form Handler
 * Connects Portfolio Frontend to Spring Boot Backend
 */
console.log("Contact JS loaded");

document.addEventListener('DOMContentLoaded', () => {

    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector("button[type='submit']");
        const originalText = submitBtn.innerText;

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            showFormMessage("All fields are required.", "error");
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerText = "Sending...";

        try {
            const response = await fetch('http://localhost:8080/api/v1/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Submission failed");
            }

            const result = await response.text();
            showFormMessage("✅ " + result, "success");
            contactForm.reset();

        } catch (error) {
            console.error("Connection failed:", error);
            showFormMessage("⚠️ Backend offline. Ensure Spring Boot is running.", "error");
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
        }
    });
});


function showFormMessage(message, type) {
    let statusDiv = document.getElementById('form-status');

    if (!statusDiv) {
        statusDiv = document.createElement('div');
        statusDiv.id = 'form-status';
        document.getElementById('contact-form').appendChild(statusDiv);
    }

    statusDiv.innerText = message;
    statusDiv.className = `status-msg ${type}`;
}