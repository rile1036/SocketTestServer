import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const Chat = ({ socket, roomName, setEntered }) => {
  const [text, setText] = useState("");
  const [history, setHistory] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {}, [members]);

  socket.on("socket error", (data) => {
    console.log("error received", data);
  });

  socket.on("receive participants list", (data) => {
    data = JSON.parse(data);
    console.log(socket.id);
    setMembers(data.participantsList);
  });

  socket.on("receive chat", (data) => {
    data = JSON.parse(data);
    setMembers((members) => members);
    console.log(members);
    // 닉네임, 메시지를 모두 미리 저장해두어야함. member에 의존하지 않도록
    const message = {
      nickname: data.nickname,
      Korean: data.Korean,
      English: data.English,
    };
    setHistory([...history, message]);
  });

  const sendChat = (text) => {
    socket.emit("send chat", {
      Korean: text,
      English: "this is English",
      origin: "Korean",
    });
  };

  const changeText = (e) => {
    setText(e.target.value);
  };

  const onQuit = () => {
    socket.emit("disconnect");
  };

  return (
    <>
      <p>{roomName} 채팅방에 입장하였습니다.</p>
      <button>나가기</button>
      <input type="text" onChange={changeText}></input>
      <button type="button" onClick={() => sendChat(text)}>
        send
      </button>
      {history.map((h) => {
        return (
          <p>
            {h.nickname} : {h.Korean}
          </p>
        );
      })}
      <hr />
      <h3>참가자 리스트</h3>
      {members.map((mem) => (
        <p>{mem.nickname}</p>
      ))}
    </>
  );
};

export default Chat;
