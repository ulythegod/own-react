// file: src/index.js
// QndReact needs to be in scope for JSX to work

import QndReact from "./qnd-react";
import QndReactDom from "./qnd-react-dom";
import Counter from "./counter";

//функциональный компонент для приветсвия
const Greeting = ({ name }) => <p>Welcome {name}!</p>

//JSX - открытый стандарт, не ограничен реактом,
//трансформируется с помощью plugin-transform-react-jsx
const App = (
    <div>
      <h1 className="primary">
        QndReact is Quick and dirty react
      </h1>
      <p>It is about building your own React in 90 lines of JavaScript</p>
      <Greeting name={"Julia"}/>
      <Counter />
    </div>
);

QndReactDom.render(App, document.getElementById('root'));
