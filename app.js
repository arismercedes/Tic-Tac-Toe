const boardBoxes = document.querySelectorAll('.gameboard-box')
var TestTurn = 'TEST'
const gameController = (() => {
    let sign = 'X'
    const activeSign = () => {
        return sign
    }
    const changeSign = () => {
        sign === 'X' ? sign = 'O' : sign = 'X'
    }
    return {
        activeSign,
        changeSign
    }
})();

const GameBoardModule = (() => {
    let gameboard = ['','','','','','','','','']
    
    function addToGameboard(input) {
        const index = input.dataset.index;
        if (gameboard[index] === '') {
            gameboard[index] = gameController.activeSign();
            gameController.changeSign();
        } else {
            console.log('Invalid Action');
        }

        console.log(gameboard);
    };
    boardBoxes.forEach(box => {
        box.addEventListener('click', function test(event){
            addToGameboard(this)

        });
    })
    
})();

const displayController = (() => {
    const turnText = document.querySelector('#turn-text') 
    let playerLetter = gameController.activeSign();
    let turnContent = `Player ${playerLetter} Turn`
})();


const Player =(playerName) => {

};