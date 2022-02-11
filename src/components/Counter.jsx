import React, {useEffect, useState} from 'react';

const Counter = function (){
    const [count, setCount] = useState(0);

    //Мои потуги сделать функции стрелочными (ЭТО РАБОТАЕТ)
    // const inc = () => {setCount(count +1)}
    // const dec = () => {setCount(count -1)}

    function increment () {
        setCount(count + 1)
    }

    function decrement () {
        setCount(count - 1)
    }

    return (
        <div>
            <h4>Вы нажали кнопку {count} раз</h4>
            <h1>{count}</h1>
            <button style={{marginRight: 10}} onClick={decrement}>Decrement</button>
            <button style={{marginRight: 10}} onClick={increment}>Increment</button>
            {/*Можно напрямую передать функцию в считыватель событий onClick*/}
            <button style={{marginRight: 10}} onClick={() => setCount(count + 2)}>Increment on 2</button>

        </div>

    )
}

export default Counter;