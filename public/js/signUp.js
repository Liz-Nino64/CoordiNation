const signUpFormHandler = async (event) => {
// Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    // Send the e-mail and password to the server
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });


    if (response.ok) {

      // const userData = await response.json();

      console.log('Signed up Successfully!', response);

      document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up');
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signUpFormHandler);