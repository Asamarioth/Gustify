import { Component} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {TrackCard} from "./cards.jsx";

export class HomePage extends Component {
	render() {
		return (
            
            <div className="container-fluid bg-danger"><h1 className="text-danger">Main Page</h1>
            <div className="card-columns bg-success">
            <TransitionGroup
            component={null}
            appear={true}
            >
            {this.props.topTracks.map(({id, cardContent}) => (
            <CSSTransition
            key={id}
            timeout={2000}
            classNames = "card">
                        <TrackCard content={cardContent} key={id} />
                        </CSSTransition>
            )
                    )}
               </TransitionGroup>     
                </div>
            </div>
        );
}
}