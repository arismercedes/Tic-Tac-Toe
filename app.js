const boardBoxes = document.querySelectorAll('.gameboard-box')
var TestTurn = 'TEST'
const gameController = (() => {
    let sign = 'x'
    const winningModal = document.querySelector('#modal')
    const winnerSign = document.querySelector('.winner-sign')
    const winningText = document.querySelector('.win-rnd-txt')
    const nextRndBtn = document.querySelector('.next-round')
    const activeSign = () => {
        return sign
    }
    const changeSign = () => {
        sign === 'x' ? sign = 'o' : sign = 'x'
    }

    let xScore = 0;
    let oScore = 0;
    let tScore = 0;
    const addScore = (input) => {
        let x = document.querySelector('.x-num')
        let o = document.querySelector('.o-num')
        let ties = document.querySelector('.ties-num')

        if(input === 'x') {
            xScore += 1
            x.textContent = xScore
        } else if (input === 'o') {
            oScore += 1
            o.textContent = oScore
        } else {
            tScore += 1
            ties.textContent = tScore
        }
    }
    const win = (input, index) => {
        winningModal.classList.toggle('show')
        winnerSign.classList.toggle(`winner-${input}`)
        input === 'x' ? winningText.classList.toggle('turquoise') : winningText.classList.toggle('yellow')
        addScore(input);
        //****Adding a feature to higlight the winning play */
        // switch(index) {
        //     case 0:
        //         boardBoxes[0].classList.add('bk-yellow')
        //         boardBoxes[1].classList.add('bk-yellow')
        //         boardBoxes[2].classList.add('bk-yellow')
        //         break;
            
        // }
    }
    const tie = (input) => {
        const msg = document.querySelector('.match-msg')
        winningModal.classList.toggle('show')
        winningText.textContent = 'NOBODY WIN'
        winningText.classList.toggle('gray')
        msg.textContent = 'IS A TIE!'
        addScore(input);
    }
    
    const newRound = () => {
        winningModal.classList.toggle('show')
        GameBoardModule.resetBoard();
        displayController.clearXO();
        winnerSign.classList.remove('winner-x', 'winner-o')
        winningText.classList.remove('gray', 'turquoise', 'yellow')
    }

   

    const checkForWin = () => {
        index = 0
        GameBoardModule.getBoard().forEach(scenario => {
            if (scenario.every((value) => value ==='x')) {
            win('x', index);

            } else if (scenario.every((value) => value ==='o'))
            win('o', index);
            index ++
        })
    }
    const checkForTie = () => {
        function combineArr() {
            return GameBoardModule.getBoard()[0].concat(GameBoardModule.getBoard()[1],GameBoardModule.getBoard()[2])
        }
        function checkBoard(box) {
            if (box != '') {
                return true
            } else {
                return false
            }
        }
        if(combineArr().every(checkBoard)) {
            tie();
        }
        
    }
    const restart = () => {

    }
    nextRndBtn.addEventListener('click', newRound)

    return {
        activeSign,
        changeSign,
        checkForWin,
        checkForTie,
        newRound
    }
})();



const displayController = (() => {
    const turnIcon = document.querySelector('#turn-icon') 
    let changeTurnIcon = () => {
        turnIcon.classList.toggle('x-icon')
        turnIcon.classList.toggle('o-icon')
    }
    let displaySign = (box) => {
        const sign = gameController.activeSign() === 'x' ? 'xboard' : 'oboard';
        box.classList.add(sign)
    }
    const clearXO = () => {
        boardBoxes.forEach(box => {
            box.classList.remove('xboard','oboard')
        })
    }

    return {
        changeTurnIcon,
        displaySign,
        clearXO
    }
})();

const GameBoardModule = (() => {
    let gameboard = ['','','','','','','','','']
    
    const getBoard = () => {
        let row1 = [gameboard[0],gameboard[1],gameboard[2]];
        let row2 = [gameboard[3],gameboard[4],gameboard[5]];
        let row3 = [gameboard[6],gameboard[7],gameboard[8]];
        let column1 = [gameboard[0],gameboard[3],gameboard[6]];
        let column2 = [gameboard[1],gameboard[4],gameboard[7]];
        let column3 = [gameboard[2],gameboard[5],gameboard[8]];
        let diagonal1 = [gameboard[0],gameboard[4],gameboard[8]];
        let diagonal2 = [gameboard[2],gameboard[4],gameboard[6]];
        let winningScenearios = [row1, row2, row3, column1, column2, column3, diagonal1, diagonal2]
        return winningScenearios
    }
    
    function addToGameboard(input) {
        const index = input.dataset.index;
        if (gameboard[index] === '') {
            gameboard[index] = gameController.activeSign();
            displayController.displaySign(input);
            gameController.changeSign();
            displayController.changeTurnIcon();
        }
    };

    const resetBoard = () => {
        gameboard = ['','','','','','','','','']
    }
    boardBoxes.forEach(box => {
        box.addEventListener('click', function test(event){
            addToGameboard(this);
            gameController.checkForWin();
            gameController.checkForTie();

        });
    })
    return {
        getBoard,
        resetBoard
    }
    
})();




const Player =(playerName) => {

}
