import axios from 'axios'

export const getPredictionByPlayer=(playerName)=>{
    const url = `http://localhost:8080/v1/football_agent/prediction/predict/${playerName}`
    return axios.get(url)
}