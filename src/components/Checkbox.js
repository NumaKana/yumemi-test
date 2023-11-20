import { useEffect, useState } from 'react';

function Checkbox(props){
    const [prefectures, setPrefectures] = useState([]);
    const url = "https://opendata.resas-portal.go.jp/"
    const header = {
        "X-API-KEY" : process.env.REACT_APP_RESAS_API_KEY
    }

    useEffect(() => {
        fetch(url + "api/v1/prefectures", {method: 'GET', headers:header})
        .then((res) => res.json())
        .then((data) => setPrefectures(data["result"]))
        .catch((err) => console.log(err))
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      return (
        <div className='flex'>
            {prefectures.map(d => {
            return(
                <div className='check'>
                <label>
                    <input 
                    id={d["prefCode"]}
                    type='checkbox'
                    value={d["prefName"]}
                    onChange={props.handleChange}
                    />
                    {d["prefName"]}
                </label>
                </div>
            )
            })}
      </div>
      )
}

export default Checkbox;