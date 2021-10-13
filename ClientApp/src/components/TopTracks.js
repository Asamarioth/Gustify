import React, { Component } from 'react';
import '../custom.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { TrackCard } from './Cards';
import { CardColumns } from 'reactstrap';


//To raczej na pewno da się zrobić lepiej ale obecnie to jest sklejony do kupy kod z poprzedniej wersji aplikacji
export class TopTracks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            appState: -1,
            topTracks: []
        };
    }

    cards = []
    async componentDidMount() {
        this.getData()
    }
    setAppState = (newAppState) => {
        this.setState({ appState: newAppState })
    }
    incrementAppState = () => {
        this.interpretAppState()
        this.setState({ appState: this.state.appState + 1 })

    }
    interpretAppState = () => {
        if (this.state.appState >= -1 && this.state.appState < 9) {
            this.cards.push({
                id: this.state.appState + 1, cardContent: this.state.topTracks[this.state.appState + 1]
            })
        }
    }
    async getData() {
        const request = await fetch("/toptracks")
        const data = await request.json()
        this.setState({ topTracks: data })
    }
    render() {
        return (
            <>
                <Textbar incrementAppState={this.incrementAppState} appState={this.state.appState} />

                <div className="card-columns bg-success">
                    <TransitionGroup
                        component={null}
                        appear={true}
                    >
                        {this.cards.map(({ id, cardContent }) => (
                            <CSSTransition
                                key={id}
                                timeout={2000}
                                classNames="card">
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
        this.state = { inProp: true }

    }
    textArray = ["Tekst 1", "Tekst 2", "Tekst 3", "Tekst 4", "Tekst 5", "Tekst 6", "Tekst 7", "Tekst 8", "Tekst 9", "Tekst 10"]
    welcomeText = "Tekst witający użytkownika"
    goodbyeText = "Tekst dziękujący za użycie aplikacji"

    //timeout (int) = czas po jakim inProp zostanie zmieniony w ms
    //doIncrement (boolean) = czy zwiększyć appState 
    swapInPropAndIncrementAppState = (timeout, doIncrement) => {
        const timerID = setTimeout(() => {
            this.setState({ inProp: !this.state.inProp });
            if (doIncrement) {
                this.props.incrementAppState();
            }
        }, timeout);
        return () => clearTimeout(timerID);
    };

    //Generalnie działa tylko losowo jest bug wizualny, w którym w momencie zmiany stanu
    //przez chwilę widać 'przebitkę' starego tekstu
    //odświeżenie strony przeważnie pomaga
    //potencjalnie spróbować ten Navbar przykryć czymś na okres zmiany stanu?  
    render() {
        let navbar
        if (this.props.appState == -1) {
            navbar =
                <CSSTransition
                    in={this.state.inProp}
                    appear={true}
                    timeout={1000}
                    classNames="text"
                    onEntered={() => this.swapInPropAndIncrementAppState(9000, false)}
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
                    <h1 className="text">{this.textArray[this.props.appState]}</h1>
                </CSSTransition>
        }
        return (
            <>
                {navbar}
            </>

        );
    }
}