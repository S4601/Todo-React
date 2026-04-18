type SortOption<Т extends boolean> = Т extends true ? "default" | "title-asc" | "title-desc" | "date-asc" | "date-desc" : "default" | "title-asc" | "title-desc";

interface SortByProps<T extends boolean> {
    isDateSortAvailable: T;
    onSortChange: (sortBy: SortOption<T>) => void;
    resetPagination: (page: number) => void;
}

export function SortBy<T extends boolean>({onSortChange, resetPagination, isDateSortAvailable}: SortByProps<T>){
   
    return (
        <>
            <div className="filterBy justify-center gap-4 my-5">
                <h3>Sort by:</h3>
                <select name="filter" id="filter" className="p-2 rounded-md" onChange={(event) => {
                    onSortChange(event.target.value as SortOption<typeof isDateSortAvailable>);
                    resetPagination(1);
                }}>
                    <option value={"default"} selected>Default</option>
                    <option value={"title-asc"}>Title (A-Z)</option>
                    <option value={"title-desc"}>Title (Z-A)</option>
                    {isDateSortAvailable && (<>
                        <option value={"date-asc"}>Date (Oldest First)</option>
                        <option value={"date-desc"}>Date (Newest First)</option>
                    </>)}
                </select>
            </div>
        </>
    );
}