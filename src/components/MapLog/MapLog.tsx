import React from "react";
import Draggable from "react-draggable";
import { useData } from "context";
import useStyles from "./MapLog.styles";
import Button from "components/common/Button";
import { formatRelative } from "date-fns";
import { IPlayer } from "utils/types";

export default function MapLog(): JSX.Element {
  const {
    mapLogs,
    setMapLogs,
    roundStartTimes,
    setRoundStartTimes,
    allPlayers,
  } = useData()!; // eslint-disable-line
  const [roundNumber, setRoundNumber] = React.useState(mapLogs.length - 1);

  const currentRoundLogs = mapLogs.filter(({ round }) => round === roundNumber);
  const currentRoundStart = roundStartTimes[roundNumber];

  const classes = useStyles({});

  const backRound = () => {
    setRoundNumber(roundNumber - 1);
  };

  const forwardRound = () => {
    setRoundNumber(roundNumber + 1);
  };

  const newRound = () => {
    setRoundStartTimes([...roundStartTimes, Date.now()]);
    setRoundNumber(roundStartTimes.length);
  };

  const formatPosition = ({ x, y }: { x: number; y: number }) =>
    `at ${x}, ${y}`;

  const addLog = (
    player: IPlayer,
    position: { x: number; y: number },
    timestamp: number,
    round: number
  ) => {
    if (roundNumber === -1) {
      newRound();
      setMapLogs([...mapLogs, { player, position, timestamp, round: 0 }]);
    } else {
      setMapLogs([...mapLogs, { player, position, timestamp, round }]);
    }
  };

  return (
    <div className={classes.root}>
      {allPlayers.map((player) => (
        <Draggable
          key={player.id}
          bounds="parent"
          onStop={(e, { x, y }) =>
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
      <Button className={classes.newRoundButton} onClick={newRound}>
        New Round
      </Button>
      <div className={classes.roundSelectorContainer}>
        <Button
          className={classes.roundSelectorButton}
          disabled={roundNumber <= 0}
          onClick={backRound}
        >
          &lt;
        </Button>
        <div className={classes.roundSelectorDisplay}>
          Round {roundNumber + 1}
        </div>
        <Button
          className={classes.roundSelectorButton}
          disabled={roundNumber === roundStartTimes.length - 1}
          onClick={forwardRound}
        >
          &gt;
        </Button>
      </div>
      <div className={classes.logContainer}>
        {currentRoundLogs &&
          currentRoundLogs.map(({ player, position, timestamp }) => (
            <div className={classes.logRow}>
              <img
                className={classes.logPlayerImage}
                src={`assets/${player.color}`}
              />
              <div className={classes.logPlayerName}>{player.name}</div>
              <div className={classes.logPlayerPosition}>
                {formatPosition(position)}
              </div>
              <div className={classes.logPlayerTimestamp}>
                {formatRelative(timestamp, currentRoundStart)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
