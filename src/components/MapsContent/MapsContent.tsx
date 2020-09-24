import React from "react";
import useStyles from "./MapsContent.styles";
import FeedbackForm from "../FeedbackForm";
import Button from "components/common/Button";
import MapLog from "components/MapLog/MapLog";

export default function MapsContent(): JSX.Element {
  const [map, setMap] = React.useState("skeld");
  const [currentTab, setCurrentTab] = React.useState("Maps");

  const classes = useStyles({
    map: map == "skeld" ? "TheSkeld" : map == "mira" ? "Mirahq" : "Polus",
  });

  const buttons = ["Maps", "Feedback"];

  return (
    <div className={classes.root}>
      <div className={classes.buttonsContainer}>
        {buttons.map((tab) => (
          <Button
            className={`${classes.button} ${
              currentTab === tab ? classes.activeButton : ""
            }`}
            key={tab}
            onClick={() => setCurrentTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>
      {currentTab === "Maps" ? (
        <>
          <div className={classes.mapNames}>
            <img
              src="assets/The_Skeld.png"
              alt="The Skeld"
              onClick={() => setMap("skeld")}
              className={`${classes.mapName} ${
                map == "skeld" ? classes.activeMap : ""
              }`}
            />
            <img
              src="assets/Mira_HQ.png"
              alt="Mira HQ"
              onClick={() => setMap("mira")}
              className={`${classes.mapName} ${
                map == "mira" ? classes.activeMap : ""
              }`}
            />
            <img
              src="assets/Polus_Map.png"
              alt="Polus"
              onClick={() => setMap("polus")}
              className={`${classes.mapName} ${
                map == "polus" ? classes.activeMap : ""
              }`}
            />
          </div>
          <div className={classes.wrapper}>
            <img
              id="map"
              src={`assets/${
                map == "skeld" ? "TheSkeld" : map == "mira" ? "Mirahq" : "Polus"
              }.png`}
              className={classes.map}
              draggable={false}
            />
          </div>
          <div className={classes.wrapper}>
            <MapLog />
          </div>
        </>
      ) : (
        <FeedbackForm />
      )}
    </div>
  );
}
