import sc from 'styled-components/native';

type SelectPillProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const PillButton = sc.Pressable<{ $selected: boolean }>`
  min-width: 45%;
  padding: 10px 8px;
  border-radius: ${({ theme }) => theme.radius.pill}px;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: ${({ theme, $selected }) =>
    $selected ? '#B44A56' : theme.colors.buttonSecondary};
  background-color: ${({ theme, $selected }) =>
    $selected ? '#FFD9DE' : theme.colors.white};
`;

const PillText = sc.Text<{ $selected: boolean }>`
  color: ${({ theme, $selected }) => ($selected ? '#8F3742' : theme.colors.textDark)};
  font-size: 18px;
  font-weight: 700;
`;

export function SelectPill({ label, selected, onPress }: SelectPillProps) {
  return (
    <PillButton $selected={selected} onPress={onPress}>
      <PillText $selected={selected}>{label}</PillText>
    </PillButton>
  );
}
