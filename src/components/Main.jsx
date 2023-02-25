import ReactMarkdown from "react-markdown";
import { useState } from "react";
import {BsFillCloudUploadFill} from 'react-icons/bs'
const Main = ({ activeNote, onUpdateNote }) => {
  const characterLimit = 300;
  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;
  
  const [fontSize, setFont] = useState(16)
  const [bold, setBold] = useState(false)
  const [under, setUnder] = useState(false)
  const [italic, setItalic] = useState(false)
  const selectFiles = ()=>{
    document.getElementById('selectFile').click()
  }
    return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          placeholder="Note Title"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
       <div className="sect">
        <div className="cla" style={{display:'flex'}}>
          <button onClick={()=>setBold(!bold)}>B</button>
          <button onClick={()=>setUnder(!under)}>U</button>
          <button onClick={()=>setItalic(!italic)}>I</button>
          <BsFillCloudUploadFill onClick={selectFiles} />
          <input type="file" id="selectFile" style={{display: 'none'}}/>
          <button onClick={()=> setFont(fontSize + 2)} className='font'>+</button>
          <button onClick={()=> setFont(fontSize - 2)} className='font'>-</button>
        </div>
       <textarea
       style={{border:'none', fontSize: `${fontSize}px`,
      fontWeight: bold ? 'bold' : 'normal',
      textDecoration: under ? 'underline' : 'none',
      fontStyle: italic ? "italic" : 'inherit'
      }}
          id="body"
          placeholder="Write your note here..."
          value={activeNote.body}
          onChange={(e) => onEditField("body", e.target.value)
          
        }
        />
        <div className="note-footer">
        <small>{characterLimit - activeNote.body.length} words Remainning</small>
        </div>
       </div>
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.body}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Main;