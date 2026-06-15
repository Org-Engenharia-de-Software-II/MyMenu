import { useState } from 'react';
import sc from 'styled-components/native';

import { Button } from '@/app/components/atoms/Button';
import { Dropdown } from '@/app/components/molecules/Dropdown';
import { FormField } from '@/app/components/molecules/FormField';
import { CurvedBackground } from '@/app/components/organisms/CurvedBackground';

type SignUpPayload = {
  name: string;
  email: string;
  password: string;
  goal: string;
};

type SignUpScreenProps = {
  mode: 'signup' | 'login';
  onSubmit: (payload: SignUpPayload) => void;
  onBack: () => void;
  isLoading?: boolean;
  errorMessage?: string;
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
  gap: 10px;
`;

const ErrorText = sc.Text`
  color: #ffb4b4;
  font-size: 14px;
  font-weight: 600;
`;

const goalOptions = [
  { label: 'Quero cozinhar melhor', value: 'cozinhar' },
  { label: 'Quero montar uma dieta', value: 'dieta' },
  { label: 'Quero receitas rápidas', value: 'rapidas' },
];

export function SignUpScreen({ mode, onSubmit, onBack, isLoading = false, errorMessage }: SignUpScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [goal, setGoal] = useState(goalOptions[0].value);

  const isSignUp = mode === 'signup';

  const handleSubmit = () => {
    onSubmit({
      name,
      email,
      password,
      goal,
    });
  };

  return (
    <CurvedBackground>
      <SafeContainer>
        <ScrollContent contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <Container>
            {isSignUp ? <FormField label="Nome" value={name} onChangeText={setName} /> : null}
            <FormField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <FormField label="Senha" value={password} onChangeText={setPassword} secureTextEntry />

            {isSignUp ? (
              <Dropdown
                label="Objetivo"
                placeholder="Selecione uma opção"
                options={goalOptions}
                value={goal}
                onChange={setGoal}
              />
            ) : null}

            <Footer>
              {errorMessage ? <ErrorText>{errorMessage}</ErrorText> : null}
              <Button
                title={isLoading ? 'Carregando...' : isSignUp ? 'Cadastrar' : 'Entrar'}
                variant="secondary"
                onPress={handleSubmit}
              />
              <Button title="Voltar" variant="primary" onPress={onBack} />
            </Footer>
          </Container>
        </ScrollContent>
      </SafeContainer>
    </CurvedBackground>
  );
}
