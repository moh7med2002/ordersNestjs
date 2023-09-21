import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { productRepositry } from 'src/constants/entityRepositry';
import { Product } from './product.entity';
import { ProductCreateDto, ProductUpdateDto } from './dto';
import { CategoryService } from '../category/category.service';
import { clearImage } from 'src/common/util/clearFile';
import { Category } from '../category/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(productRepositry)
    private productRepositry: typeof Product,
    private categoryService: CategoryService,
  ) {}

  async createProduct(dto: ProductCreateDto, image: string) {
    try {
      await this.categoryService.categoryById(dto.categoryId);
      await this.productRepositry.create({
        title: dto.title,
        price: dto.price,
        categoryId: dto.categoryId,
        image: image,
      });
      return { msg: 'product has been created' };
    } catch (error) {
      clearImage(image);
      throw error;
    }
  }

  async updateProduct(dto: ProductUpdateDto, productId: string, image: string) {
    try {
      const product = await this.productById(productId);
      product.title = dto.title;
      product.price = dto.price;
      if (image) {
        clearImage(product.image);
        product.image = image;
      }
      await product.save();
      return { msg: 'produt has been updated' };
    } catch (error) {
      clearImage(image);
      throw error;
    }
  }

  async deleteProduct(productId) {
    const product = await this.productById(productId);
    clearImage(product.image);
    await product.destroy();
    return { msg: 'product has been deleted' };
  }

  async fetchAllProucts() {
    const products = await this.productRepositry
      .scope('withoutTimeStamps')
      .findAll({
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: Category,
            attributes: ['id', 'title'],
          },
        ],
      });
    return { products };
  }

  async fetchSingleProduct(productId: string) {
    await this.productById(productId);
    const product = await this.productRepositry
      .scope('withoutTimeStamps')
      .findOne({
        where: { id: productId },
        include: [
          {
            model: Category,
            attributes: ['id', 'title'],
          },
        ],
      });
    return { product };
  }

  async productById(id) {
    const product = await this.productRepositry.findByPk(id);
    if (!product) {
      throw new BadRequestException('Invalid product id');
    }
    return product;
  }
}
