import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image } from "react-native-svg";
const Walking = (props) => (
  <Svg
    width={21}
    height={20}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Rect x={0.5} width={20} height={20} fill="url(#pattern0_138_31)" />
    <Defs>
      <Pattern
        id="pattern0_138_31"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_138_31" transform="scale(0.01)" />
      </Pattern>
      <Image
        id="image0_138_31"
        width={100}
        height={100}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFaklEQVR4nO2dW6wfQxzHF9UicYt7CA88oEEQl7i8UNQ1LqeCREQioWkkEg/UJUhUEBESaVyCaF1KXCKCt0YQQShp3Ko8NTRyTs7Z+X5n/2j1jEy6J07+/f//M7s7u+Ps/j7JvJ2dMzOf//xmZ3Z2NkkEQRAEQRAEQRCE0mitTwJwN8lnAawi+YhS6hJjzG7lcxUKA+BMkl+QNIMSgD9ILjPG7FQ8d6EQAJYC2DpMRl962xize7H/IHgD4CoA054yZtKb0lNqAMD+JNOCMmbSNXWUqdOQXFFShk0/xS5/6yC5oYIQm46LXYfWMDExsVdFGUYpdWPserSGNE2PqioEwJ2x69EaSB4YQMjS2PVoDcaYnUlOVpSyKHY9WgWA1RVkKGPM/Nh1aBVa6xMAbCsp5MHY5W8lJFeWkLHR3qXFLnsrMcbMB/BhgYF8M4BjYpe71Rhj5tlldgB/O2SszbLssNjl7Qxpmh5J8iEA6+wdGIAeyV9Ivqi1Pj92+QRBEARBmAWAYwG8AuCrIen9fGPDxcaYBbOvFcKLWFNwZq4APJ5l2aEiI6yIVQD+qbCq2wNwh12QFDHN9gjjELPGTiJFSnERr4UUMUCK7M1qIjTRX8rN0ksi9QgOTqnW+mCREqlHcHAvuUuE/A9E8L+0odNCbIiIEJrMqKS1PjHpKiTvjy2AO4at+5KuAuC7ko02XaOQr5MuAuDoEo21jeR7JK+ts5dkWXZK0jWKhCvkImbiu9b6hprD1uqka/iEKyvCzqJJLuy79qmahWyxPTjp0m2uR8N82i9iBgBf1ikkT590ZuHR3sm4GmTYBgRjzALXTpKAPeXepAt4hKsJY8yug65VSp3WhIxcyDSAW5I24xmunht2PclbAzV2z2dlIJfyRGv3/FYJVwE2U89u6A/sY90Cf/+NUurS1i3Te4areTW+smbyBl5uDw4g+UPB69bn7zGe2+v1jjDG7JF0NVylabpvqFk6gLPyPE8F8GeVvJKWTwbPG3a91vqCQDL+mn2shlLqsgKHDLRHiMf8YXxUuML280oqCyH5cX/eWuvry646J3MVG28BjAF4HUBWJFxZSL4bSMiKZAAkrx5SrnYK6ZdDcgnJN2YawbUbHcDmEEK01osdb2Ct75yQQT1nVLjq9XqHh5Bh5x6Tk5N7O8pjVwPu4Xa6J8QHAGOBhKzz/Z8kD8pvccdFyI6N82ggIU8W/THYWbrW+iKST9t5VP/gn3QRkh8FGtCXVC2LvWXO51SLAFyedA1jzC6+8dxjQD8kdn3mPCSPD9Q7fo5dl1YA4KZAQp6PXZdWQPKZQAN6956V1wGAbwP1EDuGXBi7Pm2YNG51jQ0Feskm18RQGAGAsz1+9YsBvCxjSQOQvN3xi59WSu2XP2z6XEJXzeT7ssyItLFv8/Ymz9D1m33gVXf5WwfJXx0N++rsv7fbQPPzTHzGlBfi1WwOAuAAj0a9bcB1Y74Pm5RSZ8Sp3RzEfsGgbIMCWN7U2lZnIPmAI1xtGXWIvl2dFSEByfdOmbLPNuyyuQgJhN2QZvdoORp0pSsfEdLgKdXK41hwERIIktd5NOZCEdIQdoOzQwbsgysR0hAkP3MM6Gs985Hb3qrYd0M8ZtsPi5CGyLLsZI+1qCtFSEPYT0a4hGSehx9LyAqAXfRz9I7fC+QlY0gAId87GvIdEdIQ4+Pje7pWalHgGCXpIRUheU7Ir+BQQlY17Ee5HL1jempqah8R0hAk33L8qn8smJ8M6lVwPRMH8JIIaQi7EdrjF71MhDQEgCtCn2VFCVnlsV/C8XideYEIaQh7Frt9CXRYAvBY0TxH5WeTUur0emojCIIgCIIgCIKQzGn+BXNFLl1ZbAI/AAAAAElFTkSuQmCC"
      />
    </Defs>
  </Svg>
);
export default Walking;
