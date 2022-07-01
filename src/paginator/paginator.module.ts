import { Module } from '@nestjs/common';
import { PaginatorService } from './paginator.service';
import { PaginatorDto } from './dto/paginator.dto';

@Module({
  providers: [PaginatorService, PaginatorDto],
  exports: [PaginatorDto],
})
export class PaginatorModule {}
