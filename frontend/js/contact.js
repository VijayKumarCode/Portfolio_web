/**
 * Contact Form Handler
 * Connects the Portfolio Frontend to the Java Spring Boot Backend
 */
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Prepare the data to match your Java @RequestBody model
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Visual feedback: Change button state
            const submitBtn = contactForm.querySelector('button');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            try {
                const response = await fetch('http://localhost:8080/api/v1/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    const result = await response.text();
                    showFormMessage("✅ " + result, "success");
                    contactForm.reset();
                } else {
                    showFormMessage("❌ Error: Could not send message.", "error");
                }
            } catch (error) {
                console.error("Connection failed:", error);
                showFormMessage("⚠️ Backend offline. Ensure Spring Boot is running!", "error");
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Helper function for cleaner UI feedback instead of alerts
function showFormMessage(message, type) {
    const statusDiv = document.getElementById('form-status') || createStatusDiv();
    statusDiv.innerText = message;
    statusDiv.className = `status-msg ${type}`;
}

function createStatusDiv() {
    const div = document.createElement('div');
    div.id = 'form-status';
    document.getElementById('contact-form').appendChild(div);
    return div;
}