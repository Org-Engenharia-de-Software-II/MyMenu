import { Image } from 'expo-image';
import sc from 'styled-components/native';

import { FAB } from '@/app/components/atoms/FAB';
import { Icon } from '@/app/components/atoms/Icon';
import { RecipeInstructions } from '@/app/components/organisms/RecipeInstructions';

type RecipeDetailScreenProps = {
  onBack: () => void;
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

const ingredients = ['Massa para tacos', 'Peito de frango em cubos', 'Alface', 'Queijo ralado'];

const instructions = [
  'Em uma frigideira, frite os cubos de peito de frango até dourar',
  'Frite a massa na mesma frigideira',
  'Na massa frita, junte o frango, o alface e o queijo',
];

const nutrition = ['550 kcal', '15 g proteína', '50 g carboidrato', '10 g gordura', '5 mg vitamina B'];

export function RecipeDetailScreen({ onBack }: RecipeDetailScreenProps) {
  return (
    <Container>
      <Hero
        source="https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1200&q=60"
        contentFit="cover"
      />
      <BackButton onPress={onBack}>
        <Icon name="back" size={20} color="#FFFFFF" />
      </BackButton>

      <Content>
        <Body>
          <HeaderRow>
            <Title>Tacos de frango</Title>
            <Icon name="back" size={20} color="#E8E8E8" />
          </HeaderRow>

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
        <FAB onPress={() => {}} />
      </FabWrap>
    </Container>
  );
}
