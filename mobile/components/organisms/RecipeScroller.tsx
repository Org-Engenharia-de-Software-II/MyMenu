import sc from 'styled-components/native';

import { RecipeCard } from '@/components/molecules/RecipeCard';

type Recipe = {
  id: string;
  title: string;
  image: string;
  time: string;
  difficulty: string;
};

type RecipeScrollerProps = {
  title: string;
  recipes: Recipe[];
};

const Container = sc.View`
  gap: 10px;
`;

const Title = sc.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 30px;
  font-weight: 800;
`;

const Horizontal = sc.ScrollView`
  width: 100%;
`;

const Row = sc.View`
  flex-direction: row;
  gap: 10px;
`;

export function RecipeScroller({ title, recipes }: RecipeScrollerProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Horizontal horizontal showsHorizontalScrollIndicator={false}>
        <Row>
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              time={recipe.time}
              difficulty={recipe.difficulty}
            />
          ))}
        </Row>
      </Horizontal>
    </Container>
  );
}
