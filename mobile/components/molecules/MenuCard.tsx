import sc from 'styled-components/native';

import { Icon } from '@/components/atoms/Icon';

type MealEntry = {
  period: string;
  meal: string;
};

type MenuCardProps = {
  meals: MealEntry[];
  onPressCatalog: () => void;
};

const Card = sc.View`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.lg}px;
  background-color: #ECECEC;
  padding: 14px;
  gap: 10px;
`;

const Title = sc.Text`
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 26px;
  font-weight: 800;
`;

const Row = sc.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
`;

const TextBlock = sc.View``;

const Period = sc.Text`
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 17px;
  font-weight: 800;
`;

const Meal = sc.Text`
  color: #575757;
  font-size: 15px;
  font-weight: 600;
`;

const Button = sc.Pressable`
  margin-top: 8px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.coral};
  border-radius: ${({ theme }) => theme.radius.sm}px;
  padding: 10px;
  align-items: center;
`;

const ButtonText = sc.Text`
  color: ${({ theme }) => theme.colors.coral};
  font-size: 24px;
  font-weight: 700;
`;

export function MenuCard({ meals, onPressCatalog }: MenuCardProps) {
  return (
    <Card>
      <Title>Menu do dia</Title>
      {meals.map((item) => (
        <Row key={item.period}>
          <Icon name="utensils" size={14} color="#111111" />
          <TextBlock>
            <Period>{item.period}</Period>
            <Meal>{item.meal}</Meal>
          </TextBlock>
        </Row>
      ))}
      <Button onPress={onPressCatalog}>
        <ButtonText>Ver cardápio</ButtonText>
      </Button>
    </Card>
  );
}
