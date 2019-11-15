import React, { Component } from 'react'

class AlphaButtons extends Component {
    constructor(props) {
        super(props)
    
        this.handleClick = this.handleClick.bind(this);
    }
    
    static defaultProps = {
        alfabetic: "abcdefghijklmnopqrstuvwxyz",
        wordRange: "a-z"
    }


   handleClick(e) {
    console.log(this.props.handleGuess);
    this.props.handleGuess(e);
   }

    render() {
        let {alfabetic} = this.props;
        let wordRange = this.props.wordRange.split("-");
        let firstWord = wordRange[0];
        let lastWord = wordRange[1];
        
        let newAlfabetic = alfabetic.split("").slice(alfabetic.indexOf(firstWord), alfabetic.indexOf(lastWord) + 1);

        return (
            <div>
                {newAlfabetic.map(l => (
                    <button
                    key={l}
                    value={l}
                    onClick={this.handleClick}
                    disabled={this.props.guessed.has(l)}
                  >
                    {l}
                  </button>
                ))}
            </div>
        )
    }
}

export default AlphaButtons
