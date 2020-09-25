import MiraHq from "./MiraHq";
import Polus from "./Polus";
import React from "react";
import TheSkeld from "./TheSkeld";
import Draggable from "react-draggable";
import useStyles from "./MapsContent.styles";
import MapLog from "components/MapLog/MapLog";
import { useData } from "context";
import { IPlayer } from "utils/types";

export default function MapsContent(): JSX.Element {
  const [map, setMap] = React.useState("skeld");

  const {
    mapLogs,
    setMapLogs,
    roundStartTimes,
    setRoundStartTimes,
    allPlayers,
  } = useData()!; // eslint-disable-line
  const [roundNumber, setRoundNumber] = React.useState(mapLogs.length - 1);

  const startNewRound = () => {
    setRoundStartTimes([...roundStartTimes, Date.now()]);
    setRoundNumber(roundStartTimes.length);
  };
  const addLog = (
    player: IPlayer,
    position: { x: number; y: number },
    timestamp: number,
    round: number
  ) => {
    if (roundNumber === -1) {
      startNewRound();
      setMapLogs([...mapLogs, { player, position, timestamp, round: 0 }]);
    } else {
      setMapLogs([...mapLogs, { player, position, timestamp, round }]);
    }
  };

  const classes = useStyles({
    map: map === "skeld" ? "TheSkeld" : map === "mira" ? "Mirahq" : "Polus",
  });

  let currentMap = <TheSkeld />;

  if (map === "mira") {
    currentMap = <MiraHq />;
  } else if (map === "polus") {
    currentMap = <Polus />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.mapNames}>
        <img
          src="assets/The_Skeld.png"
          alt="The Skeld"
          onClick={() => setMap("skeld")}
          className={`${classes.mapName} ${
            map === "skeld" ? classes.activeMap : ""
          }`}
        />
        <img
          src="assets/Mira_HQ.png"
          alt="Mira HQ"
          onClick={() => setMap("mira")}
          className={`${classes.mapName} ${
            map === "mira" ? classes.activeMap : ""
          }`}
        />
        <img
          src="assets/Polus_Map.png"
          alt="Polus"
          onClick={() => setMap("polus")}
          className={`${classes.mapName} ${
            map === "polus" ? classes.activeMap : ""
          }`}
        />
      </div>
      <div className={classes.wrapper}>
        {currentMap}
        {allPlayers.map((player) => (
          <Draggable
            key={player.id}
            bounds="parent"
            onStop={(_, { x, y }) =>
              addLog(player, { x, y }, Date.now(), roundNumber)
            }
          >
            <img
              className="player-handle"
              src={`assets/${player.id}.png`}
              draggable={false}
            />
          </Draggable>
        ))}
      </div>
      <div className={classes.wrapper}>
        <MapLog
          roundNumber={roundNumber}
          goBackRound={() => setRoundNumber(roundNumber - 1)}
          goForwardRound={() => setRoundNumber(roundNumber + 1)}
          startNewRound={startNewRound}
        />
      </div>
    </div>
  );
}
