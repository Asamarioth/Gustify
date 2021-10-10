import React, { Component } from 'react';
import '../custom.css'
import Chart from "react-google-charts";

export class PlaylistDetails extends Component{
    constructor(props) {
        super(props)
        this.state = {
            genres: []
        }
    }
    componentDidMount() {
        this.getData()
    }

    render() {
        let dataA=[
            ['Gatunek', 'Ilość']
          ]
          for(var k in this.state.genres) {
            dataA.push([k, this.state.genres[k]])
          }

          return(
            <Chart
                  width={'800px'}
                  height={'800px'}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={dataA}
                  options={{
                    title: 'My Daily Activities',
                    // Just add this option
                    pieHole: 0.4,
                    sliceVisibilityThreshold: 0.02,
                  }}
                  rootProps={{ 'data-testid': '3' }}
            />
      )
    }


    async getData() {
        const response = await fetch("/playlist/" + this.props.match.params.id)
        const data = await response.json()
        this.setState({genres:data})
    }
}