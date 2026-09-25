"use client";

import { PAGE_SIZE_OPTIONS } from "@/utils/constants";

export default function Pagination({
    currentPage,
    totalItems,
    pageSize,
    onPageChange,
    onPageSizeChange,
}) {
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
            <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{startItem}</span>–
                <span className="font-semibold text-gray-900">{endItem}</span> of{" "}
                <span className="font-semibold text-gray-900">{totalItems}</span>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <label htmlFor="pageSize" className="text-sm text-gray-600">
                        Per page:
                    </label>
                    <select
                        id="pageSize"
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {PAGE_SIZE_OPTIONS.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        disabled={currentPage <= 1}
                        onClick={() => onPageChange(currentPage - 1)}
                        className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        Previous
                    </button>
                    <span className="px-3 py-1 text-sm text-gray-700">
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        disabled={currentPage >= totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                        className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}