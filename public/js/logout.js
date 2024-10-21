const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    const data = await response.json();
    alert(data.message);
    document.location.replace('/');
  } else {
    const data = await response.json();
    alert(data.message || 'Failed to log out. Please try again.');
  }
};

document.querySelector('#logout').addEventListener('click', logout);
