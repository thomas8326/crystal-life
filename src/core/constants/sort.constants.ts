import { OrderBy } from 'src/core/enums/orderby.enum';
import { Sort } from 'src/core/models/sort';

export const CREATED_SORT: Sort = { path: 'createdAt', by: OrderBy.Desc };
