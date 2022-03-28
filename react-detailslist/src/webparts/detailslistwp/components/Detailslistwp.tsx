import * as React from 'react';
import styles from './Detailslistwp.module.scss';
import { DetailsList, DetailsListLayoutMode, IColumn, Selection, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Placeholder } from '@pnp/spfx-controls-react/lib/controls/placeholder';

import { IDetailslistwpProps } from './IDetailslistwpProps';
import { IDetailslistwpState } from './IDetailslistwpState';
import ListServices from '../../../services/ListServices';
import { IItems } from '@pnp/sp/items';

export default class Detailslistwp extends React.Component<IDetailslistwpProps, IDetailslistwpState> {

  private _selection: Selection;
  private _listService: ListServices;

  constructor(props: IDetailslistwpProps) {
    super(props);
    this.state = {
      listItems: [],
      selectItem: {},
      columns: []
    };

    this._selection = new Selection({
      onSelectionChanged: () => {
        console.log("_selection>>> ", this._selection.getSelection()[0]);
        if (this._selection.getSelection()[0]) return this.setState({ selectItem: this._selection.getSelection()[0] });
      }
    });
  }

  componentDidMount(): void {
    this.bindDetails();
  }

  componentDidUpdate(prevProps: IDetailslistwpProps, prevState: IDetailslistwpState): void {
    
  }

  private _onConfigure = () => {
    this.props.propertyPane.open();
  }

  public render(): React.ReactElement<IDetailslistwpProps> {
    console.log(this.props.multiColumn);
    const { listItems, columns } = this.state;

    return (
      <React.Fragment>
        {this.props.list &&
          this.props.multiColumn &&
          this.props.multiColumn.length > 0 ? (
          <DetailsList
            items={listItems}
            columns={columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selection={this._selection}
            selectionMode={SelectionMode.single}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="select row"
          />
        ) : (
          <Placeholder
            iconName="Edit"
            iconText="Configure your web part"
            description="Please configure the web part."
            buttonLabel="Configure"
            onConfigure={this._onConfigure}
          />
        )}

      </React.Fragment>
    );
  }

  private async bindDetails(): Promise<void> {
    try {
      const listItems: IItems = await this._listService.getListItems(this.props.list.title);
      console.log(listItems);
    } catch (error) {
      console.log("Binding details: ",error);
    }
  }

  private setColumns(){

  }
}
