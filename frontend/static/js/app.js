document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
    // URL của Rasa server
    const RASA_SERVER_URL = 'http://localhost:5005/webhooks/rest/webhook';
    
    // Thêm tin nhắn vào chat
    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender + '-message');
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addQuickReplies(buttons) {
        const container = document.createElement('div');
        container.className = 'quick-replies';

        buttons.forEach(text => {
            const button = document.createElement('button');
            button.textContent = text;
            button.addEventListener('click', () => {
                addMessage('user', text);
                sendMessageToRasa(text);
                container.remove();
            });
            container.appendChild(button);
        });

        chatMessages.appendChild(container);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addMedicalCard(title, description, imageUrl) {
        const card = document.createElement('div');
        card.className = 'medical-card';

        card.innerHTML = `
        <img src="${imageUrl}" alt="${title}">
        <h3>${title}</h3>
        <p>${description}</p>
    `;

        chatMessages.appendChild(card);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Gửi tin nhắn đến Rasa
    async function sendMessageToRasa(message) {
        try {
            const response = await fetch(RASA_SERVER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sender: 'user',
                    message: message
                })
            });
            
            const data = await response.json();
            
            // Hiển thị phản hồi từ Rasa
            data.forEach(response => {
                addMessage('bot', response.text);
            });
        } catch (error) {
            console.error('Lỗi:', error);
            addMessage('bot', 'Xin lỗi, tôi gặp sự cố khi xử lý yêu cầu của bạn.');
        }
    }
    
    // Xử lý khi nhấn nút Gửi hoặc Enter
    function handleSend() {
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            userInput.value = '';
            sendMessageToRasa(message);
        }
    }
    
    sendButton.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSend();
        }
    });
    
    // Tin nhắn chào mừng ban đầu
    setTimeout(() => {
        addMessage('bot', 'Xin chào! Tôi là trợ lý y tế. Tôi có thể giúp gì cho bạn hôm nay?');
    }, 500);
});