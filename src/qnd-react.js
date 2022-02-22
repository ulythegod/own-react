// file: src/qnd-react.js
import { h } from 'snabbdom';

//функция создания элемента, которую вызывает babel, всегда, после того как видит JSX
const createElement = (type, props = {}, ...children) => {
    //babel конвертурует ES6 классы в JS-функции, поэтому нужна проверка
    //если тип Class, то
    //1. создать экземпляр класса
    //2. вызвать метод render для экземпляра класса
    if (type.prototype && type.prototype.isQndReactClassComponent) {
        const componentInstance = new type(props);
    
        // запоминается текущий vNode
        componentInstance.__vNode = componentInstance.render();
    
        //добавление life cycle hook для ComponentDidMount 
        //добавление хука к snabbdom virtual node 
        //чтобы знать, что он был добавлен в фактический DOM
        componentInstance.__vNode.data.hook = {
          create: () => {
            componentInstance.componentDidMount()
          }
        }
    
        return componentInstance.__vNode;
    }

    //если тип - функция, то нужно ее вызвать и вернуть ее значение
    if (typeof type == 'function') {
        return type(props);
    }

    //snabdom хочет что текстовые атрибуты и атрибуты событий
    //были отделены друг от друга 
    props = props || {};
    let dataProps = {};
    let eventProps = {};

    //Разделение текстовых атрибутов и атрибутов событий
    for (let propKey in props) {
        //атрибуты события всегда начинаются с on
        if (propKey.startsWith('on')) {
            //onClick -> click
            const event = propKey.substring(2).toLowerCase();

            eventProps[event] = props[propKey];
        } else {
            dataProps[propKey] = props[propKey];
        }
    }

    //функция возвращает virtual DOM node
    //props - текстовые атрибуты
    //on - атрибуты слушателей событий
    return h(type, { props: dataProps, on: eventProps }, children);
};

//базовый класс для компонентов
class Component {
    constructor() {}

    componentDidMount() {}

    //ответсвенность за обновление DOM, когда вызывается setState
    //лежит на react-dom больше чем на реакте
    //react-dom коммуницирует с реактом, устанавливая сво-во __updater  реакту
    //так он знает, что делать при вызове setState
    setState(partialState) {
        //обновление state с помощью добавления partialState
        this.state = {
          ...this.state,
          ...partialState
        }
        // вызов функции __updater которая дается QndReactDom
        QndReact.__updater(this);
    }

    render() {}
}

//добавление статического свойства, чтобы различать классы и функции
Component.prototype.isQndReactClassComponent = true;

// экспортируется как React.createElement, React.Componen
const QndReact = {
    createElement,
    Component
};

export default QndReact;
