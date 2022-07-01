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

  findOne(id: string): Promise<Bookmark> {
    return this._repo
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

  update(id: number, updateDto: UpdateDto) {
    this._repo.update(id, updateDto);
    return 'Update';
  }

  remove(id: number) {
    this._repo.softDelete(id);
    return 'Remove';
  }

  create(createDto: CreateDto) {
    const bookmark = new Bookmark();

    bookmark.url = createDto.url;
    bookmark.title = createDto.title;
    bookmark.description = createDto.description;
    bookmark.isPublic = createDto.isPublic;
    bookmark.md5 = md5(createDto.url);
    bookmark.tags = createDto.tags;

    this._repo.save(bookmark).catch((e) => {
      // @todo
      console.log(e.message);
    });

    return 'Create';
  }
}
