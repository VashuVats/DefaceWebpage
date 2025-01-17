const muteButton = document.getElementById("mute-button");
const audio = document.getElementById("audio");

muteButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }

  if (audio.muted) {
    audio.muted = false;
    muteButton.textContent = "🔇";
  } else {
    audio.muted = true;
    muteButton.textContent = "🔊";
  }
});

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const matrixDiv = document.getElementById('matrix');
matrixDiv.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*(){}[]<>?|';
const charArray = characters.split('');
const fontSize = 18;
const columns = Math.floor(canvas.width / fontSize); 

const drops = Array(columns).fill(0);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0'; 
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.992) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

function animate() {
    requestAnimationFrame(animate);
    drawMatrix();
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();



// Get references to the progress bar, text, and alert container
const hackProgress = document.getElementById('hackProgress');
const progressText = document.getElementById('progressText');
const alertsContainer = document.getElementById('alerts');

// Function to simulate the hacking progress
let progress = 0;
function simulateHackProgress() {
    const interval = setInterval(() => {
        if (progress < 100) {
            progress += 1; // Increase progress
            hackProgress.value = progress;
            progressText.textContent = `Hacking in progress... ;) ${progress}%`;
        } else {
            clearInterval(interval);
            progressText.textContent = "Hack Complete!";
            showAlerts(); // Trigger alerts after the hack is complete
        }
    }, 80); // Adjust the speed here to make it slower or faster
}

// Function to show fake alerts after hack is complete
function showAlerts() {
    alertsContainer.style.display = 'block'; // Make alerts visible
    const fakeAlerts = [
        "Injecting payload...",
        "Bypassing security protocols...",
        "Accessing server...",
        "Extracting data...",
        "Hack successful. Proceeding with data transfer..."
    ];

    let alertIndex = 0;
    const alertInterval = setInterval(() => {
        if (alertIndex < fakeAlerts.length) {
            const alertMessage = document.createElement('p');
            alertMessage.textContent = fakeAlerts[alertIndex];
            alertsContainer.appendChild(alertMessage);
            alertIndex++;
        } else {
            clearInterval(alertInterval);
        }
    }, 2000); // New alert every 1.5 seconds
}

// Start the hack simulation when the page loads
window.onload = simulateHackProgress;
