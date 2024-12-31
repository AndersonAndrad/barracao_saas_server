import { FilterUser } from '../../interfaces/user.interface';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterUserDto implements FilterUser {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Can search user by name or alias' })
  word: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Current page where want search' })
  page: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Counter items want return in the search' })
  size: number;
}
