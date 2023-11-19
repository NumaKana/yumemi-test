import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Chart (props) {
    var series = []
    var categories_x = []
    var data = []
    console.log(props.data)
    
    for (let i=0; i<props.data.length; i++){
        data = []       
        for(let j=0; j<props.data[i].data[0].data.length; j++){
            data.push(props.data[i].data[0].data[j].value)
            categories_x.push(props.data[i].data[0].data[j].year)
        }
        series.push({
            type: "line",
            name: props.data[i]["name"],
            data: data
        })
    }
    const options = {
        title: {
            text: "人口推移"
        },
        xAxis: {
            title: {
                text: "年度"
            },
            categories: categories_x
        },
        yAxis: {
            title: {
                text: "人口数"
            },
            categories: []
        },
        series: series
    }


    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

export default Chart;