export interface DialogData {
  title: string;
  message: string;
  okayButton: {
    text: string;
    action: () => void;
    color?: 'primary' | 'accent' | 'warn';
    type: 'mat-stroked-button' | 'mat-flat-button' | 'mat-raised-button';
  };
  cancelButton: {
    text: string;
    action: () => void;
    color?: 'primary' | 'accent' | 'warn';
    type: 'mat-stroked-button' | 'mat-flat-button' | 'mat-raised-button';
  };
}
