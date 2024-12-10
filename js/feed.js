// Charger les posts depuis le JSON
fetch("data/posts.json")
  .then((response) => response.json())
  .then((posts) => {
    const feedContainer = document.getElementById("feed");
    posts.forEach((post) => createPost(post, feedContainer));
  });

// Créer un post
function createPost(post, container) {
  const postDiv = document.createElement("div");
  postDiv.classList.add("post");

  const author = document.createElement("h3");
  author.textContent = post.author;
  postDiv.appendChild(author);

  const text = document.createElement("p");
  text.textContent = post.text;
  postDiv.appendChild(text);

  if (post.image) {
    const img = document.createElement("img");
    img.src = post.image;
    img.alt = `Image de ${post.author}`;
    img.addEventListener("click", () => showImageModal(post.image));
    postDiv.appendChild(img);
  }

  const reactions = document.createElement("div");
  reactions.classList.add("reactions");
  reactions.innerHTML = `
      <button onclick="react('like', ${post.id})">👍 ${post.reactions.like}</button>
      <button onclick="react('dislike', ${post.id})">👎 ${post.reactions.dislike}</button>
      <button onclick="react('love', ${post.id})">❤️ ${post.reactions.love}</button>
    `;
  postDiv.appendChild(reactions);

  container.appendChild(postDiv);
}
