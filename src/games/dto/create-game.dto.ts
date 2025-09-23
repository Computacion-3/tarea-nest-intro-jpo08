export class CreateGameDto {
  title: string;
  genre?: string;
  releaseDate?: Date;
  userId: number; 
}