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
// script.js
let userName = '';
let askingName = true;
let typing = false;

document.addEventListener('DOMContentLoaded', () => {
  const chatBox = document.getElementById('chatBox');
  chatBox.innerHTML += `<div class="message bot">Hi! I'm MAY CONNECT BOT. What's your name?</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
});

function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById('chatBox');
  chatBox.innerHTML += `<div class="message user">${message}</div>`;
  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  showTyping();
  setTimeout(() => {
    const botResponse = getBotResponse(message);
    hideTyping();
    chatBox.innerHTML += `<div class="message bot">${botResponse}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1000);
}

function getBotResponse(message) {
  message = message.toLowerCase();
  if (askingName) {
    userName = message;
    askingName = false;
    return `You are ${userName}! What would you like to know? (services/contact/help)`;
  }
  if (message.includes('hi') || message.includes('hello')) {
    return `Hi ${userName || 'there'}! How can I help? (services/contact/help)`;
  }
  if (message.includes('services')) {
    return `We offer web dev, mobile apps, API docs, CHATBOT, and software solutions! Did you want anything else from me?`;
  }
  if (message.includes('web dev')) {
    return `We build responsive websites and web apps with modern tech like React, Angular, and Node.js. Want to know more?`;
  }
  if (message.includes('mobile apps')) {
    return `We create native and cross-platform mobile apps for iOS and Android. Want to discuss a project?`;
  }
  if (message.includes('api docs')) {
    return `We write clear API docs to help you integrate with our services. Need help with API integration?`;
  }
  if (message.includes('chatbot')) {
    return `We build custom chatbots for customer support, lead gen, and more. Interested in automating something?`;
  }
  if (message.includes('software solutions')) {
    return `We deliver custom software for businesses, like ERP, CRM, and more. What's your need?`;
  }
  if (message.includes('yes')) {
    return `Great! Let's discuss your project. Can you tell me more about it?`;
  }
  if (message.includes('data project')) {
    return `Sounds like you have a data-related project. Can you share more details about what you need?`;
  }
  if (message.includes('contact')) return 'Email us at info@mayconnect.com | WhatsApp: <a href="https://wa.me/2349112823771" target="_blank">+234 911 282 3771</a>, <a href="https://wa.me/2348117988561" target="_blank">+234 811 798 8561</a>';
  if (message.includes('help')) return 'Ask me about services, contact, or type "clear" to reset chat.';
  if (message.includes('clear')) {
    userName = '';
    askingName = true;
    location.reload();
    return '';
  }
  return `Sorry, I didn't get that. For more support, contact us at info@mayconnect.com or WhatsApp: <a href="https://wa.me/2349112823771" target="_blank">+234 911 282 3771</a>, <a href="https://wa.me/2348117988561" target="_blank">+234 811 798 8561</a>`;
}

function showTyping() {
  const chatBox = document.getElementById('chatBox');
  chatBox.innerHTML += `<div class="message bot typing"><span class="typing-dot">.</span><span class="typing-dot">.</span><span class="typing-dot">.</span></div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

function hideTyping() {
  const chatBox = document.getElementById('chatBox');
  chatBox.innerHTML = chatBox.innerHTML.replace(/<div class="message bot typing">.*?<\/div>/, '');
}