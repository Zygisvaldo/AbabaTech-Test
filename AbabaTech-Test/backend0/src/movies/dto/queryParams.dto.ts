import { IsOptional, IsString, IsEnum } from 'class-validator';
import { OrderBy, OrderType } from '../query-types.enum';

export class QueryParamsDto {
  @IsOptional()
  @IsString()
  searchQuery?: string;

  @IsOptional()
  @IsString()
  @IsEnum(OrderType)
  order?: OrderType;

  @IsOptional()
  @IsString()
  @IsEnum(OrderBy)
  orderBy?: string;
}
