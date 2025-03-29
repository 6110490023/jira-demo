import React,{ useState, useEffect } from "react";

interface DropdownProps {
  label: string;
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
  defaultValue?: string;
}

const DropdownCust: React.FC<DropdownProps> = ({ label, options, onSelect, defaultValue })  => {
  const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  // ตั้งค่าค่าเริ่มต้นถ้ามี defaultValue
  useEffect(() => {
    if (defaultValue) {
      const defaultOption = options.find((option) => option.value === defaultValue);
      if (defaultOption) {
        setSelected(defaultOption);
      }
    }
  }, [defaultValue, options]);

  return (
    <div className="flex flex-col space-y-1">
      <label className=" font-medium">{label}</label>
      <div className="relative inline-block text-left">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-40 px-4 py-2 bg-white border rounded-md shadow-sm text-gray-700 flex justify-between items-center"
        >
          {selected.label}
          <span className="ml-2">▼</span>
        </button>

        {isOpen && (
          <div className="absolute mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
            {options.map((option) => (
              <button
                key={option.value}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                onClick={() => {
                  setSelected(option);
                  onSelect(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DropdownCust;