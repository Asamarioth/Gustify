import React, { Component } from 'react'
import { PlaylistCard } from './cards.jsx'

export class PlaylistsPage extends Component {

    render() {
        return (
            <div className="card-columns bg-success">
                {this.props.playlists.map((cardContent, id) => (
                    <PlaylistCard onClick={this.props.onClick} content={cardContent} key={id} />
                )
                )}
            </div>
        );
    }
}
 
