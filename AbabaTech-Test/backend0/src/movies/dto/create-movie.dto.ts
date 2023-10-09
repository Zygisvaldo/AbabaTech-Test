import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  title: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(200)
  description: string;
}
