import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IPropertyFieldList } from "@pnp/spfx-property-controls/lib/PropertyFieldListPicker";

export interface IFilePickerWpProps {
  list: IPropertyFieldList;
  context: WebPartContext;
}
