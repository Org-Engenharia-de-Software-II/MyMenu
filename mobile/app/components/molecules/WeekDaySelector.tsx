import sc from 'styled-components/native';

type WeekDaySelectorProps = {
  days?: string[];
  activeDay: string;
  onSelectDay: (day: string) => void;
};

const Scroll = sc.ScrollView`
  max-height: 28px;
`;

const Row = sc.View`
  flex-direction: row;
  gap: 12px;
`;

const DayButton = sc.Pressable``;

const DayText = sc.Text<{ $active: boolean }>`
  color: ${({ theme, $active }) => ($active ? theme.colors.coral : '#D5D5D5')};
  font-size: 11px;
  font-weight: ${({ $active }) => ($active ? 800 : 700)};
`;

export function WeekDaySelector({
  days = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'],
  activeDay,
  onSelectDay,
}: WeekDaySelectorProps) {
  return (
    <Scroll horizontal showsHorizontalScrollIndicator={false}>
      <Row>
        {days.map((day) => (
          <DayButton key={day} onPress={() => onSelectDay(day)}>
            <DayText $active={activeDay === day}>{day}</DayText>
          </DayButton>
        ))}
      </Row>
    </Scroll>
  );
}
