import { IsOptional, IsString, IsEnum } from 'class-validator';
import { OrderBy, OrderType } from '../query-types.enum';

export class QueryParamsDto {
  @IsOptional()
  @IsString()
  searchQuery?: string;

  @IsOptional()
  @IsString()
  @IsEnum(OrderType, {
    message: `Invalid 'order' value. Use 'asc' or 'desc'.`,
  })
  order?: OrderType;

  @IsOptional()
  @IsString()
  @IsEnum(OrderBy, {
    message: `Invalid 'orderBy' value. Use 'title' or 'description'.`,
  })
  orderBy?: string;
}
