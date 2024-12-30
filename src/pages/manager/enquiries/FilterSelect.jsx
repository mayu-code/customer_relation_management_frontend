/* eslint-disable react/prop-types */
// FilterSelect.jsx
import { Select, Option } from "@material-tailwind/react";

export const FilterSelect = ({ name, value, onChange, options, className }) => (
  <Select
    value={value}
    onChange={(e) => onChange(name, e.target.value)}
    className={className}
  >
    <Option value="">Select {name}</Option>
    {options.map((option, index) => (
      <Option key={index} value={option}>
        {option}
      </Option>
    ))}
  </Select>
);
