export interface IBaseRepository<Model> {
  getAll(): Promise<Model[]>;
  getById(id: number): Promise<Model | null>;
  create(model: Partial<Model>): Promise<Model>;
  update(model: Partial<Model>): Promise<Model>;
  delete(id: number): Promise<Model>;
}
