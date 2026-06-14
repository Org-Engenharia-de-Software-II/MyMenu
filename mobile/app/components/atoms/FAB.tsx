import sc from 'styled-components/native';

import { Icon } from '@/app/components/atoms/Icon';

type FABProps = {
  onPress: () => void;
};

const Button = sc.Pressable`
  width: 52px;
  height: 52px;
  border-radius: 26px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.coral};
  shadow-color: ${({ theme }) => theme.colors.overlay};
  shadow-offset: 0px 4px;
  shadow-opacity: 1;
  shadow-radius: 0px;
  elevation: 4;
`;

export function FAB({ onPress }: FABProps) {
  return (
    <Button onPress={onPress}>
      <Icon name="plus" color="#FFFFFF" size={28} strokeWidth={2.8} />
    </Button>
  );
}
