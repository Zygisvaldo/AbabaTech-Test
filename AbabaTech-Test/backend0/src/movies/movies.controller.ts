import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';
import { JwtAuthGuard } from '../auth/jwt-atuh.guard';
import { QueryParamsDto } from './queryParams.dto';
import { Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() movieData): Promise<Movie> {
    return this.moviesService.create(movieData);
  }

  @Get()
  findAll(@Query() queryParams: QueryParamsDto): Promise<Movie[]> {
    return this.moviesService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Movie | undefined> {
    return this.moviesService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMovieData): Promise<Movie> {
    return this.moviesService.update(Number(id), updateMovieData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.moviesService.remove(Number(id));
  }
}
