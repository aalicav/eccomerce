export class UpdateCategoryRequest {
  id: string;
  name?: string;
  description?: string;

  constructor(category: UpdateCategoryRequest) {
    this.id = category.id;
    this.name = category.name;
    this.description = category.description;
  }
}
