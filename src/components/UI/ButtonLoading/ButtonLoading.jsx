import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export function ButtonLoading(props) {
  const buttonProps = { ...props };
  delete buttonProps.loading;

  return props.loading ? (
    <LoadingButton loading variant="contained" sx={{ m: 1 }} fullWidth>
      Ładowanie...
    </LoadingButton>
  ) : (
    <Button
      {...buttonProps}
      type="submit"
      variant="contained"
      sx={{ m: 1 }}
      fullWidth
    >
      {props.label}
    </Button>
  );
}
