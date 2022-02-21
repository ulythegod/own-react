// file: src/qnd-react.js
import { h } from 'snabbdom';

const createElement = (type, props = {}, ...children) => {
    return h(type, { props }, children);
};

// to be exported like React.createElement
const QndReact = {
    createElement
};

export default QndReact;
