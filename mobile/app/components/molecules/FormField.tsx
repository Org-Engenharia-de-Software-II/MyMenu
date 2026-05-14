import type { TextInputProps } from 'react-native';
import sc from 'styled-components/native';

import { Input } from '@/app/components/atoms/Input';
import { Label } from '@/app/components/atoms/Typography';

type FormFieldProps = TextInputProps & {
  label: string;
};

const Container = sc.View`
  width: 100%;
  gap: 8px;
`;

export function FormField({ label, ...inputProps }: FormFieldProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <Input {...inputProps} />
    </Container>
  );
}
