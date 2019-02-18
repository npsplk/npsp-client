export interface ITransportType {
  id?: number;
  typeName?: string;
  metaCode?: string;
  description?: string;
}

export const defaultValue: Readonly<ITransportType> = {};
