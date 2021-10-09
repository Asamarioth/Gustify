import React, { Component} from 'react';
import { Card, CardBody, CardImg, CardText } from 'reactstrap';

export class TrackCard extends Component {
    render() {
    return(
        <Card className="card">
            <CardImg top width="198px" height="198px" src={this.props.content.imageUri}/>
            <CardBody className="text-center">
            <CardText>{this.props.content.trackName}</CardText>
            <CardText>{this.props.content.artistName.join(", ")} </CardText>
            <CardText>{this.props.content.albumName}</CardText>
            </CardBody>
            </Card>
    );
    }
}
export class PlaylistCard extends Component {
    render() {
        return (
            <Card className="card playlist-card">
            <CardImg top width="248px" height="248px" src={this.props.content.imageUri}/>   
            <CardBody className="text-center">
            <CardText>{this.props.content.name}</CardText>
            </CardBody>
            </Card>
        )
    }
}