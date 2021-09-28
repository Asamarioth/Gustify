import { Component} from 'react';
import "./config";
import {CSSTransition} from 'react-transition-group';

export class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state={inProp:true}
    
    }
    textArray = ["Tekst 1", "Tekst 2", "Tekst 3", "Tekst 4", "Tekst 5", "Tekst 6", "Tekst 7", "Tekst 8", "Tekst 9","Tekst 10"]
    welcomeText = "Tekst witający użytkownika"
    goodbyeText = "Tekst dziękujący za użycie aplikacji"
    
        //timeout (int) = czas po jakim inProp zostanie zmieniony w ms
        //doIncrement (boolean) = czy zwiększyć appState 
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
                        onEntered={() => this.swapInPropAndIncrementAppState(TIME_WELCOME_TEXT_STAYS_ON_SCREEN, false)}
                        onExited={() => this.swapInPropAndIncrementAppState(TIME_BETWEEN_TEXTS, true)}
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
                        onEntered={() => this.swapInPropAndIncrementAppState(TIME_TEXT_STAYS_ON_SCREEN, false)}
                        onExited={() => this.swapInPropAndIncrementAppState(TIME_BETWEEN_TEXTS, true)}
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