const newFormHandler = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#blog-id').value.trim();
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();

  if (title && content) {
    let response;

    if (id) {
      // If there's an ID, update the existing blog post
      response = await fetch(`/api/techs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      // Otherwise, create a new blog post
      response = await fetch(`/api/techs`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to save blog post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/techs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog post');
    }
  }
};

const editButtonHandler = (event) => {
  if (event.target.classList.contains('edit-btn')) {
    const id = event.target.getAttribute('data-id');
    const title = event.target.getAttribute('data-title');
    const content = event.target.getAttribute('data-content');

    // Populate the form with the existing blog data
    document.querySelector('#blog-id').value = id;
    document.querySelector('#title').value = title;
    document.querySelector('#content').value = content;

    // Change the button text to "Update"
    document.querySelector('#submit-btn').textContent = 'Update';
  }
};

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

  document
  .querySelector('.blog-list')
  .addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-danger')) {
      delButtonHandler(event);  // Handle delete
    } else if (event.target.classList.contains('edit-btn')) {
      editButtonHandler(event);  // Handle edit
    }
  });