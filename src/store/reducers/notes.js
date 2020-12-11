import * as actionTypes from '../actions/actionTypes';

const notesState = {
    notes: null,
    apiNotes: null,
    activeNoteId: null,
    activeNoteContent: null,
    isSaveRequired: false,
    isDeleteRequired: false,
    isDeleteAllRequired: false,
    isMarkCompleteRequired: false,
    isCleanCheckedTodosListRequired: false,
    checkedTodosList: [],
    filterType: "all",
};

const setNotes = (state = notesState, action) => {
    switch (action.type) {
        case actionTypes.SET_NOTES:
            return {
                ...state,
                notes: action.notes,
                isSaveRequired: false,
                isDeleteRequired: false,
                isDeleteAllRequired: false,
                isMarkCompleteRequired: false,
                isCleanCheckedTodosListRequired: false,
                activeNoteId: null,
                activeNoteContent: null,
                checkedTodosList: [],
            };

        case actionTypes.SET_API_NOTES:
            return {
                ...state,
                apiNotes: action.notes,
            }

        case actionTypes.TRIGGER_SAVE_NEW:
            return {
                ...state,
                isSaveRequired: true,
                activeNoteContent: action.content,

            }

        case actionTypes.TRIGGER_DELETE:
            return {
                ...state,
                isDeleteRequired: true,
                activeNoteId: action.id,
            }

        case actionTypes.TRIGGER_DELETE_ALL:
            return {
                ...state,
                isDeleteAllRequired: true,
                isCleanCheckedTodosListRequired: true,
            }

        case actionTypes.TRIGGER_MARK_COMPLETE:
            return {
                ...state,
                isMarkCompleteRequired: true,
                activeNoteId: action.id,
            }

        case actionTypes.UPDATE_FILTER:
            return {
                ...state,
                filterType: action.filterType,
            }

        case actionTypes.UPDATE_CHECKED_LIST:
            return {
                ...state,
                checkedTodosList: action.checkedList,
            }

        default:
            return state;
    }
};

export default setNotes;
