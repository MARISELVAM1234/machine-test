import React from "react";
import styles from "./styles.module.scss";

const LoadingScreen = () => {
  return (
    <div>
      <div className={styles.loading_container}>
        <div className={styles.loader}></div>
        <h4>Loading...</h4>
      </div>
    </div>
  );
};

export default LoadingScreen;
