import React from 'react';

const InputTextareaComponent = ({ id, name, required = false, placeholder, onChange, value, rows = 4 }) => {
  return (
    <div className="mt-1">
      <div className="relative rounded-md shadow-sm">
        <textarea
          id={id}
          value={value}
          name={name}
          required={required}
          className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={placeholder} // Optional placeholder
          onChange={onChange}
          rows={rows}
        />
      </div>
    </div>
  );
};

export default InputTextareaComponent;