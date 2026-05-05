import type { TextInputProps } from 'react-native';
import sc from 'styled-components/native';

const StyledInput = sc.TextInput`
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.inputBg};
  border-radius: ${({ theme }) => theme.radius.sm}px;
  padding: 0 14px;
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 22px;
  font-weight: 600;
`;

export function Input(props: TextInputProps) {
  return <StyledInput placeholderTextColor="#7A7A7A" {...props} />;
}
