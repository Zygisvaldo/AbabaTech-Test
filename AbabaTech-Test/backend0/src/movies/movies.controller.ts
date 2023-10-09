import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';

import { QueryParamsDto } from './dto/queryParams.dto';
import { Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseGuards(AuthGuard())
  createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    try {
      const movie = this.moviesService.createMovie(createMovieDto);
      return movie;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Get()
  findAll(@Query() queryParams: QueryParamsDto): Promise<Movie[]> {
    return this.moviesService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Movie | undefined> {
    return this.moviesService.findOne(Number(id));
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateMovieData): Promise<Movie> {
    return this.moviesService.update(Number(id), updateMovieData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string): Promise<void> {
    return this.moviesService.remove(Number(id));
  }
}
