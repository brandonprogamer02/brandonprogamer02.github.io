const container = document.querySelector('.container');


function makeSquare(){
    for (let i = 0; i < 9; i++) {
        let square = document.createElement('span');
        square.classList.add('square');
        container.appendChild(square)
    }
}

makeSquare()