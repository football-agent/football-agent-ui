import axios from 'axios'

export const getAllTeams=()=>{
    const url = 'localhost:8080/v1/football_agent/team_by_name/Barcelona'
    return axios.get(url)
}