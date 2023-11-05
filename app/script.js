// Initialize a new WebSocket connection to the server at the specified URL.
// const ws = new WebSocket('ws://localhost:3003');
const ws = new WebSocket('wss://secret-tor-09871-56aacdfc672e.herokuapp.com');

// Get references to DOM elements that will display messages and accept user input.
const messagesList = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const userNameInput = document.getElementById('userName');
const userList = document.getElementById('userList');

// Event handler for receiving messages through the WebSocket connection.
ws.onmessage = function (event) {
    // The data from the event is a Blob, so convert it to text first.
    event.data.text().then(function (text) {
        try {
            const messageData = JSON.parse(text);
            // Check if the message has text and create a list item to display it.
            if (messageData.text) {
                const message = document.createElement('li');
                message.textContent = messageData.text;
                messagesList.appendChild(message);
            }
        } catch (error) {
            // If parsing fails, log the error to the console.
            console.error('Error parsing message as JSON:', error);
        }
    }).catch(function (error) {
        // If reading the Blob as text fails, log the error to the console.
        console.error('Error reading Blob as text:', error);
    });
};

// Function to send a message through the WebSocket.
function sendMessage() {
    const message = messageInput.value;
    // Send the message as a JSON string.
    ws.send(JSON.stringify({text: message}));
    // Clear the input after sending.
    messageInput.value = '';
}

// Function to create a new user via a POST request to the server.
function createUser() {
    const name = userNameInput.value;
    fetch('/api/resource', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: name}),
    })
        .then(response => response.json())
        .then(data => {
            console.log('User created:', data);
            userNameInput.value = '';
            // Refresh the user list to include the new user.
            getAllUsers();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Function to retrieve and display all users from the server.
function getAllUsers() {
    fetch('/api/resource')
        .then(response => response.json())
        .then(users => {
            userList.innerHTML = '';
            users.forEach(user => {
                let li = document.createElement('li');
                li.textContent = user.name + ' - ' + new Date(user.date).toLocaleString();
                let deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                // Attach an event handler to the delete button for removing users.
                deleteBtn.onclick = function () {
                    deleteUser(user._id);
                };
                li.appendChild(deleteBtn);
                userList.appendChild(li);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Function to delete a user by making a DELETE request to the server.
function deleteUser(userId) {
    console.log('Deleting user with ID:', userId);
    fetch('/api/resource/' + userId, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            console.log('User deleted:', data);
            // Refresh the user list to reflect the deletion.
            getAllUsers();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Get and display the list of all users when the script loads.
getAllUsers();
