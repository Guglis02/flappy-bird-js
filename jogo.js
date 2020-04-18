console.log('Flappy Bird')

let frames = 0;

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav'

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');
contexto.imageSmoothingEnabled = false;

function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = 350;

    if(flappyBirdY >= chaoY) {
        return true;
    } else {
        return false
    } 
}

// [Player]
function criaFlappyBird() {
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
        pulo: 4.6,
        pula(){
            console.log('Pulando');
            flappyBird.velocidade = - flappyBird.pulo
        },
        atualiza() {
            if(fazColisao(flappyBird, globais.chao)) {
                console.log('   Bateu   ');
                som_HIT.play();

                setTimeout(() => {mudaParaTela(Telas.INICIO);}, 500);
                return;
            };
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade 
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        movimentos: [
            { spriteX: 0, spriteY: 0, }, // Asa pra cima
            { spriteX: 0, spriteY: 13, }, // Asa no meio
            { spriteX: 0, spriteY: 26, }, // Asa pra baixo
            { spriteX: 0, spriteY: 13, }, // Asa no meio
        ],
        frameAtual: 0,
        atualizaOFrameAtual() {
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if (passouOIntervalo) {
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao;
            }
        },
        desenha() {
            flappyBird.atualizaOFrameAtual();
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];

            contexto.drawImage(
                sprites, 
                spriteX, spriteY,   // Distância do recorte referente ao canto superior esquerdo
                flappyBird.largura, flappyBird.altura, // Tamanho do recorte no sprite
                flappyBird.x, flappyBird.y, // Posição do recorte no canvas
                flappyBird.resizeX, flappyBird.resizeY, // Tamanho do recorte no canvas
            );
        }
    }
    return flappyBird;
}

// [Mensagem Get Ready]
const mensagemGetReady = {
    spriteX: 160,
    spriteY: 8,
    largura: 87,
    altura: 79,
    x: 75,
    y: 160,
    resizeX: 174,
    resizeY: 158,
    desenha() {
        contexto.drawImage(
            sprites, 
            mensagemGetReady.spriteX, mensagemGetReady.spriteY,  
            mensagemGetReady.largura, mensagemGetReady.altura, 
            mensagemGetReady.x, mensagemGetReady.y, 
            mensagemGetReady.resizeX, mensagemGetReady.resizeY, 
        );
    }
}

// [Chão]
function criaChao() {
    const chao = {
        spriteX: 0,
        spriteY: 39,
        largura: 154,
        altura: 56,
        x: 0,
        y: canvas.height - 112,
        resizeX: 308,
        resizeY: 112,
        atualiza() {
            // Movimento do chão
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2 + 7;
            const movimentacao = chao.x - movimentoDoChao;
            chao.x = movimentacao % repeteEm;
        },
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
        },
    }
    return chao;
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

//
//  [Telas]
//
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;

    if(telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
}

const Telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
        },
        desenha() {
            planoDeFundo.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
            mensagemGetReady.desenha();
        },
        click(){
            mudaParaTela(Telas.JOGO);
        },
        atualiza() {
            globais.chao.atualiza();
        }
    }
};

Telas.JOGO = {
    desenha() {
        planoDeFundo.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
    },
    click(){
        globais.flappyBird.pula();
    },
    atualiza(){
        globais.flappyBird.atualiza();
        globais.chao.atualiza();
    }
};

function loop() { // Faz os quadros serem desenhados repetidamente
    
    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames + 1;
    requestAnimationFrame(loop);
}

window.addEventListener('click', function () {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});

mudaParaTela(Telas.INICIO);
loop();