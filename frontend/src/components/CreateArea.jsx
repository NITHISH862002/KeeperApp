import React,{useState} from "react";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';
import Axios from "axios";

function CreateArea(props) {
  const [isExpand,setExpand]=useState(false);
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    Axios.post("http://localhost:3001/api",{title:note.title,content:note.content})
    .then(()=>alert("Successfully inserted"));
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  function expand()
  {
    setExpand(true);
  }
  return (
    <div>
      <form>
        {isExpand && <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />}
        <textarea
        onClick={expand}
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpand?3:1}
        />
         <Zoom in={isExpand && true}>
        <Fab onClick={submitNote}><AddIcon   /></Fab></Zoom>
      </form>
    </div>
  );
}

export default CreateArea;

