// module imports
import React,{ useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';

// component imports
import {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} from '../api/apiSlice';

const TodoList = () => {
    const [newTodo, setNewTodo] = useState('');

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetTodosQuery();

    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await addTodo({
            userId: 1,
            title: newTodo,
            completed: false
        });

        setNewTodo('');
    }

    const newSectionItem =
        <form onSubmit={handleSubmit}>
            <label htmlFor='new-todo'>Enter a new todo item</label>
            <div className='new-todo'>
                <input
                    type='text'
                    id='new-todo'
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder='Enter new todo'
                />
            </div>
            <button className='submit' type='submit'>
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>

    const todoActions = (todo) => (
        <article key={todo.id}>
            <div className='todo'>
                <input
                    type='checkbox'
                    checked={todo.completed}
                    id={todo.id}
                    onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                />
                <label htmlFor={todo.id}>{todo.title}</label>
            </div>
            <button className='trash' onClick={() => deleteTodo(todo.id)}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </article>
    )

    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        // content = JSON.stringify(todos, null, 2)
        content = todos?.map((todo) => {
            return todoActions(todo)
        })
    } else if (isError) {
        content = <p>{error}</p>
    }

    return (
        <main>
            <h1>Todo List</h1>
            {newSectionItem}
            {content}
        </main>
    )
}

// Default export
export default TodoList;