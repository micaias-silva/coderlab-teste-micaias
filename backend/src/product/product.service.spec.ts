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

describe('ProductService', () => {
  let productService: ProductService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [ProductService, DatabaseService],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  // Support Functions
  const checkCategoryMatches = (
    productDto: CreateProductDto,
    resultProduct,
  ): boolean => {
    return resultProduct.categories.every((item) =>
      productDto.categories.includes(item.name),
    );
  };
  const checkProductProperties = (resultProduct, productDto) => {
    expect(resultProduct).toHaveProperty('id');
    expect(resultProduct.name).toEqual(productDto.name);
    expect(resultProduct.qty).toEqual(productDto.qty);
    expect(resultProduct.price).toEqual(productDto.price);
    expect(resultProduct.photo).toEqual(productDto.photo);
    expect(checkCategoryMatches(productDto, resultProduct)).toBe(true);
  };

  it('should be defined', () => {
    expect(productService).toBeDefined();
    expect(databaseService).toBeDefined();
  });

  describe('create', () => {
    it('Should create a Product', async () => {
      const createdProduct = await productService.create(mockedValidProduct);
      checkProductProperties(createdProduct, mockedValidProduct);
    });

    it('Should NOT create a Product with empty data', async () => {
      expect(await productService.create(mockedEmptyProduct)).toThrow(
        BadRequestException,
      );
    });

    it('Should NOT create a Product with wrongly typed data', async () => {
      expect(await productService.create(mockedWrongTypedProduct)).toThrow(
        BadRequestException,
      );
    });

    it('Should NOT create a Product with unexistent category', async () => {
      expect(
        await productService.create(mockedNonexistentCategoryProduct),
      ).toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('Should retrieve a specific product given its id', async () => {
      const createdProduct = await databaseService.product.create({
        data: { ...mockedProductToFind, categories: undefined },
      });
      const productFound = await productService.findOne(createdProduct.id);
      
      checkProductProperties(productFound, mockedProductToFind)
      expect(createdProduct.id).toEqual(productFound.id)
      expect(createdProduct.id).toHaveProperty("categories")
    });

    it('Should return an exception given an unexistent id', () => {});
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
