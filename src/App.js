import './App.css';
import { useState } from 'react';
import Checkbox from './components/Checkbox';

function App() {
  const [checkedValues, setCheckedValues] = useState([]);
  const [data, setData] = useState([]);
  const url = "https://opendata.resas-portal.go.jp/"
  const header = {
    "X-API-KEY" : process.env.REACT_APP_RESAS_API_KEY
  }

  const getperYear = async (values) => {
    for(let i=0;i<values.length;i++){
      const query = new URLSearchParams();
      query.append("prefCode", values[i])
      query.append("cityCode", "-")
      await fetch(url + "api/v1/population/composition/perYear?" + query, {method: 'GET', headers:header})
        .then((res) => res.json())
        .then((d) => {
          const result = d["result"]
          setData([...data, {name: values[i], data: result["data"]}])
        })
        .catch((err) => console.log(err))
    }
    console.log(data)
  }

  const handleChange = (e) => {
    if(checkedValues.includes(e.target.id)){
      const new_array = checkedValues.filter((checkedValue) => checkedValue !== e.target.id)
      setCheckedValues(new_array);
      getperYear(new_array)
    }else{
      const new_array = [...checkedValues, e.target.id]
      setCheckedValues(new_array);
      getperYear(new_array)
    }
  }

  return (
    <div className="App">
      <Checkbox handleChange={handleChange}/>
      {data.map(d => {
        return(
          <li>{d["name"]}</li>
        )
      })} 
    </div>
  );
}

export default App;
