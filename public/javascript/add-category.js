async function newFormHandler(event) {
    event.preventDefault();
  
    const category_name = document.querySelector('input[name="new-category"]').value;

    if(category_name) {
        fetch(`/api/categories/name/${category_name}`).then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    if(data.id > 0) {
                        alert("Error: Category Already Exists!");
                    }
                });
            }
            else{
                createCategory(category_name);
            }
        }).catch(function(error){
            alert("Unable to retrieve category!");
        });
    }
}

async function createCategory(category_name){
    const response = await fetch(`/api/categories`, {
        method: 'POST',
        body: JSON.stringify({
          category_name
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
  
document.querySelector('.new-category-form').addEventListener('submit', newFormHandler);