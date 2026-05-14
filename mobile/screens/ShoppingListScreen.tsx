import { useMemo, useState } from 'react';
import sc from 'styled-components/native';

import { FAB } from '@/components/atoms/FAB';
import { Icon } from '@/components/atoms/Icon';
import { CategoryList } from '@/components/organisms/CategoryList';

type ShoppingListScreenProps = {
  onBack: () => void;
  onAddProduct: () => void;
};

type Item = {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
 // category: 'Frutas e vegetais' | 'Carnes';
};

const initialItems: Item[] = [
  { id: '1', name: 'Cenoura', quantity: '3 unidades', checked: false  },
  { id: '2', name: 'Chuchu', quantity: '2 unidades', checked: true  },
  { id: '3', name: 'Tomate', quantity: '1 unidade', checked: false  },
  { id: '4', name: 'Linguiça', quantity: '500 gramas', checked: false },
  { id: '5', name: 'Peito de frango', quantity: '1 quilo', checked: true },
  { id: '6', name: 'Carne moída', quantity: '2 quilos', checked: false },
];

const Container = sc.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Safe = sc.SafeAreaView`
  flex: 1;
`;

const Content = sc.View`
  flex: 1;
  padding: 16px 14px;
  gap: 14px;
`;

const Header = sc.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = sc.Pressable``;

const Title = sc.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 43px;
  font-weight: 800;
`;

const FabWrap = sc.View`
  position: absolute;
  right: 16px;
  bottom: 18px;
`;

export function ShoppingListScreen({ onBack, onAddProduct }: ShoppingListScreenProps) {
  const [items, setItems] = useState<Item[]>(initialItems);
  
  // const categories = useMemo(
  //   () => [
  //     {
  //       title: 'Frutas e vegetais',
  //       items: items.filter((item) => item.category === 'Frutas e vegetais'),
  //     },
  //     {
  //       title: 'Carnes',
  //       items: items.filter((item) => item.category === 'Carnes'),
  //     },
  //   ],
  //   [items],
  // );

  const handleToggleItem = (itemId: string) => {
    setItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, checked: !item.checked } : item)));
  };

  return (
    <Container>
      <Safe>
        <Content>
          <Header>
            <Title>Lista de compras</Title>
            <BackButton onPress={onBack}>
              <Icon name="back" size={20} color="#EAEAEA" />
            </BackButton>
          </Header>

          <CategoryList categoriesItems={items} onToggleItem={handleToggleItem} />

          <FabWrap>
            <FAB onPress={onAddProduct} />
          </FabWrap>
        </Content>
      </Safe>
    </Container>
  );
}
