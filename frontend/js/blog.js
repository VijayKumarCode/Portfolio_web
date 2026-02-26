// blog.js
document.addEventListener("DOMContentLoaded", async () => {
  const blogList = document.getElementById("blog-list");

  try {
    const response = await fetch("data/posts.json");
    const posts = await response.json();

    posts.forEach(post => {
      const article = document.createElement("article");
      article.className = "blog-card";

      article.innerHTML = `
        <span class="category-tag">${post.category}</span>
        <h2>${post.title}</h2>
        <p class="blog-preview">${post.content.substring(0, 120)}...</p>
        <div class="meta">${post.date} • ${post.readTime}</div>
        <a href="post.html?slug=${post.slug}" class="read-more">Read Article →</a>
      `;

      blogList.appendChild(article);
    });

  } catch (err) {
    console.error("Failed to load posts:", err);
    blogList.innerHTML = "<p>Failed to load posts.</p>";
  }
});