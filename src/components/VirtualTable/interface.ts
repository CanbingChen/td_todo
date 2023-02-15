export interface ColumnsType {
  name: string;
  dataIndex?: string;
  render?: (d: any, record: any, index: number) => React.ReactNode;
}
