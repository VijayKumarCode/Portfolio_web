document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  if (!slug) return showNotFound();

try {
    const response = await fetch("data/posts.json");
    const posts = await response.json();

    const post = posts.find(p => p.slug === slug);
    if (!post) return showNotFound();

    // ✅ Dynamic Breadcrumb Update: No more manual rewriting!
    const breadcrumbTitle = document.getElementById("breadcrumb-title");
    if (breadcrumbTitle) {
        breadcrumbTitle.textContent = post.title;
        breadcrumbTitle.title = post.title; // Adds a tooltip for long titles
    }

    // Existing Content Injection
    document.title = `${post.title} | Engineering Log`;
    document.getElementById("post-title").textContent = post.title;
    document.getElementById("post-category").textContent = post.category;
    document.getElementById("post-date").textContent = post.date;
    document.getElementById("post-read-time").textContent = post.readTime;
    document.getElementById("post-content").innerHTML = post.content;

} catch (err) {
    console.error("Error loading post:", err);
    showNotFound();
}

  function showNotFound() {
    const container = document.querySelector(".blog-post");
    if (container) {
      container.innerHTML = `
        <h2>Post Not Found</h2>
        <p>The article you are looking for does not exist.</p>
        <a href="blog.html">Back to Articles</a>
      `;
    }
  }
});