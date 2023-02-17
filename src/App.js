// src/App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios import

const App = () => {
  const [todos, setTodos] = useState(null);

  // 1. axios를 통해서 get 요청을 하는 함수를 생성
  // 비동기처리를 해야하므로 async/await 구문을 통해서 처리합
  const fetchTodos = async () => {
    const { data } = await axios.get('http://localhost:4001/todos');
    setTodos(data); // 서버로부터 fetching한 데이터를 useState의 state로 set.
  };

  // 2. 생성한 함수를 컴포넌트가 mount 됐을 떄 실행하기 위해 useEffect를 사용
  useEffect(() => {
    // effect 구문에 생성한 함수를 넣어 실행
    fetchTodos();
  }, []);

  // 3. data fetching이 정상적으로 되었는지 콘솔을 통해 확인
  console.log(todos);

  return (
    <div>
      {todos?.map((item, i) => (
        <div key={i}>
          <h1>{`${item.id}: ${item.title}`}</h1>
        </div>
      ))}
    </div>
  );
};

export default App;
