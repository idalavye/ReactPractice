import React, { useState, useEffect } from 'react';
import axios from 'axios';

const todo = props => {
    /**
     * useState içerisinde default değerimizi girdik. useState ise bize bir array dönecek.
     * bu arrayde birinci parametre state imizi ikinci paremetre ise bir state'i değiştirebilmemiz
     * için bir fonksiyon sunucak. Böylelikle stateless componentte state kullanabilmiş olduk.
     */

    const [todoName, setTodoName] = useState('');
    const [todoList, setTodoList] = useState([]);

    //render cycle tamamlandıktan sonra çağrılacağını garanti eder. Http isteklerini,
    //Ve dom manipulasyon işlemlerini burada yapmalıyız.
    useEffect(() => {
        axios.get('https://burger-app-react-431fb.firebaseio.com/todos.json').then(result => {
            const todoData = result.data;
            const todos = [];
            for (const key in todoData) {
                console.log(key);
                todos.push({ id: key, name: todoData[key].name })
            }

            /**
             * Tüm hookar top levelda bulunmalı. Yani metotların içierisinde hook tanımlamamalıyız.
             */
            setTodoList(todos);
        })
    });

    /**
     * Eğer tek bir state kullanmak istersek. Aşağıdaki gibi kullanabiliriz.
     * Ama bu şekilde kullanmak setState kullanmakla aynı değildir. setState kullanırken değişmeyen statelerimizmi
     * otamatik olarak merge eder. Ama hook kullanırsak tüm stateleri tekrar belitmemiz gerekir.
     */
    // const [todoState, setTodoSate] = useState({ userInput: '', todoList: [] });

    const inputChangeHanler = (event) => {
        setTodoName(event.target.value);
    };

    const todoAddHandler = () => {
        setTodoList(todoList.concat(todoName));

        axios.post('https://burger-app-react-431fb.firebaseio.com/todos.json', { name: todoName })
            .then(res => {
                // console.log(res);
            }).catch(err => {
                console.log(err);
            });
    }

    return (
        <React.Fragment>
            <input
                type="text"
                placeholder="Todo"
                onChange={inputChangeHanler}
                value={todoName} />
            <button type="button" onClick={todoAddHandler}>Add</button>
            <ul>
                {todoList.map(todo => <li key={todo.id}>{todo.name}</li>)}
            </ul>
        </React.Fragment>
    );
};

export default todo;