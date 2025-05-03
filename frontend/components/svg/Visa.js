import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image } from "react-native-svg";
const Visa = (props) => (
  <Svg
    width={50}
    height={40}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Rect width={100} height={100} fill="url(#pattern0_545_55)" />
    <Defs>
      <Pattern
        id="pattern0_545_55"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_545_55" transform="scale(0.01)" />
      </Pattern>
      <Image
        id="image0_545_55"
        width={100}
        height={100}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGeElEQVR4nO2de6gVRRzHT/nsYUmlvSijsqi0UNKswEBJjESp7GFWRGRR/dELLFIoLbUo0iyInobXsgIrCkMqhAJ7UYRZKpaVlYRolml0e+gnhjvnMmfOb/Z1zlnn6u8DB+7d/c3szO+7O7+Z2dndSkVRFEVRFEVRFEVRFEVRFEXZQwF6ABOBRcAaYAdKo2y3vlxkfdsjqxgTgHUNH15Jw/h4QpIQ+wJzUrNRmskuYLbxvSSIirH7mC01U0Ytl7+AucBw4IACoUhxMD60vpxnfetifD/eDeB+zNgADHIzVJoHMBj40fO50aBHxUZ8/8pQMcoRpd3z/cSK7Ya5zG11YZQOgMc837eZjWu9jcOsvdJigLM836+t2AGLy4GtLojSgfG15/vtZmMN1lYpiTr/qyC7FxUkMlSQyFBBIkMFiQwVJDJUkMhQQSJDBYkMFSQyVJDIUEEiQwWJjL1SEKAvcLy5EwocLq7y6KqCAPsBk4EXgVcTfg8Dx2bI70TgXeH3DnCotbk6YHNNIM9ewBXAG8Avfh3tbeoVwCxgaIYyTgkcf3Fa2tKuEOAo4EHgd8JsAc5IyWd6IO1yx2ZhwOYqIb9RwHqyszKlfGYRyMZAWrNa5JCsPgvk39wmy5zFdmnL34FCr0hJ/2Ug3eWOzacBmzO9vC4D/iUfz6WU78qU9GPy+szLvzUxBDgZ+Ego8D9A70CaUwOV3AT0tDb7ANsCZ2fn7WbguIJrkG9KqdcnKenvKeozm3/rgrppnoBpVoTUhRPAfYFKznFsjg7YbPDymh+wM8ItB+4FbgbuBl5zluAEF3UA55DO6w36rNb/dRsay3wZMBW4wDtbbwzYrxYquNP0iByb0QFHLPPy+iZgd23g2P1tU9sroT4vZxDkp5gFMWef4RVgJLDZ/v+0YHt6RkffErCrWT8mLM/EXqndCtblGCEe+QvbqhxR5BhlCDLMyept4Gx7pXwm2D4QqNxFnt3jAbsbPDspzgSvkAx1MT1In/mBODWuyDHKEKQbsNXJbqEdD7RXg7RjKz2DshHo7tmZ/r7ESM9O6lBUY8gzwJE56rE/8KuQ1yA7fvGZEaUg9gAmYLrcbtvizgGY+TvgvJlCfj8HbPt5dneQjDmzZ2ZZyW9inpD+Y7vvCWHf0gb8Vev/ug0NYnsyLqZtH2tG2ynNwX/+yB7oIzwmYdgsHLc3sIp0fkgaO9hu9tdCuil2/3XCvk0N+KvW/3UbGsSOR3w+NOtYnQp/J9i8mRKTXD5I6Dl9QTpG/OsDeYwJXF197P4hgTwHFPRX6ycXTVdQKPBku888tCJxoZCPmcOSeCplrm1WwsyB270+T0i/VLB93tnfM9DbuqSgr0oRZIFQ4FX2OcZHAs1INyEf41iJ2zKUYQDwrL0aQrznpTnJCuVzrmf3edJgNqevav1ft6EJmEm/gAOG2qezfKYH8lkSyGdsjrIMCRwTexV1TsUHAvYaIU/Ta0sUN0f5av1ft6EJmC5mIBibKXtp8CZ2SZGDa+722sY16czf6cyZ9RUezaiKttX7SYPQ30x8jFIQe6CvhEJLIi0JpO8eiAM7Clbc3ArwWe/sv5PGGVigXKUJ4j+uFeL8HL01/FE/MMnEFOCwQD4mbt2KzEPOgPZ7GmdSAT+VJsj4DBX4NnQ7lY5HtSXaPDtzd7La/KwEXrIngxnrPCk8sldlS3UOCriY5vBoAT+VJsjBGW4WTU1If1cgzbSMI/kkTNwa7eTxfuCezKUJv7eyjo9S/FSOICnzS9j40D9n17lm8tGM7MmPCcqjnDyGFDnbzcBSSPNn3tnlsgW5P8ExiwuKeYpjY87UrOy0k501PTrghYB92lqA0Hxcrmf8yxbkNNuWS7+0Ck8LpOt8rZENxuOsU1cLvbhdNq6YdCcEAv4M4Ript2XtiF0q3+BoBSkbOgTqZ3toA7vCO1r2aEG6IipIZKggkaGCRIYKEhkqSGSoIJGhgkSGChIZKkhkqCCRoYJEhgrSBQT5w9umL8EsCeAgz/fbKsI95+FlFWhvBxghvSbWf5HyvN1d0L0F4TG8ttCrxnPd9VIKP48pvmo89DJ+FaVF2Mf55JfxJ3yuot2ubzLtnAb65rzFeoRtptqDn6twEugHXWL5oIuzAmN2YP2tUvYnj7wloPpRsNazrq6ZyvHZPGmZvpKP7XbtWFuuz+YpiqIoiqIoiqIoiqIoiqIola7H/yBZrF1DkYQuAAAAAElFTkSuQmCC"
      />
    </Defs>
  </Svg>
);
export default Visa;
