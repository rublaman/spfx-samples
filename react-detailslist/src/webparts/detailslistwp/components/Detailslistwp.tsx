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

    this._listService = new ListServices(this.props.context);
  }

  componentDidMount(): void {
    console.log("componentDidMount");
    this.setColumns();
    this.bindDetails();
  }

  public componentDidUpdate(prevProps: IDetailslistwpProps) {
    console.log("componentDidUpdate");
    if (this.props.list !== prevProps.list) this.bindDetails();
    if (this.props.multiColumn !== prevProps.multiColumn) this.setColumns();
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
      if (this.props.list) {
        console.log(this.props.list.title);
        const listItems: any[] = await this._listService.getListItems(this.props.list.title);
        this._selection.setAllSelected(false);
        this.setState({ listItems: listItems });
        console.log("items: ", this.state.listItems);
      }
    } catch (error) {
      console.log("bindDetails() ERROR\n", error);
    }
  }

  private setColumns() {
    const columns = this.props.multiColumn.map(colName => {
      return { key: colName, name: colName, fieldName: colName, minWidth: 100, maxWidth: 200, isResizable: true }
    })
    this.setState({ columns: columns })
  }
}
