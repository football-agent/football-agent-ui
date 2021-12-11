import React from "react";
import Avatar from "@mui/material/Avatar";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name, isClickedFlag, selectedTeam) {
  return {
    sx: {
      bgcolor:
        isClickedFlag && selectedTeam.team === name ? "grey" : stringToColor(name),
      width: isClickedFlag && selectedTeam.team === name ? 150 : 100,
      height: isClickedFlag && selectedTeam.team === name ? 150 : 100,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function TeamAvatar(props) {
  const [isClicked, setIsClicked] = React.useState(false);

  const handleAvatarClick = () => {
    setIsClicked(!isClicked);
    props.handleTeamSelect(props.teamName);
  };

  return (
    <div style={{ flex: "1 0 10%", margin: "5px" }}>
      <Avatar
        onClick={handleAvatarClick}
        {...stringAvatar(props.teamName, isClicked, props.selectedTeam)}
      />
    </div>
  );
}
