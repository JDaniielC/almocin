import { SvgIconComponent } from "@mui/icons-material";

export interface ListItemProps {
  name: string;
  deleteBtnCallback: () => void;
  deleteDisabled?: boolean;
  editButtonCallback?: () => void;
  editDisabled?: boolean;
}

export interface BaseLayoutListItemProps {
  text: string;
  icon: SvgIconComponent;
}

export interface BaseLayoutProps {
  listItem: BaseLayoutListItemProps[];
  titlePage: string;
  children: React.ReactNode;
}
