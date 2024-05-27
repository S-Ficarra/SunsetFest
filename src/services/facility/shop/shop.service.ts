import { Shop } from "src/domain/models/facility/shop/shop.model";
import { ShopRepository } from "src/domain/repositories/facility/shop/shop.repository";

export class ShopService implements ShopRepository {

    constructor(private shopRepository : ShopRepository){}
    
    
    getAllShops(): Shop[] {
        return this.shopRepository.getAllShops();
    };

    getShopById(shopId: number): Shop {
        return this.shopRepository.getShopById(shopId);
    };

    createShop(shop: Shop): Shop {
        this.shopRepository.createShop(shop);
        return shop;
    };

    editShop(shop: Shop): Shop {
        this.shopRepository.editShop(shop);
        return shop;
    };

    deleteShop(shopId: number): void {
        this.shopRepository.deleteShop(shopId);
    };

};