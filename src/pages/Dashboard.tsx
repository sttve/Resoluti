import { Card, Row, Col, Statistic, List, Avatar } from 'antd';
import { 
  UserOutlined, 
  ShoppingOutlined, 
  FileTextOutlined, 
  ShopOutlined,
  RiseOutlined,
  DollarOutlined 
} from '@ant-design/icons';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total de Clientes',
      value: 1234,
      icon: <UserOutlined className="text-primary" />,
      color: 'hsl(var(--primary))'
    },
    {
      title: 'Produtos Cadastrados',
      value: 856,
      icon: <ShoppingOutlined className="text-accent" />,
      color: 'hsl(var(--accent))'
    },
    {
      title: 'Pedidos do Mês',
      value: 342,
      icon: <FileTextOutlined className="text-warning" />,
      color: 'hsl(var(--warning))'
    },
    {
      title: 'Receita Total',
      value: 'R$ 125.840',
      icon: <DollarOutlined className="text-success" />,
      color: 'hsl(var(--success))'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Novo cliente cadastrado',
      description: 'Maria Silva foi adicionada ao sistema',
      avatar: <UserOutlined />,
      time: '2 minutos atrás'
    },
    {
      id: 2,
      title: 'Pedido processado',
      description: 'Pedido #1005 foi marcado como enviado',
      avatar: <FileTextOutlined />,
      time: '15 minutos atrás'
    },
    {
      id: 3,
      title: 'Produto atualizado',
      description: 'Smartphone Samsung teve estoque atualizado',
      avatar: <ShoppingOutlined />,
      time: '1 hora atrás'
    },
    {
      id: 4,
      title: 'Novo fornecedor',
      description: 'Tech Solutions LTDA foi cadastrada',
      avatar: <ShopOutlined />,
      time: '2 horas atrás'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-primary rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Bem-vindo ao Sistema de Administração
        </h1>
        <p className="text-white/90 text-lg">
          Gerencie todos os aspectos do seu negócio em um só lugar
        </p>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card 
              className="shadow-sm border border-border hover:shadow-md transition-shadow"
              bodyStyle={{ padding: '20px' }}
            >
              <Statistic
                title={<span className="text-muted-foreground text-sm">{stat.title}</span>}
                value={stat.value}
                prefix={
                  <div 
                    className="inline-flex p-2 rounded-lg mr-3"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    {stat.icon}
                  </div>
                }
                valueStyle={{ 
                  color: 'hsl(var(--foreground))',
                  fontSize: '20px',
                  fontWeight: 600
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Recent Activities and Quick Actions */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card 
            title={
              <div className="flex items-center gap-2">
                <RiseOutlined className="text-primary" />
                <span>Atividades Recentes</span>
              </div>
            }
            className="shadow-sm border border-border h-full"
          >
            <List
              itemLayout="horizontal"
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        icon={item.avatar} 
                        className="bg-primary/10 text-primary border-primary/20"
                      />
                    }
                    title={<span className="text-foreground font-medium">{item.title}</span>}
                    description={
                      <div className="space-y-1">
                        <p className="text-muted-foreground">{item.description}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card 
            title="Acesso Rápido"
            className="shadow-sm border border-border h-full"
          >
            <div className="space-y-3">
              <div className="p-4 bg-primary-light rounded-lg border border-primary/20 hover:bg-primary/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <UserOutlined className="text-primary text-lg" />
                  <div>
                    <div className="font-medium text-foreground">Gerenciar Clientes</div>
                    <div className="text-sm text-muted-foreground">Visualizar e editar clientes</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-accent/20 hover:bg-accent/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <ShoppingOutlined className="text-accent text-lg" />
                  <div>
                    <div className="font-medium text-foreground">Catálogo de Produtos</div>
                    <div className="text-sm text-muted-foreground">Gerenciar estoque</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-warning/20 hover:bg-warning/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <FileTextOutlined className="text-warning text-lg" />
                  <div>
                    <div className="font-medium text-foreground">Pedidos Pendentes</div>
                    <div className="text-sm text-muted-foreground">Processar vendas</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;