import { Image } from 'expo-image';
import sc from 'styled-components/native';

import { Icon } from '@/app/components/atoms/Icon';

type WeeklyRecipeCardProps = {
  title: string;
  image: string;
  meta: string;
  onView?: () => void;
  onDelete?: () => void;
};

const Card = sc.View`
  width: 100%;
  border-radius: 8px;
  background-color: #FFFFFF;
  flex-direction: row;
  overflow: hidden;
`;

const Thumb = sc(Image)`
  width: 96px;
  height: 64px;
`;

const Body = sc.View`
  flex: 1;
  padding: 8px;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
`;

const Texts = sc.View`
  gap: 5px;
  flex: 1;
`;

const Title = sc.Text`
  color: #1E1E1E;
  font-size: 16px;
  font-weight: 800;
`;

const Meta = sc.Text`
  color: #9A9A9A;
  font-size: 12px;
  font-weight: 600;
`;

const Actions = sc.View`
  align-items: center;
  justify-content: space-between;
`;

const ActionButton = sc.Pressable`
  width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
`;

export function WeeklyRecipeCard({ title, image, meta, onDelete, onView }: WeeklyRecipeCardProps) {
  return (
    <Card>
      <Thumb source={image} contentFit="cover" />
      <Body>
        <Texts>
          <Title>{title}</Title>
          <Meta>{meta}</Meta>
        </Texts>
        <Actions>
          <ActionButton onPress={onView}>
            <Icon name="eye" size={14} color="#1E1E1E" />
          </ActionButton>
          <ActionButton onPress={onDelete}>
            <Icon name="trash" size={14} color="#1E1E1E" />
          </ActionButton>
        </Actions>
      </Body>
    </Card>
  );
}
