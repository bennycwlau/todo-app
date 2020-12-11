import React, { useEffect } from "react";
import MainPage from './pages/Main';
import './App.css';
import {connect} from 'react-redux';
import firebase from './firebase/config';
import 'firebase/database';
import * as actions from "./store/actions";
import { isEmpty } from "./utility/funtions";


function App(props) {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(res => res.json())
        .then(res => {
            props.onSetApiNotes(res.slice(0, 10));
        });

    const fetchTodos = () => {
        let ref = firebase.database().ref("Notes");
        ref.once("value").then(snapshot => {
            props.onSetNotes(snapshot.val());
        });
    };

    const createTodo = (content) => {
        if (!isEmpty(content)) {
            const obj = {
                content,
                completed: false,
                date: new Date().toString()
            }

            let ref = firebase.database().ref("Notes").push();
            ref.set(obj).then((res) => {
                fetchTodos();
            });
        }
    }

    const deleteTodo = (id) => {
        let ref = firebase.database().ref("Notes/");
        ref.child(id).remove().then(() => {
            fetchTodos();
        });
    }

    const deleteAllTodos = () => {
        if (props.checkedTodosList.length) {
            props.checkedTodosList.forEach(todoKey => {
                let ref = firebase.database().ref("Notes/");
                ref.child(todoKey).remove().then(() => {
                    fetchTodos();
                });
            })
        }
        else {
            let ref = firebase.database().ref("Notes/");
            ref.remove().then(() => {
                fetchTodos();
            });
        }
    }

    const markTodoComplete = (id) => {
        let ref = firebase.database().ref("Notes/" + id);
        ref.child("completed").set(true).then((res) => {
            fetchTodos();
        });
    }

    if (props.isSaveRequired) {
        createTodo(props.activeNoteContent);
    }

    if (props.isDeleteRequired) {
        deleteTodo(props.activeNoteId);
    }

    if (props.isDeleteAllRequired) {
        deleteAllTodos();
    }

    if (props.isMarkCompleteRequired) {
        markTodoComplete(props.activeNoteId);
    }

    useEffect(() => {
        fetchTodos();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App">
            <MainPage/>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        notes: state.notes.notes,
        isSaveRequired: state.notes.isSaveRequired,
        isDeleteRequired: state.notes.isDeleteRequired,
        isDeleteAllRequired: state.notes.isDeleteAllRequired,
        isMarkCompleteRequired: state.notes.isMarkCompleteRequired,
        activeNoteId: state.notes.activeNoteId,
        activeNoteContent: state.notes.activeNoteContent,
        checkedTodosList: state.notes.checkedTodosList,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetNotes: (todos) => dispatch(actions.setNotes(todos)),
        onSetApiNotes: (todos) => dispatch(actions.setApiNotes(todos)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
