import sc from 'styled-components/native';

import { Avatar } from '@/app/components/atoms/Avatar';
import { ProfileMenuList } from '@/app/components/organisms/ProfileMenuList';

const Container = sc.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Safe = sc.SafeAreaView`
  flex: 1;
`;

const Content = sc.View`
  flex: 1;
  padding: 14px;
`;

const Title = sc.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 36px;
  font-weight: 800;
`;

const Center = sc.View`
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 8px;
`;

const Name = sc.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 36px;
  font-weight: 800;
`;

const menuItems = ['Configurações', 'Preferências e restrições', 'Notificações', 'Ajuda', 'Sair'];

export function ProfileScreen() {
  return (
    <Container>
      <Safe>
        <Content>
          <Title>Meu perfil</Title>
          <Center>
            <Avatar size={130} />
            <Name>Usuário</Name>
          </Center>
          <ProfileMenuList items={menuItems} />
        </Content>
      </Safe>
    </Container>
  );
}
