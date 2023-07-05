export default class Player {
    constructor(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.speed = 200; // Vitesse en pixels par seconde
        this.isMovingRight = false;
        this.isMovingLeft = false;
        this.lastFrameTime = null;
        this.element = document.createElement('div');
        this.elementImg = document.createElement('img');
        this.elementImg.src = '../assets/player.png';
        this.element.classList.add('player');
        this.elementImg.classList.add('player_static');
        this.element.width = 173;
        this.element.height = 123;
        this.element.style.transform = 'rotateY(180deg)';
        this.element.style.width = this.element.width + 'px';
        this.element.style.height = this.element.height + 'px';
        this.element.style.left = this.positionX + 'px';
        this.element.style.bottom = this.positionY + 'px';
        this.element.appendChild(this.elementImg);
    }

    move() {
        let arrMovement = [];
        let canPressArrowRight = true;
        let canPressArrowLeft = true;
        document.addEventListener('keydown', (e) => {

            if (e.key === 'ArrowRight' && canPressArrowRight) {
                canPressArrowRight = false;
                arrMovement.unshift(e.key);
            }

            if (e.key === 'ArrowLeft' && canPressArrowLeft) {
                canPressArrowLeft = false;
                arrMovement.unshift(e.key);
            }

            if (arrMovement[0] === 'ArrowRight') {
                this.element.style.transform = 'rotateY(180deg)';
                this.isMovingLeft = false;
                this.isMovingRight = true;
                this.elementImg.classList.add('player_movement');
            }

            if (arrMovement[0] === 'ArrowLeft') {
                this.element.style.transform = 'rotateY(0deg)';
                this.isMovingRight = false;
                this.isMovingLeft = true;
                this.elementImg.classList.add('player_movement');
            }

        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowRight') {
                arrMovement.splice(arrMovement.indexOf('ArrowRight'), 1);
                canPressArrowRight = true;
                this.isMovingRight = false;
                this.elementImg.classList.remove('player_movement');

                if (arrMovement[0] === 'ArrowLeft') {
                    this.element.style.transform = 'rotateY(0deg)';
                    this.isMovingRight = false;
                    this.isMovingLeft = true;
                    this.elementImg.classList.add('player_movement');
                }
            }

            if (e.key === 'ArrowLeft') {
                arrMovement.splice(arrMovement.indexOf('ArrowLeft'), 1);
                this.isMovingLeft = false;
                canPressArrowLeft = true;
                this.elementImg.classList.remove('player_movement');

                if (arrMovement[0] === 'ArrowRight') {
                    this.element.style.transform = 'rotateY(180deg)';
                    this.isMovingLeft = false;
                    this.isMovingRight = true;
                    this.elementImg.classList.add('player_movement');
                }
            }

        });

        this.lastFrameTime = performance.now();
        requestAnimationFrame(this.update.bind(this));
    }

    skills() {
        document.addEventListener('keydown', (e) => {
            if (e.key === "x") {
                this.isMovingLeft = false;
                this.isMovingRight = false;
                this.elementImg.classList.add('player_attack');
                setTimeout(() => {
                    this.elementImg.classList.remove('player_attack');
                }, 600)
            }
        })
    }

    jump() {
        let y = this.positionY; // Position verticale du personnage
        let jumpVelocity = 10; // Vitesse initiale du saut
        let gravity = 0.5; // Force de gravité
        let isJumping = false; // Indicateur si le personnage est en train de sauter

        document.addEventListener('keydown', (e) => {
            if (e.key === 'c' && !isJumping) {
                isJumping = true;

                const jumpInterval = setInterval(() => {

                    // Calculer la nouvelle position verticale du personnage
                    y += jumpVelocity;
                    jumpVelocity -= gravity;

                    // Si le personnage touche le sol
                    if (y <= this.positionY) {
                        y = this.positionY;
                        jumpVelocity = 10;
                        isJumping = false;
                        clearInterval(jumpInterval);
                    }

                    this.element.style.bottom = y + 'px';
                }, 10);
            }
        });
    }

    update(currentTime) {
        const deltaTime = (currentTime - this.lastFrameTime) / 1000; // Convertir en secondes
        this.lastFrameTime = currentTime;

        if (this.isMovingRight) {
            this.positionX += this.speed * deltaTime;
        }

        if (this.isMovingLeft) {
            this.positionX -= this.speed * deltaTime;
        }

        this.element.style.left = this.positionX + 'px';

        requestAnimationFrame(this.update.bind(this));
    }
}
