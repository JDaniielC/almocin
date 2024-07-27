export interface ListItemProps {
  name: string;
  deleteBtnCallback: () => void;
  deleteDisabled?: boolean;
  editButtonCallback?: () => void;
  editDisabled?: boolean;
}

export interface ListOrderProps {
  name: string;
  totalPrice: string;
  timeToDelivery: string;
  items: string[];
  editButtonCallback?: () => void;
  editDisabled?: boolean;
}

export interface BaseLayoutProps {
  titlePage: string;
  children: React.ReactNode;
}
