import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const toolbarOptions = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const Editor = ({ value, onChange }) => {
  return (
    <ReactQuill
      modules={toolbarOptions}
      theme="snow"
      value={value}
      onChange={onChange}
      style={{ height: '350px', overflow: 'hidden' }}
    />
  );
};

export default Editor;
