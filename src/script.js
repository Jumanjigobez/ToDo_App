var dragIndex = null;

function handleDragStart(e) {
    dragIndex = e.target.rowIndex;
}

function handleDragOver(e) {
    e.preventDefault();
    e.target.classList.add('highlight');
}

function handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('highlight');
    var dropIndex = e.target.rowIndex;
    var table = e.target.parentNode;
    var draggedRow = table.rows[dragIndex];
    var droppedRow = table.rows[dropIndex];
    table.insertBefore(draggedRow, droppedRow);
}

var rows = document.querySelectorAll('tr');

rows.forEach(function(row) {
    row.addEventListener('dragstart', handleDragStart);
    row.addEventListener('dragover', handleDragOver);
    row.addEventListener('drop', handleDrop);
});

