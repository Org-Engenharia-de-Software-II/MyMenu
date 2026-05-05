import sc from 'styled-components/native';

import { Button } from '@/components/atoms/Button';
import { Title } from '@/components/atoms/Typography';
import { CurvedBackground } from '@/components/organisms/CurvedBackground';

type WelcomeScreenProps = {
  onPressEnter: () => void;
  onPressSignUp: () => void;
};

const SafeContainer = sc.SafeAreaView`
  flex: 1;
`;

const Content = sc.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const LogoContainer = sc.View`
  align-items: center;
  gap: 24px;
`;

const BasketIcon = sc.View`
  width: 88px;
  height: 64px;
  border-width: 4px;
  border-color: ${({ theme }) => theme.colors.white};
  border-radius: 14px;
  position: relative;
`;

const BasketHandle = sc.View`
  position: absolute;
  width: 34px;
  height: 12px;
  border-width: 4px;
  border-color: ${({ theme }) => theme.colors.white};
  border-bottom-width: 0px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  top: -14px;
  left: 25px;
`;

const Divider = sc.View`
  position: absolute;
  width: 70px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  top: 16px;
  left: 5px;
`;

const Footer = sc.View`
  width: 100%;
  margin-top: auto;
  gap: 12px;
`;

export function WelcomeScreen({ onPressEnter, onPressSignUp }: WelcomeScreenProps) {
  return (
    <CurvedBackground>
      <SafeContainer>
        <Content>
          <LogoContainer>
            <BasketIcon>
              <BasketHandle />
              <Divider />
            </BasketIcon>
            <Title>MyMenu</Title>
          </LogoContainer>

          <Footer>
            <Button title="Entrar" variant="primary" onPress={onPressEnter} />
            <Button title="Cadastrar" variant="secondary" onPress={onPressSignUp} />
          </Footer>
        </Content>
      </SafeContainer>
    </CurvedBackground>
  );
}
