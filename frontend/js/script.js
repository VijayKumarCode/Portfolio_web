document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent page reload

            // Prepare the data (matches your Java ContactRequest model)
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            try {
                const response = await fetch('http://localhost:8080/api/v1/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.text();

                if (response.ok) {
                    alert("✅ Success: " + result);
                    contactForm.reset(); // Clear the form
                } else {
                    alert("❌ Error: " + result);
                }
            } catch (error) {
                console.error("Connection failed:", error);
                alert("The backend server seems to be offline!");
            }
        });
    }
});