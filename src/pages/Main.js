import React from "react";
import NoteInput from "../components/NoteInput/NoteInput";
import NotesList from "../components/NotesList/NotesList";

const Main = () => {
    return (
        <div className="main-page container">
            <NoteInput />
            <NotesList />
        </div>
    )
};

export default Main;
