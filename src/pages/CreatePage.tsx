import { useParams } from 'react-router-dom';
import { Breadcrumb, Alert, Card } from 'antd';
import { HomeOutlined, FormOutlined } from '@ant-design/icons';

const CreatePage = () => {
  const { programa, modulo } = useParams<{ programa: string; modulo: string }>();

  const breadcrumbItems = [
    {
      href: '/',
      title: <HomeOutlined />
    },
    {
      title: programa?.charAt(0).toUpperCase() + programa?.slice(1)
    },
    {
      title: modulo?.charAt(0).toUpperCase() + modulo?.slice(1)
    },
    {
      title: 'Cadastrar'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb and Header */}
      <div>
        <Breadcrumb items={breadcrumbItems} className="mb-2" />
        <h1 className="text-2xl font-semibold text-foreground">
          Cadastrar {modulo?.slice(0, -1)}
        </h1>
        <p className="text-muted-foreground">
          Adicione um novo registro de {modulo} ao sistema
        </p>
      </div>

      {/* Form Card */}
      <Card 
        className="shadow-sm border border-border"
        title={
          <div className="flex items-center gap-2">
            <FormOutlined className="text-primary" />
            <span>Formulário de Cadastro</span>
          </div>
        }
      >
        <Alert
          message="Formulário em Desenvolvimento"
          description={`O formulário dinâmico para cadastro de ${modulo} será implementado baseado na configuração da API do menu. Esta página demonstra a estrutura de rotas dinâmicas funcionando corretamente.`}
          type="info"
          showIcon
          className="max-w-2xl"
        />
      </Card>
    </div>
  );
};

export default CreatePage;