import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Breadcrumb, Button, Alert, Empty, Spin } from 'antd';
import { PlusOutlined, HomeOutlined } from '@ant-design/icons';
import { getMenu, getListData } from '@/api/mockData';
import DynamicFilters from '@/components/filters/DynamicFilters';
import DynamicTable from '@/components/table/DynamicTable';

const ListPage = () => {
  const { programa, modulo } = useParams<{ programa: string; modulo: string }>();
  const [filters, setFilters] = useState<Record<string, any>>({});

  // Get menu configuration
  const { data: menuData, isLoading: menuLoading } = useQuery({
    queryKey: ['menu'],
    queryFn: getMenu,
  });

  // Get current module configuration
  const moduleConfig = useMemo(() => {
    return menuData?.find(item => 
      item.programa === programa && item.modulo === modulo
    );
  }, [menuData, programa, modulo]);

  // Get list data
  const { data: listData, isLoading: dataLoading, error } = useQuery({
    queryKey: ['listData', programa, modulo, filters],
    queryFn: () => getListData(programa!, modulo!, filters),
    enabled: !!programa && !!modulo,
  });

  const handleFilter = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
  };

  if (menuLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spin size="large" tip="Carregando configurações..." />
      </div>
    );
  }

  if (!moduleConfig) {
    return (
      <Alert
        message="Módulo não encontrado"
        description={`O módulo ${modulo} do programa ${programa} não foi encontrado.`}
        type="warning"
        showIcon
        className="mx-auto max-w-md"
      />
    );
  }

  if (error) {
    return (
      <Alert
        message="Erro ao carregar dados"
        description="Não foi possível carregar os dados. Tente novamente."
        type="error"
        showIcon
        className="mx-auto max-w-md"
      />
    );
  }

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
      title: 'Listar'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb and Header */}
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={breadcrumbItems} className="mb-2" />
          <h1 className="text-2xl font-semibold text-foreground">
            {modulo?.charAt(0).toUpperCase() + modulo?.slice(1)}
          </h1>
          <p className="text-muted-foreground">
            Gerencie os registros de {modulo} do sistema
          </p>
        </div>
        
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          className="bg-primary hover:bg-primary-hover shadow-primary"
          onClick={() => window.open(`/${programa}/${modulo}/cadastrar`, '_self')}
        >
          Cadastrar {modulo?.slice(0, -1)}
        </Button>
      </div>

      {/* Filters */}
      <DynamicFilters
        filters={moduleConfig.filters}
        onFilter={handleFilter}
        loading={dataLoading}
      />

      {/* Table */}
      {dataLoading ? (
        <div className="flex items-center justify-center h-64">
          <Spin size="large" tip="Carregando dados..." />
        </div>
      ) : listData && listData.length > 0 ? (
        <DynamicTable
          columns={moduleConfig.columns}
          data={listData}
          loading={dataLoading}
        />
      ) : (
        <div className="bg-card rounded-lg border border-border p-8">
          <Empty
            description="Nenhum registro encontrado"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            className="text-muted-foreground"
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="bg-primary hover:bg-primary-hover"
              onClick={() => window.open(`/${programa}/${modulo}/cadastrar`, '_self')}
            >
              Cadastrar primeiro {modulo?.slice(0, -1)}
            </Button>
          </Empty>
        </div>
      )}
    </div>
  );
};

export default ListPage;