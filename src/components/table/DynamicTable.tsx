import { Table, Tag, Button, Space, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType, TableProps } from 'antd/es/table';

interface ColumnConfig {
  title: string;
  dataIndex: string;
  sorter?: boolean;
  render?: string;
}

interface DynamicTableProps {
  columns: ColumnConfig[];
  data: any[];
  loading?: boolean;
  pagination?: TableProps<any>['pagination'];
  onChange?: TableProps<any>['onChange'];
}

const DynamicTable = ({ 
  columns, 
  data, 
  loading = false, 
  pagination = { 
    pageSize: 10, 
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} itens`
  },
  onChange 
}: DynamicTableProps) => {

  const renderCell = (value: any, record: any, renderType?: string) => {
    switch (renderType) {
      case 'status':
        const statusColors: Record<string, string> = {
          'Ativo': 'success',
          'Inativo': 'default',
          'Pendente': 'warning',
          'Processando': 'processing',
          'Enviado': 'cyan',
          'Entregue': 'success',
          'Cancelado': 'error'
        };
        return <Tag color={statusColors[value] || 'default'}>{value}</Tag>;

      case 'currency':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(value);

      case 'date':
        return new Date(value).toLocaleDateString('pt-BR');

      default:
        return value;
    }
  };

  const tableColumns: ColumnsType<any> = [
    ...columns.map((col) => ({
      title: col.title,
      dataIndex: col.dataIndex,
      key: col.dataIndex,
      sorter: col.sorter ? (a: any, b: any) => {
        const aVal = a[col.dataIndex];
        const bVal = b[col.dataIndex];
        if (typeof aVal === 'string') {
          return aVal.localeCompare(bVal);
        }
        return aVal - bVal;
      } : false,
      render: (value: any, record: any) => renderCell(value, record, col.render),
      className: 'text-sm'
    })),
    {
      title: 'Ações',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Visualizar">
            <Button
              type="text"
              icon={<EyeOutlined />}
              size="small"
              className="text-primary hover:text-primary-hover hover:bg-primary-light"
            />
          </Tooltip>
          <Tooltip title="Editar">
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              className="text-accent hover:text-accent hover:bg-green-50"
            />
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              size="small"
              className="text-destructive hover:text-red-600 hover:bg-red-50"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
      <Table
        columns={tableColumns}
        dataSource={data}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
        rowKey="id"
        scroll={{ x: 'max-content' }}
        className="[&_.ant-table-thead>tr>th]:bg-muted [&_.ant-table-thead>tr>th]:border-border [&_.ant-table-tbody>tr>td]:border-border [&_.ant-table-tbody>tr:hover>td]:bg-muted/50"
        size="middle"
      />
    </div>
  );
};

export default DynamicTable;