import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    // All React components that have a constructor should start it with a super(props) call.
    constructor(props) {
      super(props);
      this.state = {
        value: null,
      };
    }

    render() {
      return (
        // The parameter list for a function with no parameters should be written with a pair of parentheses.
        // A function is being passed as the onClick prop. React will only call this function after a click.
        <button 
          className="square"
          // When you call setState in a component, React automatically updates the child components inside of it too.
          // The best approach is to store the game’s state in the parent Board component instead of in each Square.
          onClick={() => this.setState({value: 'X'})}
        >
          {/* Passing prop from a parent Board to a child Square component. */}
          {/* The Square component receives the argument as a props object. */}
          {/* this.props.value */}
          {this.state.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // An array of 9 nulls corresponding to the 9 squares.
        squares: Array(9).fill(null),
      };
    }

    renderSquare(i) {
      // Value is a prop.
      return <Square value={i} />;
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );  