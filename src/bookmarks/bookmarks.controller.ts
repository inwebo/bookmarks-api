import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { OptionsDto } from '../paginator/dto/options.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Get()
  async findAll(@Query() optionsDto: OptionsDto) {
    return await this.bookmarksService.findAll(optionsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.bookmarksService.findOne(id);
  }

  @Patch(':id')
  //@UseGuards(JwtAuthGuard)
  async update(
    @Body() updateDto: UpdateDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return this.bookmarksService.update(parseInt(id), updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<UpdateResult> {
    return await this.bookmarksService.remove(parseInt(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createDto: CreateDto): Promise<any> {
    return await this.bookmarksService.create(createDto).catch((e) => {
      if (
        e.message ===
        'SqliteError: UNIQUE constraint failed: bookmarks__bookmark.md5'
      ) {
        throw new HttpException('Bookmark exists', HttpStatus.CONFLICT);
      } else {
        throw e;
      }
    });
  }
}
