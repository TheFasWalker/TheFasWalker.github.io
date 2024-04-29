export type AuthResult = {
    token: string;
};
export type Category = {
  id: string;
  name: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
};
export type fetchCategories ={
  data: Category[];
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
export type Operation = {
  amount: string,
  category: Category[],
  createdAt: string,
  date: string,
  desc: string,
  id: string,
  name: string,
  type: string,
  updatedAt:string
}
export type fetchOperationsData = {
  data: Operation[],
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