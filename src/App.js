import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import { useState, createRef, createContext } from "react";

const Theme = createContext({ mode: "dark" });

export default function App() {
  const [shouldRender, setShouldRender] = useState(false);
  return (
    <Theme.Provider value={{ mode: "dark" }}>
      {shouldRender && <Counter />}
      <button onClick={() => setShouldRender(!shouldRender)}>
        Toggle counter
      </button>
    </Theme.Provider>
  );
}

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // if startingCount is undefined/null, default to 0
      count: props.startingCount ?? 0,
    };
    this.buttonRef = createRef();
  }

  //lifecycle methods

  //runs on initial render
  componentDidMount() {
    console.log("component did mount");
    console.log(this.buttonRef);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("component updated", { prevProps }, { prevState });
  }

  //runs while unmounting
  componentWillUnmount() {
    console.log("unmounting component");
  }

  //will only 'update' if count is less than 3
  shouldComponentUpdate(nextProps, nextState) {
    //similar to React.memo
    //if returns true, component will rerender, else, wont rerender
    console.log({ nextProps });
    console.log({ nextState });
    return nextState.count < 3;
  }

  render() {
    return (
      <>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
            });
          }}
          ref={this.buttonRef}
        >
          Increment
        </button>
        <h2>Count: {this.state.count}</h2>
        <Theme.Consumer>
          {/* similar to provider but takes in a function as the children */}
          {(context) => <p>Theme: {context.mode}</p>}
        </Theme.Consumer>
      </>
    );
  }
}

//-------------------FUNCTIONAL COMPONENTS-----------------------

// import logo from "./logo.svg";
// import "./App.css";
// import { useState } from "react";

// export default function App() {
//   return (
//     <div className="App">
//       <Counter />
//       <Counter startingCount={10} />
//     </div>
//   );
// }

// function Counter({ startingCount = 0 }) {
//   const [count, setCount] = useState(startingCount);

//   return (
//     <>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//       <h2>Count: {count}</h2>
//     </>
//   );
// }
