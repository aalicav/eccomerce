import { isNotUndefined } from "../../infra/utils/isNotUndefined";

export class GetCategoryResponse {
  id: string;
  name: string;
  description: string;

  constructor(category: Partial<GetCategoryResponse>) {
    this.id = isNotUndefined('id is required',category.id);
    this.name = isNotUndefined('name is required',category.name);
    this.description = isNotUndefined('description is required',category.description);
  }
}
