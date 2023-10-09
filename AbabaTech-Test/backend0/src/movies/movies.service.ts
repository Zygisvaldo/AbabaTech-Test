import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { QueryParamsDto } from './dto/queryParams.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.moviesRepository.create(createMovieDto);
    return (await this.moviesRepository.save(movie)) as Movie;
  }

  findAll(queryParams: QueryParamsDto): Promise<Movie[]> {
    const { searchQuery, order, orderBy } = queryParams;
    console.log(searchQuery, order, orderBy);
    const query = this.moviesRepository.createQueryBuilder('movie');

    if (searchQuery) {
      query.where(
        'LOWER(movie.title) LIKE LOWER(:searchQuery) OR LOWER(movie.description) LIKE LOWER(:searchQuery)',
        { searchQuery: `%${searchQuery}%` },
      );
    }

    if (order && orderBy) {
      query.orderBy(`movie.${orderBy}`, order.toUpperCase() as 'ASC' | 'DESC');
    }

    return query.getMany();
  }

  async getOneById(id: string): Promise<Movie> {
    const movie = await this.moviesRepository.findOne({ where: { id } });
    if (!movie) {
      throw new HttpException(
        `Movie with ID '${id}' not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.getOneById(id);
    this.moviesRepository.merge(movie, updateMovieDto);
    return this.moviesRepository.save(movie);
  }

  async remove(id: string): Promise<void> {
    const movie = await this.getOneById(id);
    await this.moviesRepository.remove(movie);
  }
}
