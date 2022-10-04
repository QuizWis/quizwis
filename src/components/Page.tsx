import { AppShell, Navbar, Header, Aside, Footer, Text, Container } from '@mantine/core';
import { ReactNode } from 'react';
import CustomHeader from './CustomHeader';

const Page = ({ children }: { children: ReactNode; }) => {
  return (
    <AppShell 
      header={<CustomHeader />}
      padding="md"
      fixed={false}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Container>
        {children}
      </Container>
    </AppShell>
  )
}

export default Page;
