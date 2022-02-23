import React, { Component } from 'react';
import '../custom.css'
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { TrackCard } from './Cards';
import {CardColumns } from 'reactstrap';


//To raczej na pewno da się zrobić lepiej ale obecnie to jest sklejony do kupy kod z poprzedniej wersji aplikacji
export class TopTracks extends Component {
    constructor(props) {
        super(props)
        this.state = {
          appState : -1,
          topTracks : [],
          comments : [],
        };
      }

      cards = []
    async componentDidMount() {
        this.getData()
    }
    setAppState = (newAppState) => {
        this.setState({appState: newAppState})
    }
    incrementAppState =() => {
        this.interpretAppState()
        this.setState({appState: this.state.appState + 1})
  
    }
    interpretAppState = () => {
      if(this.state.appState >= -1 && this.state.appState < 9) {
          this.cards.push({
              id:this.state.appState + 1, cardContent:this.state.topTracks[this.state.appState + 1]
       })
      }
  }
  async getData () {
    const request = await fetch("/toptracks")
    const data = await request.json()
    this.setState({topTracks:data})
    let coms = []
    this.state.topTracks.map (track => {
        coms.push(track.comment)
    })
    this.setState({comments:coms})
  }
    render() {
        return(
            <>
            <Textbar incrementAppState={this.incrementAppState} appState={this.state.appState} comments={this.state.comments} />

            <div className="card-columns">
            <TransitionGroup
            component={null}
            appear={true}
            >
            {this.cards.map(({id, cardContent}) => (
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
                </>
        )

    }
}

class Textbar extends Component {
    constructor(props) {
        super(props)
        this.state={inProp:true}
    
    }
    welcomeText = "Witam w mojej pięknej i wspaniałej aplikacji"
    goodbyeText = "Dziękuję za używanie mojej aplikacji"
    

        swapInPropAndIncrementAppState = (timeout, doIncrement) => {
            const timerID = setTimeout(() => {         
                this.setState({inProp:!this.state.inProp});
                if(doIncrement)
                {
                    this.props.incrementAppState();
                }
            }, timeout);
            return () => clearTimeout(timerID);
          };
    
        render() {
            let navbar
            if (this.props.appState == -1) {
                navbar = 
                        <CSSTransition
                        in={this.state.inProp}
                        appear={true}
                        timeout={1000}
                        classNames="text"
                        onEntered={() => this.swapInPropAndIncrementAppState(6000, false)}
                        onExited={() => this.swapInPropAndIncrementAppState(1100, true)}
                        >
                            <h1 className="text">{this.welcomeText}</h1>
                        </CSSTransition>
            }
            else if (this.props.appState >= 10) {
                navbar =
                        <CSSTransition
                        in={this.state.inProp}
                        appear={true}
                        timeout={1000}
                        classNames="text"                  
                        >
                            <h1 className="text">{this.goodbyeText}</h1>
                        </CSSTransition>
            }
            else {
                navbar =
                        <CSSTransition
                        in={this.state.inProp}
                        appear={true}
                        timeout={1000}
                        classNames="text"
                        onEntered={() => this.swapInPropAndIncrementAppState(6000, false)}
                        onExited={() => this.swapInPropAndIncrementAppState(1100, true)}
                        >
                            <h1 className="text">{this.props.comments[this.props.appState]}</h1>
                        </CSSTransition>
            }
            return (
                <>
                {navbar}
                </>
                
            );
        }
    }