import { Fragment } from 'react';
import sc from 'styled-components/native';

import { Divider } from '@/components/atoms/Divider';
import { ProfileMenuItem } from '@/components/molecules/ProfileMenuItem';

type ProfileMenuListProps = {
  items: string[];
  onPressItem?: (item: string) => void;
};

const Container = sc.View`
  width: 100%;
  border-radius: 8px;
  background-color: #ECECEC;
  overflow: hidden;
`;

export function ProfileMenuList({ items, onPressItem }: ProfileMenuListProps) {
  return (
    <Container>
      {items.map((item, index) => (
        <Fragment key={item}>
          <ProfileMenuItem label={item} onPress={onPressItem ? () => onPressItem(item) : undefined} />
          {index < items.length - 1 ? <Divider /> : null}
        </Fragment>
      ))}
    </Container>
  );
}
