const draggableElements = document.querySelectorAll(".draggable")

// current cup being dragged
let selectedId;

// target phrase
let dropTargetID;
let dragStartIndex;

// correct number of cups moved
let correctCounter = 0;

addEventListener();
startGame();

function startGame() {
    shuffleCups();
}

function shuffleCups() {
    const cupContainer = document.querySelector(".cup-container");
    const cups = Array.from(cupContainer.children);

    for (let i = cups.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cups[i], cups[j]] = [cups[j], cups[i]];
    }

    cups.forEach(cup => cupContainer.appendChild(cup));
}


function dragStart() {
    selectedId = this.id;
    dragStartIndex = +this.closest('div').getAttribute('data-index');
    // console.log(dragStartIndex);
    console.log("selected ID: " + selectedId);
}

function dragEnter() {
    // add css class for when entering drag
    this.classList.add('over');
    // console.log("Drag enter");
}

function dragLeave() {
    // add css class for when leaving drag
    this.classList.remove('over');
    // console.log("Drag leave");
}

function dragOver(ev) {
    ev.preventDefault();
}

function dragDrop() {
    dropTargetID = this.id;
    const dragEndIndex = +this.getAttribute('data-index');

    console.log("dropped ID: " + dropTargetID);

    swapItems(dragStartIndex, dragEndIndex);

    if (checkForMatch(selectedId, dropTargetID)) {
        // add css for if it is correct
        correctCounter++;
        console.log("true. matching amount: " + correctCounter);
    }
}

function swapItems(fromIndex, toIndex) {
    const cupContainer = document.querySelector(".cup-container");
    const cups = Array.from(cupContainer.children);

    const itemOne = cups[fromIndex].querySelector('draggable');
    const itemTwo = cups[toIndex].querySelector('draggable');

    console.log(itemOne + " " + itemTwo);

    cups[fromIndex].appendChild(itemTwo);
    cups[toIndex].appendChild(itemOne);
}


function checkForMatch (selected, dropTarget) {
    switch (selected) {
        case 'red-cup':
            return dropTarget === 'red-cup' ? true : false;
            
        case 'blue-cup':
            return dropTarget === 'blue-cup' ? true : false;

        case 'orange-cup':
            return dropTarget === 'orange-cup' ? true : false;

        case 'pink-cup':
            return dropTarget === 'pink-cup' ? true : false;

        case 'purple-cup':
            return dropTarget === 'purple-cup' ? true : false;

        case 'yellow-cup':
            return dropTarget === 'yellow-cup' ? true : false;

        default:
            return false;
    }
}

function addEventListener() {
    draggableElements.forEach (element => {
        element.addEventListener('dragstart', dragStart);
        element.addEventListener('dragenter', dragEnter);
        element.addEventListener('drop', dragDrop);
        element.addEventListener('dragover', dragOver);
        element.addEventListener('dragleave', dragLeave);
    });
}