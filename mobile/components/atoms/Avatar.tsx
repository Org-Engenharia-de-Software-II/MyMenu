import sc from 'styled-components/native';

import { Icon } from '@/components/atoms/Icon';

type AvatarProps = {
  size?: number;
};

const Container = sc.View<{ $size: number }>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  border-radius: ${({ $size }) => `${$size / 2}px`};
  background-color: #D1D1D1;
  align-items: center;
  justify-content: center;
`;

export function Avatar({ size = 104 }: AvatarProps) {
  return (
    <Container $size={size}>
      <Icon name="profile" size={size * 0.36} color="#7D7D7D" strokeWidth={2.2} />
    </Container>
  );
}
