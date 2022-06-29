import { useRef, useEffect, useState } from "react";
import styles from "./story.module.css";

// https://stackoverflow.com/questions/63617438/vertical-mouse-scroll-on-div-with-overflow-x-scroll
// https://stackoverflow.com/questions/67358492/how-to-make-div-scrollable-sideways-using-mousewheel
// https://stackoverflow.com/questions/11700927/horizontal-scrolling-with-mouse-wheel-in-a-div
//  https://stackoverflow.com/questions/28584722/horizontal-scrolling-on-mouse-wheel-on-div-element
// https://stackoverflow.com/questions/8189840/get-mouse-wheel-events-in-jquery/22518932#22518932
// https://stackoverflow.com/questions/12916289/how-to-trigger-javascript-mouse-scroll-wheel-on-a-divs-horizontal-scrollbar
// https://dev.to/juanbelieni/how-to-create-horizontal-scroll-with-mouse-wheel-using-javascript-4cm5
// https://alvarotrigo.com/blog/scroll-horizontally-with-mouse-wheel-vanilla-java/
// https://codesandbox.io/s/framer-motion-parallax-effect-nhsh3?file=/src/index.js

const Story = () => {
  const [scrollLeft, setScrollLeft] = useState(0);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      setScrollLeft(ref.current.scrollLeft);
      console.log(scrollLeft);
    }
  }, [scrollLeft]);

  return (
    <div className={styles.story_outer_container}>
      <div className={styles.story_inner_container}>
        <div ref={ref} className={styles.story_line}>
          <svg
            width="3256"
            height="199"
            viewBox="0 0 3256 199"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M225 1H55H53C43.0589 1 35 9.05887 35 19V19V156C35 169.807 23.8071 181 10 181H8.5M225 19H80C66.1929 19 55 30.1929 55 44V181V181C55 190.665 47.165 198.5 37.5 198.5H35H8.5M8.5 198.5L7.78324 197.699C3.4533 192.86 3.77132 185.451 8.5 181V181M8.5 198.5L9.21792 197.782C13.9418 193.058 13.6101 185.303 8.5 181V181"
              stroke="black"
            />
            <path
              d="M225 1H1729M225 19H618C631.807 19 643 30.1929 643 44V181V181C643 190.665 650.835 198.5 660.5 198.5H662H688M688 198.5L689.158 197.137C693.235 192.341 692.72 185.164 688 181V181M688 198.5L686.836 197.275C682.361 192.564 682.9 185.026 688 181V181M688 181H687C673.193 181 662 169.807 662 156V44C662 30.1929 673.193 19 687 19H1729"
              stroke="black"
            />
            <path
              d="M1729 1H2683H3249.5M1729 19H2913C2926.81 19 2938 30.1929 2938 44V163C2938 172.941 2929.94 181 2920 181V181M3249.5 1V1C3253.12 5.52672 3253.61 11.806 3250.73 16.8392L3249.5 19M3249.5 1V1C3244.75 5.19266 3244.15 12.3853 3248.13 17.3107L3249.5 19M3249.5 19H3033.5H2981.5C2967.69 19 2956.5 30.1929 2956.5 44V181V181C2956.5 190.665 2948.66 198.5 2939 198.5H2938H2920M2920 198.5L2918.84 197.208C2914.56 192.453 2915.09 185.095 2920 181V181M2920 198.5L2921.16 197.137C2925.23 192.341 2924.72 185.164 2920 181V181"
              stroke="black"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Story;
