import type { TextInputProps } from 'react-native';
import sc from 'styled-components/native';

const Field = sc.TextInput`
  width: 100%;
  height: 44px;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  background-color: ${({ theme }) => theme.colors.inputBg};
  padding: 0 12px;
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 16px;
  font-weight: 700;
`;

export function InputField(props: TextInputProps) {
  return <Field placeholderTextColor="#A0A0A0" {...props} />;
}
