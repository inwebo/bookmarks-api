import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class UpdateDto {
  @IsOptional()
  @IsUrl()
  readonly url: string;

  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
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
