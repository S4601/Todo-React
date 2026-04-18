import { useEffect, useState } from "react";
import { TodoItem } from "../../components/TodoItem";
import type { Todo } from "../../types";
import type { User } from "../../types";
import { FilterBy } from "../../components/FilterBy";
import { SortBy } from "../../components/SortBy";
import { Pagination } from "../../components/Pagination";

export function HomePage() {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const [selectedUser, setSelectedUser] = useState<number | "all">("all");
    const [sortActiveBy, setActiveSortBy] = useState<"default" | "title-asc" | "title-desc">("default");
    const [sortCompletedBy, setSortCompletedBy] = useState<"default" | "title-asc" | "title-desc" | "date-asc" | "date-desc">("default");

    const [currentPageActiveTodos, setCurrentPageActiveTodos] = useState<number>(1);
    const [currentPageCompletedTodos, setCurrentPageCompletedTodos] = useState<number>(1);

    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    useEffect(() => {
        
        const getTodos = async () => {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/todos');
                const data = await res.json();
                setTodos(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        const getUsers = async () => {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await res.json();
                setUsers(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };


        getTodos();
        getUsers();
    }, []);

    const activeTodos = todos.filter((todo) => !todo.completed);
    const activeFilteredTodos = selectedUser === "all" ? activeTodos : activeTodos.filter((todo) => todo.userId === selectedUser);
    const sortedActiveFilteredTodos = [...activeFilteredTodos].sort((a, b) => {
        if(sortActiveBy === "default") {
            return 0;
        } else if (sortActiveBy === "title-asc") {
            return a.title.localeCompare(b.title);
        } else if (sortActiveBy === "title-desc") {
            return b.title.localeCompare(a.title);
        }
        return 0;
    });

    const completedTodos = todos.filter((todo) => todo.completed);
    const completedFilteredTodos = selectedUser === "all" ? completedTodos : completedTodos.filter((todo) => todo.userId === selectedUser);
    const sortedCompletedFilteredTodos = [...completedFilteredTodos].sort((a, b) => {
        if(sortCompletedBy === "default") {
            return 0;
        } else if (sortCompletedBy === "title-asc") {
            return a.title.localeCompare(b.title);
        } else if (sortCompletedBy === "title-desc") {
            return b.title.localeCompare(a.title);
        } else if (sortCompletedBy === "date-asc") {
            return new Date(a.completedDate || "").getTime() - new Date(b.completedDate || "").getTime();
        } else if (sortCompletedBy === "date-desc") {
            return new Date(b.completedDate || "").getTime() - new Date(a.completedDate || "").getTime();
        }
        return 0;
    });


    const toggleTodo = (id: number) => {
        setTodos(todos.map((todo) => {
            if(todo.id === id) {
                if(!todo.completed) {
                    return {...todo, completed: !todo.completed, completedDate: new Date().toISOString()};
                }
            return {...todo, completed: !todo.completed, completedDate: null};
            }
            return todo;
        }))
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    //Pagination Active Todos

    const totalPagesActiveTodos = Math.ceil(sortedActiveFilteredTodos.length / itemsPerPage);
    const startIndexActiveTodos = (currentPageActiveTodos - 1) * itemsPerPage;
    const endIndexActiveTodos = startIndexActiveTodos + itemsPerPage;

    const currentActiveTodos = sortedActiveFilteredTodos.slice(startIndexActiveTodos, endIndexActiveTodos);

    //Pagination Completed Todos

    const totalPagesCompletedTodos = Math.ceil(sortedCompletedFilteredTodos.length / itemsPerPage);
    const startIndexCompletedTodos = (currentPageCompletedTodos - 1) * itemsPerPage;
    const endIndexCompletedTodos = startIndexCompletedTodos + itemsPerPage;

    const currentCompletedTodos = sortedCompletedFilteredTodos.slice(startIndexCompletedTodos, endIndexCompletedTodos);

    return(
        <>
            <div className="todoContainer grid grid-cols-1 lg:grid-cols-2 gap-5 mx-5 lg:mx-auto max-w-7xl ">
                <div className="activeTodos w-full flex flex-col h-full bg-gray-50 rounded-xl">
                    <div className="bg-amber-400 w-full h-2 rounded-t-xl"></div>
                    <h2 className="text-center">Active Todos</h2>

                    <div className="flex justify-around mb-4">
                        <FilterBy options={users} onFilterChange={setSelectedUser} setCurrentPageCompletedTodos={setCurrentPageCompletedTodos} setCurrentPageActiveTodos={setCurrentPageActiveTodos} />
                        <SortBy onSortChange={setActiveSortBy} resetPagination={setCurrentPageActiveTodos} isDateSortAvailable={false}/>
                    </div>

                    <div className="activeTodoList border-2 border-amber-500 bg-white p-1 md:p-4 rounded-t-xl flex-1 h-full">
                        {currentActiveTodos.map(todo =>
                            <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} buttonText={"Complete"} buttonColor={"bg-emerald-200"} textColor={"text-olive-600"}/>
                        )}
                        {currentActiveTodos.length === 0 && <p className="text-center text-white">No active todos.</p>}
                    </div>
                    
                    <Pagination totalPages={totalPagesActiveTodos} setCurrentPage={setCurrentPageActiveTodos} currentPage={currentPageActiveTodos} color="bg-amber-500" colorHover="bg-amber-600" borderColor="border-amber-500"/>
                </div>


                <div className="completedTodos w-full flex flex-col h-full bg-gray-50 rounded-xl">
                    <div className="bg-green-400 w-full h-2 rounded-t-xl"></div>
                    <h2 className="text-center">Completed Todos</h2>
                    <div className="flex justify-around mb-4">
                        <SortBy onSortChange={setSortCompletedBy} resetPagination={setCurrentPageCompletedTodos} isDateSortAvailable={true}/>
                        
                    </div>

                    <div className="completedTodoList border-2 border-green-400 bg-green-50 p-1 md:p-4 rounded-t-xl flex-1 h-full">
                        {currentCompletedTodos.map(todo =>
                            <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} buttonText={"Undo"} buttonColor={"bg-amber-400"} textColor={"text-olive-600"}/>
                        )}
                        {currentCompletedTodos.length === 0 && <p className="text-center text-gray-500">No completed todos.</p>}
                    </div>
                                    
                    <Pagination totalPages={totalPagesCompletedTodos} setCurrentPage={setCurrentPageCompletedTodos} currentPage={currentPageCompletedTodos} color="bg-emerald-300" colorHover="bg-emerald-400" borderColor="border-emerald-400"/>                
                </div>
            </div>
            
            <div className="justify-center gap-4 my-5 flex">
                <label htmlFor="itemsPerPage">Items Per Page:</label>
                <input id="itemsPerPage" type="number" value={itemsPerPage} onChange={(e) => setItemsPerPage(parseInt(e.target.value) || 5)} />
            </div>
        </>
    );
};