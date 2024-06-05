import { Shop } from "../../../models/facility/shop/shop.model"; 

export interface ShopRepository {

    getAllShops(): Promise <Shop[]>;
    getShopById(shopId: number): Promise <Shop | undefined>;
    createShop(shop: Shop): Promise <Shop>;
    editShop(shop: Shop): Promise <Shop>;
    deleteShop(shopId: number): Promise <void>;


};
