'use client';

import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import Input from './Input';

type User = {
    id?: number;
    name: string;
    phone_number: string;
    role: string;
};

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (user: User) => void;
    initialData?: User | null;
};

export default function UserFormModal({ open, onClose, onSave, initialData }: Props) {
    const [user, setUser] = useState<User>({ name: '', phone_number: '', role: '' });

    useEffect(() => {
        if (initialData) setUser(initialData);
        else setUser({ name: '', phone_number: '', role: '' });
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(user);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                    <Dialog.Title className="text-lg text-slate-900 uppercase font-semibold mb-4">
                        {initialData ? 'Edit User' : 'Add User'}
                    </Dialog.Title>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            placeholder="Name"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                        />
                        <Input
                            placeholder="Phon Number"
                            value={user.phone_number}
                            onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
                        />
                        <select
                            className="w-full border text-slate-900 rounded px-3 py-2"
                            value={user.role}
                            onChange={(e) => setUser({ ...user, role: e.target.value })}
                            required
                        >
                            <option value="">Select a role</option>
                            <option value="admin">Admin</option>
                            <option value="sales">sales</option>
                            {/* <option value="viewer">Viewer</option> */}
                        </select>
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={onClose} className="text-gray-500">
                                Cancel
                            </button>
                            <button type="submit" className="bg-slate-600 text-white px-4 py-2 rounded">
                                Save
                            </button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
