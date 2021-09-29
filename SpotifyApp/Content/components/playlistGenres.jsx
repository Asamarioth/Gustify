import React, { Component } from 'react'
import Chart from "react-google-charts";
export class PlaylistGenre extends Component {
  
  render() {
    let dataA=[
      ['Gatunek', 'Ilość']
    ]
    for(var k in this.props.playlist) {
      dataA.push([k, this.props.playlist[k]])
    }
    return(
          <Chart
                width={'300px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={dataA}
                options={{
                  title: 'My Daily Activities',
                  // Just add this option
                  pieHole: 0.4,
                }}
                rootProps={{ 'data-testid': '3' }}
          />
    )
  }
}