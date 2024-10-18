const commmentInput = documet.getElementById('comment');
const titleInput = documet.getElementById('title');
const commmentForm = documet.querySelector('comment-form');


function createComment(event) {
    event.preventDefault();

    let comment = commmentInput.value;
    console.log(comment);
    if(comment && title)  {
        fetch('/api/tech/comment', { 
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


commmentForm.addEventListener('submit', createComment);