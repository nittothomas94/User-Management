import './button.css';

const Button = ({ className, content = 'click', onClick }) => {
  return (
    <div className="button">
      <button className={className} onClick={onClick}>
        {content}
      </button>
    </div>
  );
};

export default Button;
