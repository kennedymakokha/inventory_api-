'use client';

import { Dialog } from '@headlessui/react';

type Props = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export default function ConfirmDeleteModal({ open, onClose, onConfirm }: Props) {
    return (
        <Dialog open={open} onClose={onClose} className="fixed z-50 inset-0">
            <div className="flex items-center justify-center min-h-screen px-4">
                <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
                    <Dialog.Title className="text-lg text-center text-black font-bold mb-4">Confirm Delete</Dialog.Title>
                    <div className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-12 text-red-500 self-center flex">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </div>
                    <p className="mb-4 text-center text-red-500">Are you sure you want to delete this user?</p>
                    <div className="flex justify-end gap-2">
                        <button onClick={onClose} className="text-slate-500">
                            Cancel
                        </button>
                        <button onClick={() => { onConfirm(); onClose(); }} className="text-white bg-red-600 px-4 py-2 rounded">
                            Delete
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
