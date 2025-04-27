import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import {
  mockedEmptyProduct,
  mockedNonexistentCategoryProduct,
  mockedProductToFind,
  mockedValidProduct,
  mockedWrongTypedProduct,
} from './mocks';
import { CreateProductDto } from './dto/create-product.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'prisma/generated/prisma';
import { randomUUID } from 'crypto';
import { CategoryService } from 'src/category/category.service';

describe('ProductService', () => {
  let productService: ProductService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [ProductService, DatabaseService, CategoryService],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  // Support Functions
  const checkCategoryMatches = (
    resultProduct,
    productDto: CreateProductDto,
  ): boolean => {
    return resultProduct.categories.every((item) =>
      productDto.categories.includes(item.category.name),
    );
  };
  const checkProductProperties = (resultProduct, productDto) => {
    expect(resultProduct).toHaveProperty('id');
    expect(resultProduct.name).toEqual(productDto.name);
    expect(resultProduct.qty).toEqual(productDto.qty);
    expect(Number(resultProduct.price)).toEqual(productDto.price);
    expect(resultProduct.photo).toEqual(productDto.photo);
  };

  it('should be defined', () => {
    expect(productService).toBeDefined();
    expect(databaseService).toBeDefined();
  });

  describe.only('create', () => {
    it('Should create a Product', async () => {
      const createdProduct = await productService.create(mockedValidProduct);
      checkProductProperties(createdProduct, mockedValidProduct);
      expect(checkCategoryMatches(createdProduct, mockedValidProduct)).toBe(
        true,
      );
    });

    // it.only('Should NOT create a Product with empty data', async () => {
    //   expect(productService.create(mockedEmptyProduct)).toThrow(
    //     BadRequestException,
    //   );
    // });

    // it('Should NOT create a Product with wrongly typed data', async () => {
    //   expect(await productService.create(mockedWrongTypedProduct)).toThrow(
    //     BadRequestException,
    //   );
    // });

    it.only('Should NOT create a Product with unexistent category', async () => {
      expect(
        async () =>
          await productService.create(mockedNonexistentCategoryProduct),
      ).rejects.toThrow()
    });
  });

  describe('findOne', () => {
    it('Should retrieve a specific product given its id', async () => {
      const createdProduct = await databaseService.product.create({
        data: { ...mockedProductToFind, categories: undefined },
      });
      const productFound = await productService.findOne(createdProduct.id);

      checkProductProperties(productFound, mockedProductToFind);
      expect(createdProduct.id).toEqual(productFound.id);
      expect(createdProduct.id).toHaveProperty('categories');
    });

    it('Should return an exception given an unexistent id', () => {
      const fakeUuid = randomUUID();
      expect(productService.findOne(fakeUuid)).toThrow(NotFoundException);
    });

    it('Should return an exception given an invalid id', () => {
      expect(productService.findOne('123456789')).toThrow(BadRequestException);
    });
  });

  describe('findMany', () => {
    it('Should be paginated', () => {});

    it('Should retrieve a list of products', () => {});
  });

  describe('update', () => {
    it('Should update an existing product', () => {});

    it("Should update an existing product's categories", () => {});

    it("Should NOT update a product that doesn't exist", () => {});

    it('Should NOT update a property to an wrongly typed property', () => {});

    it('Should NOT update unexisting categories', () => {});

    it('Should NOT update unexisting properties', () => {});
  });

  describe('remove', () => {
    it('Should delete a product without exceptions', () => {});

    it("Should NOT delete a product that doesn't exist", () => {});

    it('Should delete any relationships to its assigned categories', () => {});
  });
});
