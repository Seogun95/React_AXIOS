// src/App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios import

const App = () => {
  const [todos, setTodos] = useState(null);
  const [inputTitle, setInputTitle] = useState({
    title: '',
  });

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

  //4. onChangesHandler
  const onChangesHandler = (e) => {
    setInputTitle({ title: e.target.value });
  };

  //5. onSubmitHandler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    //버튼 클릭시 INPUT값을 DB에 추가(POST)
    axios.post('http://localhost:4001/todos', inputTitle);
    //setTodos를 업데이트 한다.
    setTodos([...todos, inputTitle]);
  };

  const onDeleteHanlder = async (id) => {
    axios.delete(`http://localhost:4001/todos/${id}`);
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmitHandler}>
          <input value={inputTitle.title} onChange={onChangesHandler} />
          <button>추가</button>
        </form>
      </div>
      <div>
        {todos?.map((item) => (
          <div>
            <p key={item.id}>{`${item.id}: ${item.title}`}</p>
            <button onClick={() => onDeleteHanlder(item.id)}>삭제</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
