import { Layout, Menu } from 'antd';
import { ReactNode } from 'react';

const Page = ({ children }: { children: ReactNode; }) => {
  return (
    <Layout className="layout" style={{display:"flex", minHeight:"100vh"}}>
      <Layout.Header>
        <Menu theme="dark" mode="horizontal" />
      </Layout.Header>
      <Layout.Content style={{margin:"auto", background:"#ffffff", maxWidth:"1200px", width:"80vw"}}>
        <div style={{margin: "20px 50px", flexGrow: 1}}>
          {children}
        </div>
      </Layout.Content>
    </Layout>
  )
}

export default Page;
