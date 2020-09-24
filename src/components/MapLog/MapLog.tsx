import React from "react";
import { useData } from "context";
import useStyles from "./MapLog.styles";
import Button from "components/common/Button";
import { formatRelative } from "date-fns";

export interface IMapLogProps {
  roundNumber: number;
  goBackRound: () => void;
  goForwardRound: () => void;
  startNewRound: () => void;
}

export default function MapLog({
  roundNumber,
  goBackRound,
  goForwardRound,
  startNewRound,
}: IMapLogProps): JSX.Element {
  const { mapLogs, roundStartTimes } = useData()!; // eslint-disable-line

  const currentRoundLogs = mapLogs.filter(({ round }) => round === roundNumber);
  const currentRoundStart = roundStartTimes[roundNumber];

  const classes = useStyles({});

  const formatPosition = ({ x, y }: { x: number; y: number }) =>
    `at ${x}, ${y}`;

  return (
    <div className={classes.root}>
      <Button className={classes.newRoundButton} onClick={startNewRound}>
        New Round
      </Button>
      <div className={classes.roundSelectorContainer}>
        <Button
          className={classes.roundSelectorButton}
          disabled={roundNumber <= 0}
          onClick={goBackRound}
        >
          &lt;
        </Button>
        <div className={classes.roundSelectorDisplay}>
          Round {roundNumber + 1}
        </div>
        <Button
          className={classes.roundSelectorButton}
          disabled={roundNumber === roundStartTimes.length - 1}
          onClick={goForwardRound}
        >
          &gt;
        </Button>
      </div>
      <div className={classes.logContainer}>
        {currentRoundLogs &&
          currentRoundLogs.map(({ player, position, timestamp }) => (
            <div className={classes.logRow} key={`${player.id}-${timestamp}`}>
              <img
                className={classes.logPlayerImage}
                src={`assets/${player.id}.png`}
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
