export interface CloudEvent<T> {
  id: string;
  source: string;
  type: string;
  specversion: '1.0';
  datacontenttype: 'application/json';
  time: string;
  data: T;
  tenantId: string;
}

export interface CreateCloudEventInput<T> {
  id: string;
  source: string;
  type: string;
  data: T;
  tenantId: string;
  time?: Date;
}

export function createCloudEvent<T>(input: CreateCloudEventInput<T>): CloudEvent<T> {
  return {
    id: input.id,
    source: input.source,
    type: input.type,
    specversion: '1.0',
    datacontenttype: 'application/json',
    time: (input.time ?? new Date()).toISOString(),
    data: input.data,
    tenantId: input.tenantId,
  };
}
