export type categoryData ={
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
export type Category = {
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    photo?:'string'
}
export type CreateCategory = {
  name: string,
  photo?:string
}

