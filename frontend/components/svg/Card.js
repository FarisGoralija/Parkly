import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image } from "react-native-svg";
const Card = (props) => (
  <Svg
    width={35}
    height={35}
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Rect width={35} height={35} fill="url(#pattern0_169_55)" />
    <Defs>
      <Pattern
        id="pattern0_169_55"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_169_55" transform="scale(0.01)" />
      </Pattern>
      <Image
        id="image0_169_55"
        width={100}
        height={100}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACaklEQVR4nO3du04bQRSA4ZlIVKA8SUiqXJ6CNHmfdKSgAMMcR9TwTAlyl9Rpkp2jpGKjWTvIuwbsXcaaE+//SVuCzPm9F1McOwcAAAAAAAAAAAAAj7us91zQD1702ot+9RKjF6059JEZxGo+K71Os2tmmEXQ9z7EGcPXp70BQ5ylWQ4P8bF+5kU/EULzXQlCvPVBj9Nse/cghm7vkpyiDLhM3Xbq/vYST91nfeNO6v3ehcfmpN5Ps/Ihns1n1z5T3FSPNvtFl/Xeyj0jxG9uWr3Y9t+wsy6qQx/i95V7ykY3+vnTVOvMIEamKBL/LM+2efpaZ/Fou/z4dprj9cA5L3HSuZdcrQ8S9KZVUfQ1w8wk6NtOkJu1P7P4QLN0WtUHuV7P6IX6oPvhcYMg7Ue00Q8xs97zJch2EcQYguxaEA7d6gwIIrbeZASR8hEIIuUHTxApP2yCSPkBE0TKD5UgUn6QBJHywyOIlB+YuSBZ/l+AOwQxhiDGEMQYghhDkLEGMf/4aARBjCGIMQQxhpu6MQQxhiDGEMQYghhDEGMIYgxBjCGIMQQxhiDGEMQYghhDEGMIYgxBjCGIMQQxhiDGEOS/DxL0V+sHWD6Tz+TH806Qn/3XM6WVfshjqu8GrGfqLDAL8SzTyxk9H+J57wVm9674u6gORz/NpzqPrwat+HtwCSZRhpPq5fAlmA+tiW3qxkm6DnKj30B6GEr3jOYy1T4z+q2JXWCRshpapPxv1XjQ49UzhcOXWDV+Z6pHLOPXDGdFnPW+TPX4uorW5lIOvWcGsfJBvzSPtlm/rgIAAAAAAAAAAACA21l/AbnwIHEbuM0aAAAAAElFTkSuQmCC"
      />
    </Defs>
  </Svg>
);
export default Card;
