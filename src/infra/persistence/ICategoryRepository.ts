export interface ICategoryRepository {
  getCategory(id: string): Promise<ICategory | undefined>;
  deleteCategory(id: string): Promise<void>;
  updateCategory(id: string, category: ICategory): Promise<void>;
  listCategories(): Promise<ICategory[]>;
  saveCategory(category: ICategory): Promise<void>;
}
