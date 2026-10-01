import { BookFormats } from "@/lib/types/bookFormat";
import {
  Button,
  Divider,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { HTMLInputTypeAttribute } from "react";
import { Control, Controller, useForm } from "react-hook-form";
import NumberField from "../form/NumberField";
import { PatternFormat } from "react-number-format";

type BookCatalogueAddFormInputs = {
  title: string;
  author: string;
  year: string;
  format: string;
  isbn: string;
  description: string;
  pageCount: string;
};

type BookCatalogueAddFormFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<BookCatalogueAddFormInputs, any, BookCatalogueAddFormInputs>;
  type?: HTMLInputTypeAttribute;
  label: string;
  input: keyof BookCatalogueAddFormInputs;
  placeholder?: string;
  multiline?: boolean;
};

type BookCatalogueAddBaseFieldProps = {
  label: string;
  children: React.ReactNode;
};

function BookCatalogueAddBaseField({
  label,
  children,
}: BookCatalogueAddBaseFieldProps) {
  return (
    <Grid container spacing={2} sx={{ display: "flex", alignItems: "center" }}>
      <Grid size={3}>
        <Typography sx={{ justifySelf: "flex-end" }}>{label}</Typography>
      </Grid>
      <Grid size={9}>{children}</Grid>
    </Grid>
  );
}

function BookCatalogueAddFormField({
  control,
  type = "text",
  label,
  input,
  placeholder,
  multiline,
}: BookCatalogueAddFormFieldProps) {
  return (
    <BookCatalogueAddBaseField label={label}>
      <Controller
        control={control}
        name={input}
        render={({ field: { onChange } }) => (
          <TextField
            placeholder={placeholder}
            onChange={onChange}
            fullWidth
            type={type}
            multiline={multiline}
            rows={multiline ? 6 : undefined}
          />
        )}
      />
    </BookCatalogueAddBaseField>
  );
}

function BookCatalogueAddFormSelect({
  control,
  label,
  input,
}: BookCatalogueAddFormFieldProps) {
  return (
    <BookCatalogueAddBaseField label={label}>
      <Controller
        control={control}
        name={input}
        render={({ field: { onChange, value, name, ref, onBlur } }) => (
          <Select
            name={name}
            inputRef={ref}
            value={value ?? BookFormats[BookFormats.Paperback]}
            onBlur={onBlur}
            onChange={(event) => onChange(event.target.value)}
            fullWidth
          >
            <MenuItem value={BookFormats[BookFormats.Paperback]}>
              {BookFormats[BookFormats.Paperback]}
            </MenuItem>
            <MenuItem value={BookFormats[BookFormats.Hardcover]}>
              {BookFormats[BookFormats.Hardcover]}
            </MenuItem>
          </Select>
        )}
      />
    </BookCatalogueAddBaseField>
  );
}

function BookCatalogueAddNumberField({
  control,
  label,
  input,
}: BookCatalogueAddFormFieldProps) {
  return (
    <BookCatalogueAddBaseField label={label}>
      <Controller
        control={control}
        name={input}
        render={({ field: { onChange, name, ref, onBlur } }) => (
          <NumberField
            min={0}
            name={name}
            ref={ref}
            onBlur={onBlur}
            onValueChange={onChange}
          />
        )}
      />
    </BookCatalogueAddBaseField>
  );
}

function BookCatalogueAddISBNField({
  control,
  label,
  input,
}: BookCatalogueAddFormFieldProps) {
  return (
    <BookCatalogueAddBaseField label={label}>
      <Controller
        control={control}
        name={input}
        render={({ field: { onChange, value, name, ref, onBlur } }) => (
          <PatternFormat
            format="978-#-####-####-#"
            allowEmptyFormatting
            mask="_"
            customInput={TextField}
            value={value ?? ""}
            name={name}
            getInputRef={ref}
            onBlur={onBlur}
            onValueChange={(values) => onChange(values.value)}
          />
        )}
      />
    </BookCatalogueAddBaseField>
  );
}

export default function BookCatalogueAddForm() {
  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
  } = useForm<BookCatalogueAddFormInputs>();
  const onSubmit = (data: BookCatalogueAddFormInputs) => console.log(data);

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Stack spacing={1}>
        <Stack spacing={1} sx={{ pb: 1, display: "flex" }}>
          <Typography variant="h6">Book Details</Typography>
          <Divider />
        </Stack>

        <BookCatalogueAddFormField
          control={control}
          label={"Title"}
          input={"title"}
          placeholder="Book Title"
        />
        <BookCatalogueAddFormField
          control={control}
          label={"Author"}
          input={"author"}
          placeholder="Book Author"
        />
        <BookCatalogueAddFormField
          type="date"
          control={control}
          label={"Year Published"}
          input={"year"}
          placeholder="Year Published"
        />
        <BookCatalogueAddFormSelect
          control={control}
          label={"Book Format"}
          input={"format"}
          placeholder="Book Format"
        />
        <BookCatalogueAddISBNField
          control={control}
          label={"ISBN"}
          input={"isbn"}
          placeholder="Book ISBN"
        />
        <BookCatalogueAddFormField
          control={control}
          label={"Description"}
          input={"description"}
          placeholder="Book Description"
          multiline
        />
        <BookCatalogueAddNumberField
          type={"number"}
          control={control}
          label={"Page Count"}
          input={"pageCount"}
          placeholder="Book Page Count"
        />
        <Button
          variant="contained"
          autoFocus
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || !isDirty}
        >
          Save
        </Button>
      </Stack>
    </form>
  );
}
