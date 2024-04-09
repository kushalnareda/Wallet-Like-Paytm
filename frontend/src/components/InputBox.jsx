export function InputBox({label, placeholder, onChange}){
    return (
        <div className="flex flex-col space-y-[1px]">
            <div className="text-sm font-medium text-left py-2">
                {label}
            </div>
            <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200 text-sm mt-1"  />
        </div>
)}
