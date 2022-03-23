import * as React from 'react';
import styles from './Detailslistwp.module.scss';
import { IDetailslistwpProps } from './IDetailslistwpProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Detailslistwp extends React.Component<IDetailslistwpProps, {}> {
  public render(): React.ReactElement<IDetailslistwpProps> {
    return (
      <div className={ styles.detailslistwp }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>{this.props.list}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
