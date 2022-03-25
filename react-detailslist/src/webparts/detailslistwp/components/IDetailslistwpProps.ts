import { IPropertyPaneAccessor } from "@microsoft/sp-webpart-base";
import { IPropertyFieldList } from "@pnp/spfx-property-controls";

export interface IDetailslistwpProps {
  list: IPropertyFieldList;
  multiColumn: string[];
  propertyPane: IPropertyPaneAccessor;
}
