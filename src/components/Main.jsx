import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { MdOutlineAttachment } from 'react-icons/md';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: 16,
      bold: false,
      under: false,
      italic: false
    };
  }

  characterLimit = 300;

  onEditField = (field, value) => {
    const { activeNote, onUpdateNote } = this.props;
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now()
    });
  };

  selectFiles = () => {
    document.getElementById('selectFile').click();
  };

  render() {
    const { activeNote } = this.props;
    const { fontSize, bold, under, italic } = this.state;
    if (!activeNote) return <div className="no-active-note">No Active Note</div>;
    return (
      <div className="app-main">
        <div className="app-main-note-edit">
          <input
            type="text"
            id="title"
            placeholder="Note Title"
            value={activeNote.title}
            onChange={(e) => this.onEditField('title', e.target.value)}
            autoFocus
          />
          <div className="sect">
            <div className="cla" style={{ display: 'flex' }}>
              <button onClick={() => this.setState({ bold: !bold })}>B</button>
              <button onClick={() => this.setState({ under: !under })}>U</button>
              <button onClick={() => this.setState({ italic: !italic })}>I</button>
              <MdOutlineAttachment onClick={this.selectFiles} 
              style={{fontSize: '23px'}}
              />
              <input type="file" id="selectFile" style={{ display: 'none' }} />
              <button onClick={() => this.setState({ fontSize: fontSize + 2 })} className="font">
                +
              </button>
              <button onClick={() => this.setState({ fontSize: fontSize - 2 })} className="font">
                -
              </button>
            </div>
            <textarea
              style={{
                border: 'none',
                fontSize: `${fontSize}px`,
                fontWeight: bold ? 'bold' : 'normal',
                textDecoration: under ? 'underline' : 'none',
                fontStyle: italic ? 'italic' : 'inherit'
              }}
              id="body"
              placeholder="Write your note here..."
              value={activeNote.body}
              onChange={(e) => this.onEditField('body', e.target.value)}
            />
            <div className="note-footer">
              <small>{this.characterLimit - activeNote.body.length} words remaining</small>
            </div>
          </div>
        </div>
        <div className="app-main-note-preview">
          <h1 className="preview-title">{activeNote.title}</h1>
          <ReactMarkdown className="markdown-preview">{activeNote.body}</ReactMarkdown>
        </div>
      </div>
    );
  }
}

export default Main;
