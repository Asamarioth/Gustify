import { Component} from 'react';

export class TrackCard extends Component {
    render() {
     const artistsLen = this.props.content.artistName.length;   
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