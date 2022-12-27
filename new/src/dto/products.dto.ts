import { IsString, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateProducts {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly stock: number;
}

export class UpdateProducts extends PartialType(CreateProducts){
  @IsString()
  readonly name?: string;

  @IsNumber()
  readonly stock?: number;
}
