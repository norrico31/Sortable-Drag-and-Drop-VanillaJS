let draggables = document.querySelectorAll('.draggable');
let containers = document.querySelectorAll('.container');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        // console.log('drag start');

        draggable.classList.add('dragging');
    })

    draggable.addEventListener('dragend', () => {

        draggable.classList.remove('dragging');

    })
})

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        // console.log('drag over');

        e.preventDefault();

        const afterElement = getDragAfterElement(container, e.clientY);
        // console.log(afterElement);

        let draggable = document.querySelector('.dragging');
        container.appendChild(draggable);

        if(afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        }
    })
})

function getDragAfterElement(container, y) {

    let draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {

        const box = child.getBoundingClientRect();
        // console.log(box);

        const offset = y - box.top - box.height / 2;
        // console.log(offset);

        if(offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
};