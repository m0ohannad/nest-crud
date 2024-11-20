import { FindOptionsWhere, Repository } from 'typeorm';
import { GenericFilter, SortOrder } from '../dto/generic-filter.dto';

export class PageService {
  protected createOrderQuery(filter: GenericFilter) {
    const order: any = {};

    if (filter.orderBy) {
      order[filter.orderBy] = filter.sortOrder;
      return order;
    }

    // Remove the default ordering by createdAt
    // order.createdAt = SortOrder.DESC;
    return order;
  }

  protected paginate<T>(
    repository: Repository<T>,
    filter: GenericFilter,
    where: FindOptionsWhere<T>,
  ) {
    const skip = (filter.page - 1) * filter.pageSize;
    const take = filter.pageSize;

    if (isNaN(skip) || isNaN(take)) {
      throw new Error('Provided "skip" or "take" value is not a number. Please provide numeric values.');
    }

    return repository.findAndCount({
      order: this.createOrderQuery(filter),
      skip: skip,
      take: take,
      where: where,
    });
  }
}