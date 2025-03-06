// Selectăm elementele din HTML
const chatBox = document.getElementById("chat-box");
const optionsContainer = document.getElementById("options-container");

// Linkul către poza NPC-ului (asigură-te că e corect)
const npcImage = '<img src="npc.png" width="40" height="40" style="border-radius:50%; margin-right:5px;">';

// Conversația dintre NPC și utilizator
const conversation = [
    { npc: "Something is about to happen", options: ["What? What do you mean by that?", "Uhm...", "Who are you?"] },
    { npc: "Soon, you'll receive a call from someone", options: ["From who?", "Can you stop and just tell me who is this 'someone'?", "Someone?"] },
    { npc: "You don’t want to know. Trust me.", options: ["I need to know!", "Stop playing games.", "Just tell me."] },
    { npc: "You will know once you get that call. Now stop asking questions.", options: ["Why can't I know now?", "But I don't understand!", "Just say it!"] },
    { npc: "Don't say I didn't warn you.", options: ["What do you mean?", "What's the big deal here though??", "WARN ME ABOUT WHAT?"] }
];

let step = 0;

// Funcție pentru afișarea mesajului NPC
function addNpcMessage(text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "npc-message");
    messageDiv.innerHTML = npcImage + text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Funcție pentru afișarea mesajului utilizatorului
function addUserMessage(text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "user-message");
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
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
    addUserMessage(userText); // Afișează răspunsul utilizatorului
    step++; // Trecem la pasul următor

    if (step < conversation.length) {
        setTimeout(() => {
            addNpcMessage(conversation[step].npc);
            showOptions(conversation[step].options);
        }, 1000); // NPC-ul răspunde după 1 secundă
    } else {
        setTimeout(() => addNpcMessage("This conversation is over."), 1000);
        optionsContainer.innerHTML = ""; // Ascundem butoanele după finalizare
    }
}

// Funcție pentru a începe conversația
function startChat() {
    addNpcMessage(conversation[0].npc);
    showOptions(conversation[0].options);
}

// Inițiem chat-ul când pagina se încarcă
startChat();
