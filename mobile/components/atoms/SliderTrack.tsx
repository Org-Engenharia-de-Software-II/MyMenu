import sc from 'styled-components/native';

type SliderTrackProps = {
  minLabel: string;
  maxLabel: string;
  valueLabel?: string;
};

const Container = sc.View`
  gap: 6px;
`;

const Track = sc.View`
  width: 100%;
  height: 2px;
  background-color: #222222;
`;

const Marker = sc.View`
  width: 7px;
  height: 7px;
  border-radius: 3.5px;
  background-color: ${({ theme }) => theme.colors.coral};
  margin-top: -2px;
  margin-left: 38%;
`;

const Labels = sc.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Label = sc.Text`
  color: #2B2B2B;
  font-size: 11px;
  font-weight: 700;
`;

const ValueLabel = sc.Text`
  color: #2B2B2B;
  font-size: 11px;
  font-weight: 700;
`;

export function SliderTrack({ minLabel, maxLabel, valueLabel }: SliderTrackProps) {
  return (
    <Container>
      {valueLabel ? <ValueLabel>{valueLabel}</ValueLabel> : null}
      <Track>
        <Marker />
      </Track>
      <Labels>
        <Label>{minLabel}</Label>
        <Label>{maxLabel}</Label>
      </Labels>
    </Container>
  );
}
