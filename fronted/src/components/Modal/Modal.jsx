import './modal.css';
import Button from '../Button/button';

const Modal = ({ show, YseDelete, coverClick }) => {
  return (
    <div style={{ display: show ? 'block' : 'none' }} className="modal">
      <div className="cover" onClick={coverClick}></div>
      <div className="modal-box">
        <p>Are you sure? You want to delete User</p>
        <div className="input-controlls">
          <Button content="No" onClick={coverClick} className="yes-no no" />
          <Button content="Yes" onClick={YseDelete} className="yes-no yes" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
