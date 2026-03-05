/*
 * Problem No. #110
 * Difficulty: Easy
 * Description: Pagination logic for Engineering Log (10 articles per batch)
 * Link: https://github.com/VijayKumarCode/TicTacToe_Project
 * Time Complexity: O(n) - where n is the number of posts in the JSON
 * Space Complexity: O(n) - storing posts in memory
 */

document.addEventListener("DOMContentLoaded", async () => {
    const blogList = document.getElementById("blog-list");
    const loadMoreBtn = document.getElementById("load-more-btn");
    const emptyState = document.getElementById("empty-state");

    let allPosts = [];
    let displayedCount = 0;
    const LIMIT = 10;

    try {
        const response = await fetch("data/posts.json");
        allPosts = await response.json();

        if (allPosts.length === 0) {
            emptyState.style.display = "block";
            loadMoreBtn.style.display = "none";
            return;
        }

        renderBatch();

        loadMoreBtn.addEventListener("click", renderBatch);

    } catch (err) {
        console.error("Fetch failed:", err);
        blogList.innerHTML = "<p>Error loading logs. Please try again later.</p>";
    }

    function renderBatch() {
        const nextBatch = allPosts.slice(displayedCount, displayedCount + LIMIT);
        
        nextBatch.forEach(post => {
            const card = document.createElement("article");
            card.className = "blog-card"; // Uses your existing card styles
            card.innerHTML = `
                <div class="blog-content">
                    <span class="category-tag">${post.category}</span>
                    <h2>${post.title}</h2>
                    <p>${post.content.substring(0, 120)}...</p>
                    <div class="meta">${post.date} • ${post.readTime}</div>
                    <a href="post.html?slug=${post.slug}" class="read-more">Read Entry →</a>
                </div>
            `;
            blogList.appendChild(card);
        });

        displayedCount += nextBatch.length;

        // Requirement: Hide button if no more posts exist
        if (displayedCount >= allPosts.length) {
            loadMoreBtn.style.display = "none";
        } else {
            loadMoreBtn.style.display = "block";
        }
    }
});