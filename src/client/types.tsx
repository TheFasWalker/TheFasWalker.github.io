export type User = {
    id: string;
    img?: string;
    name: string;
};

export type SignUpBody = {
  email: string;
  password: string;
  commandId: string;
};
export type AuthResult = {
  token: string;
};

export type Filters = {
  ids?: string[];
  name?: string;
  categoryIds?: string[];
  type?: 'Cost' | 'Profit';
  pagination?: {
    pageSize?: number;
    pageNumber?: number;
  };
  date?: {
    gte?: string; // от - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
    lte?: string; // до - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  }
  createdAt?: {
    gte?: string; // от - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
    lte?: string; // до - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  }
  updatedAt?: {
    gte?: string; // от - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
    lte?: string; // до - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  }
  sorting?: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'date';
  };
};
export type Operation = {
  name: string;
  desc?: string;
  amount: number;
  date: string; // дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  type: 'Profit' | 'Cost';
  categoryId: string;
}
export type Operations = {
    data: Operation[];
    pagination: {
      pageSize: number;
      pageNumber: number;
      total: number;
    };
    sorting: {
      type: 'ASC' | 'DESC';
      field: 'id' | 'createdAt' | 'updatedAt' | 'name';
    }

}

export type Params = {
  name: string;
  desc?: string;
  amount: number;
  date: string; // дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  type: 'Profit' | 'Cost';
  categoryId: string;
};

export type Params2 = {
  name: string;
  photo?: string;
};