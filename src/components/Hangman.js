import React, { Component } from "react";
import AlphaButtons from './AlphaButtons';
import "../styles/Hangman.css";
import {randomWord} from './words';
import img0 from "../assets/images/0.jpg";
import img1 from "../assets/images/1.jpg";
import img2 from "../assets/images/2.jpg";
import img3 from "../assets/images/3.jpg";
import img4 from "../assets/images/4.jpg";
import img5 from "../assets/images/5.jpg";
import img6 from "../assets/images/6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.restart = this.restart.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
 handleGuess(evt) {
  let ltr = evt.target.value;
  this.setState(st => ({
    guessed: st.guessed.add(ltr),
    nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
  }));
}

  restart() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    })
  }

  /** render: render game */
  render() {
    let gameOver  = this.state.nWrong >= this.props.maxWrong;
    let gameState = <AlphaButtons 
                    wordRange="a-z" 
                    guessed={this.state.guessed} 
                    handleGuess={this.handleGuess}
                    />;
    let isWinner  = this.guessedWord().join("") === this.state.answer; 

    if(gameOver) gameState = "Game Over!";
    if(isWinner) gameState = "You won!";

    let altImg = `${this.state.nWrong}/${this.props.maxWrong}`;

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={altImg} />
        <p>Number wrong: {this.state.nWrong}</p>
        <p className='Hangman-word'>
          {!gameOver ? this.guessedWord() : this.state.answer}
        </p>
        <div className='Hangman-btns'>
          	{gameState}
            
        </div>
        
        <button id="restart" onClick={this.restart}>Restart</button>
      </div>
    );
  }
}

export default Hangman;
