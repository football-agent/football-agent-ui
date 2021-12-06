import axios from 'axios'

export const getAllTeams=()=>{
    const url = 'http://localhost:8080/v1/football_agent/all_teams'
    return axios.get(url)
}

export const getAllPlayers = () =>{
    const url = 'http://localhost:8080/v1/football_agent/all_players'
    return axios.get(url)
}
