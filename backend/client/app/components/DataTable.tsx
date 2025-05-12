'use client';

import { useMemo, useState } from 'react';
// import { ChevronUp, ChevronDown } from 'lucide-react';

type Column<T> = {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    sortKey?: keyof T;
};

type DataTableProps<T> = {
    data: T[];
    columns: Column<T>[];
    actions?: (row: T) => React.ReactNode;
    pageSize?: number;
};

export default function DataTable<T>({
    data,
    columns,
    actions,
    pageSize = 5,
}: DataTableProps<T>) {
    const [sortKey, setSortKey] = useState<keyof T | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(0);

    const handleSort = (key: keyof T) => {
        if (sortKey === key) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
        setPage(0);
    };

    const sortedData = useMemo(() => {
        if (!sortKey) return data;
        return [...data].sort((a, b) => {
            const aVal = a[sortKey];
            const bVal = b[sortKey];
            if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, sortKey, sortDirection]);

    const pagedData = sortedData.slice(page * pageSize, (page + 1) * pageSize);
    const totalPages = Math.ceil(sortedData.length / pageSize);

    return (
        <div className="overflow-x-auto bg-white shadow rounded-xl">
            <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100 text-left">
                    <tr>
                        {columns.map((col, i) => {
                            const key = typeof col.accessor === 'function' ? col.sortKey : col.accessor;
                            const isSortable = key !== undefined;

                            return (
                                <th
                                    key={i}
                                    className="px-4 py-2 cursor-pointer select-none"
                                    onClick={() => isSortable && handleSort(key as keyof T)}
                                >
                                    <div className="flex items-center gap-1">
                                        {col.header}
                                        {isSortable && sortKey === key && (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d={sortDirection === 'asc' ? "m19.5 8.25-7.5 7.5-7.5-7.5" : "m4.5 15.75 7.5-7.5 7.5 7.5"} />
                                            </svg>

                                            //   sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                                        )}

                                    </div>
                                </th>
                            );
                        })}
                        {actions && <th className="px-4 py-2">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {pagedData.map((row, i) => (
                        <tr key={i} className="border-t">
                            {columns.map((col, j) => {
                                const content: any =
                                    typeof col.accessor === 'function'
                                        ? col.accessor(row)
                                        : row[col.accessor];
                                return (
                                    <td key={j} className="px-4 py-2">
                                        {content}
                                    </td>
                                );
                            })}
                            {actions && <td className="px-4 py-2">{actions(row)}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center p-4 text-sm text-gray-600">
                <span>
                    Page {page + 1} of {totalPages}
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 0))}
                        disabled={page === 0}
                        className="px-3 py-1 rounded border disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <button
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                        disabled={page === totalPages - 1}
                        className="px-3 py-1 rounded border disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
