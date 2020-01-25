export const reorderRows = (data, result) => {
    const {destination, source, draggableId} = result;
    const newRowOrder = [...data.rowOrder];
    newRowOrder.splice(Number(source.index), 1);
    newRowOrder.splice(destination.index, 0, draggableId);
    return newRowOrder;
};

/**
 *
 * @param data
 * @param operation 'plus' | 'minus'
 * @returns {number|*}
 */
export const getNewColumnCount = (data, operation) => {
    if (!['plus', 'minus'].includes(operation)) {
        throw new Error(`operation must be 'plus' or 'minus'`);
    }

    if (operation === 'plus') {
        return data.columnCount + 1;
    }
    return data.columnCount - 1;
};

export const createNewColumnFromLeftMenu = (tab, data, source, destination) => {
    const startColumnId = tab.columnOrder[source.index];
    const startColumn = tab.columns[startColumnId];
    return {
        id: String(getNewColumnCount(data, 'plus')),
        title: startColumn.title,
        module: startColumn.module,
        row: destination.droppableId,
    };
};

export const reorderRowWithNewColumn = (data, destination, newColumn) => {
    const finishRow = data.rows[destination.droppableId];
    const finishColumnsIds = [...finishRow.columnIds];
    finishColumnsIds.splice(destination.index, 0, newColumn.id);
    return {...finishRow, columnIds: finishColumnsIds};
};

export const createNewDataOnLeftColumnDnd = (data, result, tab) => {
    const {destination, source} = result;
    const newColumnCount = getNewColumnCount(data, 'plus');
    const newColumn = createNewColumnFromLeftMenu(tab, data, source, destination, newColumnCount);
    const newFinishRow = reorderRowWithNewColumn(data, destination, newColumn);
    return {
        ...data,
        columns: {...data.columns, [newColumn.id]: newColumn},
        rows: {...data.rows, [newFinishRow.id]: newFinishRow},
        columnCount: newColumnCount,
    };
};

export const getStartRow = (data, source) => {
    return data.rows[source.droppableId];
};

export const getFinishRow = (data, destination) => {
    return data.rows[destination.droppableId];
};

export const createNewStartRow = (data, source) => {
    const startRow = getStartRow(data, source);
    const startColumnsIds = [...startRow.columnIds];
    startColumnsIds.splice(source.index, 1);
    return {...startRow, columnIds: startColumnsIds};
};

export const createNewFinishRow = (data, destination, draggableId) => {
    const finishRow = getFinishRow(data, destination);
    const finishColumnsIds = [...finishRow.columnIds];
    finishColumnsIds.splice(destination.index, 0, draggableId);
    return {...finishRow, columnIds: finishColumnsIds};
};

export const reorderColumnsInTheSameRow = (start, result) => {
    const {source, destination, draggableId} = result;
    const newColumnIds = [...start.columnIds];
    newColumnIds.splice(Number(source.index), 1);
    newColumnIds.splice(destination.index, 0, draggableId);
    return {...start, columnIds: newColumnIds};
};

export const createNewDataOnColumnDndInTheSameRow = (data, result) => {
    const {source} = result;
    const startRow = getStartRow(data, source);
    const newRow = reorderColumnsInTheSameRow(startRow, result);
    return {...data, rows: {...data.rows, [newRow.id]: newRow}};
};

export const changeRowId = (data, columnId, row) => {
    const column = data.columns[columnId];
    return {...column, row: row.id};
};

export const createNewDataOnColumnDndInADifferentRow = (data, result) => {
    const {destination, source, draggableId} = result;
    const newStartRow = createNewStartRow(data, source);
    const newFinishRow = createNewFinishRow(data, destination, draggableId);
    const newColumn = changeRowId(data, draggableId, newFinishRow);
    return {
        ...data,
        rows: {...data.rows, [newStartRow.id]: newStartRow, [newFinishRow.id]: newFinishRow},
        columns: {...data.columns, [newColumn.id]: newColumn},
    };
};

export const deleteColumn = (id, data) => {
    const column = data.columns[id];
    const row = data.rows[column.row];
    row.columnIds.splice(row.columnIds.indexOf(column.id), 1);

    const newColumns = {...data.columns};
    delete newColumns[column.id];

    return {
        ...data,
        rows: {...data.rows, [row.id]: row},
        columns: newColumns,
        columnCount: getNewColumnCount(data, 'minus'),
    };
};

export const createNewRow = (index, data) => {
    const id = Object.keys(data.rows).length + 1;
    const newRow = {id: `row-${id}`, title: `row ${id}`, columnIds: []};
    const newRowOrder = [...data.rowOrder];
    newRowOrder.splice(index, 0, `row-${id}`);

    return {
        ...data,
        rows: {...data.rows, [`row-${id}`]: newRow},
        rowOrder: newRowOrder,
    };
};

export const deleteRow = (index, data) => {
    if (data.rowOrder.length === 1) {
        throw new Error(`can't delete the last row`);
    }

    const newRowOrder = [...data.rowOrder];
    const id = newRowOrder[index];

    newRowOrder.splice(index, 1);
    const newRows = {...data.rows};
    delete newRows[id];

    return {...data, rows: newRows, rowOrder: newRowOrder};
};

export const getModuleByColId = (id, data) => {
    if (!data.columns[id]) {
        throw new Error(`id ${id} should exist in data.columns`);
    }

    return data.columns[id];
};
