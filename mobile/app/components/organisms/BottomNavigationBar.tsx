import sc from 'styled-components/native';

import { Icon } from '@/app/components/atoms/Icon';

type TabId = 'home' | 'menu' | 'profile' | 'fridge';

type BottomNavigationBarProps = {
  activeTab: TabId;
  onChangeTab: (tab: TabId) => void;
};

const Container = sc.View`
  width: 100%;
  padding: 10px 12px 12px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
`;

const Row = sc.View`
  flex-direction: row;
  justify-content: space-between;
`;

const TabButton = sc.Pressable`
  width: 24%;
  align-items: center;
  gap: 4px;
`;

const TabText = sc.Text<{ $active: boolean }>`
  color: ${({ theme, $active }) => ($active ? theme.colors.coral : '#8B8B8B')};
  font-size: 12px;
  font-weight: ${({ $active }) => ($active ? 700 : 600)};
`;

const tabs: { id: TabId; label: string; icon: 'home' | 'menu' | 'profile' | 'fridge' }[] = [
  { id: 'home', label: 'Início', icon: 'home' },
  { id: 'menu', label: 'Menu', icon: 'menu' },
  { id: 'profile', label: 'Perfil', icon: 'profile' },
  { id: 'fridge', label: 'Geladeira', icon: 'fridge' },
];

export function BottomNavigationBar({ activeTab, onChangeTab }: BottomNavigationBarProps) {
  return (
    <Container>
      <Row>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <TabButton key={tab.id} onPress={() => onChangeTab(tab.id)}>
              <Icon name={tab.icon} size={18} color={isActive ? '#FF6B6B' : '#8B8B8B'} />
              <TabText $active={isActive}>{tab.label}</TabText>
            </TabButton>
          );
        })}
      </Row>
    </Container>
  );
}
