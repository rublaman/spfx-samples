import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyFieldList, PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';

import * as strings from 'FilePickerWpWebPartStrings';
import FilePickerWp from './components/FilePickerWp';
import { IFilePickerWpProps } from './components/IFilePickerWpProps';

export interface IFilePickerWpWebPartProps {
  description: string;
  list: IPropertyFieldList;
}

export default class FilePickerWpWebPart extends BaseClientSideWebPart<IFilePickerWpWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IFilePickerWpProps> = React.createElement(
      FilePickerWp,
      {
        description: this.properties.description
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
                PropertyFieldListPicker('lists', {
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
