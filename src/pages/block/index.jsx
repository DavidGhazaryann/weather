
import { useEffect, useState } from "react";
import { CircularProgress, Slide, TextField } from '@mui/material';
import img from '../../assets/img/img.webp'
import './style.css'

const Block = () => {
    const [inp, setInp] = useState('')
    const [cityName, setCityName] = useState('Armenia')
  
    const [data, setData] = useState({})
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4e0d14a49d0dbeed85f03b12dd525c40&units=metric`
      )
        // fetch(
        //   `api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&units=metric&cnt=7&appid=4e0d14a49d0dbeed85f03b12dd525c40&units=metric`
        // )
        .then((res) => {
          if (res.status === 200) {
            error && setError(false)
            return res.json()
          }
          else {
            throw new Error('Soner')
          }
        })
        .then((data) => {
          setData(data)
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false))
    }, [cityName, error])
    console.log(data)
    let z = data
    // console.log(inp)
    let handleSearch = (e) => {
      if (e.key === 'Enter') {
        setCityName(e.target.value)
        setInp('')
      }
    }
    return  <div className="img" style={{ backgroundImage: `url(${img})` }}>
    {
      !loading ? (
        <>
          <TextField
            variant="filled"
            label='Search location'
            className="input"
            error={error}
            value={inp}
            onChange={(e) => setInp(e.target.value)}
            onKeyDown={handleSearch}
          />
          <h1>{data.name}</h1>
          <div className="display">
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
            <h1>{data.weather[0].main}</h1>
          </div>

          <h1>{data.main.temp.toFixed()}  °C</h1>
          <div className="display">
            <div className="box">
              <h3>Humidity</h3>
              <h2>{data.main.humidity.toFixed()} %</h2>
            </div>
            <div className="box">
              <h3>Wind</h3>
              <h2>{data.wind.speed.toFixed()} km/h</h2>
            </div>
            <div className="box">
              <h3>Feels Like</h3>
              <h2>{data.main.feels_like.toFixed()} °C</h2>
            </div>
          </div>

        </>
      ) : (
        <CircularProgress />
      )
    }
  </div>
}
export default Block