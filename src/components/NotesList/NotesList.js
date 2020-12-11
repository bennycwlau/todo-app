import React from 'react';
import * as actions from "../../store/actions";
import {connect} from "react-redux";

let checkedItemsList = [];
const NotesList = (props) => {
    const todos = props.notes;
    const apiTodos = props.apiNotes;
    let filteredTodos = todos && Object.keys(todos);
    let filteredApiTodos = apiTodos;

    if (props.filterType === "active") {
        filteredApiTodos = apiTodos && apiTodos.filter(todo => !todo.completed);
        filteredTodos = todos && Object.keys(todos).filter(key => !todos[key].completed);
    }
    else if (props.filterType === "completed") {
        filteredApiTodos = apiTodos && apiTodos.filter(todo => todo.completed);
        filteredTodos = todos && Object.keys(todos).filter(key => todos[key].completed);
    }

    const updateCheckedItems = (e, id) => {
        if (e.target.checked) {
            checkedItemsList.push(id);
        }
        else {
            checkedItemsList.splice(checkedItemsList.indexOf(id), 1);
        }

        console.log(checkedItemsList)
        props.onUpdateCheckedList([...checkedItemsList]);
    }

    if (props.isCleanCheckedTodosListRequired) {
        checkedItemsList = [];
    }

    const apiTodosList = (
        <>
            { filteredApiTodos && filteredApiTodos.map(todo => (
                <li className="list-group-item" key={todo.id}>
                    <span className="content">
                        <input type="checkbox" className="form-control todo-checkbox" disabled />
                        { todo.title }
                    </span>
                    <span className={`status badge ${todo.completed ? 'badge-secondary' : 'badge-info'}`}>
                        { todo.completed ? 'completed' : 'active' }
                    </span>
                </li>
            )) }
        </>
    );

    const todosList = (
        <>
            { filteredTodos && filteredTodos.map(key => (
                <li className="list-group-item" key={key}>
                    <span className="content">
                        <input type="checkbox" className="form-control todo-checkbox"
                               checked={checkedItemsList.indexOf(key) >= 0}
                               onChange={((e) => updateCheckedItems(e, key))} />
                        {todos[key].content}
                    </span>
                    <div className="status d-flex align-items-center">
                        { !todos[key].completed && <span className="tick" onClick={() => props.onMarkComplete(key)} /> }
                        <span className="cross" onClick={() => props.onDeleteNote(key)} />
                        <span className={`badge ${todos[key].completed ? "badge-secondary" : "badge-info"}`}>
                            { todos[key].completed ? "completed" : "active" }
                        </span>
                    </div>
                </li>
            )) }
        </>
    )

    return (
        <ul className="list-group theme-shadow">
            { apiTodosList }
            { todosList }
        </ul>
    )
};

const mapStateToProps = state => {
    return {
        notes: state.notes.notes,
        apiNotes: state.notes.apiNotes,
        filterType: state.notes.filterType,
        isCleanCheckedTodosListRequired: state.notes.isCleanCheckedTodosListRequired,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSaveNew: (content, category) => dispatch(actions.saveTrigger(content, category)),
        onDeleteNote: (id) => dispatch(actions.deleteTrigger(id)),
        onMarkComplete: (id) => dispatch(actions.triggerMarkComplete(id)),
        onUpdateCheckedList: (checkedList) => dispatch(actions.updateCheckedList(checkedList)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);
