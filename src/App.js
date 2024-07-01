import React, { useState } from 'react';

function App() {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [notFollowingBack, setNotFollowingBack] = useState([]);

  const handleFileUpload = (e, setState) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

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
        setState(usernames);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("Error parsing the uploaded file. Please ensure it is in the correct format.");
      }
    };

    reader.readAsText(file);
  };

  const findNotFollowingBack = () => {
    const notFollowing = following.filter((user) => !followers.includes(user));
    setNotFollowingBack(notFollowing);
  };

  return (
    <div className="App">
      <h1>Who Unfollowed Me On Instagram?</h1>
      <div>
        <input
          type="file"
          onChange={(e) => handleFileUpload(e, setFollowers)}
          accept=".json"
        />
        <label>Upload Followers List</label>
      </div>
      <div>
        <input
          type="file"
          onChange={(e) => handleFileUpload(e, setFollowing)}
          accept=".json"
        />
        <label>Upload Following List</label>
      </div>
      <button onClick={findNotFollowingBack}>Find Users Not Following Back</button>
      <h2>Users Not Following Back:</h2>
      <ul>
        {notFollowingBack.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
