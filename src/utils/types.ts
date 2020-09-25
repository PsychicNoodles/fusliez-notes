import { ItemInterface } from "react-sortablejs";
import { JssStyle } from "jss";

export interface IPlayer extends ItemInterface {
  name: string;
  color: string;
}

export interface IRoundLog {
  round: number;
  player: IPlayer;
  position: { x: number; y: number };
  timestamp: number;
}

export interface ITheme {
  name: string;

  backgroundColor: string;
  textColor: string;

  inputBackgroundColor: string;
  inputTextColor: string;

  neutralBackgroundColor: string;
  neutralTextColor: string;

  innocentBackgroundColor: string;
  innocentTextColor: string;

  impostorBackgroundColor: string;
  impostorTextColor: string;

  buttonBackgroundColor: string;
  buttonTextColor: string;

  fontFamily: string;
  fontSize: number;

  borderColor: string;

  linkColor: string;

  global: JssStyle;
}

export interface IDataContext {
  version: string;
  theme: ITheme;
  innocentWins: number;
  innocentLosses: number;
  impostorWins: number;
  impostorLosses: number;
  names: boolean;
  innocentPlayers: Array<IPlayer>;
  susPlayers: Array<IPlayer>;
  evilPlayers: Array<IPlayer>;
  deadPlayers: Array<IPlayer>;
  unknownPlayers: Array<IPlayer>;
  allPlayers: Array<IPlayer>;
  notes: string;
  roundStartTimes: Array<number>;
  mapLogs: Array<IRoundLog>;
  resetPlayersPositions: () => void;
  resetGames: () => void;
  resetAll: () => void;
  setTheme: (value: ITheme) => void;
  setInnocentWins: (value: number) => void;
  setInnocentLosses: (value: number) => void;
  setImpostorWins: (value: number) => void;
  setImpostorLosses: (value: number) => void;
  setNames: (value: boolean) => void;
  setInnocentPlayers: (value: Array<IPlayer>) => void;
  setSusPlayers: (value: Array<IPlayer>) => void;
  setEvilPlayers: (value: Array<IPlayer>) => void;
  setDeadPlayers: (value: Array<IPlayer>) => void;
  setUnknownPlayers: (value: Array<IPlayer>) => void;
  setNotes: (value: string) => void;
  setRoundStartTimes: (value: Array<number>) => void;
  setMapLogs: (value: Array<IRoundLog>) => void;
}

export interface IData {
  version: string;
  theme: string;
  innocentWins: number;
  innocentLosses: number;
  impostorWins: number;
  impostorLosses: number;
  names: boolean;
  innocentPlayers: Array<IPlayer>;
  susPlayers: Array<IPlayer>;
  evilPlayers: Array<IPlayer>;
  deadPlayers: Array<IPlayer>;
  unknownPlayers: Array<IPlayer>;
  notes: string;
  roundStartTimes: Array<number>;
  mapLogs: Array<IRoundLog>;
}
