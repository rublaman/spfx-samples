import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'DetailslistwpWebPartStrings';
import Detailslistwp from './components/Detailslistwp';
import { IDetailslistwpProps } from './components/IDetailslistwpProps';

export interface IDetailslistwpWebPartProps {
  description: string;
}

export default class DetailslistwpWebPart extends BaseClientSideWebPart<IDetailslistwpWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDetailslistwpProps> = React.createElement(
      Detailslistwp,
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
