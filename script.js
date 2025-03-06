const chatBox = document.getElementById("chat-box");
const choicesDiv = document.getElementById("choices");
const typingIndicator = document.getElementById("typing-indicator");
const messageSound = document.getElementById("message-sound");

// Poza NPC
const npcImage = '<img src="https://github.com/imjakedonfort/unknown/blob/main/npc.png.jpeg" width="40" height="40" style="border-radius:50%; margin-right:5px;">';

// Mesaje predefinite
const dialogue = [
    { npc: "Big mistake for her going into the forest." },
    { user: ["What? What do you mean by that?", "Uhm...", "Who are you?"] },
    { npc: "You don't need to know. But she does." },
    { user: ["Who is 'she'?", "I'm confused...", "Tell me more."] },
    { npc: "It's too late to turn back now." },
    { user: ["Turn back from what?", "You're scaring me.", "I need more details."] },
    { npc: "You'll understand soon enough." },
    { user: ["I don't like this.", "Please explain!", "Are you threatening me?"] },
    { npc: "Stay out of the forest. Or don't. Your choice." },
    { user: ["I won't go there!", "This is crazy.", "I need answers!"] },
    { npc: "Time's up. Goodbye." }
];

let step = 0;

// Funcție pentru a simula tastarea NPC-ului
function showTypingIndicator(callback) {
    typingIndicator.classList.remove("hidden");
    setTimeout(() => {
        typingIndicator.classList.add("hidden");
        callback();
    }, 1500); // 1.5 secunde de "typing..."
}

// Funcție pentru a adăuga mesajul NPC-ului
function addNpcMessage(text) {
    showTypingIndicator(() => {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", "npc-message");
        messageDiv.innerHTML = npcImage + text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        messageSound.play();
    });
}

// Funcție pentru mesajele utilizatorului
function addUserMessage(text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "user-message");
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    messageSound.play();
}

// Funcție pentru generarea răspunsurilor
function generateChoices(choices) {
    choicesDiv.innerHTML = "";
    choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.classList.add("choice-btn");
        button.onclick = () => nextStep(choice);
        choicesDiv.appendChild(button);
    });
}

// Funcție pentru a continua conversația
function nextStep(userResponse) {
    if (step % 2 === 0) {
        addUserMessage(userResponse);
    }
    step++;
    
    setTimeout(() => {
        if (step < dialogue.length) {
            if (dialogue[step].npc) {
                addNpcMessage(dialogue[step].npc);
            } else {
                generateChoices(dialogue[step].user);
            }
        } else {
            choicesDiv.innerHTML = "<p style='color:gray; text-align:center;'>Chat closed.</p>";
        }
    }, 2000);
}

// Începem conversația
addNpcMessage(dialogue[0].npc);
generateChoices(dialogue[1].user);
