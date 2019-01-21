import React, { useState, useEffect, useReducer, useRef } from 'react';
import axios from 'axios';

const todo = props => {
    /**
     * useState içerisinde default değerimizi girdik. useState ise bize bir array dönecek.
     * bu arrayde birinci parametre state imizi ikinci paremetre ise bir state'i değiştirebilmemiz
     * için bir fonksiyon sunucak. Böylelikle stateless componentte state kullanabilmiş olduk.
     */

    // const [todoName, setTodoName] = useState('');
    // const [todoList, setTodoList] = useState([]);
    // const [submittedTodo, setSubmittedTodo] = useState(null);
    const todoInputRef = useRef();



    const todoListReducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return state.concat(action.payload);
            case 'REMOVE':
                return state.filter((todo) => todo.id !== action.payload);
            case 'SET':
                return action.payload;
            default:
                return state;
        }
    };

    const [todoList, dispatch] = useReducer(todoListReducer, []/*,{type:'ADD',{}}*/);


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
            // setTodoList(todos);
            dispatch({ type: 'SET', payload: todos })
        });

        return () => {
            console.log('CleanUp');
        }
    }, []);

    /**
     * useEffect() ikinci paremetre olarak bir array alır. Bu array useEffect()'in her render cycle ında çağrılıp 
     * sonsuz loopa girmesini engeller. Bu array'a girdiğimiz parametre örneğin yukarıdakı gibi todoName girersek
     * sadece todoName değiştiği zaman useEffect tekrarlanacak. Eğer arrayi boş bırakırsak sadece ilk render cycle'ında
     * çalışacak , tıpkı componentDidMount gibi çalışacaktır. Öteki şekilde ise compoenentDidUpdate işlevini yapmaktadır.
     */

    /**
     * Eğer tek bir state kullanmak istersek. Aşağıdaki gibi kullanabiliriz.
     * Ama bu şekilde kullanmak setState kullanmakla aynı değildir. setState kullanırken değişmeyen statelerimizmi
     * otamatik olarak merge eder. Ama hook kullanırsak tüm stateleri tekrar belitmemiz gerekir.
     */
    // const [todoState, setTodoSate] = useState({ userInput: '', todoList: [] });


    const mouseMoveHandler = event => {
        console.log(event.clientX, event.clientY);
    }

    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHandler);

        /**
         * Burdaki return tıpkı componenUnMount gibi çalışır. component ölürken arkasında bıraktığı izleri temizleriz.
         * Mesala burada bir eventListener eklemişiz. Bu component yaşadığı sürece çalışır. component öldüğü zaman ise 
         * bu eventlistener ı diğer componentler etkilenmesin diye temizleriz.
         */
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
        }
    }, []);

    // useEffect(() => {
    //     if (submittedTodo) {
    //         // setTodoList(todoList.concat(submittedTodo));
    //         dispatch({ type: 'ADD', payload: submittedTodo });
    //     }
    // }, [submittedTodo]);

    // const inputChangeHanler = (event) => {
    //     setTodoName(event.target.value);
    // };

    const todoAddHandler = () => {

        const todoName = todoInputRef.current.value;

        axios.post('https://burger-app-react-431fb.firebaseio.com/todos.json', { name: todoName })
            .then(res => {
                setTimeout(() => {
                    const todoItem = { id: res.data.name, name: todoName }
                    dispatch({ type: 'ADD', payload: todoItem });
                }, 3000)
            }).catch(err => {
                console.log(err);
            });
    }

    const todoRemoveHandler = (todoId) => {
        console.log(todoId);
        axios.delete(`https://burger-app-react-431fb.firebaseio.com/todos/${todoId}.json`)
            .then(res => {
                dispatch({ type: 'REMOVE', payload: todoId })
            })
            .catch(err => console.log(err));
    };

    return (
        <React.Fragment>
            <input
                type="text"
                placeholder="Todo"
                ref={todoInputRef} />
            <button type="button" onClick={todoAddHandler}>Add</button>
            <ul>
                {todoList.map(todo => <li key={todo.id} onClick={todoRemoveHandler.bind(this, todo.id)}>{todo.name}</li>)}
            </ul>
        </React.Fragment>
    );
};

export default todo;