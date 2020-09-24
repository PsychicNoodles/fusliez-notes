import React from "react";
import { useData } from "context";
import useStyles from "./MapLog.styles";
import Button from "components/common/Button";
import { formatRelative } from "date-fns";

export default function MapLog(): JSX.Element {
  const { mapLogs, setMapLogs } = useData()!; // eslint-disable-line
  const [roundNumber, setRoundNumber] = React.useState(mapLogs.length - 1);

  const currentRound = mapLogs[roundNumber];

  const classes = useStyles({});

  const backRound = () => {
    setRoundNumber(roundNumber - 1);
  };

  const forwardRound = () => {
    setRoundNumber(roundNumber + 1);
  };

  const newRound = () => {
    setMapLogs([...mapLogs, { logs: [], roundStart: new Date() }]);
    setRoundNumber(roundNumber + 1);
  };

  const formatPosition = ({ x, y }: { x: number; y: number }) =>
    `at ${x}, ${y}`;

  return (
    <div className={classes.root}>
      <Button className={classes.newRoundButton} onClick={newRound}>
        New Round
      </Button>
      <div className={classes.roundSelectorContainer}>
        <Button
          className={classes.roundSelectorButton}
          disabled={roundNumber === 0}
          onClick={backRound}
        >
          &lt;
        </Button>
        <div className={classes.roundSelectorDisplay}>
          Round {roundNumber + 1}
        </div>
        <Button
          className={classes.roundSelectorButton}
          disabled={roundNumber === mapLogs.length - 1}
          onClick={forwardRound}
        >
          &gt;
        </Button>
      </div>
      <div className={classes.logContainer}>
        {currentRound &&
          currentRound.logs.map(({ player, position, timestamp }) => (
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
                {formatRelative(timestamp, currentRound.roundStart)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
