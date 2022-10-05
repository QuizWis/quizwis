import { AppShell, Navbar, Header, Aside, Footer, Text, Container } from '@mantine/core';
import { ReactNode } from 'react';
import CustomHeader from './CustomHeader';

const Page = ({ children }: { children: ReactNode; }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AppShell 
        header={<CustomHeader />}
        padding="md"
        fixed={false}
      >
        <Container>
          {children}
        </Container>
      </AppShell>
    </div>
  )
}

export default Page;
