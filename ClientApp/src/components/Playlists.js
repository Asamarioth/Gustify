import React, { Component } from 'react';
import { CardColumns } from 'reactstrap';
import '../custom.css'
import { PlaylistCard } from './Cards';
import { Route } from 'react-router';
import { PlaylistDetails } from './PlaylistDetails';


export class Playlists extends Component {
    constructor(props) {
        super(props)
        this.state = {
            playlists : []
        };
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return(

            <CardColumns className="playlist-cards">
            {this.state.playlists.map((cardContent, id) => (
                    <PlaylistCard content={cardContent} key={id} />
                )
                )}
            </CardColumns>
        )
    }
    async getData() {
        const response = await fetch("/playlists")
        const data = await response.json()
        this.setState({playlists:data})
    }
}