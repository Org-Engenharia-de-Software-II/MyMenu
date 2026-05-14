import sc from 'styled-components/native';

type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const Track = sc.Pressable<{ $active: boolean }>`
  width: 38px;
  height: 22px;
  border-radius: 999px;
  padding: 2px;
  justify-content: center;
  background-color: ${({ $active }) => ($active ? '#39D98A' : '#CFCFCF')};
`;

const Thumb = sc.View<{ $active: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: #FFFFFF;
  margin-left: ${({ $active }) => ($active ? '16px' : '0px')};
`;

export function Switch({ value, onValueChange }: SwitchProps) {
  return (
    <Track $active={value} onPress={() => onValueChange(!value)}>
      <Thumb $active={value} />
    </Track>
  );
}
