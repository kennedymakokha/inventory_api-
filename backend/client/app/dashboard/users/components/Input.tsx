import React from 'react'

function Input({ value, placeholder, onChange }: { placeholder: string; value: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <input
            className="w-full border text-slate-900 rounded px-3 py-2"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
        />
    )
}

export default Input