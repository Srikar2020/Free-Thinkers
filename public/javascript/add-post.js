async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const category = document.querySelector('input[name="category"]').value;
    const post_text = document.querySelector('input[name="post-text"]').value;
    const user_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    fetch(`/api/categories/name/${category}`).then(function(response) {
      if(response.ok) {
          response.json().then(function(data) {
              createPost(title, post_text, data.id, user_id);
          });
      }
      else{
          alert("Error: " + response.statusText);
      }
    }).catch(function(error){
        alert("Unable to connect to Category API");
    });
}

async function createPost(title, post_text, category_id, user_id) {
  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_text,
      category_id,
      user_id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);