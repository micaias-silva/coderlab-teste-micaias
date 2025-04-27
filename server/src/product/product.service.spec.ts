import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Should create a Product', () => {});

    it('Should NOT create a Product with empty data', () => {});

    it('Should NOT create a Product with wrongly typed data', () => {});

    it('Should NOT create a Product with unexistent category', () => {});
  });

  describe('findOne', () => {
    it('Should retrieve a specific product given its id', () => {});

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
    it("Should delete a product without exceptions", () => {})

    it("Should NOT delete a product that doesn't exist", () => {})

    it("Should delete any relationships to its assigned categories", () => {})
  });
});
