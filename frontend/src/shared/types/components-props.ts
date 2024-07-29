import { SvgIconComponent } from "@mui/icons-material";

export interface ListOrderProps {
  name: string;
  totalPrice: string;
  timeToDelivery: string;
  items: string[];
  editButtonCallback?: () => void;
  editDisabled?: boolean;
}
export interface BaseLayoutListItemProps {
  text: string;
  icon: SvgIconComponent;
  url: string;
}

export interface BaseLayoutProps {
  listItem: BaseLayoutListItemProps[];
  titlePage: string;
  children: React.ReactNode;
}

export interface ListItemProps {
  name: string;
  deleteBtnCallback: () => void;
  deleteDisabled: boolean;
  editButtonCallback?: () => void;
  editDisabled?: boolean;
}