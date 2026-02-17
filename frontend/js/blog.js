async function loadFullPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    const response = await fetch('./data/blogs.json');
    const posts = await response.json();
    const post = posts.find(p => p.id == postId);

    if (post) {
        document.getElementById('post-title').innerText = post.title;
        document.getElementById('post-meta').innerText = `${post.date} • ${post.category}`;
        document.getElementById('post-content').innerHTML = post.description; // In a real app, you'd store full HTML here
    }
}
loadFullPost();