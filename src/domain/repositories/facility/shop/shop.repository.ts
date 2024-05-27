import { Shop } from "../../../models/facility/shop/shop.model"; 

export interface ShopRepository {

    getAllShops(): Shop[];
    getShopById(shopId: number): Shop | undefined;
    createShop(shop: Shop): void;
    editShop(shop: Shop): void;
    deleteShop(shopId: number): void;


};
