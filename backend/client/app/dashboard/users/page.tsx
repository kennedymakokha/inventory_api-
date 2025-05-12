'use client';

import DataTable from '@/app/components/DataTable';
import { useState } from 'react';
import UserFormModal from './components/UserFormModal';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import { toast } from 'sonner';
import { useGetusersQuery, useSignupMutation } from '@/store/features/authApi';


type User = {
    _id: number;
    name: string;
    phone_number: string;
    role: string;
};

let nextId = 4;

export default function UsersPage() {
    // const [users, setUsers] = useState<User[]>([
    //     { id: 1, name: 'Alice', phone_number: 'alice@example.com', role: 'Admin' },
    //     { id: 2, name: 'Bob', phone_number: 'bob@example.com', role: 'Editor' },
    //     { id: 3, name: 'Carol', phone_number: 'carol@example.com', role: 'Viewer' },
    // ]);
    const { data, isLoading, isSuccess, refetch } = useGetusersQuery({})
    const [createUser] = useSignupMutation()
    const filteredData = data !== undefined && isSuccess ? data.filter((e: any) => e.role !== "superAdmin") : []

    console.log(filteredData)
    const [formOpen, setFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

    const handleSave = async (user: Partial<User>) => {
        try {
            if (user._id) {
                // setUsers((prev) =>
                //     prev.map((u) => (u.id === user.id ? { ...u, ...user } : u))
                // );
            } else {
                await createUser(user).unwrap()
                await refetch()
                toast.success('User added successfully');
                // setUsers((prev) => [...prev, { ...user, id: nextId++ } as User]);
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleDelete = () => {

        if (deleteUserId !== null) {
            // setUsers((prev) => prev.filter((u) => u.id !== deleteUserId));
            toast.success('User deleted successfully');
            setDeleteUserId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Users</h1>
                <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                    onClick={() => { setEditingUser(null); setFormOpen(true); }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add User
                </button>
            </div>

            <DataTable<User>
                data={filteredData}
                columns={[
                    { header: 'Name', accessor: 'name', sortKey: 'name' },
                    { header: 'phone_number', accessor: 'phone_number', sortKey: 'phone_number' },
                    { header: 'Role', accessor: 'role', sortKey: 'role' },
                ]}
                actions={(user: any) => (
                    <div className="flex gap-2">
                        <button onClick={() => { setEditingUser(user); setFormOpen(true); }} className="text-indigo-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </button>
                        <button onClick={() => setDeleteUserId(user.id)} className="text-red-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </div>
                )}
                pageSize={5}
            />

            <UserFormModal
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSave={handleSave}
                initialData={editingUser}
            />

            <ConfirmDeleteModal
                open={deleteUserId !== null}
                onClose={() => setDeleteUserId(null)}
                onConfirm={handleDelete}
            />
        </div>
    );
}
