import './App.css';
import { useState } from 'react';
import Checkbox from './components/Checkbox';
import Chart from './components/Chart';

function App() {
  const [checkedValues, setCheckedValues] = useState([]);
  const [data, setData] = useState([]);
  const [radio, setRadio] = useState("総人口");
  const url = "https://opendata.resas-portal.go.jp/"
  const header = {
    "X-API-KEY" : process.env.REACT_APP_RESAS_API_KEY
  }

  const getperYear = async (values) => {
    if(values.length > 0){
      var result = []
      for(let i=0;i<values.length;i++){
        var query = new URLSearchParams();
        query.append("prefCode", values[i])
        query.append("cityCode", "-")
        await fetch(url + "api/v1/population/composition/perYear?" + query, {method: 'GET', headers:header})
          .then((res) => res.json())
          .then((d) => result.push(d["result"]))
          .catch((err) => console.log(err))
        }
      setData(result)
    }else{
      setData([])
    }
  }

  const handleChange = (e) => {
    if(checkedValues.includes(e.target.id)){
      const new_array = checkedValues.filter(checkedValue => checkedValue !== e.target.id)
      console.log(new_array)
      setCheckedValues(new_array);
      getperYear(new_array)
    }else{
      const new_array = [...checkedValues, e.target.id]
      setCheckedValues(new_array);
      getperYear(new_array)
    }
  }

  const changeRadio = (e) => {
    setRadio(e.target.value)
  }

  return (
    <div className="App">
      <Checkbox handleChange={handleChange}/>
      <input type='radio' value="総人口" name='population' onChange={changeRadio} checked={radio === "総人口"}/>総人口
      <input type="radio" value="年少人口" name='population' onChange={changeRadio} checked={radio === "年少人口"}/>年少人口
      <input type="radio" value="生産年齢人口" name='population' onChange={changeRadio} checked={radio === "生産年齢人口"}/>生産年齢人口
      <input type="radio" value="老年人口" name='population' onChange={changeRadio} checked={radio === "老年人口"}/>老年人口
      <Chart data={data} population={radio}/>
    </div>
  );
}

export default App;
