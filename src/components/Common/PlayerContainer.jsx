import React, { useRef, useState, useEffect } from "react";
import JWPlayer from "./JWPlayer";

export default function PlayerContainer({
  playlist,
  isOpen,
  setOpen,
  playMusic,
  pauseMusic,
  playNextMusic,
  setSidebarRef,
  setPlayerRef
}) {
  //   const [isOpen, setOpen] = useState(isOpen);
  const sidebarRef = useRef();
  sidebarRef.current = null;

  useEffect(() => {
    if (sidebarRef) {
      setSidebarRef(sidebarRef.current);
    }
  }, [sidebarRef.current]);

  const togglePlayer = () => {
    if (isOpen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="player-sidebar" ref={sidebarRef}>
      <div className="player-toggle-container">
        <button onClick={togglePlayer}>
          {isOpen ? (
            <i className="fa fa-angle-right"></i>
          ) : (
            <i className="fa fa-angle-left"></i>
          )}
        </button>
      </div>

      <h4 className="text-center px-2 music-player-heading">Music player</h4>

      <JWPlayer
        playlist={playlist || []}
        playMusic={playMusic}
        pauseMusic={pauseMusic}
        setPlayerRef={setPlayerRef}
        playNextMusic={playNextMusic}
      />
      {(playlist == undefined || playlist.length == 0) && isOpen && (
        <div className="no-content-alert px-3">
          {" "}
          You have not selected any track at this moment
        </div>
      )}
    </div>
  );
}
