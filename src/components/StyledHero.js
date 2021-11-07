import styled from "styled-components";
import defaultImg from "../images/hotelroom-15.jpg";

export const StyledHero = styled.header`
  min-height: 60vh;
  background: url(${(props) => (props.img ? props.img : props.defaultImg)})
    center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;
