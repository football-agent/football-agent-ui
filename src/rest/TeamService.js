import axios from 'axios'

export const getAllTeams=()=>{
    const url = 'https://football-agent-services.herokuapp.com/v1/football_agent/all_teams'
    return axios.get(url)
}

export const getAllPlayers = () =>{
    const url = 'https://football-agent-services.herokuapp.com/v1/football_agent/all_players'
    return axios.get(url)
}

export const getPlayerbyName =(playerName)=>{
    const url = `https://football-agent-services.herokuapp.com/v1/football_agent/player_by_name/${playerName}`
}


export const getStatsByTeam=(teamName)=>{
    const url = 'https://football-agent-services.herokuapp.com/v1/football_agent/all_teams'
    return axios.get(url)
}

