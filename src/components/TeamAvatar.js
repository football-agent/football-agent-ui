import React from "react";
import Avatar from "@mui/material/Avatar";



function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 100, height: 100 
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }




export default function TeamAvatar(props) {
  return (
    <div style={{flex: '1 0 10%', margin: '5px'}}>
      <Avatar
       
        {...stringAvatar(props.teamName)}
      />
    </div>
  );
}
