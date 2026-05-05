import type { ReactNode } from 'react';
import sc from 'styled-components/native';

const Container = sc.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ShapeTopRight = sc.View`
  position: absolute;
  width: 260px;
  height: 260px;
  right: -70px;
  top: -70px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.backgroundLightShape};
`;

const ShapeMiddleRight = sc.View`
  position: absolute;
  width: 240px;
  height: 240px;
  right: -90px;
  top: 160px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.backgroundLightShape};
  opacity: 0.8;
`;

const ShapeBottomLeft = sc.View`
  position: absolute;
  width: 260px;
  height: 260px;
  left: -80px;
  bottom: -100px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.backgroundLightShape};
`;

export function CurvedBackground({ children }: { children: ReactNode }) {
  return (
    <Container>
      <ShapeTopRight />
      <ShapeMiddleRight />
      <ShapeBottomLeft />
      {children}
    </Container>
  );
}
