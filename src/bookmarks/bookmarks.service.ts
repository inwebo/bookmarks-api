import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { Repository } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { CreateDto } from './dto/create.dto';
import { md5 } from 'pure-md5';
import { UpdateDto } from './dto/update.dto';
import { Injectable } from '@nestjs/common';
import { OptionsDto } from '../paginator/dto/options.dto';
import { MetaDto } from '../paginator/dto/meta.dto';
import { PaginatorDto } from '../paginator/dto/paginator.dto';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly _repo: Repository<Bookmark>,
  ) {}

  protected getQueryBuilder(): SelectQueryBuilder<Bookmark> {
    return this._repo
      .createQueryBuilder('bookmarks')
      .leftJoinAndSelect('bookmarks.tags', 'tags');
  }

  async findOne(id: string): Promise<Bookmark> {
    return await this._repo
      .createQueryBuilder('bookmarks')
      .where('bookmarks.$id = :id', {
        id,
      })
      .leftJoinAndSelect('bookmarks.tags', 'tags')
      .getOne();
  }

  async findAll(optionsDto: OptionsDto) {
    const qb = this.getQueryBuilder();

    qb.orderBy('bookmarks.$id', optionsDto.order)
      .skip(optionsDto.skip)
      .take(optionsDto.take);

    const itemCount = await qb.getCount();
    const { entities } = await qb.getRawAndEntities();

    const metaDto = new MetaDto({ optionsDto, itemCount });

    return new PaginatorDto(entities, metaDto);
  }

  async update(id: number, updateDto: UpdateDto): Promise<UpdateResult> {
    return await this._repo.update(id, updateDto);
  }

  async remove(id: number): Promise<UpdateResult> {
    return await this._repo.softDelete(id);
  }

  async create(createDto: CreateDto): Promise<any> {
    const bookmark = new Bookmark();

    bookmark.url = createDto.url;
    bookmark.title = createDto.title;
    bookmark.description = createDto.description;
    bookmark.isPublic = createDto.isPublic;
    bookmark.md5 = md5(createDto.url);
    bookmark.tags = createDto.tags;

    return await this._repo.save(bookmark);
  }
}
