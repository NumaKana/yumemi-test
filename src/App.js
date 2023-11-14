import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([])
  const url = "https://opendata.resas-portal.go.jp/"
  const header = {
    "X-API-KEY" : process.env.REACT_APP_RESAS_API_KEY
  }
  useEffect(() => {
    fetch(url + "api/v1/prefectures", {method: 'GET', headers:header})
    .then((res) => res.json())
    .then((data) => setData(data["result"]))
    .catch((err) => console.log(err))
  }, [])

  return (
    <div className="App">
      <div className='flex'>
        {data.map(d => {
          return(
            <div className='check'>
              <label>
                <input 
                  id={d["prefCode"]}
                  type='checkbox'
                  value={d["prefName"]}
                />
                {d["prefName"]}
              </label>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
