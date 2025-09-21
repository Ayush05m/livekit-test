import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import { useState } from 'react';
// import '@livekit/components-react/styles.css';

function App() {
  const [roomName, setRoomName] = useState('');
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');

  const joinRoom = async () => {
    try {
      const response = await fetch(
        `https://congenial-space-broccoli-55jr74wwpvwc4964-3000.app.github.dev/get-token?roomName=${roomName}&participantName=${userName}`
      );
      const { token, error } = await response.json();
      if (error) throw new Error(error);
      setToken(token);
    } catch (e) {
      alert('Failed to join room: ' + e.message);
    }
  };

  return (
    <div>
      <h1>Video Conference</h1>
      {!token ? (
        <div>
          <input
            type="text"
            placeholder="Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <LiveKitRoom
          serverUrl="wss://34.68.26.205:443"
          token={token}
          connect={true}
        >
          <VideoConference />
        </LiveKitRoom>
      )}
    </div>
  );
}

export default App;