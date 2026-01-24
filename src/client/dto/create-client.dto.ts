import { IsString, IsOptional, IsEmail, Length } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(0, 20)
  phone?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
