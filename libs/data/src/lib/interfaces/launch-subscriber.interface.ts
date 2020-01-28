export interface ILaunchSubscriber {
  id?: string;
  email: string;
  teamSize?: string;
  isForCodeQuality?: boolean;
  isForEducational?: boolean;
  purposes?: string[];

  isSelected?: boolean;
}
