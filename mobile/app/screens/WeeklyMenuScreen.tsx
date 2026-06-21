import { useCallback, useEffect, useState } from 'react';
import sc from 'styled-components/native';

import { FAB } from '@/app/components/atoms/FAB';
import { Icon } from '@/app/components/atoms/Icon';
import { WeekDaySelector } from '@/app/components/molecules/WeekDaySelector';
import { WeeklyRecipeCard } from '@/app/components/molecules/WeeklyRecipeCard';

type CardapioItem = {
  id: number;
  dataInicio: string;
  dataFim: string;
  itensCardapio: {
    id: number;
    receita: {
      id: number;
      nome: string;
      imagemUrl?: string;
    };
    diaDaSemana: string;
    tipoRefeicao: string;
  }[];
};

type WeeklyMenuScreenProps = {
  userId: number;
  apiBaseUrl: string;
  onOpenFilters?: () => void;
  onGenerateMenu?: () => void;
  onViewDetails?: (receita: {
    id: string;
    title: string;
    image: string;
    time: string;
    difficulty: string;
  }) => void;
  onBack?: () => void;
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

const List = sc.ScrollView`
  gap: 10px;
`;

const ListContent = sc.View`
  gap: 10px;
`;

const FabWrap = sc.View`
  position: absolute;
  right: 18px;
  bottom: 22px;
`;

const LoadingText = sc.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
`;

const ErrorText = sc.Text`
  color: #ffb4b4;
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
`;

const EmptyState = sc.View`
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  gap: 12px;
`;

const EmptyIcon = sc.Text`
  font-size: 48px;
`;

const EmptyTitle = sc.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 18px;
  font-weight: 700;
`;

const EmptyDescription = sc.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  text-align: center;
`;

const GenerateButton = sc.Pressable`
  background-color: ${({ theme }) => theme.colors.coral};
  border-radius: 8px;
  padding: 12px 24px;
  margin-top: 12px;
`;

const GenerateButtonText = sc.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;

const BackButton = sc.Pressable``;

export function WeeklyMenuScreen({
  userId,
  apiBaseUrl,
  onOpenFilters,
  onGenerateMenu,
  onViewDetails,
  onBack
}: WeeklyMenuScreenProps) {
  const [day, setDay] = useState('SEG');
  const [cardapios, setCardapios] = useState<CardapioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCardapios = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${apiBaseUrl}/usuarios/${userId}/cardapio`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Falha ao carregar cardápios.');
      }
      const data = await response.json();
      setCardapios(
        Array.isArray(data)
          ? [...data].sort((a, b) => new Date(b.dataInicio ?? 0).getTime() - new Date(a.dataInicio ?? 0).getTime())
          : []
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar cardápios.');
    } finally {
      setIsLoading(false);
    }
  }, [apiBaseUrl, userId]);

  useEffect(() => {
    loadCardapios();
  }, [loadCardapios]);

  const getRecipesForDay = (cardapio: CardapioItem) => {
    return cardapio.itensCardapio
      .filter((item) => item.diaDaSemana?.substring(0, 3).toUpperCase() === day)
      .map((item) => ({
        itemId: item.id,
        cardapioId: cardapio.id,
        id: `${cardapio.id}-${item.id}`,
        title: item.receita.nome,
        image: item.receita.imagemUrl || 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=60',
        meta: item.tipoRefeicao,
        difficulty: item.tipoRefeicao,
        time: item.diaDaSemana,
        recipe: {
          id: String(item.receita.id),
          title: item.receita.nome,
          image: item.receita.imagemUrl || 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=60',
          time: item.tipoRefeicao,
          difficulty: item.diaDaSemana,
        },
      }));
  };

  const handleGenerateMenu = async () => {
    if (onGenerateMenu) {
      onGenerateMenu();
    }
  };

  const handleDeleteItem = async (cardapioId: number, itemId: number) => {
    try {
      const response = await fetch(`${apiBaseUrl}/usuarios/${userId}/cardapio/${cardapioId}/itens/${itemId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Falha ao remover item do cardápio.');
      }
      await loadCardapios();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao remover item do cardápio.');
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Safe>
          <Content>
            <Header>
              <Title>Menu semanal</Title>
               <BackButton onPress={onBack}>
                  <Icon name="back" size={20} color="#EAEAEA" />
                </BackButton>
              <FilterButton onPress={onOpenFilters}>
                <Icon name="filter" size={18} color="#CFCFCF" />
              </FilterButton>
            </Header>
            <LoadingText>Carregando cardápios...</LoadingText>
          </Content>
        </Safe>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Safe>
          <Content>
            <Header>
            <BackButton onPress={onBack}>
                  <Icon name="back" size={20} color="#EAEAEA" />
            </BackButton>
              <Title>Menu semanal</Title>
              <FilterButton onPress={onOpenFilters}>
                <Icon name="filter" size={18} color="#CFCFCF" />
              </FilterButton>
            </Header>
            <ErrorText>{error}</ErrorText>
          </Content>
        </Safe>
      </Container>
    );
  }

  if (cardapios.length === 0) {
    return (
      <Container>
        <Safe>
          <Content>
            <Header>
            <BackButton onPress={onBack}>
                  <Icon name="back" size={20} color="#EAEAEA" />
            </BackButton>
              <Title>Menu semanal</Title>
              <FilterButton onPress={onOpenFilters}>
                <Icon name="filter" size={18} color="#CFCFCF" />
              </FilterButton>
            </Header>
            <EmptyState>
              <EmptyIcon>📋</EmptyIcon>
              <EmptyTitle>Nenhum cardápio gerado</EmptyTitle>
              <EmptyDescription>Crie seu primeiro cardápio semanal com um clique</EmptyDescription>
              <GenerateButton onPress={handleGenerateMenu}>
                <GenerateButtonText>Gerar Cardápio</GenerateButtonText>
              </GenerateButton>
            </EmptyState>
          </Content>
        </Safe>
        <FabWrap>
          <FAB onPress={handleGenerateMenu} />
        </FabWrap>
      </Container>
    );
  }

  return (
    <Container>
      <Safe>
        <Content>
          <Header>
          <BackButton onPress={onBack}>
                  <Icon name="back" size={20} color="#EAEAEA" />
            </BackButton>
            <Title>Menu semanal</Title>
            <FilterButton onPress={onOpenFilters}>
              <Icon name="filter" size={18} color="#CFCFCF" />
            </FilterButton>
          </Header>
          <WeekDaySelector activeDay={day} onSelectDay={setDay} />
          <List>
            <ListContent>
              {
                getRecipesForDay(cardapios[0]).map((recipe) => (
                  <WeeklyRecipeCard
                    key={recipe.id}
                    title={recipe.title}
                    image={recipe.image}
                    meta={recipe.meta}
                    onView={() => {
                      if (onViewDetails) {
                        onViewDetails(recipe.recipe);
                      }
                    }}
                    onDelete={() => handleDeleteItem(recipe.cardapioId, recipe.itemId)}
                  />
                ))
              }
              
            </ListContent>
          </List>
        </Content>
        <FabWrap>
          <FAB onPress={handleGenerateMenu} />
        </FabWrap>
      </Safe>
    </Container>
  );
}
