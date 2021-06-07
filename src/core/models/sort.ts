import { OrderBy } from 'src/core/enums/orderby.enum';

export class Sort {
  path: string = 'id';
  by!: OrderBy;
}
