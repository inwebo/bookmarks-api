import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDto {
  @IsUrl()
  @ApiProperty()
  readonly url: string;

  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsBoolean()
  @Transform(({ value }) => value === '1')
  @ApiProperty()
  readonly isPublic: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.toString().split(','))
  @ApiProperty()
  readonly tags?: [];
}
