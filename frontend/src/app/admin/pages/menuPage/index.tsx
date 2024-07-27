import { useContext, useEffect } from "react";
import styles from "./index.module.css";
import LoadingComponent from "../../../../shared/components/Loading";
import BaseLayout from "../../../../shared/components/BaseLayout";
import { listItemAdmin } from "../../../../shared/types/base-layout-list-item";
import { MenuContext } from "../../../../shared/context/menuContext";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const MenuPage = () => {
  const {service, state} = useContext(MenuContext);

 useEffect(() => {
    service.getItems()
  }, 
  [service]);

  return (
    <BaseLayout titlePage="Cardápio" listItem={listItemAdmin}>
      <div className={styles.listContainer}>
        {state.getItemsRequestStatus.maybeMap({
          loading: () => <LoadingComponent></LoadingComponent>,
          failed: () => <span>Erro ao carregar itens!</span>,
          succeeded: (items) => (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Preço</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Promoção</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Tempo de preparo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.category?.name ?? 'Sem categoria'}</TableCell>
                    <TableCell>{row.hasPromotion ? 'Em promoção' : '-'}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.timeToPrepare}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ),
        })}
      </div>
    </BaseLayout>
  );
};

export default MenuPage;