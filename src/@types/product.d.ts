import { Product, ProductImage, ProductModel, ProductSize } from "@prisma/client";

interface IProductInfos extends ProductModel {
  productImages: ProductImage[];
  productSizes: ProductSize[];
}

interface IProductDetails extends Product {
  productModels: IProductInfos[];
  
}

interface IProductModelDetails extends ProductModel {
  productImages: ProductImage[]
}

interface IProductToSetupCheckout {
  id: string;
  name: string;
  description: string; 
  imageUrl: string;     
  price: number;
  department: string;
  available: boolean;
  createdAt: Date;
  updatedAt?: Date;
  model: {
    id: string;
    productId: string;
    cod: string;
    color: string;
    hexColor: string;
    supportedLoad?: number;
    requiresAssembly: boolean;
    stockQuantity: number;
    discount?: number;
    addition?: number;
    details: string;
    specifications: string;
  };
  size: {
    id: string;
    productId: string;
    productModelId: string;
    width: number;
    height: number;
    length: number;
    weight?: number
    available: boolean;
  };
  mainImageUrl: string;  
}