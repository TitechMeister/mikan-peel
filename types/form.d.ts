type FormValues = {
  [key: string]: any
}

type FormProps = {
  onUpdate: (update: FormValues) => void
  values: FormValues
}
