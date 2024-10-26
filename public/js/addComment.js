const commentInput = document.getElementById('comment');
const titleInput = document.getElementById('title');
const commentForm = document.querySelector('#comment-form');


function createComment(event) {
    event.preventDefault();

    let comment = commentInput.value;
    console.log(comment);
    if(comment && title)  {
        fetch('/api/techs/comment', { 
            method: 'POST', 
            body: JSON.stringify({ title, comment } )
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        }).catch(err => {
            console.log("err: ", err)
        })
    }
}


commentForm.addEventListener('submit', createComment);