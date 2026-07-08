import React from 'react';
import { Search } from 'lucide-react';

function SearchBar({
  placeholder = 'Search...',
  value,
  onChange,
  className = ''
}) {
  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-[#131b2e]/60 border border-white/10 rounded-full px-5 py-2.5 pl-11 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-inner"
      />
      <Search size={16} className="absolute left-4 top-3 text-outline pointer-events-none" />
    </div>
  );
}

export default SearchBar;
