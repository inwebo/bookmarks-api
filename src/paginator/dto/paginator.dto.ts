import { ApiProperty } from '@nestjs/swagger';
import { MetaDto } from './meta.dto';
import { IsArray } from 'class-validator';

export class PaginatorDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => MetaDto })
  readonly meta: MetaDto;

  constructor(data: T[], meta: MetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
