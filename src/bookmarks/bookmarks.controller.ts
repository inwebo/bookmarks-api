import {
  Body,
  Controller,
  Delete,
  Get,
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

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Get()
  async findAll(@Query() optionsDto: OptionsDto) {
    return await this.bookmarksService.findAll(optionsDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.bookmarksService.findOne(id);
  }

  @Patch(':id')
  update(@Body() updateDto: UpdateDto, @Param('id') id: string) {
    console.log(id, updateDto);
    this.bookmarksService.update(parseInt(id), updateDto);
    return 'This action update bookmark ' + id;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.bookmarksService.remove(parseInt(id));
    return 'This action remove bookmark ' + id;
  }

  @Post()
  create(@Body() createDto: CreateDto): string {
    this.bookmarksService.create(createDto);
    return 'This action adds a new bookmark';
  }
}
