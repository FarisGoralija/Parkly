import * as React from "react";
import Svg, { Rect, Defs, Pattern, Use, Image } from "react-native-svg";
const AboutUs = (props) => (
  <Svg
    width={35}
    height={35}
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Rect width={35} height={35} fill="url(#pattern0_169_58)" />
    <Defs>
      <Pattern
        id="pattern0_169_58"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_169_58" transform="scale(0.01)" />
      </Pattern>
      <Image
        id="image0_169_58"
        width={100}
        height={100}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAI30lEQVR4nO2de6wdRR3Hf1PEUh5ioQrKG1IwBkQTRWIQwiOEYiyCAglg4A/AgCH6B0gQkqsCgaQUeu75zV4Oj5IGUkqjUiOovB+pDQ2EAPIq0BbbSnnUcnv299t7KeCamT2Qu7N77jm7Z/fs2T3zSSa5ac/Ob3a+M7Mzv/ntLIDFYrFYLBaLxWKxWCwWi8ViKT+N5hxA7ywh6WYh+WGB9IZA3iqQPgmS/vuN1v8tVL+F+rY9iy52tWj4OwPSBQLpSV3pkv1EKRDrSXDofFjozyr6dsrLQn8WIF0hkD9ILEL79D5IutwKkxRJJwuktRkKYSR6Cxz3pMTlGjqW+zsI5BsF0v/aD0H8ikBCcLwzQfL3oOHtr4c1nbz99b+p5wwSCuRXpxnKlI0blM2ib3swucvfSSDd36ZFu0JSHWoThyTOd2xyrhZHErUR5n5lO5d7Ki0Nf0eB/LfYVqx7w/jsnm3cPr6HkOTE9j7kB2DE/0Im91IFBNJYTK/YmMs4HzyfNsWILzO3VUqQfxZTOWtBevt1db2kHwUVrASked3Z9A4QktaZdkHyGTDUoL+rQH7H6BnruhZD9S5JG6cIuaF721qUt42GsAkW+LvA0IJ0jSHGpyC9HyTJIrUgCsf7obIZ7iV0NQwly/0vCsmbjRa6KHE+Ds3ToigxkE5JerlAGjUaxX/UJAMKB/1dQXpnC8m3CaTValUrkD7SKfh7tUBuqN/o3/Zsj04xZjpNaGzdHfqNMz47mFaHesnJUBijEwcJSbeaheqw0nXVzEiNw2nNRlsm35btjSUoi+Q7e+6pmQwZyL9v9YC0LohJQBpJ08WFpJWhVol8Wqr7QD4t6MH8Hjg8P1UedT7dEORp6CtjvI+Q9EyGvqFVUOevJymCkPxuSBDl9kiBGvNDs6Q0jE0caNzTZugbzsTBAml9m4p9W0iq6THU2XaYngKqpP5WCypJNYH07zbXrlPDX7fFUL0rJEjNn5nmdiJribRum3APmYC+0GjOaW3gmAuxTeDwxV052kb8GcqxFyuqWtA57le7KYp6iIcq8o4PditMkIX+LKNxeZA7I/4MgfxYTMtekWoxhGpRR3+JisIPge+LTpcLSWtCFVmfPLQwQcwhC/kdyB3Jl8aI4egW35O7nCJ+KGWr06VC8qNZuC0yEUTyGUa9PAW50vB3jroo+OFM9gKW6z2MR4wW9t+OHlpJVxnXLClKEIG82BDkFsgVSb8xCv5+ppv/jeYcIXlLeBpL10x7jeMebggyrlzkfRckWBiG9kry3U1ULXjq1DCorCsyt+PQlZGJQofhsOURmFqhN/VbkGDzyih3rq4T6R4fGU7UdmfWLPB30WE4IeG9Yzv7oUJDxSSM8VF9E0R6x8U4F6+CPBHI1xmFvic3W5KWGrb+0PkafiLSQpH27tpmaPpN6xLNrJA2GA1iY+7udx00Fh4fz8nNmHTPMwT5R1f7EsjjRsUsTeztVZXZrbc3ECOyjkrtekmCaRik+63cjI3SkUZrX9vVdZIuN4bVV3Iro/Yyh5+prbKOQj+IuJYXuXvlZmyRu5dRsc2uyoi8JHUPSeSl4EZ8iBGt6Fs4kFmAXA0vVzO60I1+2vGamj/THLIyHVbrk4fqxSsSR4XQPeOPaf1oUNTCKVd7Dp1v9Kr3YkM9Vc+W/DuBtEwHuCnRRulI7WVWv9cxwN4BgPx9vdGmReDXY0VoNRY14el7oNxAC1LzZ5qBBlDnX0/9fz3m65U0ee0rN2miNWo5AEUwyIIIyTcYw8dHgPTbwD9Gq0wXfQbpXS14kZGKAytInX9qLsrySfSxQH5cTckHImR0UAURcVPPzpX7DCD/InBM0lKB/HxrDeK1Kn5r67nxd4G8QHuQU/jHcqX0gqDaoaRbweGjoQoMqiAg+cdaFKTtrVfR1utXDSQ/qJ2MSBdB3T0Cqoa+4akVlKcns+HvaLTu7bnZKivKuxsSJM+XIGvNrxg9ZEtutsqKQP5XSJCE7u1EOHy0IchLyTIYAoSk+0KCqFlKXiBfYgxZy3KzVVok/8qYOq7Iy5SQ/NeQ+JIvy8tWeRltfiNmNdz1BlDXNOhrkQnE2OTc7jMYIiJ712rRlLUNyTcZPXFV1jaqA9LPjcqahLHmNzPL33EPN4O2Ad1zM8u/cgT7FC8bM6CXobblSz3n3di6e2tBF55d9RKANxSgd2zUmUcr4ZYPv5w6T2d8tkD6p/GM+gTQOybTslcVIfn6GIfdm6kevmOTc9URFTH+p2tzKXwlUQHXxrqkJcqzSbMSkp6NyefebgKtLdFTE5Yk3vs2iAQLqNhcexpCSnxf9OoFFub1tmf0RuaCWHrDCjJgWEEGDCvIoKAevmYsreQPk2YjItGGfHE+Ba4qakqqjkJCfi4mkOBPSbMTsS980tP6iCTrNpkGFWqJNNI+yoM85RxMLLBD32kbyKZfj6Yr1ZZu4nwr7ru6z9yjiOx593LQisPzheRt7fPXgt2T9Mil6qAChx33HIH84jQitE7kpHvTHmcR9WmFdwrbpBd0gPTQnAKKdKqQ/Nr0QnBTny2Y5V7IZ9T5u0LyXepYiumFoTV9eVOpMFToTdvjVT8X4lVw+JeZ7H90QoUZ6VkcvdmhTA/kspVcKOgdE3vCZtASP9YvozjuCYX4mXw9vVYH1vxZlyVemM2FvRaQOcHLjtFZTvCVgMWpDh3O9QQiviNWGBV0IfknUGrQPTF+rKZVgPRtGFTq7hFqrRIjynZ13CuUEqS91Wtf0VkTX1+K/YgRf4ZeF5mfnlAHGtR4Xygb+t0Hc3OpThdCGSNhMPI9kEehVOijIIx9CLUirkxUJas3cE+AEveOlaX2G/m+iDxTkB+BUlDjfSPvnBd6vmxGOO5JkV6ShQchd9R3mBIef1SiXrIhJAjSBTDoCOS7jZZ0J1QEodcooWHrbhh0zH0M9S4GVAVpnAeJtBoGnfbn5VYwIa2HQaft4SlVTEgMg07oOxlVT5jwOyCF8PnJaUMgBib/DojFYrFYLBaLxWKxWCwWi8UCQ87/AebjdhpwqzzbAAAAAElFTkSuQmCC"
      />
    </Defs>
  </Svg>
);
export default AboutUs;
