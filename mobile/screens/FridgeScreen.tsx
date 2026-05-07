import { useState } from 'react';
import sc from 'styled-components/native';

import { Icon } from '@/components/atoms/Icon';
import { ShoppingListItem } from '@/components/molecules/ShoppingListItem';

type FridgeScreenProps = {
  onAddProduct: () => void;
};

const Container = sc.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Safe = sc.SafeAreaView`
  flex: 1;
`;

const Content = sc.ScrollView`
  flex: 1;
  padding: 10px;
`;

const Card = sc.View`
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 14px;
  gap: 12px;
`;

const Header = sc.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AddButton = sc.Pressable``;

const Title = sc.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 30px;
  font-weight: 800;
`;

const Category = sc.View`
  gap: 8px;
`;

const CategoryTitle = sc.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 28px;
  font-weight: 800;
`;

const List = sc.View`
  gap: 8px;
`;

type Item = {
  id: string;
  name: string;
  quantity: string;
  expiresIn: string;
};

export function FridgeScreen({ onAddProduct }: FridgeScreenProps) {
  const [fruits, setFruits] = useState<Item[]>([
    { id: 'f1', name: 'Tomates', quantity: '3 unidades', expiresIn: 'vemce em: 7 dias' },
    { id: 'f2', name: 'Cenoura', quantity: '2 unidades', expiresIn: 'vemce em: 3 dias' },
  ]);
  const [meats, setMeats] = useState<Item[]>([
    { id: 'm1', name: 'Peito de frango', quantity: '1,5 kg', expiresIn: 'vemce em: 2 dias' },
    { id: 'm2', name: 'Costela bovina moída', quantity: '2 kg', expiresIn: 'vemce em: 1 semana' },
  ]);

  const removeFruit = (id: string) => setFruits((prev) => prev.filter((item) => item.id !== id));
  const removeMeat = (id: string) => setMeats((prev) => prev.filter((item) => item.id !== id));

  return (
    <Container>
      <Safe>
        <Content>
          <Card>
            <Header>
              <Title>Minha geladeira</Title>
              <AddButton onPress={onAddProduct}>
                <Icon name="plus" size={20} color="#FFFFFF" />
              </AddButton>
            </Header>

            <Category>
              <CategoryTitle>Frutas e vegetais</CategoryTitle>
              <List>
                {fruits.map((item) => (
                  <ShoppingListItem
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    expiresIn={`${item.quantity} | ${item.expiresIn}`}
                    darkCard={false}
                    showCheckbox={false}
                    onDelete={() => removeFruit(item.id)}
                  />
                ))}
              </List>
            </Category>

            <Category>
              <CategoryTitle>Carnes</CategoryTitle>
              <List>
                {meats.map((item) => (
                  <ShoppingListItem
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    expiresIn={`${item.quantity} | ${item.expiresIn}`}
                    darkCard={false}
                    showCheckbox={false}
                    onDelete={() => removeMeat(item.id)}
                  />
                ))}
              </List>
            </Category>
          </Card>
        </Content>
      </Safe>
    </Container>
  );
}
