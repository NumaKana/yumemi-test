import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Chart (props) {
    var series = []
    var categories_x = []
    var data = []
    
    for (let i=0; i<props.data.length; i++){
        data = []      
        for(let j=0; j<4; j++){
            if(props.data[i].data[j].label === props.population){
                for(let k=0; k<props.data[i].data[j].data.length; k++){
                    data.push(props.data[i].data[j].data[k].value)
                    categories_x.push(props.data[i].data[j].data[k].year)
                }
            }
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
        },
        series: 
            series.length === 0
            ? [{ type: "line", name: "都道府県名", data: [] }]
            : series
    }


    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

export default Chart;