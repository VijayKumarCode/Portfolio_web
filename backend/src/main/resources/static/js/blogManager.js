export class BlogManager {
    constructor(containerId, buttonId, dataPath) {
        this.container = document.getElementById(containerId);
        this.nextBtn = document.getElementById(buttonId);
        this.dataPath = dataPath;
    }

    async init() {
        if (!this.container) return;

        await this.fetchAndRender();

        if (this.nextBtn) {
            this.nextBtn.addEventListener("click", () => this.scrollRight());
        }
    }

    async fetchAndRender() {
        try {
            const response = await fetch(this.dataPath);
            const posts = await response.json();

            this.container.innerHTML = posts.map(post => {

                const plainText = post.content.replace(/<[^>]*>/g, '');
                const excerpt = plainText.split(" ")
                    .slice(0, 15)
                    .join(" ") + "...";

                return `
                    <article class="blog-article-card">
                        <p class="category-tag">${post.category}</p>
                        <h3>${post.title}</h3>
                        <p>${excerpt}</p>
                        <a href="post.html?slug=${post.slug}" 
                           class="read-more">
                           Read More
                        </a>
                    </article>
                `;
            }).join("");

        } catch (error) {
            console.error("Blog failed to load:", error);
        }
    }

    scrollRight() {
        const scrollAmount = 350;

        if (
            this.container.scrollLeft + this.container.clientWidth
            >= this.container.scrollWidth - 10
        ) {
            this.container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            this.container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    }
}