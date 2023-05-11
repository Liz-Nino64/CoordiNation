const createTaskHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const taskname = document.querySelector('#taskName').value.trim();
  const description = document.querySelector('#taskDescription').value.trim();
  const status = document.querySelector('#taskStatus').value.trim();
  const priority = document.querySelector('#priority').value.trim();
  const dateDue = document.querySelector('#dateDue').value.trim();

  if (taskname && description && status && priority && dateDue) {
    // Send the name, e-mail, and password to the server
    const response = await fetch('/api/task/create', {
      method: 'POST',
      body: JSON.stringify({ taskname, description, status, priority, dateDue }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        const newTask = await response.json();

        console.log(newTask)
      // const userData = await response.json();

      console.log('created task! Successfully!', response);

      document.location.replace(`/dashboard/${newUser.user.id}`);
    } else {
      alert('Failed to create Task!');
    }
  }
};

// Links function to signup form
document
  .querySelector('.submit-box');
document.querySelector('#submitBtn').addEventListener('click', createTaskHandler);
