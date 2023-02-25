import React, { Component } from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: localStorage.notes ? JSON.parse(localStorage.notes) : [],
      activeNote: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.notes !== prevState.notes) {
      localStorage.setItem("notes", JSON.stringify(this.state.notes));
    }
  }

  onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    this.setState((prevState) => ({
      notes: [newNote, ...prevState.notes],
      activeNote: newNote.id,
    }));
  };

  onDeleteNote = (noteId) => {
    this.setState((prevState) => ({
      notes: prevState.notes.filter(({ id }) => id !== noteId),
    }));
  };

  onUpdateNote = (updatedNote) => {
    this.setState((prevState) => ({
      notes: prevState.notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      ),
    }));
  };

  getActiveNote = () => {
    const { notes, activeNote } = this.state;
    return notes.find(({ id }) => id === activeNote);
  };

  render() {
    const { notes, activeNote } = this.state;

    return (
      <div className="App">
        <Sidebar
          notes={notes}
          onAddNote={this.onAddNote}
          onDeleteNote={this.onDeleteNote}
          activeNote={activeNote}
          setActiveNote={(id) => this.setState({ activeNote: id })}
        />
        <Main activeNote={this.getActiveNote()} onUpdateNote={this.onUpdateNote} />
      </div>
    );
  }
}

export default App;
