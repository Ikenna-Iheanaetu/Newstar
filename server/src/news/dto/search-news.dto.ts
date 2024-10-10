import { IsNotEmpty, IsString } from 'class-validator';

export class SearchNewsDTO {
  @IsNotEmpty()
  @IsString()
  searchString: string;
}
