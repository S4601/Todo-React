

export function Pagination({totalPages, setCurrentPage, currentPage, color, colorHover, borderColor}: {totalPages: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>, currentPage: number, color: string, colorHover?: string, borderColor?: string}) {
    return (
        <>
            <div className={`pagination font-small lg:font-medium ${totalPages > 1 && 'mt-auto'}`}>
                        {totalPages > 1 && (
                            <div className={`flex justify-between items-center bg-white p-1 md:p-4 rounded-b-lg shadow border-2 ${borderColor}`}>
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 ${color} text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:${colorHover} transition`}
                                >
                                    Предишна
                                </button>
                                
                                <span className="text-gray-700 text-center">
                                    Страница <span className="block">{currentPage} от {totalPages}</span>
                                </span>

                                <button 
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 ${color} text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:${colorHover} transition`}
                                >
                                    Следваща
                                </button>
                            </div>
                        )}
                    </div>
        </>);
};