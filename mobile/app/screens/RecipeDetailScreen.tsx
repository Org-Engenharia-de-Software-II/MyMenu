import { Image } from 'expo-image';
import { useState } from 'react';
import sc from 'styled-components/native';

import { FAB } from '@/app/components/atoms/FAB';
import { Icon } from '@/app/components/atoms/Icon';
import { Dropdown } from '@/app/components/molecules/Dropdown';
import { RecipeInstructions } from '@/app/components/organisms/RecipeInstructions';

type Recipe = {
  id: string;
  title: string;
  image: string;
  time: string;
  difficulty: string;
};

type RecipeDetailScreenProps = {
  onBack: () => void;
  recipe?: Recipe | null;
  onAddToMenu?: (recipe: Recipe, day: string) => void;
  isAddingToMenu?: boolean;
  addToMenuError?: string;
};

const Container = sc.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Hero = sc(Image)`
  width: 100%;
  height: 230px;
`;

const BackButton = sc.Pressable`
  position: absolute;
  top: 52px;
  left: 16px;
  width: 34px;
  height: 34px;
  border-radius: 17px;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Content = sc.ScrollView`
  flex: 1;
  margin-top: -18px;
  border-top-left-radius: 22px;
  border-top-right-radius: 22px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Body = sc.View`
  padding: 14px;
  gap: 12px;
  padding-bottom: 92px;
`;

const HeaderRow = sc.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = sc.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 38px;
  font-weight: 800;
`;

const SectionTitle = sc.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 34px;
  font-weight: 800;
`;

const BulletList = sc.View`
  gap: 2px;
`;

const Bullet = sc.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 22px;
  font-weight: 700;
`;

const FabWrap = sc.View`
  position: absolute;
  right: 18px;
  bottom: 30px;
`;

const ErrorText = sc.Text`
  color: #b54848;
  font-size: 14px;
  font-weight: 700;
`;

const HelpText = sc.Text`
  color: #575757;
  font-size: 14px;
  font-weight: 600;
`;

const ingredients = ['Massa para tacos', 'Peito de frango em cubos', 'Alface', 'Queijo ralado'];

const instructions = [
  'Em uma frigideira, frite os cubos de peito de frango até dourar',
  'Frite a massa na mesma frigideira',
  'Na massa frita, junte o frango, o alface e o queijo',
];

const nutrition = ['550 kcal', '15 g proteína', '50 g carboidrato', '10 g gordura', '5 mg vitamina B'];

export function RecipeDetailScreen({ onBack, recipe, onAddToMenu, isAddingToMenu = false, addToMenuError }: RecipeDetailScreenProps) {
  const [selectedDay, setSelectedDay] = useState('');
  const heroImage = recipe?.image ?? 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1200&q=60';
  const title = recipe?.title ?? 'Tacos de frango';
  const dayOptions = [
    { label: 'Segunda-feira', value: 'SEG' },
    { label: 'Terça-feira', value: 'TER' },
    { label: 'Quarta-feira', value: 'QUA' },
    { label: 'Quinta-feira', value: 'QUI' },
    { label: 'Sexta-feira', value: 'SEX' },
    { label: 'Sábado', value: 'SAB' },
    { label: 'Domingo', value: 'DOM' },
  ];

  return (
    <Container>
      <Hero
        source={heroImage}
        contentFit="cover"
      />
      <BackButton onPress={onBack}>
        <Icon name="back" size={20} color="#FFFFFF" />
      </BackButton>

      <Content>
        <Body>
          <HeaderRow>
            <Title>{title}</Title>
            {recipe && onAddToMenu ? <Icon name="plus" size={20} color="#E8E8E8" /> : null}
          </HeaderRow>

          {addToMenuError ? <ErrorText>{addToMenuError}</ErrorText> : null}

          <Dropdown
            label="Dia para adicionar ao cardápio"
            placeholder="Selecione o dia"
            options={dayOptions}
            value={selectedDay}
            onChange={setSelectedDay}
          />
          <HelpText>Escolha o dia antes de salvar a receita no cardápio.</HelpText>

          <SectionTitle>Ingredientes</SectionTitle>
          <BulletList>
            {ingredients.map((item) => (
              <Bullet key={item}>• {item}</Bullet>
            ))}
          </BulletList>

          <RecipeInstructions steps={instructions} />

          <SectionTitle>Tabela nutricional</SectionTitle>
          <BulletList>
            {nutrition.map((item) => (
              <Bullet key={item}>• {item}</Bullet>
            ))}
            <Bullet>• ...</Bullet>
          </BulletList>
        </Body>
      </Content>

      <FabWrap>
        <FAB
          onPress={() => {
            if (recipe && onAddToMenu && selectedDay) {
              onAddToMenu(recipe, selectedDay);
            }
          }}
          disabled={!recipe || !onAddToMenu || !selectedDay || isAddingToMenu}
        />
      </FabWrap>
    </Container>
  );
}
