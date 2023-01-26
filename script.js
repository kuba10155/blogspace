let postsArray = []
const titleInput = document.getElementById("post-title")
const bodyInput = document.getElementById("post-body")
const form = document.getElementById("new-post")

function renderPosts() {
  let html = ""
  postsArray.forEach((post) => {
    html += `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <hr>`
    })
  document.getElementById("posts-container").innerHTML = html
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then(response => response.json())
  .then((data) => {
    postsArray = data.slice(0,5)
    renderPosts()
  })

form.addEventListener("submit", function(event) {
  event.preventDefault()
  const postTitle = titleInput.value
  const postBody = bodyInput.value
  const post = {
      title: postTitle,
      body: postBody
  }
  fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(data => {
    postsArray.unshift(data)
    renderPosts()
    form.reset()
    /*  ZAMIAST TYCH DWÓCH LINIJEK JEST JEDNA - nad tym
    titleInput.value = ""
    bodyInput.value = "" */
  })
})
