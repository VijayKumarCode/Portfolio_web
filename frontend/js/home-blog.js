import { BlogManager } from "./blogManager.js";

document.addEventListener("DOMContentLoaded", () => {
    const blog = new BlogManager(
        "blog-container",
        "move-btn",
        "data/posts.json"
    );

    blog.init();
});