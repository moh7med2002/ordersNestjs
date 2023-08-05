import { Module } from '@nestjs/common';
import { categoryRepositry } from 'src/constants/entityRepositry';
import { Category } from './category.entity';

@Module({
  controllers: [],
  providers: [
    {
      provide: categoryRepositry,
      useValue: Category,
    },
  ],
})
export class CategoryModule {}
