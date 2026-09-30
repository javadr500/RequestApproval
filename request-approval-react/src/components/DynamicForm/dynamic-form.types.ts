

export interface FieldSchema {
  name: string;
  label: string;

  type:
    | 'text'
    | 'number'
    | 'textarea'
    | 'select';

  required?: boolean;

  options?: string[];
}

