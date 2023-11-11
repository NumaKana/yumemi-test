import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState()
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

  console.log(data)

  return (
    <div className="App">
      {data.map((d) => d["prefName"])}
    </div>
  );
}

export default App;
