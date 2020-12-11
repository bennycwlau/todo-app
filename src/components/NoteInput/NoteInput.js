import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import { isEmpty } from "../../utility/funtions";

const NoteInput = (props) => {
    const [content, setContent] = useState('');

    const saveNewNote = (e) => {
        e.preventDefault();

        if (!isEmpty(content)) {
            props.onSaveNew(content);
            setContent('');
        }
    }

    return (
        <form className="d-md-flex note-input" onSubmit={saveNewNote}>
            <div className="input-group theme-shadow mb-3">
                <input type="text"
                       className="form-control todo-input"
                       placeholder="What needs to be done?"
                       value={ content }
                       onChange={ e => setContent(e.target.value) }
                       aria-label="Todo input"
                       aria-describedby="Todo input" />
                <div className="input-group-append">
                    <button type="submit"
                            className="btn btn-secondary"
                    >Save</button>
                </div>
            </div>
            <div className="d-flex">
                <button className="btn btn-secondary delete-all-btn ml-auto ml-md-3 mb-3 mr-2 theme-shadow"
                        onClick={() => props.onDeleteAll()}
                >
                    Delete { props.checkedTodosList.length ? "Selected": "All" }
                </button>
                <select className="custom-select todo-category ml-md-3 mb-3 theme-shadow"
                        onChange={e => props.onFilterUpdate(e.target.value)}>
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
        </form>
    )
};

const mapStateToProps = state => {
    return {
        checkedTodosList: state.notes.checkedTodosList,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSaveNew: (content) => dispatch(actions.saveTrigger(content)),
        onFilterUpdate: (filterType) => dispatch(actions.updateFilter(filterType)),
        onDeleteAll: () => dispatch(actions.deleteTriggerAll()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteInput);
