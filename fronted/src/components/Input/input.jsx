import './input.css';

const Input = ({
  type = 'text',
  className,
  placeholder,
  label,
  onChange,
  value,
}) => {
  return (
    <div className="input">
      <label>{label}</label>
      <input
        type={type}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Input;
