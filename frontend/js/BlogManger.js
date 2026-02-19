export class BlogManager {
    constructor(containerId, buttonId, dataPath) {
        this.container = document.getElementById(containerId);
        this.nextBtn = document.getElementById(buttonId);
        this.dataPath = dataPath;
    }

    async init() {
        await this.fetchAndRender();
        this.nextBtn.addEventListener('click', () => this.scrollRight());
    }

    async fetchAndRender() {
        try {
            const response = await fetch(this.dataPath);
            const posts = await response.json();
            
            this.container.innerHTML = posts.map(post => `
                <article class="blog-article-card">
                    <h3>${post.title}</h3>
                    <p>${post.description.substring(0, 60)}...</p>
                    <button class="btn btn-color-1" 
                        onclick="location.href='blog-detail.html?id=${post.id}'">
                        Read More
                    </button>
                </article>
            `).join('');
        } catch (error) {
            console.error("Critical: Engineering Log failed to load", error);
        }
    }

    scrollRight() {
        const scrollAmount = 350; // Adjust based on card width
        if (this.container.scrollLeft + this.container.clientWidth >= this.container.scrollWidth - 10) {
            this.container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            this.container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
}