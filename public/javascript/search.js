var categoryPostsEl = document.querySelector("#category-posts");

async function searchFormHandler(event) {
    event.preventDefault();

    const category = document.querySelector('input[name="category"]').value;

    fetch(`/api/categories/name/${category}`).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                findPosts(data.id);
            });
        }
        else{
            alert("Error: " + response.statusText);
        }
    }).catch(function(error){
          alert("Unable to find category id!");
    });
}

function findPosts(id){
    fetch(`/api/posts/search/${id}`).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                displayPosts(data);
            });
        }
        else{
            alert("Error: " + response.statusText);
        }
    }).catch(function(error){
        alert("Unable to find posts!");
    });
}

function displayPosts(posts){
    categoryPostsEl.textContent = "";

    var headerEl = document.createElement("h2");
    headerEl.textContent = `Displaying posts for category: ${posts[0].category.category_name}`

    var cardHolderEl = document.createElement("div");

    for(var i = 0; i < posts.length; i ++){
        const post = posts[i];

        var cardEl = document.createElement("div");
        cardEl.classList = "card col-md";

        var cardHeaderEl = document.createElement("div");
        cardHeaderEl.classList = "card-header text-center bg-white text-dark";

        var cardTitleEl = document.createElement("h1");
        cardTitleEl.classList = "card-title";
        cardTitleEl.textContent = post.title; 

        var createdByEl = document.createElement("h5");
        createdByEl.classList = "card-text";
        createdByEl.innerHTML = `created by ${post.user.username} on ${format_date(post.created_at)} in ${post.category.category_name}` 

        cardHeaderEl.appendChild(cardTitleEl);
        cardHeaderEl.appendChild(createdByEl);

        var cardBodyEl = document.createElement("div");
        cardBodyEl.classList = "card-body bg-white text-dark";

        var postTextEl = document.createElement("p");
        postTextEl.classList = "card-text";
        postTextEl.textContent = post.post_text;

        cardBodyEl.appendChild(postTextEl);

        cardEl.appendChild(cardHeaderEl);
        cardEl.appendChild(cardBodyEl);

        cardHolderEl.appendChild(cardEl);
    }

    categoryPostsEl.appendChild(headerEl);
    categoryPostsEl.appendChild(cardHolderEl);
}

function format_date(date){
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date
    ).getFullYear()}`;
}
  
document.querySelector('.search-form').addEventListener('submit', searchFormHandler);