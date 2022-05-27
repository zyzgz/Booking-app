import styles from "./Header.module.css";
import { Box } from "@mui/material";

export function Header(props) {
  return <Box className={styles.header}>{props.children}</Box>;
}
