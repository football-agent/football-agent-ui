import axios from 'axios'

export const getPredictionByPlayer=(playerName, teamName)=>{
    const url = `http://localhost:8080/v1/football_agent/prediction/predict/${playerName}/${teamName}`
    return axios.get(url)
}