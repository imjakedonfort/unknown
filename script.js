const chatBox = document.getElementById("chat-box");
const optionsContainer = document.getElementById("options-container");

const npcImage = '<img src="npc.png" width="40" height="40" style="border-radius:50%; margin-right:5px;">';

const conversation = [
    { npc: "Someone is going to call you soon", options: ["What?", "Uhm...", "Why?"] },
    { npc: "You will see soon what's going to happen.", options: ["Happen what?", "Could you maybe elaborate?", "Who the hell are you?"] },
    { npc: "You don’t want to know. Trust me.", options: ["I need to know!", "Stop playing games.", "Just tell me."] },
    { npc: "Fine. But you won’t like the answer.", options: ["I can handle it.", "Try me.", "Just say it."] },
    { npc: "Something really bad is coming", options: ["What do you mean?", "Bad like what?", "That's not an answer!"] }
];

let step = 0;

function addNpcMessage(text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "npc-message");
    messageDiv.innerHTML = npcImage + text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addUserMessage(text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "user-message");
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showOptions(options) {
    optionsContainer.innerHTML = "";
    options.forEach((optionText) => {
        const button = document.createElement("button");
        button.innerText = optionText;
        button.classList.add("option-button");
        button.onclick = () => handleUserChoice(optionText);
        optionsContainer.appendChild(button);
    });
}

function handleUserChoice(userText) {
    addUserMessage(userText);
    step++;

    if (step < conversation.length) {
        setTimeout(() => {
            addNpcMessage(conversation[step].npc);
            showOptions(conversation[step].options);
        }, 1000);
    } else {
        setTimeout(() => addNpcMessage("This conversation is over."), 1000);
        optionsContainer.innerHTML = "";
    }
}

function startChat() {
    addNpcMessage(conversation[0].npc);
    showOptions(conversation[0].options);
}

startChat();
