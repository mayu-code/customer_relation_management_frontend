import { Checkbox } from "@material-tailwind/react";

export const CheckboxGroup = ({
  label,
  options = [],
  selectedValues,
  onChange,
  error,
}) => {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    // Find the course object from the options array
    const course = options.find((option) => option.courseName === value);

    // Create a new state array
    const updatedValues = checked
      ? [...selectedValues, course] // Add selected course
      : selectedValues.filter((item) => item.courseName !== course.courseName); // Remove unselected course

    // Trigger the onChange handler with the new state
    onChange({
      target: {
        name: "courses",
        value: updatedValues,
      },
    });
  };

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-4 text-lg">{label}</h2>
      {Array.isArray(options) && options.length > 0 ? (
        options.map((option) => (
          <Checkbox
            key={option.courseName}
            label={option.courseName}
            value={option.courseName}
            checked={selectedValues.some(
              (selected) => selected.courseName === option.courseName
            )}
            onChange={handleCheckboxChange}
          />
        ))
      ) : (
        <p>No courses available.</p>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
