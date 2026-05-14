import { useMemo, useState } from 'react';
import sc from 'styled-components/native';

import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { InputField } from '@/components/atoms/InputField';
import { Dropdown } from '@/components/molecules/Dropdown';

export type AddProductTarget = 'shopping_list' | 'fridge';

type AddProductScreenProps = {
  target: AddProductTarget;
  onBack: () => void;
  onSaveToShoppingList: (payload: { name: string; productAmount: string; unit: string }) => void;
  onSaveToFridge: (payload: { name: string; productAmount: string; unit: string }) => void;
};

const Container = sc.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Safe = sc.SafeAreaView`
  flex: 1;
`;

const Content = sc.View`
  flex: 1;
  padding: 16px 14px;
  gap: 14px;
`;

const Header = sc.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = sc.Pressable``;

const Title = sc.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 42px;
  font-weight: 800;
`;

const FieldBlock = sc.View`
  gap: 8px;
`;

const Label = sc.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 32px;
  font-weight: 700;
`;

const Footer = sc.View`
  margin-top: auto;
`;

const unitOptions = [
  { label: 'Unidades', value: 'unidades' },
  { label: 'Quilos (kg)', value: 'kg' },
  { label: 'Litros (L)', value: 'l' },
];

export function AddProductScreen({ target, onBack, onSaveToShoppingList, onSaveToFridge }: AddProductScreenProps) {
  const [name, setName] = useState('');
  const [productAmount, setProductAmount] = useState('');
  const [unit, setUnit] = useState('');

  const title = useMemo(
    () => (target === 'shopping_list' ? 'Adicionar à Lista' : 'Adicionar à Geladeira'),
    [target],
  );

  const handleSave = () => {
    const payload = { name, productAmount, unit };
    if (target === 'shopping_list') {
      onSaveToShoppingList(payload);
      return;
    }
    onSaveToFridge(payload);
  };

  return (
    <Container>
      <Safe>
        <Content>
          <Header>
            <Title>{title}</Title>
            <BackButton onPress={onBack}>
              <Icon name="back" size={20} color="#EAEAEA" />
            </BackButton>
          </Header>

          <FieldBlock>
            <Label>Nome do produto</Label>
            <InputField value={name} onChangeText={setName} placeholder="Nome do produto" />
          </FieldBlock>

          <FieldBlock>
            <Label>Quantidade do produto</Label>
            <InputField
              value={productAmount}
              onChangeText={setProductAmount}
              placeholder="Quantidade do produto"
              keyboardType="numeric"
            />
          </FieldBlock>

          <FieldBlock>
            <Label>Quantidade</Label>
            <Dropdown
              label=""
              placeholder="Selecione uma opção"
              options={unitOptions}
              value={unit}
              onChange={setUnit}
            />
          </FieldBlock>

          <Footer>
            <Button title="Adicionar" variant="coral" onPress={handleSave} />
          </Footer>
        </Content>
      </Safe>
    </Container>
  );
}
