import * as actionTypes from './actionTypes';

export const setNotes = notes => {
    return {
        type: actionTypes.SET_NOTES,
        notes,
    };
};

export const setApiNotes = notes => {
    return {
        type: actionTypes.SET_API_NOTES,
        notes
    }
};

export const saveTrigger = (content) => {
    return {
        type: actionTypes.TRIGGER_SAVE_NEW,
        content,
    };
};

export const deleteTrigger = id => {
    return {
        type: actionTypes.TRIGGER_DELETE,
        id,
    }
}

export const deleteTriggerAll = () => {
    return {
        type: actionTypes.TRIGGER_DELETE_ALL,
    }
}

export const triggerMarkComplete = id => {
    return {
        type: actionTypes.TRIGGER_MARK_COMPLETE,
        id,
    }
}

export const updateFilter = filterType => {
    return {
        type: actionTypes.UPDATE_FILTER,
        filterType,
    }
}

export const updateCheckedList = checkedList => {
    return {
        type: actionTypes.UPDATE_CHECKED_LIST,
        checkedList,
    }
}
