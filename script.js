const player = {
    lastClick: { rowN: 0, colN: 0 },
    hoveredCell: { rowH: 0, colH: 0 },
    ganhou: false,
    isAlive: true,
    cellEstourada: false,
    soundOn: true,
    difficultySelected: 'easy',
    digFlagModeOn: false,
    lingua: document.getElementById("idioma").value,
    keyBindMenuOpen: false,
    configMenuOpen: false,
    digModeOn: true,
    runStarted: false,
}

const components = {
    flag: `url(images/flags/${document.getElementById('flag-opt').value}.png)`,
    bomb: `url(images/bombs/${document.getElementById('bomb-opt').value}.png)`,
    explosionSound: [new Audio('sounds/explosao/explosion.mp3'), new Audio('sounds/explosao/agressive.mp3'),
    new Audio('sounds/explosao/sifi.mp3'), new Audio('sounds/explosao/dramatic.mp3')],
    winSound: [new Audio("sounds/win/animado.mp3"), new Audio("sounds/win/yipe.mp3"), new Audio("sounds/win/mario.mp3")],
    numeros: [`url(images/numbers/0.png)`, `url(images/numbers/1.png)`, `url(images/numbers/2.png)`, `url(images/numbers/3.png)`,
        `url(images/numbers/4.png)`, `url(images/numbers/5.png)`, `url(images/numbers/6.png)`, `url(images/numbers/7.png)`,
        `url(images/numbers/8.png)`, `url(images/numbers/9.png)`],
    notif: document.getElementById("notif"),
    logo: document.getElementById("logo"),
}

const stats = {
    cellsDiggedInPlay: 0,
    flagsPlaced: 0,
    timePlayingSeconds: 0,
}

const campo = {
    row1: [
        { element: document.getElementById('r1c1'), flagged: false, hasBomb: false, isDigged: false, bombsClose: 0 },
        { element: document.getElementById('r1c2'), flagged: false, hasBomb: false, isDigged: false, bombsClose: 0 },
        { element: document.getElementById('r1c3'), flagged: false, hasBomb: false, isDigged: false, bombsClose: 0 },
        { element: document.getElementById('r1c4'), flagged: false, hasBomb: false, isDigged: false, bombsClose: 0 },
        { element: document.getElementById('r1c5'), flagged: false, hasBomb: false, isDigged: false, bombsClose: 0 },
        { element: document.getElementById('r1c6'), flagged: false, hasBomb: false, isDigged: false, bombsClose: 0 },
        { element: document.getElementById('r1c7'), flagged: false, hasBomb: false, isDigged: false, bombsClose: 0 },
        { element: document.getElementById('r1c8'), flagged: false, hasBomb: false, isDigged: false, bombsClose: 0 }
    ],
    row2: [...Array(8)].map((_, i) => ({ element: document.getElementById(`r2c${i + 1}`), flagged: false, hasBomb: false, isDigged: false, bombsClose: 0 })),
    row3: [...Array(8)].map((_, i) => ({ element: document.getElementById(`r3c${i + 1}`), flagged: false, hasBomb: false, isDigged: false, bombsClose: 0 })),
    row4: [...Array(8)].map((_, i) => ({ element: document.getElementById(`r4c${i + 1}`), flagged: false, hasBomb: false, isDigged: false, bombsClose: 0 })),
    row5: [...Array(8)].map((_, i) => ({ element: document.getElementById(`r5c${i + 1}`), flagged: false, hasBomb: false, isDigged: false, bombsClose: 0 })),
    row6: [...Array(8)].map((_, i) => ({ element: document.getElementById(`r6c${i + 1}`), flagged: false, hasBomb: false, isDigged: false, bombsClose: 0 })),
    row7: [...Array(8)].map((_, i) => ({ element: document.getElementById(`r7c${i + 1}`), flagged: false, hasBomb: false, isDigged: false, bombsClose: 0 }))
};

function doBombs() {

    const selectedOpt = document.getElementById('difSelect').value;
    switch (selectedOpt) {
        case 'e':
            player.difficultySelected = 'easy';
            break;
        case 'n':
            player.difficultySelected = 'normal';
            break;
        case 'h':
            player.difficultySelected = 'hard';
            break;
        case 'i':
            player.difficultySelected = 'impossible';
            break;
        case 'd':
            player.difficultySelected = 'death';
            break;
        case 'c':
            player.difficultySelected = 'campo minas';
            break;
        default:
            alert("FATAL ERROR 877");
            break;

    }
    if (player.difficultySelected == 'impossible' || player.difficultySelected == 'death' || player.difficultySelected == 'campo minas') {

    } else {
        if (Math.floor(Math.random() * 1000) + 1 >= 996) {
            bombSmile();
            return;
        }
    }

    let minBombs = 4;
    let maxBombs = 3;
    switch (player.difficultySelected) {
        case 'easy':
            minBombs = 5; // 5-6
            maxBombs = 2;
            break;
        case 'normal':
            minBombs = 6; // 6-8
            maxBombs = 3;
            break;
        case 'hard':
            minBombs = 8; // 8-10
            maxBombs = 3;
            break;
        case 'impossible':
            minBombs = 9; // 9-12
            maxBombs = 4;
            break;
        case 'death':
            minBombs = 12; // 12-15
            maxBombs = 4;
            break;
        case 'campo minas':
            minBombs = 18; // 18-23
            maxBombs = 6;
            break;
        default:
            alert("FATAL ERROR 97");
            break;
    }

    const numBombs = Math.floor(Math.random() * maxBombs) + minBombs;
    document.getElementById("bombs-in-field-this-run").innerText = `💣 ${numBombs}`;

    let bombasAtuais = 0;
    while (bombasAtuais < numBombs) {
        const row = Math.floor(Math.random() * 7) + 1; // 1 a 7
        const col = Math.floor(Math.random() * 8);    // 0 a 7

        const cell = campo[`row${row}`][col];

        if (!cell.hasBomb) {
            cell.hasBomb = true;
            bombasAtuais++;
        }
    }
}
doBombs();


const muteBtn = document.getElementById("mute");
const configBtn = document.getElementById("config");
muteBtn.addEventListener("mouseenter", () => {
    {
        muteBtn.style.borderColor = "rgb(140, 140, 140)";
        if (player.soundOn) {
            muteBtn.style.backgroundImage = "url(images/misc/sound-on-hover.png)";
        } else {
            muteBtn.style.backgroundImage = "url(images/misc/sound-mute-hover.png)";
        }
    }
})
muteBtn.addEventListener("mouseleave", () => {
    {
        muteBtn.style.borderColor = "rgb(85, 85, 85)";
        if (player.soundOn) {
            muteBtn.style.backgroundImage = "url(images/misc/sound-on.png)";
        } else {
            muteBtn.style.backgroundImage = "url(images/misc/sound-mute.png)";
        }
    }
})
muteBtn.addEventListener("click", () => {
    if (player.soundOn) {
        muteBtn.style.backgroundImage = "url(images/misc/sound-on-active.png)";
        setTimeout(() => {
            muteBtn.style.backgroundImage = "url(images/misc/sound-on-hover.png)";
        }, 60);
    } else {
        muteBtn.style.backgroundImage = "url(images/misc/sound-mute-active.png)";
        setTimeout(() => {
            muteBtn.style.backgroundImage = "url(images/misc/sound-mute-hover.png)";
        }, 60);
    }
});

function doSound() {
    player.soundOn = !player.soundOn;
    muteBtn.style.backgroundImage = player.soundOn ? 'url(images/misc/sound-on-hover.png)' : 'url(images/misc/sound-mute-hover.png)';
}

function changeMode() {
    if (!player.digFlagModeOn) {
        return;
    }
    player.digModeOn = !player.digModeOn;
    const modeChangeBtnText = player.lingua == "eng" ? (player.digModeOn ? "Dig" : "Flag")
        : (player.digModeOn ? "Cavar" : "Bandeira");
    document.getElementById("change-mode-btn").innerText = modeChangeBtnText;
}

function openConfigMenu() {
    if (player.keyBindMenuOpen && !player.configMenuOpen) {
        animationHandler("closeKeybindMenu")
        animationHandler("openConfig");
        return;
    }
    if (!player.keyBindMenuOpen && !player.configMenuOpen) {
        animationHandler("openConfig");
        return;
    }
    if (!player.keyBindMenuOpen && player.configMenuOpen) {
        animationHandler("closeConfig");
        return;
    }
}

function animationHandler(key) {
    const configMenu = document.getElementById("config-menu");
    const keysPanel = document.getElementById("keys");
    const configBtn = document.getElementById("config");
    switch (key) {
        case "openKeybindMenu":
            keysPanel.style.display = "block";
            keysPanel.classList.add("slide-in");
            keysPanel.classList.remove("slide-out");
            player.keyBindMenuOpen = true;
            break;
        case "closeKeybindMenu":
            keysPanel.classList.remove("slide-in");
            keysPanel.classList.add("slide-out");
            keysPanel.addEventListener("animationend", () => {
                if (!player.keyBindMenuOpen) {
                    keysPanel.style.display = "none";
                }
            }, { once: true });
            player.keyBindMenuOpen = false;
            break;
        case "openConfig":
            configMenu.style.display = "block";
            configMenu.classList.add("slide-in");
            configMenu.classList.remove("slide-out");
            player.configMenuOpen = true;
            break;
        case "closeConfig":
            configMenu.classList.remove("slide-in");
            configMenu.classList.add("slide-out");
            player.configMenuOpen = false;
            configMenu.addEventListener("animationend", () => {
                if (!player.configMenuOpen) {
                    configMenu.style.display = "none";
                }
            }, { once: true });
            break;
        case "rotateConfigGear":
            break;
        default:
            alert("FATAR ERROR 99")
            break;
    }
}

function digFlagMode() {
    player.lingua = document.getElementById("idioma").value;
    const modeSwitchBtn = document.getElementById("mode-changer-btn");
    const modeChangerText = document.getElementById("mode-changer-text");
    player.digFlagModeOn = !player.digFlagModeOn;
    modeSwitchBtn.innerText = player.lingua == "eng" ? (player.digFlagModeOn ? "On" : "Off")
        : (player.digFlagModeOn ? "Ativado" : "Desativado");
    modeSwitchBtn.style.backgroundColor = player.digFlagModeOn ? "rgb(0, 168, 6)" : "gray";
    modeChangerText.style.display = player.digFlagModeOn ? "block" : "none";
}

document.addEventListener('contextmenu', (evento) => {
    evento.preventDefault(); // Impede que o menu de contexto padrão apareça
    if (player.digFlagModeOn) {
        changeMode();
        return;
    }
    flagHandler(player.hoveredCell.rowH, player.hoveredCell.colH);

});
document.addEventListener("keyup", (event) => {
    if (event.key.toLocaleLowerCase() === "r") {
        resetar();
    }
    if (event.key === "Escape") {
        keys(0);
    }
});
/* document.addEventListener("keydown", (event) => {
    if (event.key.toLocaleLowerCase() === "t") {
        testeFunc();
    }
}); */
const hoverDetector = document.querySelectorAll('.column');
hoverDetector.forEach(element => {
    element.addEventListener('mouseenter', function (event) {
        const element = event.target.id;
        const hoveredCellRow = element.slice(1).slice(0, 1);
        const hoveredCellCol = element.slice(3);
        player.hoveredCell.rowH = parseInt(hoveredCellRow);
        player.hoveredCell.colH = parseInt(hoveredCellCol);
    });
});

function flagOpt() {
    const selectedOpt = document.getElementById('flag-opt').value;
    components.flag = `url(images/flags/${selectedOpt}.png)`;
}

function bombOpt() {
    const selectedOpt = document.getElementById('bomb-opt').value;
    components.bomb = `url(images/bombs/${selectedOpt}.png)`;
}

function doIdioma() {
    player.lingua = document.getElementById("idioma").value;
    components.logo.innerHTML = player.lingua == 'eng' ? "Mine Field" : "Campo Minas";
    document.title = player.lingua == 'eng' ? "Mine Field" : "Campo Minas";
    const flagDigModeBtnText = player.lingua == "eng" ? (player.digFlagModeOn ? "On" : "Off")
        : (player.digFlagModeOn ? "Ativado" : "Desativado");

    document.getElementById("keys").innerHTML = player.lingua == 'eng' ?
        `<h2 style="text-align: center; top: -2%;">Keybinds</h2>
      <hr style="top: -4%;">
      <p>Dig: Mouse Left Click</p>
      <p>Flag: Mouse Right Click</p>
      <p>Reset Board: R</p>
      <p>Open/Close KeyBind Menu: Esc</p>
      <button type="button" onclick="keys()">Close</button>`
        :
        `<h2 style="text-align: center; top: -2%;">Atalhos</h2>
      <hr style="top: -4%;">
      <p>Cavar: Botão Esquerdo do Mouse</p>
      <p>Bandeira: Botão Direito do Mouse</p>
      <p>Resetar Campo: R</p>
      <p>Abrir/Fechar Menu de Atalho: Esc</p>
      <button type="button" onclick="keys()">Fechar</button>`;

    document.getElementById("config-menu").innerHTML = player.lingua == 'eng' ?
        `<h2 style="text-align: center; top: -2%;">Config</h2>
      <hr style="top: -4%;">
      <p>Allow Dig/Flag Mode (For phone): <button type="button" id="mode-changer-btn"
          onclick="digFlagMode()">${flagDigModeBtnText}</button></p>
      <p style="font-size: 75%; font-style: italic;">When on pc Left Click for action (dig/flag) and Right Click to
        change mode.</p>
      <hr>
      <h3 style="text-align: center; top: -2%;">Credits</h3>
      <p style="top: -3%;">Check out my other projects at: <a href="https://github.com/owTnitraM"
          target="_blank">owTnitraM<img id="git-logo" src="images/misc/github-logo.png" alt="GitHub Logo "></a></p>
      <h3 style="text-align: center; top: -2%;">Thank You for Playing!</h3>
      <p style="text-align: right; right: 5%; bottom: -3%;">sincerely, Martin 2</p>
      <button type="button" onclick="openConfigMenu()">Close</button>`
        :
        `<h2 style="text-align: center; top: -2%;">Configurações</h2>
      <hr style="top: -4%;">
      <p>Permitir Mode de Cavar/Bandeira (Para celular): <button type="button" id="mode-changer-btn"
          onclick="digFlagMode()">${flagDigModeBtnText}</button></p>
      <p style="font-size: 75%; font-style: italic;">Quando no computador Botão Esquerdo do Mouse para ação (cavar/bandeira) e Botão direito do Mouse para trocar de Modo.</p>
      <hr>
      <h3 style="text-align: center; top: -2%;">Creditos</h3>
      <p style="top: -3%;">Veja meus outros projetos aqui: <a href="https://github.com/owTnitraM"
          target="_blank">owTnitraM<img id="git-logo" src="images/misc/github-logo.png" alt="GitHub Logo "></a></p>
      <h3 style="text-align: center; top: -2%;">Obrigado por jogar!</h3>
      <p style="text-align: right; right: 5%; bottom: -3%;">agradecidamente, Martin 2</p>
      <button type="button" onclick="openConfigMenu()">Fechar</button>`;

    document.getElementById("mode-changer-btn").style.backgroundColor = player.digFlagModeOn ? "rgb(0, 168, 6)" : "gray";

    document.getElementById("difLabel").innerText = player.lingua == 'eng' ? `Difficulty: ` : `Dificuldade: `;

    document.getElementById("slct-e").innerText = player.lingua == 'eng' ? `Easy` : `Fácil`;
    document.getElementById("slct-n").innerText = player.lingua == 'eng' ? `Normal` : `Normal`;
    document.getElementById("slct-h").innerText = player.lingua == 'eng' ? `Hard` : `Difícil`;
    document.getElementById("slct-i").innerText = player.lingua == 'eng' ? `Impossible` : `Impossível`;
    document.getElementById("slct-d").innerText = player.lingua == 'eng' ? `Death` : `Morte`;
    document.getElementById("slct-c").innerText = player.lingua == 'eng' ? `Campo Minas 💀` : `Campo Minas 💀`;

    document.getElementById("reset-btn-bar").innerText = player.lingua == 'eng' ? `Reset` : `Resetar`;
    document.getElementById("keybind-btn-bar").innerText = player.lingua == 'eng' ? `KeyBinds` : `Atalhos`;

    document.getElementById("flag-type-label").innerText = player.lingua == 'eng' ? `Flag type: ` : `Tipo de bandeira: `;

    document.getElementById("red-flag-opt").innerText = player.lingua == 'eng' ? `Standard Red` : `Vermelha`;
    document.getElementById("mario-flag-opt").innerText = player.lingua == 'eng' ? `Mario` : `Mario`;
    document.getElementById("noruega-flag-opt").innerText = player.lingua == 'eng' ? `Norway` : `Noruega`;
    document.getElementById("brasil-flag-opt").innerText = player.lingua == 'eng' ? `Brazil` : `Brasil`;
    document.getElementById("novaZelandia-flag-opt").innerText = player.lingua == 'eng' ? `New-Zeland` : `Nova Zelândia`;
    document.getElementById("rainbow-flag-opt").innerText = player.lingua == 'eng' ? `Rainbow` : `Rainbow`;

    document.getElementById("label-bomb-type").innerText = player.lingua == 'eng' ? `Bomb type: ` : `Tipo de Bomba: `;

    document.getElementById("emoji-bomb-opt").innerText = player.lingua == 'eng' ? `Standard Emoji` : `Emoji`;
    document.getElementById("cartoon-bomb-opt").innerText = player.lingua == 'eng' ? `Cartoon` : `Cartoon`;
    document.getElementById("mario-bomb-opt").innerText = player.lingua == 'eng' ? `Mario` : `Mario`;
    document.getElementById("little-boy-bomb-opt").innerText = player.lingua == 'eng' ? `Little Boy` : `Little Boy`;
    document.getElementById("missile-bomb-opt").innerText = player.lingua == 'eng' ? `Missile` : `Míssil`;
    document.getElementById("nuclear-bomb-opt").innerText = player.lingua == 'eng' ? `Nuclear` : `Nuclear`;
    document.getElementById("red-behemoth-bomb-opt").innerText = player.lingua == 'eng' ? `Nuclear Red` : `Nuclear Vermelha`;
    document.getElementById("realista-bomb-opt").innerText = player.lingua == 'eng' ? `Realistic` : `Realista`;

    document.getElementById("label-explosion-sound").innerText = player.lingua == 'eng' ? `Explosion Sound: ` : `Som da Explosão: `;

    document.getElementById("standard-explosion-sound-opt").innerText = player.lingua == 'eng' ? `Standard` : `Padrão`;
    document.getElementById("agressive-explosion-sound-opt").innerText = player.lingua == 'eng' ? `Agressive` : `Agressivo`;
    document.getElementById("sifi-explosion-sound-opt").innerText = player.lingua == 'eng' ? `Si-Fi` : `Si-Fi`;
    document.getElementById("dramatic-explosion-sound-opt").innerText = player.lingua == 'eng' ? `Dramatic` : `Dramatico`;

    // document.getElementById("").innerText = player.lingua == 'eng' ? `` : ``;

    document.getElementById("label-win-sound").innerText = player.lingua == 'eng' ? `Win Sound: ` : `Som de Vitória: `;

    document.getElementById("congrats-win-sound-opt").innerText = player.lingua == 'eng' ? `Congrats` : `Parabéns`;
    document.getElementById("yipee-win-sound-opt").innerText = player.lingua == 'eng' ? `Yipee` : `Yipee`;
    document.getElementById("almost-mario-win-sound-opt").innerText = player.lingua == 'eng' ? `Almost Mario` : `Mario Pirata`;

    document.getElementById("label-language").innerText = player.lingua == 'eng' ? `Language: ` : `Idioma: `;
    const modeChangeBtnText = player.lingua == "eng" ? (player.digModeOn ? "Dig" : "Flag") : (player.digModeOn ? "Cavar" : "Bandeira");
    document.getElementById("mode-changer-text").innerHTML = player.lingua == 'eng' ?
        `Mode: <button type="button" id="change-mode-btn" onclick="changeMode()">${modeChangeBtnText}</button>`
        :
        `Modo: <button type="button" id="change-mode-btn" onclick="changeMode()">${modeChangeBtnText}</button>`;
}
doIdioma();

function doDiff() {
    const selectedOpt = document.getElementById('difSelect').value;
    switch (selectedOpt) {
        case 'e':
            player.difficultySelected = 'easy';
            break;
        case 'n':
            player.difficultySelected = 'normal';
            break;
        case 'h':
            player.difficultySelected = 'hard';
            break;
        case 'i':
            player.difficultySelected = 'impossible';
            break;
        case 'd':
            player.difficultySelected = 'death';
            break;
        case 'c':
            player.difficultySelected = 'campo minas';
            break;
        default:
            alert("FATAL ERROR 877");
            break;
    }
    resetar();
}

function keys() {
    if (!player.keyBindMenuOpen && player.configMenuOpen) {
        animationHandler("closeConfig")
        animationHandler("openKeybindMenu");
        return;
    }
    if (!player.keyBindMenuOpen && !player.configMenuOpen) {
        animationHandler("openKeybindMenu");
        return;
    }
    if (player.keyBindMenuOpen && !player.configMenuOpen) {
        animationHandler("closeKeybindMenu");
        return;
    }
}

function resetar() {
    player.isAlive = true;
    player.ganhou = false;
    player.runStarted = false;
    stats.cellsDiggedInPlay = 0;
    stats.flagsPlaced = 0;
    stats.timePlayingSeconds = 0;
    atribuirRunStatus();

    if (player.cellEstourada) {
        player.cellEstourada.element.style.backgroundImage = 'none';
    }
    components.notif.innerText = '';
    components.logo.style.color = "white";
    components.logo.innerHTML = player.lingua == 'eng' ? "Mine Field" : "Campo Minas";

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 8; j++) {
            campo[`row${i + 1}`][j].isDigged = false;
            campo[`row${i + 1}`][j].flagged = false;
            campo[`row${i + 1}`][j].hasBomb = false;
            campo[`row${i + 1}`][j].element.style.backgroundColor = "black";
            campo[`row${i + 1}`][j].element.style.backgroundImage = "none";
        }
    }
    doBombs();
}

function atribuirRunStatus() {
    document.getElementById("cells-digged-this-run").innerText = `⛏ ${stats.cellsDiggedInPlay}`;
    document.getElementById("flags-placed-this-run").innerText = `🚩 ${stats.flagsPlaced}`;
    document.getElementById("run-time").innerText = `⏱️ ${stats.timePlayingSeconds}`;
}

function game(row, column) {
    const cell = campo[('row' + row)][(column - 1)];
    player.lastClick.rowN = row;
    player.lastClick.colN = column;
    if (player.ganhou) {
        return;
    }
    if (player.digFlagModeOn && player.isAlive && !player.digModeOn) {
        flagHandler(row, column);
        return;
    }
    if (!player.isAlive) {
        resetar();
        return;
    }
    cavar(cell);
}

function flagHandler(row, column) {
    const cell = campo[('row' + row)][(column - 1)];
    if (cell.isDigged || player.ganhou || !player.isAlive) {
        return
    }
    cell.element.style.backgroundImage = cell.flagged ? "none" : components.flag;
    cell.flagged = !cell.flagged;
    if (cell.flagged) {
        stats.flagsPlaced += 1;
    } else {
        stats.flagsPlaced -= 1;
    }
    atribuirRunStatus();
}

function cavar(cell) {
    if (cell.flagged || cell.isDigged) {
        return;
    }
    if (cell.hasBomb) {
        bombDigged(cell);
        return;
    }
    cell.element.style.backgroundColor = " rgb(75, 75, 75)";
    cell.isDigged = true;
    player.runStarted = true;
    stats.cellsDiggedInPlay += 1;
    atribuirRunStatus();
    cellRadar(cell);
    checkWin(cell);
    sweep();
}

function sweep() {
    const linha = player.lastClick.rowN;
    const coluna = player.lastClick.colN - 1;
    const cell = campo[`row${linha}`][coluna];

    if (cell.bombsClose !== 0 && cell.isDigged) {
        return;
    }

    const key =
        linha === 1 && coluna === 0 ? 0 :
            linha === 1 && coluna === 7 ? 1 :
                linha === 7 && coluna === 0 ? 2 :
                    linha === 7 && coluna === 7 ? 3 :
                        linha === 1 && coluna >= 1 && coluna <= 6 ? 4 :
                            linha === 7 && coluna >= 1 && coluna <= 6 ? 5 :
                                coluna === 0 && linha >= 2 && linha <= 6 ? 6 :
                                    coluna === 7 && linha >= 2 && linha <= 6 ? 7 :
                                        -1;

    if (key !== -1) {
        specificSweep(key, cell);
        return;
    }

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = linha + i;
            const newCol = coluna + j;
            const neighbor = campo[`row${newRow}`]?.[newCol];

            if (!neighbor || neighbor.isDigged) continue;

            game(newRow, newCol + 1);
        }
    }
}

function specificSweep(key, cell) {
    const linha = player.lastClick.rowN;
    const coluna = player.lastClick.colN - 1;

    const deltas = [
        { dx: 0, dy: 0, w: 2, h: 2 },     // 0: sup esq
        { dx: -1, dy: 0, w: 2, h: 2 },    // 1: sup dir
        { dx: 0, dy: -1, w: 2, h: 2 },    // 2: inf esq
        { dx: -1, dy: -1, w: 2, h: 2 },   // 3: inf dir
        { dx: -1, dy: 0, w: 3, h: 2 },    // 4: top line
        { dx: -1, dy: -1, w: 3, h: 2 },   // 5: bottom line
        { dx: 0, dy: -1, w: 2, h: 3 },    // 6: esq col
        { dx: -1, dy: -1, w: 2, h: 3 }    // 7: dir col
    ];

    if (key < 0 || key >= deltas.length) {
        alert("FATAL ERROR 49");
        return;
    }

    const { dx, dy, w, h } = deltas[key];

    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const newRow = linha + i + dy;
            const newCol = coluna + j + dx;
            const neighbor = campo[`row${newRow}`]?.[newCol];

            if (!neighbor || neighbor.isDigged) continue;

            game(newRow, newCol + 1); // game() recebe a coluna original não o indice do array
        }
    }
}

function checkWin() {
    let celulasSemBombaNotDigged = 0;

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 8; j++) {
            if (!campo[`row${i + 1}`][j].hasBomb && !campo[`row${i + 1}`][j].isDigged) {
                celulasSemBombaNotDigged++;
            }
        }
    }
    if (celulasSemBombaNotDigged == 0) {
        doWin();
    }
}

function doWin() {
    player.ganhou = true;
    player.runStarted = false;
    if (player.lingua == 'pt') {
        components.notif.innerText = 'GANHOU🍃';
        components.logo.innerHTML = "🍀Campo Minas🍀";
    } else {
        components.notif.innerText = 'YOU WON🍃';
        components.logo.innerHTML = "🍀Mine Field🍀";
    }

    components.notif.style.color = "rgb(0, 200, 0)";
    components.logo.style.color = "rgb(0, 200, 0)";
    if (player.soundOn) {
        components.winSound[parseInt(document.getElementById('win-sound').value)].play();
    }
}

function bombDigged(cell) {
    player.isAlive = false;
    player.cellEstourada = cell;
    cell.element.style.backgroundImage = 'url(images/explosion/explosion.jpg)';
    components.logo.style.color = "rgb(255, 0, 0)";
    components.notif.style.color = "rgb(255, 0, 0)";
    if (player.lingua == 'pt') {
        components.notif.innerText = '💥MORREU💥';
        components.logo.innerHTML = "🩸Campo Minas🩸";
    } else {
        components.notif.innerText = '💥YOU DIED💥';
        components.logo.innerHTML = "🩸Mine Field🩸";
    }
    if (player.soundOn) {
        components.explosionSound[parseInt(document.getElementById('explosion-sound').value)].play();
    }

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 8; j++) {
            if (campo[`row${i + 1}`][j].hasBomb && campo[`row${i + 1}`][j] != player.cellEstourada) {
                campo[`row${i + 1}`][j].element.style.backgroundImage = components.bomb;
                if (campo[`row${i + 1}`][j].hasBomb && campo[`row${i + 1}`][j].flagged) {
                    campo[`row${i + 1}`][j].element.style.backgroundColor = " rgb(110, 135, 110)";
                }
            }
            if (!campo[`row${i + 1}`][j].hasBomb && campo[`row${i + 1}`][j].flagged) {
                campo[`row${i + 1}`][j].element.style.backgroundColor = " rgb(100, 12, 12)";
            }
        }
    }
}

function bombSmile() {
    campo.row6[2].hasBomb = true;
    campo.row6[3].hasBomb = true;
    campo.row6[4].hasBomb = true;
    campo.row6[5].hasBomb = true;
    campo.row3[1].hasBomb = true;
    campo.row3[6].hasBomb = true;
    campo.row2[1].hasBomb = true;
    campo.row2[6].hasBomb = true;
    campo.row5[1].hasBomb = true;
    campo.row5[6].hasBomb = true;
    campo.row2[2].hasBomb = true;
    campo.row3[2].hasBomb = true;
    campo.row2[5].hasBomb = true;
    campo.row3[5].hasBomb = true;
}

let bombsNear = 0;
function cellRadar(cell) {
    const linha = player.lastClick.rowN;
    const coluna = player.lastClick.colN - 1;

    const key =
        linha === 1 && coluna === 0 ? 0 :
            linha === 1 && coluna === 7 ? 1 :
                linha === 7 && coluna === 0 ? 2 :
                    linha === 7 && coluna === 7 ? 3 :
                        linha === 1 && coluna >= 1 && coluna <= 6 ? 4 :
                            linha === 7 && coluna >= 1 && coluna <= 6 ? 5 :
                                coluna === 0 && linha >= 2 && linha <= 6 ? 6 :
                                    coluna === 7 && linha >= 2 && linha <= 6 ? 7 :
                                        -1;

    if (key !== -1) {
        borderRadar(key, cell);
        return;
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const row = `row${linha + i - 1}`;
            const col = coluna + j - 1;
            if (campo[row]?.[col]?.hasBomb) {
                bombsNear++;
            }
        }
    }

    cell.bombsClose = bombsNear;
    if (bombsNear === 0) return;
    cell.element.style.backgroundImage = components.numeros[bombsNear];
    bombsNear = 0;
}

function borderRadar(key, cell) {
    const linha = player.lastClick.rowN;
    const coluna = player.lastClick.colN - 1;

    const deltas = [
        { dx: 0, dy: 0, w: 2, h: 2 },     // 0: sup esq
        { dx: -1, dy: 0, w: 2, h: 2 },    // 1: sup dir
        { dx: 0, dy: -1, w: 2, h: 2 },    // 2: inf esq
        { dx: -1, dy: -1, w: 2, h: 2 },   // 3: inf dir
        { dx: -1, dy: 0, w: 3, h: 2 },    // 4: top line
        { dx: -1, dy: -1, w: 3, h: 2 },   // 5: bottom line
        { dx: 0, dy: -1, w: 2, h: 3 },    // 6: esq col
        { dx: -1, dy: -1, w: 2, h: 3 }    // 7: dir col
    ];

    if (key < 0 || key >= deltas.length) {
        alert("FATAL ERROR 49");
        return;
    }

    const { dx, dy, w, h } = deltas[key];

    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const row = `row${linha + i + dy}`;
            const col = coluna + j + dx;
            if (campo[row]?.[col]?.hasBomb) {
                bombsNear++;
            }
        }
    }

    cell.bombsClose = bombsNear;
    if (bombsNear === 0) { return; }
    cell.element.style.backgroundImage = components.numeros[bombsNear];
    bombsNear = 0;
}

function mouseIsOver(el) {
    return el.matches(':hover');
}

const checkConsistency = setInterval(() => {
    if (!mouseIsOver(muteBtn)) {
        if (player.soundOn) {
            muteBtn.style.backgroundImage = "url(images/misc/sound-on.png)";
        } else {
            muteBtn.style.backgroundImage = "url(images/misc/sound-mute.png)";
        }
    }
    if (player.isAlive && !player.ganhou && player.runStarted) {
        stats.timePlayingSeconds += 1;
        atribuirRunStatus();
    }
}, 1000);