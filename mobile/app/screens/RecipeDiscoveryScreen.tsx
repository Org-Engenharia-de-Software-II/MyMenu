import { useMemo, useState } from 'react';
import sc from 'styled-components/native';

import { Badge } from '@/app/components/atoms/Badge';
import { Icon } from '@/app/components/atoms/Icon';
import { RecipeCard } from '@/app/components/molecules/RecipeCard';
import { FilterBottomSheet } from '@/app/components/organisms/FilterBottomSheet';
import { RecipeScroller } from '@/app/components/organisms/RecipeScroller';

type RecipeDiscoveryScreenProps = {
  onBack: () => void;
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
  font-size: 41px;
  font-weight: 800;
`;

const SearchWrapper = sc.View`
  height: 42px;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  background-color: #ECECEC;
  padding: 0 10px;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const SearchInput = sc.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 14px;
  font-weight: 600;
`;

const FilterRow = sc.ScrollView`
  max-height: 36px;
`;

const FilterContent = sc.View`
  flex-direction: row;
  gap: 8px;
`;

const FilterPress = sc.Pressable``;

const Section = sc.View`
  gap: 10px;
`;

const SectionTitle = sc.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 31px;
  font-weight: 800;
`;

const List = sc.View`
  gap: 10px;
`;

const recipes = [
  {
    id: 'r1',
    title: 'Tacos de frango',
    image:
      'https://images.unsplash.com/photo-1611250188496-e966043a0629?auto=format&fit=crop&w=400&q=60',
    time: '20 minutos',
    difficulty: 'fácil',
  },
  {
    id: 'r2',
    title: 'Carbonara',
    image:
      'https://images.unsplash.com/photo-1608756687911-aa1599ab0386?auto=format&fit=crop&w=400&q=60',
    time: '20 minutos',
    difficulty: 'difícil',
  },
  {
    id: 'r3',
    title: 'Macarrão alho e óleo',
    image:
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=400&q=60',
    time: '20 minutos',
    difficulty: 'médio',
  },
  {
    id: 'r4',
    title: 'Tacos de frango',
    image:
      'https://images.unsplash.com/photo-1611250188496-e966043a0629?auto=format&fit=crop&w=400&q=60',
    time: '20 minutos',
    difficulty: 'fácil',
  },
];

export function RecipeDiscoveryScreen({ onBack }: RecipeDiscoveryScreenProps) {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Rápido/fácil');

  const filters = ['Rápido/fácil', '< 30 Minutos', 'Difíceis'];

  const list = useMemo(
    () =>
      recipes.filter((item) => item.title.toLowerCase().includes(search.toLowerCase().trim())),
    [search],
  );

  return (
    <Container>
      <Safe>
        <Content>
          <Header>
            <Title>Descubra receitas</Title>
            <BackButton onPress={onBack}>
              <Icon name="back" size={20} color="#EAEAEA" />
            </BackButton>
          </Header>

          <SearchWrapper>
            <Icon name="search" size={16} color="#7A7A7A" />
            <SearchInput
              value={search}
              onChangeText={setSearch}
              placeholder="Pesquise por receita, ingrediente..."
              placeholderTextColor="#9A9A9A"
            />
            <FilterPress onPress={() => setShowFilters(true)}>
              <Icon name="filter" size={16} color="#A0A0A0" />
            </FilterPress>
          </SearchWrapper>

          <FilterRow horizontal showsHorizontalScrollIndicator={false}>
            <FilterContent>
              {filters.map((item) => (
                <FilterPress key={item} onPress={() => setActiveFilter(item)}>
                  <Badge text={item} variant={activeFilter === item ? 'activeFilter' : 'filter'} />
                </FilterPress>
              ))}
            </FilterContent>
          </FilterRow>

          <RecipeScroller title="Recomendados para você" recipes={recipes} />

          <Section>
            <SectionTitle>Mais receitas</SectionTitle>
            <List>
              {list.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  horizontal
                  title={recipe.title}
                  image={recipe.image}
                  time={recipe.time}
                  difficulty={recipe.difficulty}
                />
              ))}
            </List>
          </Section>
        </Content>
      </Safe>
      <FilterBottomSheet visible={showFilters} onClose={() => setShowFilters(false)} onApply={() => {}} />
    </Container>
  );
}
