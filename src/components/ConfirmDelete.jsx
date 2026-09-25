"use client";

export default function ConfirmDelete({ isOpen, title, onConfirm, onCancel, loading }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Delete</h3>
                <p className="text-sm text-gray-600 mb-6">
                    Are you sure you want to delete <strong className="text-gray-900">{title}</strong>? This action cannot be undone.
                </p>

                <div className="flex justify-center gap-3">
                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="px-4 py-2 border rounded text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}