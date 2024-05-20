import { Shop } from "../../../models/facility/shop/shop.model"; 

export interface ShopRepository {

    getAllShops(): Shop[];
    getShopById(id: number): Shop | undefined;
    createShop(shop: Shop): void;
    editShop(shop: Shop): void;
    deleteShop(id: number): void;


};
