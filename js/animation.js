function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameScene').style.display = 'block';
}

function openTent(tentNumber) {
    document.getElementById(`tent${tentNumber}`).style.display = 'block';
}

function closeTent(tentNumber) {
    document.getElementById(`tent${tentNumber}`).style.display = 'none';
}

let score = 0;

function sortTrash(type) {
    const scoreElement = document.getElementById('score');
    score += 10;
    scoreElement.textContent = score;
    
    const bin = document.querySelector(`.bin-${type}`);
    bin.style.transform = 'scale(1.2)';
    setTimeout(() => {
        bin.style.transform = 'scale(1)';
    }, 300);
}

document.addEventListener('click', function(event) {
    const tentScenes = document.querySelectorAll('.tent-scene');
    tentScenes.forEach(scene => {
        if (event.target === scene) {
            scene.style.display = 'none';
        }
    });
});

document.querySelectorAll('.equipment-item, .memory-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 300);
    });
});

function createFloatingTrash() {
    const scene = document.querySelector('.recycling-scene');
    if (!scene) return;

    const trashTypes = [
        {type: 'paper', image: 'trash-paper.png'},
        {type: 'plastic', image: 'trash-bottle.png'},
        {type: 'glass', image: 'trash-jar.png'}
    ];
    
    setInterval(() => {
        if (Math.random() > 0.5) {
            const trash = trashTypes[Math.floor(Math.random() * trashTypes.length)];
            const trashElement = document.createElement('div');
            trashElement.className = `flying-trash ${trash.type}-trash`;
            trashElement.innerHTML = `<img src="images/${trash.image}" alt="${trash.type}">`;
            trashElement.style.left = Math.random() * 700 + 'px';
            trashElement.style.top = '150px';
            trashElement.style.animationDelay = '0s';
            
            scene.appendChild(trashElement);
            
            setTimeout(() => {
                if (trashElement.parentElement) {
                    trashElement.remove();
                }
            }, 3000);
        }
    }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
    createFloatingTrash();
});
