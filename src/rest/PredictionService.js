import axios from 'axios'

export const getPredictionByPlayer=(playerName, teamName)=>{
    const url = `https://football-agent-services.herokuapp.com/v1/football_agent/prediction/predict/${playerName}/${teamName}`
    return axios.get(url)
}