import React, { useRef, useEffect, useState } from "react";
import ReactJWPlayer from "react-jw-player";

const JWPlayer = ({
  playlist,
  playMusic,
  pauseMusic,
  playNextMusic,
  setPlayerRef,
}) => {
  const playerControls = useRef();
  const player = useRef();
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  const onReady = () => {
    console.log("player is ready");
    playerControls.current = window.jwplayer("my-jwplayer");
    setPlayerRef(playerControls.current);
    window.jwplayer().addButton(
      '<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-prev" viewBox="0 0 240 240"><path transform="translate(240, 0) scale(-1, 1) " d="M165,60v53.3L59.2,42.8C56.9,41.3,55,42.3,55,45v150c0,2.7,1.9,3.8,4.2,2.2L165,126.6v53.3h20v-120L165,60L165,60z"></path></svg>',
      "Previous",
      function () {
        if (window.jwplayer().getPlaylistIndex() === 0) {
          // If the user is at the first video in the playlist, loop around to the last video
          window
            .jwplayer()
            .playlistItem(
              Math.max(0, window.jwplayer().getPlaylist().length - 1)
            );
        } else {
          // Otherwise, go to the previous video in the playlist
          window
            .jwplayer()
            .playlistItem(
              Math.max(0, window.jwplayer().getPlaylistIndex() - 1)
            );
        }
      },
      "previous",
      "jw-icon-prev"
    );

    window.jwplayer().on("playlistItem", () => {
      setCurrentTrack(
        window.jwplayer().getPlaylistItem(window.jwplayer().getPlaylistIndex())
      );
    });
  };

  useEffect(() => {
    console.log(currentTrack);
  }, [currentTrack]);

  const play = () => {
    playMusic();
  };

  const pause = () => {
    pauseMusic();
  };

  const playNext = () => {
    playNextMusic();
  };

  return (
    <div className="music-player">
      {playlist.length !== 0 && (
        <ReactJWPlayer
          playerId="my-jwplayer"
          playerScript="https://cdn.jwplayer.com/libraries/XM8I7nNC.js"
          playlist={playlist}
          onReady={onReady}
          onResume={() => setPlaying(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onSetupError={(err) => {
            throw err;
          }}
        />
      )}
      {currentTrack?.title && (
        <p className="text-center">Title: {currentTrack?.title}</p>
      )}
      {currentTrack?.artist && (
        <p className="text-center">Artist name: {currentTrack?.artist}</p>
      )}
    </div>
  );
};

export default JWPlayer;
