import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { toNumber } from 'lodash';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class GenericFilter {
    @Transform(({ value }) => {
        const num = Number(value);
        return isNaN(num) ? 1 : num; // إذا كان غير رقم، اجعله 1 افتراضيًا
      })
      @IsNumber({}, { message: ' "page" attribute should be a number' })
      public page: number;

      @Transform(({ value }) => {
        const num = Number(value);
        return isNaN(num) ? 10 : num; // إذا كان غير رقم، اجعله 10 افتراضيًا
      })
      @IsNumber({}, { message: ' "pageSize" attribute should be a number' })
      public pageSize: number;

  @IsOptional()
  public orderBy?: string;

  @IsEnum(SortOrder)
  @IsOptional()
  public sortOrder?: SortOrder = SortOrder.DESC;
}