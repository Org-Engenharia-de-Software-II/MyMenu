import { useMemo } from 'react';
import sc from 'styled-components/native';

import { ShoppingListItem } from '@/app/components/molecules/ShoppingListItem';

type Item = {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
  category: string;
};

type CategoryListProps = {
  categoriesItems: Item[];
  onToggleItem: (itemId: string) => void;
};

const Container = sc.View`
  width: 100%;
  gap: 16px;
`;

const Block = sc.View`
  width: 100%;
  gap: 8px;
`;

const Title = sc.Text`
  color: ${({ theme }) => theme.colors.coral};
  font-size: 30px;
  font-weight: 800;
`;

const Items = sc.View`
  width: 100%;
  gap: 8px;
`;

export function CategoryList({ categoriesItems, onToggleItem }: CategoryListProps) {
  const categories = useMemo(() => {
    return categoriesItems.reduce<Record<string, Item[]>>((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [categoriesItems]);

  return (
    <Container>
      {Object.entries(categories).map(([title, items]) => (
        <Block key={title}>
          <Title>{title}</Title>
          <Items>
            {items.map((item) => (
              <ShoppingListItem
                key={item.id}
                name={item.name}
                quantity={item.quantity}
                checked={item.checked}
                onToggle={onToggleItem ? () => onToggleItem(item.id) : undefined}
              />
            ))}
          </Items>
        </Block>
      ))}
    </Container>
  );
}
