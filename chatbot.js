<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chatbot</title>
    <style>
        #chatBox {
            display: none;
            flex-direction: column;
            position: fixed;
            bottom: 0;
            right: 0;
            width: 300px;
            height: 400px;
            border: 1px solid #ccc;
            background: #fff;
        }
        #chatLog {
            flex-grow: 1;
            padding: 10px;
            overflow-y: auto;
        }
        .message {
            padding: 5px;
            margin: 5px;
            border-radius: 5px;
        }
        .user {
            background-color: #dcf8c6;
            text-align: right;
        }
        .bot {
            background-color: #f1f1f1;
            text-align: left;
        }
        .typing {
            background-color: #f1f1f1;
            text-align: left;
            font-style: italic;
        }
        .quick-replies {
            padding: 10px;
            text-align: center;
        }
        .quick-reply {
            padding: 5px 10px;
            margin: 5px;
            border: none;
            background-color: #007bff;
            color: #fff;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <button id="chatBtn" onclick="toggleChat()">Chat</button>
    <div id="chatBox">
        <div id="chatHeader">Chat with us!</div>
        <div id="chatLog"></div>
        <div style="display: flex; padding: 10px;">
            <input id="userInput" type="text" placeholder="Type a message..." style="flex-grow: 1; padding: 10px; border: none; border-radius: 5px 0 0 5px;">
            <button id="sendBtn" style="padding: 10px; border: none; background: #007bff; color: #fff; border-radius: 0 5px 5px 0; cursor: pointer;">Send</button>
        </div>
    </div>

    <script>
        let userName = '';
        let askingName = true;

        document.addEventListener('DOMContentLoaded', () => {
            const chatBox = document.getElementById('chatLog');
            chatBox.innerHTML += `<div class="message bot">Hi! I'm MAY CONNECT BOT. What's your name?</div>`;
            chatBox.scrollTop = chatBox.scrollHeight;
        });

        function toggleChat() {
            document.getElementById('chatBox').style.display = document.getElementById('chatBox').style.display === 'flex' ? 'none' : 'flex';
        }

        function showTypingIndicator() {
            const chatBox = document.getElementById('chatLog');
            chatBox.innerHTML += `<div class="message bot typing">...</div>`;
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        function showQuickReplies() {
            const chatBox = document.getElementById('chatLog');
            const quickReplies = ['Services', 'Contact', 'Help'];
            const quickRepliesHtml = quickReplies.map(reply => `<button class="quick-reply">${reply}</button>`).join('');
            chatBox.innerHTML += `<div class="quick-replies">${quickRepliesHtml}</div>`;
            chatBox.scrollTop = chatBox.scrollHeight;
            // Add event listeners for quick replies
            const quickReplyButtons = document.querySelectorAll('.quick-reply');
            quickReplyButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const message = button.textContent;
                    sendMessage(message);
                });
            });
        }

        async function sendMessage(message) {
            if (!message) {
                message = document.getElementById('userInput').value.trim();
                if (!message) return;
            }
            const chatBox = document.getElementById('chatLog');
            chatBox.innerHTML += `<div class="message user">${message}</div>`;
            document.getElementById('userInput').value = '';
            chatBox.scrollTop = chatBox.scrollHeight;
            showTypingIndicator();
            const botResponse = await getBotResponse(message);
            // Remove the typing indicator
            const typingIndicator = document.querySelector('.typing');
            if (typingIndicator) {
                typingIndicator.remove();
            }
            chatBox.innerHTML += `<div class="message bot">${botResponse}</div>`;
            showQuickReplies();
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        function getBotResponse(message) {
            message = message.toLowerCase();
            if (askingName) {
                userName = message;
                askingName = false;
                return `Nice to meet you ${userName}! How May i Help You?`;
            }
            if (message.includes('services')) {
                return `We offer web dev, mobile apps, API docs, CHATBOT, and software solutions. Contact us at info@mayconnect.com or WhatsApp: <a href="https://wa.me/2349112823771" target="_blank">+234 911 282 3771</a>, <a href="https://wa.me/2348117988561" target="_blank">+234 811 798 8561</a> for more info.`;
            }
            if (message.includes('contact')) return 'Email us at info@mayconnect.com | WhatsApp: <a href="https://wa.me/2349112823771" target="_blank">+234 911 282 3771</a>, <a href="https://wa.me/2348117988561" target="_blank">+234 811 798 8561</a>';
            if (message.includes('help')) return `
Need help? 🤔
- Type "services" for our services
- Type "contact" for contact info
- Check the FAQs from the website
- Escalate to human support: Email info@mayconnect.com or WhatsApp <a href="https://wa.me/2349112823771" target="_blank">+234 911 282 3771</a> / <a href="https://wa.me/2348117988561" target="_blank">+234 811 798 8561</a>
- Provide feedback: We'll love to hear from you! 😊
- Troubleshooting tips: Check our blog for common issues and solutions
`;
            if (message.includes('clear')) {
                document.getElementById('chatLog').innerHTML = '';
                askingName = true;
                return 'Chat cleared! Hi! I\'m MAY CONNECT BOT. What\'s your name?';
            }
            return `Sorry, I didn't get that. For more support, contact us at info@mayconnect.com or WhatsApp: <a href="https://wa.me/2349112823771" target="_blank">+234 911 282 3771</a>, <a href="https://wa.me/2348117988561" target="_blank">+234 811 798 8561</a>`;
        }

        document.getElementById('sendBtn').addEventListener('click', () => sendMessage());
        document.getElementById('userInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    </script>
</body>
</html>