import { useRef } from "react";
import { useState } from "react";

export default function Player() {
  const [playerName,setPlayerName] = useState(null);
  const userInputPlayerName = useRef();

  function handleSetPlayerName() {
    setPlayerName(userInputPlayerName.current.value);
  }


  return (
    <section id="player">
      <h2>Welcome {playerName ?? "unknown entity"}</h2>
      <p>
        <input type="text" ref={userInputPlayerName} />
        <button onClick={handleSetPlayerName}>Set Name</button>
      </p>
    </section>
  );
}
