import * as React from 'react';
import styles from './Detailslistwp.module.scss';
import { DetailsList, DetailsListLayoutMode, IColumn, Selection, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Placeholder } from '@pnp/spfx-controls-react/lib/controls/placeholder';

import { IDetailslistwpProps } from './IDetailslistwpProps';
import { IDetailslistwpState } from './IDetailslistwpState';

export default class Detailslistwp extends React.Component<IDetailslistwpProps, IDetailslistwpState> {

  private _selection: Selection;
  private _columns: IColumn[];

  constructor(props: IDetailslistwpProps) {
    super(props);
    this.state = {
      items: [],
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

  private _onConfigure = () => {
    this.props.propertyPane.open();
  }

  public render(): React.ReactElement<IDetailslistwpProps> {
    console.log(this.props.multiColumn);
    const { items, columns } = this.state;

    return (
      <React.Fragment>
        {this.props.list &&
          this.props.multiColumn &&
          this.props.multiColumn.length > 0 ? (
          <DetailsList
            items={items}
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
}
