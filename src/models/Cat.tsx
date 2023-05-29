export interface Cat {
  id: string;
  name: string;
  breed: string;
  age: string;
  description: string;
  image?: string;
  status: string;
}

export interface CatCreateForm {
  name: string;
  breed: string;
  age: string;
  description: string;
  image: string;
}
