import { IItem, IItemAddResult, IItemUpdateResult } from "@pnp/sp/items";

export interface IListServices {
    getListItems(nameList: string): Promise<any>;
    addListItem(nameList: string, fields: any): Promise<IItemAddResult>;
    updateListItem(nameList: string, id: number, fields: any): Promise<IItemUpdateResult>;
    removeListItem(nameList: string, id: number): Promise<void>;
}