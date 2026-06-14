import { useState } from 'react';
import { Modal } from 'react-native';
import sc from 'styled-components/native';

import { SliderTrack } from '@/app/components/atoms/SliderTrack';
import { Switch } from '@/app/components/atoms/Switch';
import { FilterPill } from '@/app/components/molecules/FilterPill';

type FilterBottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  onApply: () => void;
};

const Overlay = sc.Pressable`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Sheet = sc.Pressable`
  width: 100%;
  background-color: #F7F7F7;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  padding: 14px;
  gap: 12px;
`;

const Header = sc.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = sc.Text`
  color: #1D1D1D;
  font-size: 40px;
  font-weight: 800;
`;

const Clear = sc.Pressable``;

const ClearText = sc.Text`
  color: ${({ theme }) => theme.colors.coral};
  font-size: 25px;
  font-weight: 800;
`;

const Section = sc.View`
  gap: 8px;
`;

const SectionTitle = sc.Text`
  color: #1D1D1D;
  font-size: 24px;
  font-weight: 800;
`;

const RowBetween = sc.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Hint = sc.Text`
  color: #777777;
  font-size: 18px;
  font-weight: 700;
`;

const PillRow = sc.View`
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
`;

const ApplyButton = sc.Pressable`
  width: 100%;
  min-height: 40px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.coral};
`;

const ApplyText = sc.Text`
  color: #FFFFFF;
  font-size: 32px;
  font-weight: 800;
`;

export function FilterBottomSheet({ visible, onClose, onApply }: FilterBottomSheetProps) {
  const [usePantryOnly, setUsePantryOnly] = useState(true);
  const [prioritizePantry, setPrioritizePantry] = useState(true);
  const [difficulty, setDifficulty] = useState('Difícil');
  const [macro, setMacro] = useState('+ proteína');

  const handleClear = () => {
    setUsePantryOnly(false);
    setPrioritizePantry(false);
    setDifficulty('Fácil');
    setMacro('+ proteína');
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Overlay onPress={onClose}>
        <Sheet onPress={() => {}}>
          <Header>
            <Title>Filtros</Title>
            <Clear onPress={handleClear}>
              <ClearText>limpar</ClearText>
            </Clear>
          </Header>

          <Section>
            <SectionTitle>Use minha dispensa</SectionTitle>
            <RowBetween>
              <Hint>Apenas o que eu tiver</Hint>
              <Switch value={usePantryOnly} onValueChange={setUsePantryOnly} />
            </RowBetween>
            <RowBetween>
              <Hint>Priorize o que eu tiver</Hint>
              <Switch value={prioritizePantry} onValueChange={setPrioritizePantry} />
            </RowBetween>
          </Section>

          <Section>
            <SectionTitle>Custo estimado</SectionTitle>
            <SliderTrack valueLabel="Até:" minLabel="R$ 0" maxLabel="R$ 999" />
          </Section>

          <Section>
            <SectionTitle>Tempo estimado</SectionTitle>
            <SliderTrack valueLabel="Até:" minLabel="<10 min." maxLabel=">120 min." />
          </Section>

          <Section>
            <SectionTitle>Nível de dificuldade</SectionTitle>
            <PillRow>
              {['Fácil', 'Médio', 'Difícil'].map((item) => (
                <FilterPill key={item} label={item} active={difficulty === item} onPress={() => setDifficulty(item)} />
              ))}
            </PillRow>
          </Section>

          <Section>
            <SectionTitle>Macronutrientes</SectionTitle>
            <PillRow>
              {['+ proteína', '− kcal', '— carbo'].map((item) => (
                <FilterPill key={item} label={item} active={macro === item} onPress={() => setMacro(item)} />
              ))}
            </PillRow>
          </Section>

          <ApplyButton
            onPress={() => {
              onApply();
              onClose();
            }}
          >
            <ApplyText>Aplicar filtros</ApplyText>
          </ApplyButton>
        </Sheet>
      </Overlay>
    </Modal>
  );
}
