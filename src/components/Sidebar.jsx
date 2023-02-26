import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copy: false,
    };
  }

  render() {
    const {
      notes,
      onAddNote,
      onDeleteNote,
      activeNote,
      setActiveNote,
    } = this.props;
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
    const { copy } = this.state;

    return (
      <div className="app-sidebar">
        <div className="app-sidebar-header">
          <h1>My Notes</h1>
          <button onClick={onAddNote}>+ Add</button>
        </div>
        <div className="app-sidebar-notes">
          {sortedNotes.map(({ id, title, body, lastModified }, i) => (
            <div
              className={`app-sidebar-note ${id === activeNote && "active"}`}
              onClick={() => setActiveNote(id)}
              key={id}
            >
              <div className="sidebar-note-title">
                <strong>{title}</strong>
                <CopyToClipboard
                  text={notes}
                  onCopy={() => this.setState({ copy: true })}
                >
                  <button>{copy ? "copied" : "copy"}</button>
                </CopyToClipboard>
                <button onClick={(e) => onDeleteNote(id)}>Delete</button>
              </div>

              <p>{body && body.substr(0, 100) + "..."}</p>
              <small className="note-meta">
                Last Modified{" "}
                {new Date(lastModified).toLocaleDateString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Sidebar;
