export interface DropdownProps {
  options: string[];
  selectedOption: string;
  name: string;
  width?: string;
  onSelect?: (value: string) => void;
}

export default function Dropdown({
  options,
  selectedOption,
  name,
  width = "w-fit",
  onSelect,
}: DropdownProps) {
  return (
    <div className="relative">
      <select
        name={name}
        defaultValue={selectedOption.toLowerCase()}
        onChange={(e) => onSelect && onSelect(e.target.value)}
        className={`border border-gray-300 text-lg rounded-md px-3 pt-4 pb-3 gap-2 bg-white cursor-pointer flex justify-between whitespace-nowrap ${width} h-full`}>
        {options.map((option, index) => (
          <option
            key={index}
            value={option.toLowerCase()}
            className="px-3 py-2 cursor-pointer hover:bg-gray-200">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
