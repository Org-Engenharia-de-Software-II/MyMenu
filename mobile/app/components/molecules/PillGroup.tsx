import sc from 'styled-components/native';

import { SelectPill } from '@/app/components/atoms/SelectPill';
import { Label } from '@/app/components/atoms/Typography';

type PillOption = {
  label: string;
  value: string;
};

type PillGroupProps = {
  title: string;
  options: PillOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;
};

const GroupContainer = sc.View`
  width: 100%;
  gap: 10px;
`;

const Grid = sc.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
`;

export function PillGroup({ title, options, selectedValues, onToggle }: PillGroupProps) {
  return (
    <GroupContainer>
      <Label>{title}</Label>
      <Grid>
        {options.map((option) => (
          <SelectPill
            key={option.value}
            label={option.label}
            selected={selectedValues.includes(option.value)}
            onPress={() => onToggle(option.value)}
          />
        ))}
      </Grid>
    </GroupContainer>
  );
}
