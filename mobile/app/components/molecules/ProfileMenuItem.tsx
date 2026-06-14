import sc from 'styled-components/native';

import { Icon } from '@/app/components/atoms/Icon';

type ProfileMenuItemProps = {
  label: string;
  onPress?: () => void;
};

const Row = sc.Pressable`
  width: 100%;
  min-height: 52px;
  padding: 0 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Label = sc.Text`
  color: #171717;
  font-size: 27px;
  font-weight: 500;
`;

export function ProfileMenuItem({ label, onPress }: ProfileMenuItemProps) {
  return (
    <Row onPress={onPress}>
      <Label>{label}</Label>
      <Icon name="arrowRight" size={24} color="#1D1D1D" strokeWidth={2.2} />
    </Row>
  );
}
