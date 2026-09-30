export interface IBaseRepository<Model> {
  getAll(): Promise<Model[]>;
  getById(id: number): Promise<Model | null>;
  create(model: Model): Promise<Model>;
  update(model: Model): Promise<Model>;
  delete(id: number): Promise<Model>;
}
