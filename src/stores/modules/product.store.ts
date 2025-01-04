import { defineStore } from "pinia";
import { fetchProducts } from "../../api/product/product.api";
import { fetchCategories } from "../../api/category/category.api";
import { fetchColors } from "../../api/color/color.api";
import { fetchSizes } from "../../api/size/size.api";
import { IProduct } from "../../api/product/product.types";
import { IProductVariant } from "../../api/product/productVariant.types";
import { ICategory } from "../../api/category/category.types";
import { IColor } from "../../api/color/color.types";
import { ISize } from "../../api/size/size.types";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [] as any[],
    product: null as IProduct | null,
    variants: [] as IProductVariant[],
    categories: [] as ICategory[],
    colors: [] as IColor[],
    sizes: [] as ISize[],
    selectedCategories: [] as string[],
    selectedColors: [] as string[],
    selectedSizes: [] as string[],
    error: null as any | null,
    loading: false,
  }),
  getters: {
    filteredProducts(state) {
      state.products.filter(productData => {
        const product = productData.product;
        const variants = productData.variants || [];
  
        const matchesCategory =
          !state.selectedCategories.length ||
          product?.categoryIds?.some((category: string) =>
            state.selectedCategories.includes(category)
          );
  
        const matchesSize: boolean = !state.selectedSizes.length ||
          (variants.length > 0 && variants.some((variant: IProductVariant) =>
            state.selectedSizes.includes(variant.sizeId?._id)
        ));
  
        const matchesColor: boolean = !state.selectedColors.length ||
        (variants.length > 0 && variants.some((variant: IProductVariant) =>
          state.selectedColors.includes(variant.colorId?._id)
        ));

        const matchesNoVariants = variants.length === 0 && matchesCategory;
  
        return matchesCategory && matchesSize && matchesColor || matchesNoVariants;
      });
    },
  },  
  actions: {
    async loadInitialData() {
      try {
        const products = await fetchProducts();
        const categories = await fetchCategories();
        const colors = await fetchColors();
        const sizes = await fetchSizes();

        this.products = products;
        this.categories = Array.isArray(categories) ? categories : [];
        this.colors = Array.isArray(colors) ? colors : [];
        this.sizes = Array.isArray(sizes) ? sizes : [];
      } catch (err) {
        this.error = err;
        console.error("Failed to load initial data:", err);
      }
    },
    setFilters(filters: { categories: string[], sizes: string[], colors: string[] }) {
      this.selectedCategories = filters.categories;
      this.selectedSizes = filters.sizes;
      this.selectedColors = filters.colors;
    },
  },
});