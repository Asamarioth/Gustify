import { Component} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import "./config"



class Navbar extends Component {
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

class Card extends Component {
    render() {
    return(
        <div className="card">
            <img className="card-img-top" src={this.props.content.imageUri} style={{ width: "198px", height:"198px" }} />
            <div className="card-body text-center">
            <p className="card-text">{this.props.content.trackName} </p>  
            <p className="card-text">{this.props.content.artistName} </p>  
            <p className="card-text">{this.props.content.albumName} </p>  
            </div>
        </div>
    );
    }
}


class HomePage extends Component {

    cards = []

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
                        <Card content={cardContent} key={id} />
                        </CSSTransition>
            )
                    )}
               </TransitionGroup>     
                </div>
            </div>
        );
}
}
class LoginPage extends Component{
    render() {
        return (
            <>
                <h1>Tytuł aplikacji czy coś</h1>
                <button className="btn btn-success" onClick={this.props.onClick.bind(this, "home")}>Zaloguj</button>
            </>
        )
    }
}


export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {page: "notLogged",
                      appState: -1  };
    }
    cards = []


    setPage = (pageName) =>  {
        this.setState({page: pageName});
    }
    setAppState = (newAppState) => {
        this.setState({appState: newAppState})
    }
    incrementAppState =() => {
        this.manageAppState()
        this.setState({appState: this.state.appState + 1})

    }
    manageAppState = () => {
        if(this.state.appState >= -1 && this.state.appState < 9) {
            this.cards.push({
                id:this.state.appState + 1, cardContent:this.props.topTracks[this.state.appState + 1]
         })
        }
    }
    


    render() {
        let currentPage
        if (this.state.page == "home") {
            currentPage = <HomePage topTracks={this.cards} appState={this.state.appState} />;
        }
        else if(this.state.page == "notLogged") {
            currentPage = <LoginPage onClick={this.setPage}/>;
            return (
                <div className="d-flex justify-content-center bg-secondary" style={{height: "100vh"}}>
                    <div className="my-auto bg-danger login-container">
                        {currentPage}
                    </div>
                    </div>
            )
        }
        return (
            <div className="container-fluid bg-secondary" style={{height: "100vh"}}>
                <div className="jumbotron-fluid mx-auto bg-primary" >
                <Navbar onClick={this.setPage} incrementAppState={this.incrementAppState} appState={this.state.appState} />
                <h1 onClick={this.incrementAppState}>{this.state.appState}</h1>
                    {currentPage}
				</div>
            </div>
        );
       
    }
}
