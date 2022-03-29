import { IPropertyPaneAccessor, WebPartContext } from "@microsoft/sp-webpart-base";
import { IPropertyFieldList } from "@pnp/spfx-property-controls";

export interface IDetailslistwpProps {
  context: WebPartContext;
  list: IPropertyFieldList;
  multiColumn: string[];
  propertyPane: IPropertyPaneAccessor;
}
