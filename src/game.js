window.addEventListener("load", () => {
    initialize();
    
    loop();
});

let mode; // ゲームの現在の状況
let frame; // ゲームの現在フレーむ数
let combinationCount = 0; // 何連鎖かどうか

//設定↓
function initialize() {
    PuyoImage.initialize();
    Player.initialize();
    Stage.initialize();
    Score.initialize();
    mode = 'start';
    frame = 0;
}

function loop() {
    switch (mode) {
        case 'start':
            mode = 'checkFall';
            break;
        case 'checkFall':
            if (Stage.checkFall()) {
                mode = 'fall'
            } else {
                mode = 'checkErase';
            }
            break;
        case 'fall':
            if (!Stage.fall()) {
                mode = 'checkErase';
            }
            break;
        case 'checkErase':
            const eraseInfo = Stage.checkErase(frame);
            if (eraseInfo) {
                mode = 'erasing';
                combinationCount++;
                // 得点を計算する↓
                Score.calculateScore(combinationCount, eraseInfo.piece, eraseInfo.color);
                Stage.hideZenkeshi();
            } else {
                if (Stage.puyoCount === 0 && combinationCount > 0) {
                    // 全消しの処理をする
                    Stage.showZenkeshi();
                    Score.addScore(3600);
                }
                combinationCount = 0;
                mode = 'newPuyo';
            }
            break;
        case 'erasing':
            if (!Stage.erasing(frame)) {
                mode = 'checkFall';
            }
            break;
        case 'newPuyo':
            if (!Player.createNewPuyo()) {
                mode = 'gameOver';
            } else {
                mode = 'playing';
            }
            break;
        case 'playing':
            const action = Player.playing(frame);
            mode = action; 
            break;
        case 'moving':
            if (!Player.moving(frame)) {
                mode = 'playing';
            }
            break;
        case 'rotating':
            if (!Player.rotating(frame)) {
                mode = 'playing';
            }
            break;
        case 'fix':
            Player.fix();
            mode = 'checkFall'
            break;
        case 'gameOver':
            PuyoImage.prepareBatankyu(frame);
            mode = 'batankyu';
            break;
        case 'batankyu':
            PuyoImage.batankyu(frame);
            break;
    }
    frame++;
    requestAnimationFrame(loop);
}