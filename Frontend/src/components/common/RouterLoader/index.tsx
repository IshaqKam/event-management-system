import { memo } from 'react';
import { ScaleLoader } from 'react-spinners';
import styles from './RouterLoader.module.css';

function RouterLoader() {
  return (
    <div className={styles.wrapper}>
      <ScaleLoader color="#eeeeee" className="text-xl" />
    </div>
  );
}

export default memo(RouterLoader);
