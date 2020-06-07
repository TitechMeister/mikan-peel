type FormValues = {
  [key: string]: any
}

type FormProps = {
  onUpdate: (update: FormValues) => void
  values: FormValues
}

type OnChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>

type OnSubmitEvent =
  | React.FormEvent<HTMLFormElement>
  | React.MouseEvent<HTMLButtonElement, MouseEvent>
