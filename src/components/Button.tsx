import styled from 'styled-components';

interface ButtonProps {
  $marginB?: string;
  $bgColor?: string;
  $textColor?: string;
}

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  width: 15.625vw;
  min-width: 200px;
  margin-top: 20px;
  margin-bottom: ${(props) => props.$marginB || '20px'};
  height: 40px;
  text-align: center;
  padding: 10px 20px;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  background-color: ${(props) => props.$bgColor || '#E4EFE7'};
  color: ${(props) => props.$textColor || '#3D8D7A' };
`;

export default Button;