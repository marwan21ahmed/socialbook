function readData() {
    // Assuming you want to fetch user data as well, update the URL accordingly
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => {
        users = json;
        currentUserData = users[0];
        console.log(users);
      });
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        posts = json;
        numberOfPost = posts[posts.length - 1].id;
        console.log(posts);
      });
  }

  function writeData(data) {
    // Assuming you want to write user data as well, update the URL accordingly
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
  
  // Function to handle form submission
  function handleFormSubmission(event) {
    event.preventDefault();
  
    // Get form inputs
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('emailAddress').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    // Assuming you want to create a new user
    const newUser = {
      username: username,
      email: email,
      password: password,
    };
  
    // Add the new user to the users array
    users.push(newUser);
  
    // Update user data on the server
    writeData(newUser);
  
    // Reset the form
    document.getElementById('createAccount').reset();
  }
  
  // Attach the handleFormSubmission function to the form's submit event
  document.getElementById('createAccount').addEventListener('submit', handleFormSubmission);
  
  // Add any other functions or modifications as needed
  // ...
  
  // Call readData to fetch initial data when the page loads
  readData();