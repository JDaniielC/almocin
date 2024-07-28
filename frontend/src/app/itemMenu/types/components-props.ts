export interface ListItemProps {
    name: string;
    deleteBtnCallback: () => void;
    deleteDisabled?: boolean;
    editButtonCallback?: () => void;
    editDisabled?: boolean;
}
  
  export interface BaseLayoutProps {
    titlePage: string;
    children: React.ReactNode;
}