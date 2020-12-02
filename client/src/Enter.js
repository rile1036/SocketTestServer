import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import io from "socket.io-client";

const Enter = () => {
  const [roomCode, setRoomCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [entered, setEntered] = useState(false);
  const [socket, setSocket] = useState(null);

  const onEnter = () => {
    setSocket(io(`http://localhost:3000`));
  }

  useEffect(() => {
    if (socket !== null) {
      var roomtest = {nickname: nickname, roomCode: roomCode, language: "Korean"};
      socket.emit("enter chatroom", roomtest);
      setEntered(true);
      console.log(socket.emit("enter chatroom", roomtest));
      console.log(socket);
    }
  }, [socket]);

  const onChangeRoomName = (e) => {
    setRoomCode(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  return (
    <div>
      <p>방 이름</p>
      <input type="text" value={roomCode} onChange={onChangeRoomName} />
      <p>닉네임</p>
      <input type="text" value={nickname} onChange={onChangeNickname} />
      <button type="button" onClick={onEnter}>
        입장
      </button>
      {entered && (
        <Chat socket={socket} roomCode={roomCode} setEntered={setEntered} />
      )}
    </div>
  );
};

export default Enter;
