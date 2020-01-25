import {
    changeRowId,
    createNewColumnFromLeftMenu,
    createNewDataOnColumnDndInADifferentRow,
    createNewDataOnColumnDndInTheSameRow,
    createNewDataOnLeftColumnDnd,
    createNewFinishRow,
    createNewRow,
    createNewStartRow,
    deleteColumn,
    deleteRow,
    getFinishRow,
    getNewColumnCount,
    getStartRow,
    reorderColumnsInTheSameRow,
    reorderRows,
    reorderRowWithNewColumn,
    getModuleByColId,
} from './DragAndDrop';

const globalData = {
    rows: {
        'row-1': {id: 'row-1', title: 'row 1', columnIds: []},
        'row-2': {id: 'row-2', title: 'row 2', columnIds: []},
        'row-3': {id: 'row-3', title: 'row 3', columnIds: []},
        'row-4': {id: 'row-4', title: 'row 4', columnIds: []},
    },
    columns: {},
    rowOrder: ['row-1', 'row-2', 'row-3', 'row-4'],
    columnCount: 12,
};

const tab = {
    title: 'Basiques',
    columns: {
        '1': {id: '1', title: 'Texte', module: 'text'},
        '2': {id: '2', title: 'column-2'},
        '3': {id: '3', title: 'column-3'},
        '4': {id: '4', title: 'column-4'},
    },
    columnOrder: ['1', '2', '3', '4'],
};


describe('Drag and drop logic', () => {
    it('should reorder the rows array when a row is dragged and dropped', () => {
        const result = {
            destination: {droppableId: 'all-rows', index: 1},
            draggableId: 'row-1',
            source: {index: 0, droppableId: 'all-rows'},
        };

        // Moving row 1 after row 2
        expect(reorderRows({...globalData}, result)).toEqual(['row-2', 'row-1', 'row-3', 'row-4']);


        const result2 = {
            ...result,
            destination: {droppableId: 'all-rows', index: 2},
        };

        // Moving row 1 after row 3
        expect(reorderRows({...globalData}, result2)).toEqual(['row-2', 'row-3', 'row-1', 'row-4']);

        const result3 = {
            destination: {droppableId: 'all-rows', index: 0},
            draggableId: 'row-4',
            source: {index: 3, droppableId: 'all-rows'},
        };

        // Moving row 4 before row 1
        expect(reorderRows({...globalData}, result3)).toEqual(['row-4', 'row-1', 'row-2', 'row-3']);

    });

    it('should throw an error', () => {
        expect(() => getNewColumnCount({}, 'notValidOperation')).toThrow();
    });

    it('should add 1 to the previous column count', () => {
        // Adding a new column in an empty Composer
        expect(getNewColumnCount(globalData, 'plus')).toBe(13);

        const data = {columnCount: 13};

        // Removing the only column from the Composer
        expect(getNewColumnCount(data, 'minus')).toBe(12);


        const data2 = {columnCount: 15};

        // Adding a new column in Composer with 3 existing columns
        expect(getNewColumnCount(data2, 'plus')).toBe(16);

        // Removing a column in Composer with 3 existing columns
        expect(getNewColumnCount(data2, 'minus')).toBe(14);
    });


    it('should create a new column object', () => {
        const source = {index: 0, droppableId: 'left-Basiques'};
        const destination = {droppableId: 'row-1', index: 0};
        const newColumn = {id: '13', title: 'Texte', module: 'text', row: 'row-1'};

        // Adding a new text column in an empty document
        expect(createNewColumnFromLeftMenu(
            tab,
            globalData,
            source,
            destination,
        )).toEqual(newColumn);


        const data2 = {
            ...globalData,
            rows: {
                ...globalData.rows,
                'row-1': {...globalData.rows['row-1'], columnIds: ['13', '14']},
                'row-3': {...globalData.rows['row-3'], columnIds: ['15']},
            },
            columns: {
                '13': {id: '13', title: 'Texte', module: 'text', row: 'row-1'},
                '14': {id: '14', title: 'Texte', module: 'text', row: 'row-1'},
                '15': {id: '15', title: 'Texte', module: 'text', row: 'row-3'},
            },
            columnCount: 15,
        };
        const source2 = {index: 0, droppableId: 'left-Basiques'};
        const destination2 = {droppableId: 'row-1', index: 2};

        const newColumn2 = {id: '16', title: 'Texte', module: 'text', row: 'row-1'};

        // Adding a new text column in a document with 3 existing text columns
        expect(createNewColumnFromLeftMenu(tab, data2, source2, destination2)).toEqual(newColumn2);

        // Todo : test others plugins
    });


    it('should update the rowOrder object with the new column id', () => {

        const destination = {droppableId: 'row-1', index: 0};
        const newColumn = {id: '13', title: 'Texte', module: 'text', row: 'row-1'};
        const newFinishRow = {id: 'row-1', title: 'row 1', columnIds: ['13']};

        // Reordering an empty row with a new column
        expect(reorderRowWithNewColumn({...globalData}, destination, newColumn)).toEqual(newFinishRow);


        const destination2 = {droppableId: 'row-1', index: 0};
        const newColumn2 = {id: '16', title: 'Texte', module: 'text', row: 'row-1'};
        const newFinishRow2 = {id: 'row-1', title: 'row 1', columnIds: ['16', '13', '14']};
        const data2 = {
            ...globalData,
            rows: {
                ...globalData.rows,
                'row-1': {id: 'row-1', title: 'row 1', columnIds: ['13', '14']},
                'row-3': {id: 'row-3', title: 'row 3', columnIds: ['15']},
            },
            columns: {
                '13': {id: '13', title: 'Texte', module: 'text', row: 'row-1'},
                '14': {id: '14', title: 'Texte', module: 'text', row: 'row-1'},
                '15': {id: '15', title: 'Texte', module: 'text', row: 'row-3'},
            },
            columnCount: 15,
        };

        // Reordering a row with existing columns
        expect(reorderRowWithNewColumn(data2, destination2, newColumn2)).toEqual(newFinishRow2);
    });


    it('should create a new data object with the rows and columns updated', () => {

        const result = {
            destination: {droppableId: 'row-1', index: 0},
            source: {index: 0, droppableId: 'left-Basiques'},
        };

        const newData = {
            ...globalData,
            rows: {
                ...globalData.rows,
                'row-1': {id: 'row-1', title: 'row 1', columnIds: ['13']},
            },
            columns: {'13': {id: '13', title: 'Texte', module: 'text', row: 'row-1'}},
            columnCount: 13,
        };

        // Adding a text column in the first row of an empty document
        expect(createNewDataOnLeftColumnDnd(globalData, result, tab)).toEqual(newData);


        const result2 = {
            destination: {droppableId: 'row-3', index: 0},
            source: {index: 0, droppableId: 'left-Basiques'},
        };

        const newData2 = {
            ...newData,
            rows: {
                ...newData.rows,
                'row-3': {id: 'row-3', title: 'row 3', columnIds: ['14']},
            },
            columns: {
                ...newData.columns,
                '14': {id: '14', title: 'Texte', module: 'text', row: 'row-3'},
            },
            columnCount: 14,
        };

        // Adding a text column in the third row of the document containing one column in the first row
        expect(createNewDataOnLeftColumnDnd(newData, result2, {...tab})).toEqual(newData2);


        const result3 = {
            destination: {droppableId: 'row-1', index: 1},
            source: {index: 0, droppableId: 'left-Basiques'},
        };

        const newData3 = {
            ...newData2,
            rows: {
                ...newData2.rows,
                'row-1': {id: 'row-1', title: 'row 1', columnIds: ['13', '15']},
            },
            columns: {
                ...newData2.columns,
                '15': {id: '15', title: 'Texte', module: 'text', row: 'row-1'},
            },
            columnCount: 15,
        };

        // Adding a text column in the first row of a document containing one column in the first row and an other in the third row
        expect(createNewDataOnLeftColumnDnd(newData2, result3, {...tab})).toEqual(newData3);
    });


    it('should return the start row object', () => {

        const source = {droppableId: 'row-1', index: 0};
        const startRow = {id: 'row-1', title: 'row 1', columnIds: []};

        // Returns the globalData.rows with the id of source.droppableId
        expect(getStartRow(globalData, source)).toEqual(startRow);
    });


    it('should return the final row object', () => {

        const destination = {droppableId: 'row-1', index: 0};
        const finishRow = {id: 'row-1', title: 'row 1', columnIds: []};

        // Returns the globalData.rows with the id of destination.droppableId
        expect(getFinishRow(globalData, destination)).toEqual(finishRow);
    });


    it('should update the row object removing the id of the column dropped in another row', () => {

        const data = {
            rows: {
                'row-1': {id: 'row-1', title: 'row 1', columnIds: ['13']},
                'row-2': {id: 'row-2', title: 'row 2', columnIds: []},
                'row-3': {id: 'row-3', title: 'row 3', columnIds: []},
                'row-4': {id: 'row-4', title: 'row 4', columnIds: []},
            },
            columns: {'13': {id: '13', title: 'Texte', module: 'text', row: 'row-1'}},
            rowOrder: ['row-1', 'row-2', 'row-3', 'row-4'],
            columnCount: 13,
        };
        const source = {index: 0, droppableId: 'row-1'};

        const newStartRow = {...data.rows['row-1'], columnIds: []};

        // Removing the id of the unique column from the first row
        expect(createNewStartRow(data, source)).toEqual(newStartRow);


        const data2 = {
            ...globalData,
            rows: {
                ...globalData.rows,
                'row-1': {id: 'row-1', title: 'row 1', columnIds: ['13', '14']},
                'row-3': {id: 'row-3', title: 'row 3', columnIds: ['15']},
            },
            columns: {
                '13': {id: '13', title: 'Texte', module: 'text', row: 'row-1'},
                '14': {id: '14', title: 'Texte', module: 'text', row: 'row-1'},
                '15': {id: '15', title: 'Texte', module: 'text', row: 'row-3'},
            },
            columnCount: 15,
        };
        const source2 = {index: 0, droppableId: 'row-1'};

        const newStartRow2 = {...data2.rows['row-1'], columnIds: ['14']};

        // Removing the id of the column 13 from the first row
        expect(createNewStartRow(data2, source2)).toEqual(newStartRow2);
    });


    it('should update the row object adding the id of the column dropped in', () => {

        const data = {
            rows: {
                'row-1': {id: 'row-1', title: 'row 1', columnIds: ['13']},
                'row-2': {id: 'row-2', title: 'row 2', columnIds: []},
                'row-3': {id: 'row-3', title: 'row 3', columnIds: []},
                'row-4': {id: 'row-4', title: 'row 4', columnIds: []},
            },
            columns: {'13': {id: '13', title: 'Texte', module: 'text', row: 'row-1'}},
            rowOrder: ['row-1', 'row-2', 'row-3', 'row-4'],
            columnCount: 13,
        };
        const destination = {droppableId: 'row-2', index: 0};
        const draggableId = '13';

        const newFinishRow = {...data.rows['row-2'], columnIds: ['13']};

        // Moving one column from the first row to the second row
        expect(createNewFinishRow(data, destination, draggableId)).toEqual(newFinishRow);


        const data2 = {
            ...globalData,
            rows: {
                ...globalData.rows,
                'row-1': {id: 'row-1', title: 'row 1', columnIds: ['13', '14']},
                'row-3': {id: 'row-3', title: 'row 3', columnIds: ['15']},
            },
            columns: {
                '13': {id: '13', title: 'Texte', module: 'text', row: 'row-1'},
                '14': {id: '14', title: 'Texte', module: 'text', row: 'row-1'},
                '15': {id: '15', title: 'Texte', module: 'text', row: 'row-3'},
            },
            columnCount: 15,
        };
        const destination2 = {droppableId: 'row-3', index: 1};
        const draggableId2 = '13';
        const newFinishRow2 = {...data.rows['row-3'], columnIds: ['15', '13']};

        // Moving one column from the first row to the second row, after the first column already in this row
        expect(createNewFinishRow(data2, destination2, draggableId2)).toEqual(newFinishRow2);
    });


    it('should update the column order in a row object', () => {

        const start = {id: 'row-1', title: 'row 1', columnIds: ['14', '13']};
        const result = {
            destination: {droppableId: 'row-1', index: 0},
            draggableId: '13',
            source: {index: 1, droppableId: 'row-1'},
        };

        const newRow = {...start, columnIds: ['13', '14']};

        // Moving a column before an other in a row with two columns
        expect(reorderColumnsInTheSameRow(start, result)).toEqual(newRow);


        const start2 = {id: 'row-1', title: 'row 1', columnIds: ['14', '17', '13', '15', '16']};
        const result2 = {
            destination: {droppableId: 'row-1', index: 2},
            draggableId: '14',
            source: {index: 0, droppableId: 'row-1'},
        };
        const newRow2 = {...start2, columnIds: ['17', '13', '14', '15', '16']};

        // Moving the first column to the third place in a row containing five columns
        expect(reorderColumnsInTheSameRow(start2, result2)).toEqual(newRow2);
    });

    it('should update the data object with the new rows and columns', () => {
        const data = {
            ...globalData,
            rows: {
                ...globalData.rows,
                'row-1': {id: 'row-1', title: 'row 1', columnIds: ['14', '13']},
            },
            columns: {
                '13': {id: '13', title: 'Texte', module: 'text', row: 'row-1'},
                '14': {id: '14', title: 'Texte', module: 'text', row: 'row-1'},
            },
            columnCount: 14,
        };

        const result = {
            destination: {droppableId: 'row-1', index: 0},
            source: {index: 1, droppableId: 'row-1'},
            draggableId: '13',
        };

        const newData = {
            ...data,
            rows: {
                ...data.rows,
                'row-1': {
                    ...data.rows['row-1'],
                    columnIds: ['13', '14'],
                },
            },
        };

        // Moving a column before an other in the same row containing two columns
        expect(createNewDataOnColumnDndInTheSameRow(data, result)).toEqual(newData);


        const data2 = {
            ...data,
            rows: {
                ...data.rows,
                'row-1': {id: 'row-1', title: 'row 1', columnIds: ['14', '17', '13', '15', '16']},
            },
            columns: {
                ...data.columns,
                '15': {id: '15', title: 'Texte', module: 'text', row: 'row-1'},
                '16': {id: '16', title: 'Texte', module: 'text', row: 'row-1'},
                '17': {id: '17', title: 'Texte', module: 'text', row: 'row-1'},
            },
            columnCount: 17,
        };

        const result2 = {
            destination: {droppableId: 'row-1', index: 2},
            source: {index: 0, droppableId: 'row-1'},
            draggableId: '14',
        };

        const newData2 = {
            ...data2,
            rows: {
                ...data.rows,
                'row-1': {
                    ...data.rows['row-1'],
                    columnIds: ['17', '13', '14', '15', '16'],
                },
            },
        };

        // Moving the first column to the third place in a row containing five columns
        expect(createNewDataOnColumnDndInTheSameRow(data2, result2)).toEqual(newData2);
    });


    it('should update the data object with the new rows and columns', () => {

        const data = {
            ...globalData,
            rows: {
                ...globalData.rows,
                'row-1': {id: 'row-1', title: 'row 1', columnIds: ['13']},
            },
            columns: {'13': {id: '13', title: 'Texte', module: 'text', row: 'row-1'}},
            columnCount: 13,
        };

        const result = {
            destination: {droppableId: 'row-2', index: 0},
            source: {index: 0, droppableId: 'row-1'},
            draggableId: '13',
        };

        const newData = {
            ...data,
            rows: {
                ...data.rows,
                'row-1': {...data.rows['row-1'], columnIds: []},
                'row-2': {...data.rows['row-2'], columnIds: ['13']},
            },
            columns: {
                ...data.columns,
                '13': {...data.columns['13'], row: 'row-2'},
            },
        };

        // Moving a column to a different empty row
        expect(createNewDataOnColumnDndInADifferentRow(data, result)).toEqual(newData);


        const data2 = {
            ...data,
            rows: {
                ...data.rows,
                'row-1': {...data.rows['row-1'], columnIds: ['14', '17', '15', '16']},
                'row-2': {...data.rows['row-2'], columnIds: ['13']},
            },
            columns: {
                '13': {id: '13', title: 'Texte', module: 'text', row: 'row-2'},
                '14': {id: '14', title: 'Texte', module: 'text', row: 'row-1'},
                '15': {id: '15', title: 'Texte', module: 'text', row: 'row-1'},
                '16': {id: '16', title: 'Texte', module: 'text', row: 'row-1'},
                '17': {id: '17', title: 'Texte', module: 'text', row: 'row-1'},
            },
            columnCount: 17,
        };

        const result2 = {
            destination: {droppableId: 'row-2', index: 0},
            source: {index: 0, droppableId: 'row-1'},
            draggableId: '14',
        };

        const newData2 = {
            ...data2,
            rows: {
                ...data.rows,
                'row-1': {...data.rows['row-1'], columnIds: ['17', '15', '16']},
                'row-2': {...data.rows['row-2'], columnIds: ['14', '13']},
            },
            columns: {
                ...data2.columns,
                '14': {id: '14', title: 'Texte', module: 'text', row: 'row-2'},
            },
        };

        // Moving a column to a different empty row
        expect(createNewDataOnColumnDndInADifferentRow(data2, result2)).toEqual(newData2);
    });

    it('should change the row id in the column object', () => {
        const data = {
            ...globalData,
            rows: {
                ...globalData.rows,
                'row-1': {...globalData.rows['row-1'], columnIds: ['13']},
            },
            columns: {'13': {id: '13', title: 'Texte', module: 'text', row: 'row-1'}},
            columnCount: 13,
        };

        const row = {id: 'row-2', title: 'row 2', columnIds: ['13']};

        const newColumn = {...data.columns['13'], row: 'row-2'};

        // Passing the column with id 13 from row-1 to row-2
        expect(changeRowId(data, 13, row)).toEqual(newColumn);


        const data2 = {
            ...data,
            rows: {
                ...data.rows,
                'row-2': {...data.rows['row-2'], columnIds: ['14', '15']},
            },
            columns: {
                ...data.columns,
                '14': {id: '14', title: 'Texte', module: 'text', row: 'row-2'},
                '15': {id: '15', title: 'Texte', module: 'text', row: 'row-2'},
            },
            columnCount: 15,
        };

        const row2 = {...data2.rows['row-3'], columnIds: ['15']};

        const newColumn2 = {...data2.columns['15'], row: 'row-3'};

        // Passing the column with id 15 from row-2 to row-3
        expect(changeRowId(data2, 15, row2)).toEqual(newColumn2);
    });


    it('should update the data object by removing a column', () => {

        const data = {
            ...globalData,
            rows: {
                ...globalData.rows,
                'row-1': {...globalData.rows['row-1'], columnIds: ['13']},
            },
            columns: {'13': {id: '13', title: 'Texte', module: 'text', row: 'row-1'}},
            columnCount: 13,
        };

        // Remove the only column in the document
        expect(deleteColumn('13', data)).toEqual(globalData);


        const data2 = {
            ...data,
            rows: {
                ...data.rows,
                'row-2': {...data.rows['row-2'], columnIds: ['14', '15']},
            },
            columns: {
                ...data.columns,
                '14': {id: '14', title: 'Texte', module: 'text', row: 'row-2'},
                '15': {id: '15', title: 'Texte', module: 'text', row: 'row-2'},
            },
            columnCount: 15,
        };

        const newData = {
            ...data,
            rows: {
                ...data2.rows,
                'row-2': {...data.rows['row-2'], columnIds: ['15']},
            },
            columns: {...data2.columns},
            columnCount: 14,
        };
        delete newData.columns['14'];

        // Remove one column in a document containing 3 columns
        expect(deleteColumn('14', data2)).toEqual(newData);
    });


    it('should add a new row in the data object', () => {

        const newData = {
            ...globalData,
            rows: {
                ...globalData.rows,
                'row-5': {id: 'row-5', title: 'row 5', columnIds: []},
            },
            rowOrder: ['row-5', 'row-1', 'row-2', 'row-3', 'row-4'],
        };

        // Add a row after the first
        expect(createNewRow(0, globalData)).toEqual(newData);


        const newData2 = {
            ...globalData,
            rows: {
                ...globalData.rows,
                'row-5': {id: 'row-5', title: 'row 5', columnIds: []},
            },
            rowOrder: ['row-1', 'row-2', 'row-5', 'row-3', 'row-4'],
        };

        // Add a row after the row with index 2
        expect(createNewRow(2, globalData)).toEqual(newData2);
    });

    it('should delete a row from the data object', () => {
        const newData = {...globalData, rowOrder: ['row-2', 'row-3', 'row-4']};
        delete newData.rows['row-1'];

        // Delete the first row
        expect(deleteRow(0, globalData)).toEqual(newData);

        const newData2 = {...globalData, rowOrder: ['row-1', 'row-2', 'row-4']};
        delete newData2.rows['row-3'];

        // Delete the third row
        expect(deleteRow( 2, globalData)).toEqual(newData2);

        const data = {
            ...globalData,
            rows : {'row-1': {id: 'row-1', title: 'row 1', columnIds: []},},
            rowOrder: ['row-1']
        };
        delete newData2.rows['row-3'];

        // Throw an error when trying to delete the last row
        expect(() => deleteRow( 0, data)).toThrow();
    });
});

describe('test getModuleByColId', () => {
    const initialData = {
        rows: {
            'row-1': {id: 'row-1', title: 'row 1', columnIds: ['13']},
        },
        rowOrder: ['row-1'],
        columns: {
            '13': {id: '13', title: 'Texte', module: 'text', row: 'row-1', data: {}},
        },
        columnCount: 12,
    };

    it('should throw an error', () => {
        const data = {...initialData};
        expect(() => getModuleByColId('14', data).toThrow());
    });

    it('should render column 13', () => {
        expect(() => getModuleByColId('13', initialData).toBe(initialData.columns['13']));
    });

});
