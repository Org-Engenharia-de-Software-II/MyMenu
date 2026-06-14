import sc from 'styled-components/native';

import { ShoppingListItem } from '@/app/components/molecules/ShoppingListItem';

type CategoryItem = {
  id: string;
  name: string;
  quantity: string;
  checked?: boolean;
};

type Category = {
  title: string;
  items: CategoryItem[];
};

type Item = {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
 // category: 'Frutas e vegetais' | 'Carnes';
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
  return (
    <Container>
      {categoriesItems.map((item) => (
        // <Block key={category.title}>
          // <Title>{category.title}</Title>
          <Items key={item.id}>
            {/* {category.items.map((item) => ( */}
              <ShoppingListItem
                key={item.id}
                name={item.name}
                quantity={item.quantity}
                checked={item.checked}
                onToggle={onToggleItem ? () => onToggleItem(item.id) : undefined}
              />
            {/* ))} */}
          </Items>
        // </Block>
      ))}
    </Container>
  );
}
