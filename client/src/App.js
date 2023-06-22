import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';
import copyImg from './img/clipboard_copy_icon_246469.png'
import CopyToClipboard from 'react-copy-to-clipboard'

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState(null);

  const fileInputRef = useRef();

  const url = 'https://source.unsplash.com/random/?nature';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  return (
    <div className='container'>
      <img src={url} className='img' alt='nature_img'/>
      <div className='wrapper'>
        <h1>Shareable File Link Sharing !!</h1>
        <p>Upload and share the download link.</p>
        
        <button onClick={() => onUploadClick()}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        {result && <div className='shareAble'>
        <a href={result} target='_blank' rel='noreferrer'>{result}</a> 
        <CopyToClipboard text={result}>
        <img src={copyImg} alt={"copyimg"} className='copyImg'/>
        </CopyToClipboard>
        </div>}
      </div>
    </div>
  );
}

export default App;
