import sc from 'styled-components/native';

type BadgeVariant = 'time' | 'difficulty' | 'activeFilter' | 'filter';

type BadgeProps = {
  text: string;
  variant?: BadgeVariant;
};

const Container = sc.View<{ $variant: BadgeVariant }>`
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radius.pill}px;
  background-color: ${({ theme, $variant }) => {
    if ($variant === 'activeFilter') return theme.colors.coral;
    if ($variant === 'filter') return 'transparent';
    return theme.colors.surface;
  }};
  border-width: ${({ $variant }) => ($variant === 'filter' ? '1px' : '0px')};
  border-color: ${({ theme }) => theme.colors.textSecondary};
`;

const Text = sc.Text<{ $variant: BadgeVariant }>`
  color: ${({ theme, $variant }) =>
    $variant === 'activeFilter' ? theme.colors.white : theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.caption}px;
  font-weight: 700;
`;

export function Badge({ text, variant = 'time' }: BadgeProps) {
  return (
    <Container $variant={variant}>
      <Text $variant={variant}>{text}</Text>
    </Container>
  );
}
