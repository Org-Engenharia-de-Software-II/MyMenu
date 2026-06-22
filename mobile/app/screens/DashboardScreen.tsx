import sc from 'styled-components/native';

import { Icon } from '@/app/components/atoms/Icon';
import { MenuCard } from '@/app/components/molecules/MenuCard';

type MealEntry = {
  period: string;
  meal: string;
};

type DashboardScreenProps = {
  onOpenShoppingList: () => void;
  onOpenRecipes: () => void;
  onOpenWeeklyMenu: () => void;
  onGenerateWeeklyMenu: () => void;
  menuMeals: MealEntry[];
  isGeneratingMenu?: boolean;
  menuError?: string;
};

const Container = sc.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Safe = sc.SafeAreaView`
  flex: 1;
`;

const Scroll = sc.ScrollView`
  flex: 1;
`;

const Content = sc.View`
  padding: 14px;
  gap: 12px;
`;

const Header = sc.View`
  gap: 2px;
`;

const Title = sc.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 44px;
  font-weight: 800;
`;

const Subtitle = sc.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
  font-weight: 600;
`;

const ActionRow = sc.View`
  flex-direction: row;
  gap: 10px;
`;

const ActionCard = sc.Pressable`
  flex: 1;
  background-color: #EFEFEF;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const ActionText = sc.Text`
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 13px;
  font-weight: 700;
  text-align: center;
`;

const CTA = sc.Pressable`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  padding: 10px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.coral};
`;

const CTAText = sc.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 30px;
  font-weight: 800;
`;

const SectionTitle = sc.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 31px;
  font-weight: 800;
`;

const ActivityList = sc.View`
  gap: 8px;
`;

const ActivityMeta = sc.View``;

const ActivityItem = sc.View`
  border-radius: ${({ theme }) => theme.radius.sm}px;
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 10px;
  flex-direction: row;
  gap: 8px;
`;

const ActivityTitle = sc.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-weight: 700;
`;

const ActivityTime = sc.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
`;

const ErrorText = sc.Text`
  color: #ffb4b4;
  font-size: 13px;
  font-weight: 600;
`;

export function DashboardScreen({
  onOpenShoppingList,
  onOpenRecipes,
  onOpenWeeklyMenu,
  onGenerateWeeklyMenu,
  menuMeals,
  isGeneratingMenu = false,
  menuError,
}: DashboardScreenProps) {

  return (
    <Container>
      <Safe>
        <Scroll>
          <Content>
            <Header>
              <Title>Olá, Murilo!</Title>
              <Subtitle>Preparado para organizar a semana?</Subtitle>
            </Header>

            <MenuCard meals={menuMeals} onPressCatalog={onOpenWeeklyMenu} />

            <ActionRow>
              <ActionCard onPress={onOpenShoppingList}>
                <Icon name="list" size={24} color="#1A1A1A" />
                <ActionText>Lista de compras</ActionText>
              </ActionCard>
              <ActionCard onPress={onOpenRecipes}>
                <Icon name="search" size={24} color="#1A1A1A" />
                <ActionText>Descobrir receitas</ActionText>
              </ActionCard>
              {/* <ActionCard onPress={onOpenWeeklyMenu}>
                <Icon name="calendar" size={24} color="#1A1A1A" />
                <ActionText>Menu semanal</ActionText>
              </ActionCard> */}
            </ActionRow>

            <CTA onPress={onGenerateWeeklyMenu}>
              <CTAText>{isGeneratingMenu ? 'Gerando cardápio...' : 'Gerar cardápio semanal'}</CTAText>
            </CTA>
            {menuError ? <ErrorText>{menuError}</ErrorText> : null}

            <SectionTitle>Atividades recentes</SectionTitle>
            <ActivityList>
              <ActivityItem>
                <Icon name="check" size={14} color="#39D98A" />
                <ActivityMeta>
                  <ActivityTitle>Compra realizada</ActivityTitle>
                  <ActivityTime>2 horas atrás</ActivityTime>
                </ActivityMeta>
              </ActivityItem>

              <ActivityItem>
                <Icon name="check" size={14} color="#39D98A" />
                <ActivityMeta>
                  <ActivityTitle>Nova receita descoberta</ActivityTitle>
                  <ActivityTime>Ontem</ActivityTime>
                </ActivityMeta>
              </ActivityItem>
            </ActivityList>
          </Content>
        </Scroll>
      </Safe>
    </Container>
  );
}
