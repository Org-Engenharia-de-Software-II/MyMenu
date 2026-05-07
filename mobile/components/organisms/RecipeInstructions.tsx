import sc from 'styled-components/native';

type RecipeInstructionsProps = {
  steps: string[];
};

const Section = sc.View`
  gap: 8px;
`;

const Title = sc.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 34px;
  font-weight: 800;
`;

const List = sc.View`
  gap: 8px;
`;

const Row = sc.View`
  flex-direction: row;
  gap: 8px;
`;

const Index = sc.Text`
  color: ${({ theme }) => theme.colors.coral};
  font-size: 23px;
  font-weight: 800;
  line-height: 24px;
`;

const Text = sc.Text`
  flex: 1;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 17px;
  line-height: 22px;
  font-weight: 700;
`;

export function RecipeInstructions({ steps }: RecipeInstructionsProps) {
  return (
    <Section>
      <Title>Modo de preparo</Title>
      <List>
        {steps.map((step, index) => (
          <Row key={step}>
            <Index>{index + 1}.</Index>
            <Text>{step}</Text>
          </Row>
        ))}
      </List>
    </Section>
  );
}
