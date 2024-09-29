const draggableElements = document.querySelectorAll(".draggable");

// current cup being dragged
let selectedId;
let isGameStarted = false;

// target phrase
let dropTargetID;
let dragStartIndex;

// correct number of cups moved
let correctCounter = 0;

addEventListener();


function startGame() {
    isGameStarted = true;
    shuffleCups();
    checkForMatch();

    const StartGame = document.querySelector(".start-game");
    const correct = document.querySelector(".correct");
    const check = document.querySelector(".check");

    StartGame.style.cssText = "display: none;";
    correct.style.cssText = "display: block;";
    check.style.cssText = "display: block;";
    
}

function shuffleCups() {
    const cupContainer = document.querySelector(".cup-container");
    const cups = Array.from(cupContainer.children);

    for (let i = cups.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cups[i], cups[j]] = [cups[j], cups[i]];
    }

    cups.forEach(cup => cupContainer.appendChild(cup));

    updateDataIndex();
}

function updateDataIndex() {
    const cups = document.querySelectorAll('.cup');
    cups.forEach((cup, index) => {
        cup.setAttribute('data-index', index);
    });
}


function dragStart() {
    if (!isGameStarted) return;
    selectedId = this.id;
    dragStartIndex = +this.closest('div').getAttribute('data-index');
    // console.log(dragStartIndex);
    console.log("selected ID: " + selectedId);
}

function dragEnter() {
    if (!isGameStarted) return;
    this.classList.add('over');
    // console.log("Drag enter");
}

function dragLeave() {
    if (!isGameStarted) return;
    this.classList.remove('over');
    // console.log("Drag leave");
}

function dragOver(ev) {
    if (!isGameStarted) return;
    ev.preventDefault();
}

function dragDrop(ev) {
    ev.preventDefault();
    if (!isGameStarted) return;
    dropTargetID = this.id;
    const dragEndIndex = +this.getAttribute('data-index');

    console.log("dropped ID: " + dropTargetID);

    swapItems(dragStartIndex, dragEndIndex);

    // if (checkForMatch(selectedId, dropTargetID)) {
    //     // add css for if it is correct
    //     correctCounter++;
    //     console.log("true. matching amount: " + correctCounter);
    // }

    // checkForMatch();

}

function touchStart(ev) {
    ev.preventDefault();
    if (!isGameStarted) return;

    const touch = ev.touches[0];
    selectedId = this.id;
    dragStartIndex = +this.closest('div').getAttribute('data-index');

    console.log("Touch start. selected ID: " + selectedId);

    const currentImage = this.querySelector('.cup-img');
    currentImage.classList.add('over');

}

function touchMove(ev) {
    ev.preventDefault();
    const currentImage = this.querySelector('.cup-img');
    currentImage.classList.add('over');
}

function touchEnd(ev) {
    ev.preventDefault();
    if (!isGameStarted) return;

    const dropElement = document.elementFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);

    if (dropElement && dropElement.classList.contains('draggable')) {
        dropTargetID = dropElement.id;
        const dragEndIndex = +dropElement.closest('div').getAttribute('data-index');

        swapItems(dragStartIndex, dragEndIndex);
    }

    const currentImage = this.querySelector('.cup-img');
    currentImage.classList.remove('over');
}


function swapItems(fromIndex, toIndex) {
    console.log("From Index: " + fromIndex + " To Index: " + toIndex);
    
    const cupContainer = document.querySelector(".cup-container");
    const cups = Array.from(cupContainer.children);
    
    const itemOne = cups[fromIndex];
    const itemTwo = cups[toIndex];


    if (fromIndex < toIndex) {
        cupContainer.insertBefore(itemTwo, itemOne);
        cupContainer.insertBefore(itemOne, cups[toIndex + 1] || null);
    } else {
        cupContainer.insertBefore(itemOne, itemTwo);
        cupContainer.insertBefore(itemTwo, cups[fromIndex + 1] || null);
    }

    // Log the DOM structure after the swap
    const updatedCups = Array.from(cupContainer.children);

    // Check if the indexes and IDs match what you expect
    // updatedCups.forEach((cup, index) => {
    //     console.log(`Cup at index ${index}: ${cup.id}`);
    // });

    updateDataIndex();
}


// function checkForMatch (selected, dropTarget) {
//     switch (selected) {
//         case 'red-cup':
//             return dropTarget === 'red-cup' ? true : false;
            
//         case 'blue-cup':
//             return dropTarget === 'blue-cup' ? true : false;

//         case 'orange-cup':
//             return dropTarget === 'orange-cup' ? true : false;

//         case 'pink-cup':
//             return dropTarget === 'pink-cup' ? true : false;

//         case 'purple-cup':
//             return dropTarget === 'purple-cup' ? true : false;

//         case 'yellow-cup':
//             return dropTarget === 'yellow-cup' ? true : false;

//         default:
//             return false;
//     }
// }

function checkForMatch() {
    const currentCups = document.querySelectorAll('.draggable');
    const solutionCups = document.querySelectorAll('.behind-cups .solution');

    console.log("Match " + currentCups);
    // console.log(solutionCups);

    correctCounter = 0;

    currentCups.forEach((cup, index) => {
        const currentCupID = cup.getAttribute('id');
        const solutionCupID = solutionCups[index].getAttribute('id');

        if (currentCupID === solutionCupID) {
            correctCounter++;
        }
    });

    if (correctCounter == 6) {
        return finishedGame();
    }

    const correctDisplay = document.querySelector('.correct');
    correctDisplay.textContent = `You have ${correctCounter} correct.`;

    console.log(`Correct matches: ${correctCounter}`);
}

function finishedGame() {
    const correctDisplay = document.querySelector('.correct');
    correctDisplay.textContent = `You have all ${correctCounter} correct.`;
    
    const TryAgain = document.querySelector(".try-again");
    TryAgain.style.cssText = "display: block;";



}

function addEventListener() {
    draggableElements.forEach (element => {
        // Drag and Drop for website.
        element.addEventListener('dragstart', dragStart);
        element.addEventListener('dragenter', dragEnter);
        element.addEventListener('drop', dragDrop);
        element.addEventListener('dragover', dragOver);
        element.addEventListener('dragleave', dragLeave);

        // Drag and Drop for mobile using touch.
        element.addEventListener('touchstart', touchStart, { passive: false });
        element.addEventListener('touchmove', touchMove, { passive: false });
        element.addEventListener('touchend', touchEnd, { passive: false });
    });
}

function tryAgain() {
    const TryAgain = document.querySelector(".try-again");
    TryAgain.style.cssText = "display: none;";
    return startGame();
}