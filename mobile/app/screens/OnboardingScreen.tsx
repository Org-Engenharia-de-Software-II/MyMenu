import { useState } from 'react';
import sc from 'styled-components/native';

import { Button } from '@/app/components/atoms/Button';
import { Input } from '@/app/components/atoms/Input';
import { Label, Subtitle } from '@/app/components/atoms/Typography';
import { PillGroup } from '@/app/components/molecules/PillGroup';
import { CurvedBackground } from '@/app/components/organisms/CurvedBackground';

const SafeContainer = sc.SafeAreaView`
  flex: 1;
`;

const ScrollContent = sc.ScrollView`
  flex: 1;
`;

const Container = sc.View`
  flex: 1;
  padding: 26px 16px 24px;
  gap: 18px;
`;

const Footer = sc.View`
  margin-top: auto;
  padding-top: 12px;
  gap: 10px;
`;

const ErrorText = sc.Text`
  color: #ffb4b4;
  font-size: 14px;
  font-weight: 600;
`;

const restrictionOptions = [
  { label: 'Glúten', value: 'gluten' },
  { label: 'Lactose', value: 'lactose' },
  { label: 'Vegetariano', value: 'vegetariano' },
  { label: 'Vegano', value: 'vegano' },
];

const dietOptions = [
  { label: 'Balanceada', value: 'balanceada' },
  { label: 'Low carb', value: 'low_carb' },
  { label: 'Ganho de massa', value: 'ganho_massa' },
  { label: 'Sem dieta específica', value: 'sem_dieta' },
];

type OnboardingPayload = {
  dietaEspecifica: string;
  restricoes: string[];
  ingredientesEvitados: string[];
};

type OnboardingScreenProps = {
  onFinish: (payload: OnboardingPayload) => void;
  isLoading?: boolean;
  errorMessage?: string;
};

export function OnboardingScreen({ onFinish, isLoading = false, errorMessage }: OnboardingScreenProps) {
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [diet, setDiet] = useState<string[]>([]);
  const [avoidedIngredients, setAvoidedIngredients] = useState('');

  const handleToggleRestrictions = (value: string) => {
    setRestrictions((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  const handleToggleDiet = (value: string) => {
    setDiet([value]);
  };

  const handleFinish = () => {
    onFinish({
      dietaEspecifica: diet[0] ?? '',
      restricoes: restrictions,
      ingredientesEvitados: avoidedIngredients
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    });
  };

  return (
    <CurvedBackground>
      <SafeContainer>
        <ScrollContent contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <Container>
            <Subtitle>Para começar, nos conte um pouco sobre você</Subtitle>

            <PillGroup
              title="Possui alguma restrição?"
              options={restrictionOptions}
              selectedValues={restrictions}
              onToggle={handleToggleRestrictions}
            />

            <PillGroup
              title="Procura alguma dieta específica?"
              options={dietOptions}
              selectedValues={diet}
              onToggle={handleToggleDiet}
            />

            <Label>Ingredientes que prefere evitar</Label>
            <Input
              value={avoidedIngredients}
              onChangeText={setAvoidedIngredients}
              placeholder="Ex: Ovo, batata doce, etc..."
            />

            <Footer>
              {errorMessage ? <ErrorText>{errorMessage}</ErrorText> : null}
              <Button title={isLoading ? 'Salvando...' : 'Finalizar'} variant="secondary" onPress={handleFinish} />
            </Footer>
          </Container>
        </ScrollContent>
      </SafeContainer>
    </CurvedBackground>
  );
}
