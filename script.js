// Selectăm elementele din HTML
const chatBox = document.getElementById("chat-box");
const optionsContainer = document.getElementById("options-container");

// Sunete pentru mesajele primite și trimise
const receiveSound = new Audio("receive.mp3");
const sendSound = new Audio("send.mp3");

// Linkul către poza NPC-ului
const npcImage = '<img src="npc.png" width="40" height="40" style="border-radius:50%;">';

// Conversația dintre NPC și utilizator
const conversation = [
    { npc: "Bad things are going to happen soon.", options: ["What? What do you mean by that?", "Uhm...", "Who are you?"] },
    { npc: "Soon you're going to receive a call", options: ["Tell me what happened!", "You're scaring me.", "From who?"] },
    { npc: "Now it's not the time for explanations or questions.", options: ["I need to know!", "Stop playing games.", "Just tell me."] },
    { npc: "You''l find out soon.", options: ["What are you even talking about?", "Oh come on!", "Just say it."] },
    { npc: "Don't say I didn't warn you...", options: ["Huh...", "You're crazy!", "What the hell..."] }
];

let step = 0;

// Funcție pentru afișarea mesajului NPC
function addNpcMessage(text) {
    setTimeout(() => {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", "npc-message");
        messageDiv.innerHTML = npcImage + text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        receiveSound.play();
    }, 500);
}

// Funcție pentru afișarea mesajului utilizatorului
function addUserMessage(text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "user-message");
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    sendSound.play();
}

// Funcție pentru afișarea opțiunilor de răspuns
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

// Funcție care gestionează alegerea utilizatorului și continuă conversația
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

// Funcție pentru a începe conversația
function startChat() {
    addNpcMessage(conversation[0].npc);
    showOptions(conversation[0].options);
}

// Inițiem chat-ul
startChat();
