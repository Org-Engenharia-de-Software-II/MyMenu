import sc from 'styled-components/native';

type FilterPillProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

const Pill = sc.Pressable<{ $active: boolean }>`
  min-width: 72px;
  padding: 5px 12px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $active }) => ($active ? theme.colors.coral : '#D9D9D9')};
`;

const Text = sc.Text<{ $active: boolean }>`
  color: ${({ $active }) => ($active ? '#FFFFFF' : '#222222')};
  font-size: 14px;
  font-weight: 700;
`;

export function FilterPill({ label, active, onPress }: FilterPillProps) {
  return (
    <Pill $active={active} onPress={onPress}>
      <Text $active={active}>{label}</Text>
    </Pill>
  );
}
