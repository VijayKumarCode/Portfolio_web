async function loadFullPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    try {
        const response = await fetch('./data/blogs.json');
        const posts = await response.json();
        const post = posts.find(p => p.id == postId);

        if (post) {
            document.getElementById('post-title').innerText = post.title;
            document.getElementById('post-category').innerText = post.category;
            document.getElementById('post-date').innerText = post.date;
            document.getElementById('post-content').innerHTML = `
                <p>${post.description}</p>
                <br>
                <p>Welcome to my detailed breakdown of this project. In this post, I explore 
                the engineering challenges I faced and the solutions I implemented using Java 
                and modern web practices.</p>
            `;
        }
    } catch (error) {
        console.error("Error loading post:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadFullPost);