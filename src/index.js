import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     // constructor(props) {
//     //   super(props);
//     //   this.state = {
//     //     value: null,
//     //   };
//     // }

//     // Square's render method.
//     render() {
//       return (
//         // The parameter list for a function with no parameters should be written with a pair of parentheses.
//         // A function is being passed as the onClick prop. React will only call this function after a click.
//         <button 
//           className="square"
//           // Sets up a click event listener.
//           onClick={() => this.props.onClick()}
//         >
//           {/* Passing prop from a parent Board to a child Square component. */}
//           {/* The Square component receives the argument as a props object. */}
//           {this.props.value}

//           {/* {this.state.value} */}
//         </button>
//       );
//     }
//   }

// Function components are a simpler way to write components that only contain a render method and don't have their own state.
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // All React components that have a constructor should start it with a super(props) call.
  constructor(props) {
    super(props);
    // When you call setState in a component, React automatically updates the child components inside of it too.
    // The best approach is to store the game’s state in the parent Board component instead of in each Square.
    this.state = {
      // An array of 9 nulls corresponding to the 9 squares.
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  // Square components receive values from the Board component and inform the Board component when they’re clicked.
  // The Square components are now controlled components.
  handleClick(i) {
    // Slice creates a copy of the squares array to modify instead of modifying the existing array.
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    // Value is a prop.
    // return <Square value={i} />;

    // Each Square receives a value prop that will either be 'X', 'O' or null for empty squares.
    return (<Square
      // We are passing two props from Board to Square: value and onClick.
      value={this.state.squares[i]}
      // The onClick prop is a function that Square can call when clicked.
      onClick={() => this.handleClick(i)}
    />
    );
  }

  render() {
    const winner =
      calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

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
      </div >
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

{/* Given an array of 9 squares, this function will check for a winner and return 'X', 'O', or null as appropriate. */ }

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);  