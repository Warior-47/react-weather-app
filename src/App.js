import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('')
  const [allData, setAllData] = useState({
    city:'atlanta',
    country:'',
    temprature: '',
    humidity:'',
    minTemperature:'',
    weatherIcons:''
  })

  useEffect(() =>{

    fetchData()

  }, [])

  const fetchData = async (city) =>{

    try{

    
    const APIKEY = '50d0c47ca540ad8504d3c673e798d3b6';
    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`);
    await setAllData({
      city: result.data.name,
      country:result.data.sys.country,
      temprature: result.data.main.temp,
      humidity: result.data.main.humidity,
      minTemperature: result.data.main.temp_min,
      weatherIcons: result.data.weather[0].icon
      
    })
  }catch (e){
    console.log('Api notloaded correctly or loaded for the first time');
  }
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
    
  }
  const hanldeSubmit = (event) => {
  
    console.log(search);
    event.preventDefault()
    fetchData(search)
  }


  return (
      <div className='form'>
        <form onSubmit= {hanldeSubmit}>
          <input value={search} type="text" name = 'city' placeholder ='Enter City Name' onChange={handleChange}/>
          <button for='city'>Search</button>
          
        </form>

        <section>
          <div>
            <img src={'https://openweathermap.org/img/wn/' 
            + allData.weatherIcons + 
            '@2x.png'} />
          <h1>{allData.city}</h1>
          <h2>{allData.country}</h2>
          <div>
          <h3>Humidity <br /></h3>
          <p>{allData.humidity}%</p>
          </div>
          <div>
          <h3>Temprature <br /></h3>
          <p>{allData.temprature}°C</p>
          </div>
          <div>
            <h3>MIN TEMPERATURE</h3>
            <p>{allData.minTemperature}°C</p>
            </div>
          </div>
        </section>
      </div>
  );
}
export default App;