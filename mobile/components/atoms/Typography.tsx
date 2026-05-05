import sc from 'styled-components/native';

export const Title = sc.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.title}px;
  font-weight: 800;
  text-align: center;
`;

export const Subtitle = sc.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.subtitle}px;
  font-weight: 700;
  text-align: center;
`;

export const Label = sc.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.body}px;
  font-weight: 700;
`;

export const BodyText = sc.Text<{ $muted?: boolean; $center?: boolean }>`
  color: ${({ theme, $muted }) => ($muted ? theme.colors.textMuted : theme.colors.white)};
  font-size: ${({ theme }) => theme.typography.body}px;
  font-weight: 500;
  text-align: ${({ $center }) => ($center ? 'center' : 'left')};
`;
