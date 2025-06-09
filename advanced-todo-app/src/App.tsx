import './App.css'
import { useState, useEffect } from 'react';
import type { Todo } from './types/Todo';
import TodoForm from "./components/TodoForm"
import {TodoList} from "./components/TodoList"
import { addTodoApi, deleteTodoApi, getAllTodos, toggleTodoApi } from './services/todoService';
// import { v4 as uuid } from 'uuid';

function App() {
  const [ todos, setTodos ] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodosFromServer = async () : Promise<void> => {
      try{
        setIsLoading(true);
        const serverTodos = await getAllTodos();
        setTodos(serverTodos);
      } catch (error) {
        console.log('서버에서 데이터를 가지고 오는 데 실패했습니다 :', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodosFromServer();
  },[]);

  const handleAddTodo = async (text: string): Promise<void> => {
    try {
      setIsLoading(true);
      const newTodo = await addTodoApi(text);
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setIsLoading(false);
    } catch (error) {
      console.log('todo를 추가하는 데 실패했습니다 : ', error);
    }
  }

  const handleToggleComplete = async (id:number): Promise<void> => {
    try {
      const todoToToggle = todos.find(todo => todo.id === id);
      if (!todoToToggle) return;
      const upatedTodo = await toggleTodoApi(id, todoToToggle.completed);
      setTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === id ? upatedTodo : todo))
      );
    } catch (error) {
      console.log('완료 상태 변경에 실패했습니다 : ', error);
    }
  };

  const handleDeleteTodo = async (id: number) : Promise<void> => {
    try {
      await deleteTodoApi(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.log('todo를 지우는 데 실패했습니다 :', error);
    }
  } 


  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={handleAddTodo}/>
      {
        isLoading ? (
          <p>목록을 불러오는 중입니다...</p>
        ) : (
          <TodoList todos={todos} 
          onToggleComplete={handleToggleComplete} 
          onDeleteTodo={handleDeleteTodo}/>
        )
      }
    </div>
  )
}

export default App