import { Checkbox } from "@material-tailwind/react";

const CheckboxGroup = ({
  courses,
  selectedCourses,
  onCheckboxChange,
  errors,
}) => {
  return (
    <div className="mb-6">
      <p className="mb-2">Select Courses</p>
      {courses.map((course) => (
        <Checkbox
          key={course.courseName}
          label={course.courseName}
          value={course.courseName}
          checked={selectedCourses.some(
            (selected) => selected.courseName === course.courseName
          )}
          onChange={onCheckboxChange} // Attach checkbox change handler
        />
      ))}
      {errors && (
        <p className="text-red-500 text-sm">{errors.registeredCourses}</p>
      )}
    </div>
  );
};

export default CheckboxGroup;
