import { IListServices } from "./IListServices";

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI, spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IItemAddResult, IItems, IItemUpdateResult } from "@pnp/sp/items";


export default class ListServices implements IListServices {

  private _context: WebPartContext;
  private _url: string;
  private _sp: SPFI;

  constructor(context: WebPartContext) {
    this._context = context;
    this._url = context.pageContext.site.absoluteUrl;
    this._sp = spfi().using(SPFx(this._context));
  }

  // return the items of nameList
  public getListItems(nameList: string): Promise<any> {
    return this._sp.web.lists
      .getByTitle(nameList)
      .items();
  }

  // add fields ofnameList
  public addListItem(nameList: string, fields: any): Promise<IItemAddResult> {
    return this._sp.web.lists
      .getByTitle(nameList).items
      .add(({ fields }));
  }

  // update the field of nameList
  public updateListItem(nameList: string, id: number, fields: any): Promise<IItemUpdateResult> {
    return this._sp.web.lists
      .getByTitle(nameList).items
      .getById(id)
      .update({ fields });
  }

  // remove an item of nameList by id
  public removeListItem(nameList: string, itemId: number): Promise<void> {
    return this._sp.web.lists
      .getByTitle(nameList).items
      .getById(itemId)
      .delete();
  }
}