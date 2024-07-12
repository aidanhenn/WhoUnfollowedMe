import React, { useState, useRef } from 'react';
import './App.css'; // Import the stylesheet

function App() {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [notFollowingBack, setNotFollowingBack] = useState([]);
  const [dropZoneColor1, setDropZoneColor1] = useState('#ffb44d'); // State for drop zone color
  const [dropZoneColor2, setDropZoneColor2] = useState('#ffb44d'); // State for drop zone color
  const [showUnfollowersHeader, setShowUnfollowersHeader] = useState(false); // State for Unfollowers-header display

  const handleFileUpload1 = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = JSON.parse(event.target.result);
        console.log("Parsed JSON content:", content);

        let usernames = [];

        if (Array.isArray(content)) {
          usernames = content.flatMap((item) => {
            return item.string_list_data.map((data) => data.value);
          });
        } else if (content.relationships_following) {
          usernames = content.relationships_following.flatMap((item) => {
            return item.string_list_data.map((data) => data.value);
          });
        } else {
          throw new Error("Invalid JSON structure");
        }

        console.log("Extracted usernames:", usernames);
        setFollowers(usernames);
        setDropZoneColor1('#399373'); // Change drop zone color on successful upload
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("Error parsing the uploaded file. Please ensure it is in the correct format.");
        setDropZoneColor1('#ffb44d'); // Reset drop zone color on error
      }
    };

    reader.readAsText(file);
  };

  const handleFileUpload2 = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = JSON.parse(event.target.result);
        console.log("Parsed JSON content:", content);

        let usernames = [];

        if (Array.isArray(content)) {
          usernames = content.flatMap((item) => {
            return item.string_list_data.map((data) => data.value);
          });
        } else if (content.relationships_following) {
          usernames = content.relationships_following.flatMap((item) => {
            return item.string_list_data.map((data) => data.value);
          });
        } else {
          throw new Error("Invalid JSON structure");
        }

        console.log("Extracted usernames:", usernames);
        setFollowing(usernames);
        setDropZoneColor2('#399373'); // Change drop zone color on successful upload
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("Error parsing the uploaded file. Please ensure it is in the correct format.");
        setDropZoneColor2('#ffb44d'); // Reset drop zone color on error
      }
    };

    reader.readAsText(file);
  };

  const findNotFollowingBack = () => {
    const notFollowing = following.filter((user) => !followers.includes(user));
    setNotFollowingBack(notFollowing);
    setShowUnfollowersHeader(true); // Show the Unfollowers-header when button is clicked
  };

  const DropZone = ({ onFileUploaded, dropZoneColor }) => {
    const fileInputRef = useRef(null);

    const handleFileDrop = (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        onFileUploaded(file);
      }
    };

    const handleInputChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        onFileUploaded(file);
      }
    };

    const handlePromptClick = () => {
      fileInputRef.current.click();
    };

    return (
      <div
        id='target'
        className="drop-zone"
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={handlePromptClick}
        style={{ backgroundColor: dropZoneColor }} // Dynamically set background color
      >
        <input
          ref={fileInputRef}
          className="drop-zone__input"
          type="file"
          onChange={handleInputChange}
          accept=".json"
          style={{ display: 'none' }}
        />
        <p className="drop-zone__prompt">Drag & drop a file here or click to upload</p>
        <div className="drop-zone__thumb"></div>
      </div>
    );
  };

  return (
    <div className="App">
      <div className='parent-container'>
        <h1 className='instructions'>1. Download Your Instagram Data <br /><br />2. Upload Your Follower and Following lists <br /><br />3. Click the Find Users Button</h1>
      </div>
      <div className="links">
      </div>

      <div className="upload-section">
        <div className="upload-box">
          <label className='box-label'>Upload Followers List</label>
          <DropZone onFileUploaded={handleFileUpload1} dropZoneColor={dropZoneColor1} />
        </div>
        <div className="upload-box">
          <label className='box-label'>Upload Following List</label>
          <DropZone onFileUploaded={handleFileUpload2} dropZoneColor={dropZoneColor2} />
        </div>
      </div>
      <button onClick={findNotFollowingBack} className='btn-medium'>FIND USERS</button>
      <div className="results">
        <h1 className='Unfollowers-header' style={{ display: showUnfollowersHeader ? 'flex' : 'none' }}>Users Not Following You Back:</h1>
        <ul>
          {notFollowingBack.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
