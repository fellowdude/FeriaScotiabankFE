export interface IModalContent {
  type: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  icon: 'check' | 'exclamation' | 'times' | 'info-circle';
  text: string;
}
