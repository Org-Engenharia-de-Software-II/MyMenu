import { useMemo, useState } from 'react';
import sc from 'styled-components/native';

import { Label } from '@/app/components/atoms/Typography';

type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  label: string;
  placeholder: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
};

const Container = sc.View`
  width: 100%;
  gap: 8px;
`;

const Trigger = sc.Pressable`
  width: 100%;
  height: 48px;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  padding: 0 14px;
  background-color: ${({ theme }) => theme.colors.inputBg};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TriggerText = sc.Text<{ $placeholder?: boolean }>`
  color: ${({ theme, $placeholder }) => ($placeholder ? '#666666' : theme.colors.textDark)};
  font-size: 20px;
  font-weight: 600;
`;

const Arrow = sc.Text`
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 16px;
  font-weight: 700;
`;

const OptionsContainer = sc.View`
  width: 100%;
  gap: 4px;
`;

const OptionButton = sc.Pressable`
  width: 100%;
  height: 42px;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  padding: 0 14px;
  background-color: ${({ theme }) => theme.colors.inputBg};
  justify-content: center;
`;

const OptionText = sc.Text`
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 20px;
  font-weight: 600;
`;

export function Dropdown({ label, placeholder, options, value, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = useMemo(
    () => options.find((option) => option.value === value)?.label,
    [options, value],
  );

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <Container>
      <Label>{label}</Label>
      <Trigger onPress={() => setIsOpen((prev) => !prev)}>
        <TriggerText $placeholder={!selectedLabel}>{selectedLabel ?? placeholder}</TriggerText>
        <Arrow>{isOpen ? '▲' : '▼'}</Arrow>
      </Trigger>

      {isOpen && (
        <OptionsContainer>
          {options.map((option) => (
            <OptionButton key={option.value} onPress={() => handleSelect(option.value)}>
              <OptionText>{option.label}</OptionText>
            </OptionButton>
          ))}
        </OptionsContainer>
      )}
    </Container>
  );
}
