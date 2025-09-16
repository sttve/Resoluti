import { useState, useEffect } from 'react';
import { Layout, Menu, Spin, Alert } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMenu } from '@/api/mockData';
import * as AntIcons from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { data: menuData, isLoading, error } = useQuery({
    queryKey: ['menu'],
    queryFn: getMenu,
  });

  const getIcon = (iconName: string) => {
    const IconComponent = (AntIcons as any)[iconName];
    return IconComponent ? <IconComponent /> : <AntIcons.AppstoreOutlined />;
  };

  const menuItems: MenuProps['items'] = menuData?.reduce((acc, item) => {
    const programaIndex = acc.findIndex((menuItem: any) => menuItem.key === item.programa);
    
    const subMenuItem = {
      key: `${item.programa}/${item.modulo}`,
      icon: getIcon(item.icon),
      label: item.modulo.charAt(0).toUpperCase() + item.modulo.slice(1),
      children: item.acoes.map(acao => ({
        key: `${item.programa}/${item.modulo}/${acao}`,
        label: acao.charAt(0).toUpperCase() + acao.slice(1),
      }))
    };

    if (programaIndex >= 0) {
      acc[programaIndex].children.push(subMenuItem);
    } else {
      acc.push({
        key: item.programa,
        label: item.programa.charAt(0).toUpperCase() + item.programa.slice(1),
        icon: <AntIcons.FolderOutlined />,
        children: [subMenuItem]
      });
    }

    return acc;
  }, [] as any[]) || [];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(`/${key}`);
  };

  const getSelectedKeys = () => {
    const path = location.pathname.slice(1); // Remove leading slash
    return [path];
  };

  const getOpenKeys = () => {
    const path = location.pathname.slice(1);
    const parts = path.split('/');
    const openKeys = [];
    
    if (parts.length >= 1) openKeys.push(parts[0]); // programa
    if (parts.length >= 2) openKeys.push(`${parts[0]}/${parts[1]}`); // programa/modulo
    
    return openKeys;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" tip="Carregando aplicação..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen p-4">
        <Alert
          message="Erro ao carregar"
          description="Não foi possível carregar o menu da aplicação."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={280}
        className="bg-sidebar border-r border-sidebar-border"
        theme="dark"
      >
        <div className="flex items-center justify-center h-16 border-b border-sidebar-border">
          <h1 className="text-sidebar-foreground text-lg font-semibold">
            {collapsed ? 'SA' : 'Sistema Admin'}
          </h1>
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getSelectedKeys()}
          defaultOpenKeys={getOpenKeys()}
          items={menuItems}
          onClick={handleMenuClick}
          className="bg-sidebar border-0"
          style={{
            backgroundColor: 'hsl(var(--sidebar-background))',
            color: 'hsl(var(--sidebar-foreground))'
          }}
        />
      </Sider>

      <Layout>
        <Header className="bg-card border-b border-border px-6 flex items-center">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-muted rounded-md transition-colors"
          >
            {collapsed ? <AntIcons.MenuUnfoldOutlined /> : <AntIcons.MenuFoldOutlined />}
          </button>
          
          <div className="flex-1 flex items-center justify-between ml-4">
            <h2 className="text-lg font-medium text-foreground">
              Sistema de Administração
            </h2>
          </div>
        </Header>

        <Content className="bg-background p-6 overflow-auto">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;