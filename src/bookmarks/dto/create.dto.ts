import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateDto {
  @IsUrl()
  readonly url: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsBoolean()
  @Transform(({ value }) => value === '1')
  readonly isPublic: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.toString().split(','))
  readonly tags?: [];
}
