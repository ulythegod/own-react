import QndReact from './qnd-react';
import * as snabbdom from 'snabbdom';//виртуальный дом
import eventListenersModule from 'snabbdom/modules/eventlisteners';
import propsModule from 'snabbdom/modules/props';

//propsModule - помогает изменять текстовые атрибуты
//eventlistenersModule - помогает изменять атрибуты события
const reconcile = snabbdom.init([propsModule, eventListenersModule]);
//Переменная нужна для поддержки (сохранения) последнего rootVNode
//возвращенного функцией render
let rootVNode;

// React.render(<App />, document.getElementById('root'));
// el -> <App />
// rootDomElement -> document.getElementById('root')
//функция для рендеринга, позволяет парсить JSX и создавать 
//наши virtual DOM nodes
const render = (el, rootDomElement) => {
    // логика добавления элмента в rootDomElement
    // то есть QndReactDom.render(<App />, document.getElementById('root'));
    // происходит, когда мы впервые вызываем функцию render
    if(rootVNode == null) {
        rootVNode = rootDomElement;
    }

    rootVNode = reconcile(rootVNode, el);
}

// QndReactDom говорит React как обновлять DOM
QndReact.__updater = (componentInstance) => {
    // логика обновления DOM когда вызывается this.setState

    // получение oldVNode и сохранение его в __vNode
    const oldVNode = componentInstance.__vNode;
    // находится обновленный узел DOM с помощью вызова метода render
    const newVNode = componentInstance.render();

    // обновляется сво-во __vNode
    componentInstance.__vNode = reconcile(oldVNode, newVNode);
}


//будет экспортировано как ReactDom.render
const QndReactDom = {
    render
}

export default QndReactDom;
