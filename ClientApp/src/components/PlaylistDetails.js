import React, {
  Component
} from 'react';
import '../custom.css'
import Chart from "react-apexcharts";

export class PlaylistDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      genresCount: 0,
      loading:true,
    }
  }
  componentDidMount() {
    this.getData()
  }

  render() {
    let chartPercent = []
    let chartGenres = []
    let otherCount = 0
    let length = 0


    for (var k in this.state.genres) {
      if (this.state.genres[k] / this.state.genresCount > 0.01) {
        chartPercent.push(this.state.genres[k])
        chartGenres.push(k)
        length++
      } else {
        otherCount += this.state.genres[k]
      }
    }
    let colours = this.generateColourPalette(length)
    console.log(colours)
    chartPercent.push(otherCount)
    chartGenres.push("other")
    colours.push("#555555")
    let tempTable = []
    chartGenres.map((item) => (
      tempTable.push(item + " 2137")
    ))
    let options = {
      chart: {
        width: 1200  ,
        type: 'donut',

      },
      labels: chartGenres,
      fill: {
        opacity: 1
      },

      yaxis: {
        show: false
      },
      legend: {
        position: 'right',
        //customLegendItems:tempTable,
        labels: {
          colors: ['#fff']
        },
        width: 180
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0
          }
        },
        pie: {
          dataLabels: {
            minAngleToShowLabel: 5
          },
        }
      },
      theme: {
        monochrome: {
          enabled: false,
          shadeTo: 'light',
          shadeIntensity: 0.6
        }
      },
      colors: colours,
    }
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : <Chart options = {
        options
      }
      series = {
        chartPercent
      }
      type = {
        options.chart.type
      }
      width = {
        options.chart.width
      }
      />

    return (
      <>
        {contents}
        </>
    )
  }


  async getData() {
    const response = await fetch("/playlist/" + this.props.match.params.id)
    const data = await response.json()
    let counter = 0
    for (var k in data) {
      counter += data[k]
    }
    this.setState({
      genres: data,
      genresCount: counter,
      loading:false,
    })
  }
  generateColourPalette(length) {
    let coloursToPickFrom = ["#565000",
      "#6060d7",
      "#71e77b",
      "#520079",
      "#62c350",
      "#a24dbf",
      "#68b134",
      "#9463da",
      "#058e24",
      "#dc6ad9",
      "#4e8a00",
      "#b21988",
      "#5ceda3",
      "#db2d7b",
      "#00a251",
      "#ff83e2",
      "#00670c",
      "#cd95ff",
      "#9b9e00",
      "#012b79",
      "#e7d655",
      "#369fff",
      "#cb9e0a",
      "#0177be",
      "#dc8c19",
      "#607ec3",
      "#b0e471",
      "#75005b",
      "#a5e58e",
      "#ff74c6",
      "#427600",
      "#a6b1ff",
      "#b34700",
      "#018251",
      "#ff657a",
      "#445700",
      "#8d75b9",
      "#f27838",
      "#73346a",
      "#e6d486",
      "#970042",
      "#62752f",
      "#9c002a",
      "#775300",
      "#db453b",
      "#6f3800",
      "#ff9984",
      "#6b1a00",
      "#ffa06c",
      "#8b0d00"
    ]
    let colourPalette = []
    for (let i = 0; i < length; i++) {
      if (i >= coloursToPickFrom.length)
        colourPalette.push(coloursToPickFrom[i - coloursToPickFrom.length])
      else
        colourPalette.push(coloursToPickFrom[i])
    }
    return colourPalette
  }
}