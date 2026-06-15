import sc from 'styled-components/native';

import { FAB } from '@/app/components/atoms/FAB';
import { Icon } from '@/app/components/atoms/Icon';
import { CategoryList } from '@/app/components/organisms/CategoryList';

type Item = {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
  category: string;
};

type Session = {
  userId: number;
  listId: number;
  name: string;
};

type ShoppingListScreenProps = {
  onBack: () => void;
  onAddProduct: () => void;
  onRefresh: (sessionData?: Session) => void;
  onToggleItem: (itemId: string) => void;
  isLoading?: boolean;
  errorMessage?: string;
  items: Item[];
};

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

const ErrorText = sc.Text`
  color: #ffb4b4;
  font-size: 14px;
  font-weight: 600;
`;

const RefreshButton = sc.Pressable`
  align-self: flex-start;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  padding: 6px 10px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const RefreshText = sc.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-weight: 700;
`;

const ListScroll = sc.ScrollView`
  flex: 1;
`;

export function ShoppingListScreen({ onBack, onAddProduct, onRefresh, onToggleItem, isLoading = false, errorMessage, items }: ShoppingListScreenProps) {

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

          <RefreshButton onPress={() => onRefresh()}>
            <RefreshText>{isLoading ? 'Atualizando...' : 'Sincronizar'}</RefreshText>
          </RefreshButton>

          {errorMessage ? <ErrorText>{errorMessage}</ErrorText> : null}

          <ListScroll showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>
            <CategoryList categoriesItems={items} onToggleItem={onToggleItem} />
          </ListScroll>

          <FabWrap>
            <FAB onPress={onAddProduct} />
          </FabWrap>
        </Content>
      </Safe>
    </Container>
  );
}
