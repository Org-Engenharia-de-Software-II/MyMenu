import { useState } from 'react';
import sc from 'styled-components/native';

import { Button } from '@/app/components/atoms/Button';
import { Dropdown } from '@/app/components/molecules/Dropdown';
import { FormField } from '@/app/components/molecules/FormField';
import { CurvedBackground } from '@/app/components/organisms/CurvedBackground';

type SignUpScreenProps = {
  onSubmit: () => void;
};

const SafeContainer = sc.SafeAreaView`
  flex: 1;
`;

const ScrollContent = sc.ScrollView`
  flex: 1;
`;

const Container = sc.View`
  flex: 1;
  padding: 26px 16px 24px;
  gap: 14px;
`;

const Footer = sc.View`
  margin-top: auto;
  padding-top: 24px;
`;

const goalOptions = [
  { label: 'Quero cozinhar melhor', value: 'cozinhar' },
  { label: 'Quero montar uma dieta', value: 'dieta' },
  { label: 'Quero receitas rápidas', value: 'rapidas' },
];

export function SignUpScreen({ onSubmit }: SignUpScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [goal, setGoal] = useState('');

  return (
    <CurvedBackground>
      <SafeContainer>
        <ScrollContent contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <Container>
            <FormField label="Nome" value={name} onChangeText={setName} />
            <FormField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <FormField label="Senha" value={password} onChangeText={setPassword} secureTextEntry />

            <Dropdown
              label="Objetivo"
              placeholder="Selecione uma opção"
              options={goalOptions}
              value={goal}
              onChange={setGoal}
            />

            <Footer>
              <Button title="Cadastrar" variant="secondary" onPress={onSubmit} />
            </Footer>
          </Container>
        </ScrollContent>
      </SafeContainer>
    </CurvedBackground>
  );
}
