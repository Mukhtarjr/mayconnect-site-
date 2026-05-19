console.log("Website Loaded");
function toggleChat() {
    document.getElementById('chatBox').style.display = 
    document.getElementById('chatBox').style.display === 'flex' ? 'none' : 'flex';
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    if (message) {
        document.getElementById('chatLog').innerHTML += `<p>You: ${message}</p>`;
        // Add bot response logic here
        input.value = '';
    }
}

document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});