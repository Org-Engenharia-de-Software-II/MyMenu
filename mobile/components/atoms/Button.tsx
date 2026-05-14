import type { ReactNode } from 'react';
import sc from 'styled-components/native';

type ButtonVariant = 'primary' | 'secondary' | 'coral';

type ButtonProps = {
  title: string;
  variant?: ButtonVariant;
  onPress?: () => void;
  icon?: ReactNode;
};

const ButtonContainer = sc.Pressable<{ $variant: ButtonVariant }>`
  width: 100%;
  background-color: ${({ theme, $variant }) => {
    if ($variant === 'primary') return theme.colors.white;
    if ($variant === 'secondary') return theme.colors.buttonSecondary;
    return theme.colors.coral;
  }};
  padding: 14px 18px;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.colors.overlay};
  shadow-offset: 0px 4px;
  shadow-opacity: 1;
  shadow-radius: 0px;
  elevation: 3;
`;

const ButtonText = sc.Text<{ $variant: ButtonVariant }>`
  color: ${({ theme, $variant }) => {
    if ($variant === 'primary') return theme.colors.textDark;
    if ($variant === 'secondary') return '#B44A56';
    return theme.colors.white;
  }};
  font-size: 30px;
  font-weight: 800;
  line-height: 34px;
`;

const ButtonContent = sc.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export function Button({ title, variant = 'primary', onPress, icon }: ButtonProps) {
  return (
    <ButtonContainer $variant={variant} onPress={onPress}>
      <ButtonContent>
        {icon}
        <ButtonText $variant={variant}>{title}</ButtonText>
      </ButtonContent>
    </ButtonContainer>
  );
}
