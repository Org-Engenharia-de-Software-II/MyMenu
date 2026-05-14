import sc from 'styled-components/native';

import { Icon } from '@/app/components/atoms/Icon';

type ShoppingListItemProps = {
  name: string;
  quantity: string;
  checked?: boolean;
  onToggle?: () => void;
  darkCard?: boolean;
  expiresIn?: string;
  onDelete?: () => void;
  showCheckbox?: boolean;
};

const Card = sc.View<{ $darkCard: boolean }>`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  padding: 10px 12px;
  background-color: ${({ theme, $darkCard }) => ($darkCard ? theme.colors.surface : '#EFEFEF')};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Left = sc.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const Checkbox = sc.View<{ $checked: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 3px;
  border-width: 2px;
  border-color: ${({ theme, $checked }) => ($checked ? theme.colors.coral : '#6F6F6F')};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $checked }) => ($checked ? theme.colors.coral : 'transparent')};
`;

const Content = sc.View`
  gap: 2px;
`;

const Name = sc.Text<{ $darkCard: boolean }>`
  color: ${({ theme, $darkCard }) => ($darkCard ? theme.colors.textPrimary : theme.colors.textDark)};
  font-size: 22px;
  font-weight: 800;
`;

const Quantity = sc.Text<{ $darkCard: boolean }>`
  color: ${({ theme, $darkCard }) => ($darkCard ? theme.colors.textSecondary : '#5C5C5C')};
  font-size: 14px;
  font-weight: 600;
`;

const Right = sc.Pressable`
  padding-left: 8px;
`;

export function ShoppingListItem({
  name,
  quantity,
  checked = false,
  onToggle,
  darkCard = false,
  expiresIn,
  onDelete,
  showCheckbox = true,
}: ShoppingListItemProps) {
  return (
    <Card $darkCard={darkCard}>
      <Left onPress={onToggle}>
        {showCheckbox ? (
          <Checkbox $checked={checked}>{checked ? <Icon name="check" size={12} color="#FFFFFF" /> : null}</Checkbox>
        ) : null}
        <Content>
          <Name $darkCard={darkCard}>{name}</Name>
          <Quantity $darkCard={darkCard}>{expiresIn ?? quantity}</Quantity>
        </Content>
      </Left>
      {onDelete ? (
        <Right onPress={onDelete}>
          <Icon name="trash" size={16} color={darkCard ? '#9A9A9A' : '#666666'} />
        </Right>
      ) : null}
    </Card>
  );
}
