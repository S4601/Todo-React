import type { User } from "../types";

export function FilterBy({options, onFilterChange, setCurrentPageActiveTodos, setCurrentPageCompletedTodos}: {options: User[], onFilterChange: (id: number | "all") => void, setCurrentPageActiveTodos: (page: number) => void, setCurrentPageCompletedTodos: (page: number) => void}) {
    return (
        <>
            <div className="filterBy justify-center gap-4 my-5">
                <h3>Filter by:</h3>
                <select name="filter" id="filter" className="p-2 rounded-md" onChange={(event) => {
                        onFilterChange(event.target.value === "all" ? "all" : Number(event.target.value));
                        setCurrentPageActiveTodos(1);
                        setCurrentPageCompletedTodos(1);
                    }}>
                    <option value={"all"} selected>All</option>
                    {options.map(option => 
                        <option key={option.id} value={option.id}>{option.name}</option>
                    )}
                </select>
            </div>
        </>
    );
}