import { DetailsList, DetailsListLayoutMode } from 'office-ui-fabric-react/lib/DetailsList';
import * as React from 'react';
import styles from './Detailslistwp.module.scss';
import { IDetailslistwpProps } from './IDetailslistwpProps';

export default class Detailslistwp extends React.Component<IDetailslistwpProps, {}> {
  

  public render(): React.ReactElement<IDetailslistwpProps> {
    return (
      <React.Fragment>
        {/* <DetailsList
          items={items}
          columns={this._columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
          selection={this._selection}
          selectionPreservedOnEmptyClick={true}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="select row"
        /> */}
      </React.Fragment>
    );
  }
}
