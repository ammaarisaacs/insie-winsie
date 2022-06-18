import styles from "./story.module.css";

const Story = () => {
  return (
    <div className={styles.story_outer_container}>
      <div className={styles.story_inner_container}>
        <div className={styles.story_line}>page</div>
      </div>
    </div>
  );
};

export default Story;
