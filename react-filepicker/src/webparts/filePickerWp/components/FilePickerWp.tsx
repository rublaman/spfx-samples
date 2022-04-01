import * as React from 'react';
import styles from './FilePickerWp.module.scss';
import { IFilePickerWpProps } from './IFilePickerWpProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class FilePickerWp extends React.Component<IFilePickerWpProps, {}> {
  public render(): React.ReactElement<IFilePickerWpProps> {
    return (
      <div className={ styles.filePickerWp }>
      </div>
    );
  }
}
