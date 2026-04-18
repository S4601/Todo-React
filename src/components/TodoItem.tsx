import type { Todo } from '../types';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    buttonText: string;
    textColor: string;
    buttonColor: string;
}

export function TodoItem({ todo, onToggle, onDelete, buttonText, buttonColor, textColor }: TodoItemProps) {

    return (
        <>
            <div className="todoItem flex justify-between my-6 mx-auto max-w-3/4 rounded-xl">
                <div className="content-center">
                    <h3 className={`content-center ${textColor}`}>{todo.title}</h3>
                    {todo.completedDate && (
                        <h6 className="text-teal-400">
                            Completed on: {new Date(todo.completedDate).toLocaleDateString('bg-BG', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</h6>
                    )}
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2 shrink-0">
                <button className={`btn w-full ${buttonColor} p-3 ms-6 rounded-md text-olive-600`} onClick={() => onToggle(todo.id)}>
                    {buttonText}
                </button>
                <button className={`btn w-full bg-red-200 p-3 ms-6 rounded-md text-olive-600`} onClick={() => onDelete(todo.id)}>
                    Delete
                </button>

                </div>
            </div>
        </>
    );
};