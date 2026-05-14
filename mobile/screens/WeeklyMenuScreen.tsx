import { useState } from 'react';
import sc from 'styled-components/native';

import { FAB } from '@/components/atoms/FAB';
import { Icon } from '@/components/atoms/Icon';
import { WeekDaySelector } from '@/components/molecules/WeekDaySelector';
import { WeeklyRecipeCard } from '@/components/molecules/WeeklyRecipeCard';

type WeeklyMenuScreenProps = {
  onOpenRecipe: () => void;
  onOpenFilters: () => void;
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
  padding: 12px;
  gap: 12px;
`;

const Header = sc.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = sc.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 36px;
  font-weight: 800;
`;

const FilterButton = sc.Pressable`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

const List = sc.View`
  gap: 10px;
`;

const FabWrap = sc.View`
  position: absolute;
  right: 18px;
  bottom: 22px;
`;

const recipes = [
  {
    id: 'wm-1',
    title: 'Tacos de frango',
    image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=500&q=60',
    meta: '20 minutos | fácil',
  },
];

export function WeeklyMenuScreen({ onOpenRecipe, onOpenFilters }: WeeklyMenuScreenProps) {
  const [day, setDay] = useState('SEG');

  return (
    <Container>
      <Safe>
        <Content>
          <Header>
            <Title>Menu semanal</Title>
            <FilterButton onPress={onOpenFilters}>
              <Icon name="filter" size={18} color="#CFCFCF" />
            </FilterButton>
          </Header>
          <WeekDaySelector activeDay={day} onSelectDay={setDay} />
          <List>
            {recipes.map((recipe) => (
              <WeeklyRecipeCard
                key={recipe.id}
                title={recipe.title}
                image={recipe.image}
                meta={recipe.meta}
                onView={onOpenRecipe}
              />
            ))}
          </List>
        </Content>
        <FabWrap>
          <FAB onPress={() => {}} />
        </FabWrap>
      </Safe>
    </Container>
  );
}
