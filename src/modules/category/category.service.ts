import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { categoryRepositry } from 'src/constants/entityRepositry';
import { Category } from './category.entity';
import { categoryDto } from './dto';
import { Product } from '../product/product.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(categoryRepositry)
    private categoryRepository: typeof Category,
  ) {}

  async createCategory(dto: categoryDto) {
    await this.categoryRepository.create({ title: dto.title });
    return { msg: 'category has been created' };
  }

  async updateCategory(dto: categoryDto, categoryId: string) {
    const category = await this.categoryById(categoryId);
    category.title = dto.title;
    await category.save();
    return { msg: 'category has been updated' };
  }

  async fetchAll() {
    const categories = await this.categoryRepository
      .scope('withoutTimeStamps')
      .findAll({
        order: [['createdAt', 'DESC']],
      });
    return { categories };
  }

  async fetchCategoryProduct(categoryId: string) {
    await this.categoryById(categoryId);
    const category = await this.categoryRepository
      .scope('withoutTimeStamps')
      .findOne({
        where: { id: categoryId },
        include: [
          {
            model: Product,
            separate: true,
            attributes: ['id', 'title', 'image', 'price'],
            order: [['createdAT', 'DESC']],
          },
        ],
      });
    return { category };
  }

  async categoryById(id) {
    const category = await this.categoryRepository.findByPk(id);
    if (!category) {
      throw new BadRequestException('category invalid id');
    }
    return category;
  }
}
