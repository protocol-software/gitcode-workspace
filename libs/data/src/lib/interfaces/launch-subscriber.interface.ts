export interface ILaunchSubscriber {
  id?: string;
  email: string;
  teamSize?: string;
  isForCodeQuality?: boolean;
  isForEducational?: boolean;
  purposes?: string[];

  phone?: string;
  registerDate?: Date;

  isSelected?: boolean;
}
