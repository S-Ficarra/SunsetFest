import { Shop } from "src/domain/models/facility/shop/shop.model";
import { ShopRepository } from "src/domain/repositories/facility/shop/shop.repository";

export class ShopService implements ShopRepository {

    constructor(private shopRepository : ShopRepository){}
    
    
    async getAllShops(): Promise<Shop[]> {
        return this.shopRepository.getAllShops();
    };

    async getShopById(shopId: number): Promise<Shop> {
        return this.shopRepository.getShopById(shopId);
    };

    async createShop(shop: Shop): Promise<Shop> {
        this.shopRepository.createShop(shop);
        return shop;
    };

    async editShop(shop: Shop): Promise<Shop> {
        this.shopRepository.editShop(shop);
        return shop;
    };

    async deleteShop(shopId: number): Promise<void> {
        this.shopRepository.deleteShop(shopId);
    };

};