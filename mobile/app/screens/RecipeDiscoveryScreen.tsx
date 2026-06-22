import { useEffect, useMemo, useState } from 'react';
import sc from 'styled-components/native';

import { Badge } from '@/app/components/atoms/Badge';
import { Icon } from '@/app/components/atoms/Icon';
import { RecipeCard } from '@/app/components/molecules/RecipeCard';
import { FilterBottomSheet, RecipeFilters } from '@/app/components/organisms/FilterBottomSheet';
import { RecipeScroller } from '@/app/components/organisms/RecipeScroller';

type Recipe = {
  id: string;
  title: string;
  image: string;
  time: string;
  difficulty: string;
};

type RecipeDiscoveryScreenProps = {
  onBack: () => void;
  recipes: Recipe[];
  isLoading?: boolean;
  errorMessage?: string;
  onRefresh: () => void;
  onViewRecipe: (recipe: Recipe) => void;
};

const defaultAppliedFilters: RecipeFilters = {
  usePantryOnly: false,
  prioritizePantry: false,
  difficulty: null,
  macro: null,
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

const RefreshWrapper = sc.View`
  align-items: flex-start;
`;

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

const FeedbackText = sc.Text`
  color: #575757;
  font-size: 14px;
  font-weight: 600;
`;

const RecipeItem = sc.View`
  gap: 8px;
`;

const ViewRecipeButton = sc.Pressable`
  align-self: flex-start;
`;

const PaginationRow = sc.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const PaginationButton = sc.Pressable<{ $disabled?: boolean }>`
  padding: 6px 10px;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  background-color: ${({ $disabled }) => ($disabled ? '#DCDCDC' : '#ECECEC')};
`;

const PaginationButtonText = sc.Text<{ $disabled?: boolean }>`
  color: ${({ $disabled }) => ($disabled ? '#8E8E8E' : '#2A2A2A')};
  font-size: 13px;
  font-weight: 700;
`;

const PageText = sc.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 13px;
  font-weight: 700;
`;

const normalizeDifficulty = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const pantryKeywords = ['frango', 'carne', 'peixe', 'ovo', 'arroz', 'feijao', 'queijo', 'tomate', 'cebola', 'batata', 'macarrao'];

const getRecipeMinutes = (recipe: Recipe) => {
  const minutes = Number(recipe.time.replace(/\D/g, ''));
  return Number.isFinite(minutes) ? minutes : null;
};

const hasPantryHint = (recipe: Recipe) => {
  const title = normalizeDifficulty(recipe.title);
  return pantryKeywords.some((keyword) => title.includes(keyword));
};

const applyMacroFilter = (items: Recipe[], macro: RecipeFilters['macro']) => {
  if (!macro) {
    return items;
  }

  if (macro === '+ proteína') {
    return items.filter((item) => {
      const title = normalizeDifficulty(item.title);
      return title.includes('frango') || title.includes('carne') || title.includes('peixe') || title.includes('ovo') || title.includes('prote');
    });
  }

  if (macro === '− kcal') {
    return items.filter((item) => {
      const minutes = getRecipeMinutes(item);
      return minutes !== null ? minutes <= 30 : true;
    });
  }

  return items.filter((item) => {
    const title = normalizeDifficulty(item.title);
    return !title.includes('massa') && !title.includes('pao') && !title.includes('arroz');
  });
};
export function RecipeDiscoveryScreen({
  onBack,
  recipes,
  isLoading = false,
  errorMessage,
  onRefresh,
  onViewRecipe,
}: RecipeDiscoveryScreenProps) {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<RecipeFilters>(defaultAppliedFilters);
  const [page, setPage] = useState(1);

  const filters = ['Rápido/fácil', '< 30 Minutos', 'Difíceis'];
  const pageSize = 6;

  const list = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();
    let filtered = recipes.filter((item) => item.title.toLowerCase().includes(searchTerm));

    if (appliedFilters.difficulty) {
      const selectedDifficulty = normalizeDifficulty(appliedFilters.difficulty);
      filtered = filtered.filter((item) => normalizeDifficulty(item.difficulty) === selectedDifficulty);
    }

    if (appliedFilters.usePantryOnly) {
      filtered = filtered.filter(hasPantryHint);
    }

    if (appliedFilters.prioritizePantry) {
      filtered = [...filtered].sort((a, b) => Number(hasPantryHint(b)) - Number(hasPantryHint(a)));
    }

    filtered = applyMacroFilter(filtered, appliedFilters.macro);

    return filtered;
  }, [recipes, search, appliedFilters]);

  const totalPages = Math.max(1, Math.ceil(list.length / pageSize));

  useEffect(() => {
    setPage(1);
  }, [search, recipes, appliedFilters]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const pageStart = (page - 1) * pageSize;
  const paginatedList = list.slice(pageStart, pageStart + pageSize);

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

          {isLoading ? <FeedbackText>Carregando receitas...</FeedbackText> : null}
          {errorMessage ? <FeedbackText>{errorMessage}</FeedbackText> : null}
          {!isLoading && !errorMessage && recipes.length === 0 ? <FeedbackText>Nenhuma receita encontrada.</FeedbackText> : null}

          <FilterRow horizontal showsHorizontalScrollIndicator={false}>
            <FilterContent>
              {filters.map((item) => {
                const isActive =
                  (item === 'Rápido/fácil' && appliedFilters.difficulty === 'Fácil') ||
                  (item === '< 30 Minutos' && appliedFilters.macro === '− kcal') ||
                  (item === 'Difíceis' && appliedFilters.difficulty === 'Difícil');

                return (
                  <FilterPress
                    key={item}
                    onPress={() => {
                      if (item === 'Rápido/fácil') {
                        setAppliedFilters((prev) => ({ ...prev, difficulty: prev.difficulty === 'Fácil' ? null : 'Fácil' }));
                        return;
                      }

                      if (item === '< 30 Minutos') {
                        setAppliedFilters((prev) => ({ ...prev, macro: prev.macro === '− kcal' ? null : '− kcal' }));
                        return;
                      }

                      setAppliedFilters((prev) => ({ ...prev, difficulty: prev.difficulty === 'Difícil' ? null : 'Difícil' }));
                    }}>
                    <Badge text={item} variant={isActive ? 'activeFilter' : 'filter'} />
                  </FilterPress>
                );
              })}
            </FilterContent>
          </FilterRow>

          <RecipeScroller
            title="Recomendados para você"
            recipes={list.slice(0, 10)}
            onPressRecipe={onViewRecipe}
          />

          <Section>
            <SectionTitle>Mais receitas</SectionTitle>
            <RefreshWrapper>
              <FilterPress onPress={() => onRefresh()}>
                <Badge text="Atualizar receitas" variant="activeFilter" />
              </FilterPress>
            </RefreshWrapper>
            <List>
              {paginatedList.map((recipe) => (
                <RecipeItem key={recipe.id}>
                  <RecipeCard
                    horizontal
                    title={recipe.title}
                    image={recipe.image}
                    time={recipe.time}
                    difficulty={recipe.difficulty}
                    onPress={() => onViewRecipe(recipe)}
                  />
                  {/* <ViewRecipeButton onPress={() => onViewRecipe(recipe)}>
                    <Badge text="Visualizar receita" variant="activeFilter" />
                  </ViewRecipeButton> */}
                </RecipeItem>
              ))}
            </List>
            {list.length > pageSize ? (
              <PaginationRow>
                <PaginationButton $disabled={page === 1} onPress={() => setPage((prev) => Math.max(1, prev - 1))}>
                  <PaginationButtonText $disabled={page === 1}>Anterior</PaginationButtonText>
                </PaginationButton>
                <PageText>{`Página ${page} de ${totalPages}`}</PageText>
                <PaginationButton
                  $disabled={page === totalPages}
                  onPress={() => setPage((prev) => Math.min(totalPages, prev + 1))}>
                  <PaginationButtonText $disabled={page === totalPages}>Próxima</PaginationButtonText>
                </PaginationButton>
              </PaginationRow>
            ) : null}
          </Section>
        </Content>
      </Safe>
      <FilterBottomSheet
        visible={showFilters}
        value={appliedFilters}
        onClose={() => setShowFilters(false)}
        onApply={(filtersPayload) => setAppliedFilters(filtersPayload)}
      />
    </Container>
  );
}
