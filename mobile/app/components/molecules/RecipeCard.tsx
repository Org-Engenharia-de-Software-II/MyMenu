import { Image } from 'expo-image';
import sc from 'styled-components/native';

import { Badge } from '@/app/components/atoms/Badge';

type RecipeCardProps = {
  title: string;
  image: string;
  time: string;
  difficulty: string;
  horizontal?: boolean;
};

const Card = sc.View<{ $horizontal: boolean }>`
  width: ${({ $horizontal }) => ($horizontal ? '100%' : '122px')};
  border-radius: ${({ theme }) => theme.radius.sm}px;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  flex-direction: ${({ $horizontal }) => ($horizontal ? 'row' : 'column')};
`;

const RecipeImage = sc(Image)<{ $horizontal: boolean }>`
  width: ${({ $horizontal }) => ($horizontal ? '38%' : '100%')};
  height: ${({ $horizontal }) => ($horizontal ? '100%' : '80px')};
`;

const Content = sc.View`
  flex: 1;
  padding: 8px;
  gap: 6px;
`;

const Title = sc.Text`
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 13px;
  font-weight: 800;
`;

const BadgeRow = sc.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
`;

export function RecipeCard({ title, image, time, difficulty, horizontal = false }: RecipeCardProps) {
  return (
    <Card $horizontal={horizontal}>
      <RecipeImage source={image} contentFit="cover" $horizontal={horizontal} />
      <Content>
        <Title numberOfLines={2}>{title}</Title>
        <BadgeRow>
          <Badge text={time} variant="time" />
          <Badge text={difficulty} variant="difficulty" />
        </BadgeRow>
      </Content>
    </Card>
  );
}
