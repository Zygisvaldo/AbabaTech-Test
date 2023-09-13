import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async create(movieData: Partial<Movie>): Promise<Movie> {
    const movie = this.moviesRepository.create(movieData);
    return await this.moviesRepository.save(movie) as Movie;
  }

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }
  
  async findOne(id: number): Promise<Movie | undefined> {
    if (isNaN(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    const movie = await this.moviesRepository.findOne({ where: { id } });
    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
    return movie;
  }
  
  async update(id: number, updateMovieData): Promise<Movie> {
    if (isNaN(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    const movie = await this.moviesRepository.findOne({ where: { id } });
    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
    this.moviesRepository.merge(movie, updateMovieData);
    return this.moviesRepository.save(movie);
  }
  
  async remove(id: number): Promise<void> {
    if (isNaN(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    const movie = await this.moviesRepository.findOne({ where: { id } });
    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
    await this.moviesRepository.remove(movie);
  }  
}
