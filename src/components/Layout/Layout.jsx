import { Box } from "@mui/material";

export function Layout(props) {
  return (
    <Box>
      <Box>{props.header}</Box>
      <Box>{props.menu}</Box>
      <Box>{props.content}</Box>
      <Box>{props.footer}</Box>
    </Box>
  );
}
