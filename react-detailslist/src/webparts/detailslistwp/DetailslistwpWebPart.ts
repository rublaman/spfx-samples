import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, IPropertyPaneAccessor } from '@microsoft/sp-webpart-base';
import { IPropertyFieldList, PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
import { IColumnReturnProperty, PropertyFieldColumnPicker, PropertyFieldColumnPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldColumnPicker';

import * as strings from 'DetailslistwpWebPartStrings';
import Detailslistwp from './components/Detailslistwp';
import { IDetailslistwpProps } from './components/IDetailslistwpProps';

export interface IDetailslistwpWebPartProps {
  list: IPropertyFieldList;
  multiColumn: string[];
  propertyPane: IPropertyPaneAccessor;
}

export default class DetailslistwpWebPart extends BaseClientSideWebPart<IDetailslistwpWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDetailslistwpProps> = React.createElement(
      Detailslistwp,
      {
        context: this.context,
        list: this.properties.list,
        multiColumn: this.properties.multiColumn,
        propertyPane: this.context.propertyPane
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyFieldListPicker('list', {
                  label: 'Select a list',
                  selectedList: this.properties.list,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context as any,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId',
                  includeListTitleAndUrl: true
                }),
                PropertyFieldColumnPicker('multiColumn', {
                  label: 'Select columns',
                  context: this.context as any,
                  selectedColumn: this.properties.multiColumn,
                  listId: this.properties.list?.id,
                  disabled: false,
                  orderBy: PropertyFieldColumnPickerOrderBy.Title,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'multiColumnPickerFieldId',
                  displayHiddenColumns: false,
                  columnReturnProperty: IColumnReturnProperty.Title,
                  multiSelect: true,
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
