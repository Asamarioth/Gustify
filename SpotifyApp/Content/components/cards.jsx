import { Component} from 'react';

export class TrackCard extends Component {
    render() {
    return(
        <div className="card">
            <img className="card-img-top" src={this.props.content.imageUri} style={{ width: "198px", height:"198px" }} />
            <div className="card-body text-center">
            <p className="card-text">{this.props.content.trackName} </p>  
            <p className="card-text">{this.props.content.artistName.join(", ")} </p>  
            <p className="card-text">{this.props.content.albumName} </p>  
            </div>
        </div>
    );
    }
}
export class PlaylistCard extends Component {
    render() {
        return (
            <div className="card playlist-card" onClick = {this.props.onClick.bind(this,"genre", this.props.content.id)}>
            <img className="card-img-top" src={this.props.content.imageUri} style={{ width: "248px", height:"248px" }} />
            <div className="card-body text-center">
            <p className="card-text">{this.props.content.name} </p>  
            </div>    
            </div>
        )
    }
}