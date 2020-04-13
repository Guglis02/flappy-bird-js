console.log('Flappy Bird')

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');
contexto.imageSmoothingEnabled = false;

// [Player]
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 17,
    altura: 12,
    x: 50,
    y: 50,
    resizeX: 33,
    resizeY: 24,
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade 
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    desenha() {
        contexto.drawImage(
            sprites, 
            flappyBird.spriteX, flappyBird.spriteY,   // Distância do recorte referente ao canto superior esquerdo
            flappyBird.largura, flappyBird.altura, // Tamanho do recorte no sprite
            flappyBird.x, flappyBird.y, // Posição do recorte no canvas
            flappyBird.resizeX, flappyBird.resizeY, // Tamanho do recorte no canvas
        );
    }
}

// [Chão]
const chao = {
    spriteX: 0,
    spriteY: 39,
    largura: 154,
    altura: 56,
    x: 0,
    y: canvas.height - 112,
    resizeX: 308,
    resizeY: 112,
    desenha() {
        contexto.drawImage(
            sprites, 
            chao.spriteX, chao.spriteY,   // Distância do recorte referente ao canto superior esquerdo
            chao.largura, chao.altura, // Tamanho do recorte no sprite
            chao.x, chao.y, // Posição do recorte no canvas
            chao.resizeX, chao.resizeY, // Tamanho do recorte no canvas
        );
        // "Segundo chão" para completar o preenchimento da tela
        contexto.drawImage(
            sprites, 
            chao.spriteX, chao.spriteY,   
            chao.largura, chao.altura, 
            (chao.x + chao.largura), chao.y, 
            chao.resizeX, chao.resizeY, 
        );
    }
}

// [Plano de Fundo]
const planoDeFundo = {
    spriteX: 0,
    spriteY: 154,
    largura: 144,
    altura: 102,
    x: 0,
    y: canvas.height - 204,
    resizeX: 288,
    resizeY: 204,
    desenha() {
        contexto.fillStyle = '#70C5CE';
        contexto.fillRect(0,0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites, 
            planoDeFundo.spriteX, planoDeFundo.spriteY,   
            planoDeFundo.largura, planoDeFundo.altura, 
            planoDeFundo.x, planoDeFundo.y, 
            planoDeFundo.resizeX, planoDeFundo.resizeY, 
        );
        contexto.drawImage(
            sprites, 
            planoDeFundo.spriteX, planoDeFundo.spriteY,   
            planoDeFundo.largura, planoDeFundo.altura, 
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y, 
            planoDeFundo.resizeX, planoDeFundo.resizeY, 
        );
    }
}

function loop() { // Faz os quadros serem desenhados repetidamente
    flappyBird.atualiza();
    
    planoDeFundo.desenha();
    chao.desenha();
    flappyBird.desenha();
    
    requestAnimationFrame(loop);
}

loop();