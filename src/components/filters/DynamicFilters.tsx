import { Form, Input, Select, DatePicker, InputNumber, Button, Space } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

interface FilterConfig {
  type: string;
  name: string;
  label: string;
  options?: string[];
}

interface DynamicFiltersProps {
  filters: FilterConfig[];
  onFilter: (values: Record<string, any>) => void;
  loading?: boolean;
}

const DynamicFilters = ({ filters, onFilter, loading = false }: DynamicFiltersProps) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: Record<string, any>) => {
    // Remove empty values
    const cleanValues = Object.entries(values).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value) && value.length === 0) return acc;
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    onFilter(cleanValues);
  };

  const handleReset = () => {
    form.resetFields();
    onFilter({});
  };

  const renderFilterInput = (filter: FilterConfig) => {
    switch (filter.type) {
      case 'input':
        return (
          <Input
            placeholder={`Digite ${filter.label.toLowerCase()}`}
            allowClear
          />
        );

      case 'select':
        return (
          <Select
            placeholder={`Selecione ${filter.label.toLowerCase()}`}
            allowClear
            options={filter.options?.map(option => ({
              label: option,
              value: option
            }))}
          />
        );

      case 'range':
        return (
          <Input.Group compact>
            <InputNumber
              placeholder="Min"
              style={{ width: '50%' }}
              formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/R\$\s?|(,*)/g, '')}
            />
            <InputNumber
              placeholder="Max"
              style={{ width: '50%' }}
              formatter={value => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/R\$\s?|(,*)/g, '')}
            />
          </Input.Group>
        );

      case 'dateRange':
        return (
          <RangePicker
            placeholder={['Data inicial', 'Data final']}
            style={{ width: '100%' }}
          />
        );

      default:
        return <Input placeholder={filter.label} />;
    }
  };

  if (!filters || filters.length === 0) {
    return null;
  }

  return (
    <div className="bg-card p-6 rounded-lg border border-border mb-6 shadow-sm">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mb-0"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filters.map((filter) => (
            <Form.Item
              key={filter.name}
              name={filter.name}
              label={filter.label}
              className="mb-4"
            >
              {renderFilterInput(filter)}
            </Form.Item>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button
            onClick={handleReset}
            icon={<ReloadOutlined />}
            disabled={loading}
          >
            Limpar
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            loading={loading}
            className="bg-primary hover:bg-primary-hover"
          >
            Filtrar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default DynamicFilters;