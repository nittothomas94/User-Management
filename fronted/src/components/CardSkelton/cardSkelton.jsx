import { Skeleton } from 'antd';

import './cardSkelton.css';

const CardSkelton = () => {
  return (
    <div className="card">
      <Skeleton active={true} />
    </div>
  );
};

export default CardSkelton;
