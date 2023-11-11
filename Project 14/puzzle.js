/* naruto puzzle */
const imageSrc = 'naruto.jpg'; // Replace with the path to your Naruto image

const gridSize = 3;
const pieces = [];
let emptyIndex;

function createPuzzle() {
    const container = document.getElementById('puzzle-container');
    container.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.style.backgroundImage = `url(${imageSrc})`;
        piece.style.backgroundPosition = `-${(i % gridSize) * 100}px -${Math.floor(i / gridSize) * 100}px`;

        if (i === gridSize * gridSize - 1) {
            piece.style.opacity = '0';
            emptyIndex = i;
        } else {
            piece.id = `piece-${i + 1}`;
        }

        piece.addEventListener('click', () => movePiece(i));
        container.appendChild(piece);
        pieces.push(piece);
    }
}

function movePiece(index) {
    const rowDiff = Math.abs(Math.floor(index / gridSize) - Math.floor(emptyIndex / gridSize));
    const colDiff = Math.abs(index % gridSize - emptyIndex % gridSize);

    if ((rowDiff === 1 && colDiff === 0) || (colDiff === 1 && rowDiff === 0)) {
        const temp = pieces[index];
        pieces[index] = pieces[emptyIndex];
        pieces[emptyIndex] = temp;

        const tempId = pieces[index].id;
        pieces[index].id = pieces[emptyIndex].id;
        pieces[emptyIndex].id = tempId;

        pieces[index].style.transition = 'grid-area 0.2s';
        pieces[emptyIndex].style.transition = 'grid-area 0.2s';

        [pieces[index].style.gridArea, pieces[emptyIndex].style.gridArea] = [pieces[emptyIndex].style.gridArea, pieces[index].style.gridArea];

        emptyIndex = index;
    }

    if (checkWin()) {
        setTimeout(() => alert('Congratulations! You solved the puzzle!'), 100);
    }
}

function shuffle() {
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];

        const tempId = pieces[i].id;
        pieces[i].id = pieces[j].id;
        pieces[j].id = tempId;

        pieces[i].style.transition = 'grid-area 0.2s';
        pieces[j].style.transition = 'grid-area 0.2s';

        [pieces[i].style.gridArea, pieces[j].style.gridArea] = [pieces[j].style.gridArea, pieces[i].style.gridArea];

        if (pieces[i].id === `piece-${emptyIndex + 1}`) emptyIndex = i;
        if (pieces[j].id === `piece-${emptyIndex + 1}`) emptyIndex = j;
    }
}

function checkWin() {
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].id !== `piece-${i + 1}`) {
            return false;
        }
    }
    return true;
}

createPuzzle();