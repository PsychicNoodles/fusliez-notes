import React from "react";
import { useData } from "context";
import useStyles from "./MapLog.styles";
import Button from "components/common/Button";
import { formatRelative } from "date-fns";

export default function MapLog(): JSX.Element {
  const [roundNumber, setRoundNumber] = React.useState(0);
  const { mapLogs, setMapLogs } = useData()!; // eslint-disable-line

  const currentRound = mapLogs[roundNumber];

  const classes = useStyles({});

  const backRound = () => {
    if (roundNumber > 1) {
      setRoundNumber(roundNumber - 1);
    }
  };

  const forwardRound = () => {
    if (roundNumber < mapLogs.length - 1) {
      setRoundNumber(roundNumber + 1);
    }
  };

  const formatPosition = ({ x, y }: { x: number; y: number }) => "test";

  return (
    <div className={classes.root}>
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
