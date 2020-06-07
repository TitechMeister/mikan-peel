import React, { useState, useCallback } from 'react'
import { Form, Button } from 'react-bootstrap'
import EmailFormGroup from './group/EmailFormGroup'
import PasswordSettingFormGroup from './group/PasswordSettingFormGroup'
import UsernameFormGroup from './group/UsernameFormGroup'
import JapaneseNameFormGroup from './group/JapaneseNameFormGroup'
import EnglishNameFormGroup from './group/EnglishNameFormGroup'
import ExecutiveGenerationFormGroup from './group/ExecutiveGenerationFormGroup'
import TeamFormGroup from './group/TeamFormGroup'
import ProfileImageFormGroup from './group/ProfileImageFormGroup'
import RegistrationCodeFormGroup from './group/RegistrationCodeFormGroup'

const RegisterForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>({})
  const onUpdate = useCallback(
    (update: FormValues) => {
      setValues((values) => ({ ...values, ...update }))
    },
    [setValues],
  )

  const onSubmit = useCallback(
    (event: OnSubmitEvent) => {
      event.preventDefault()
      console.log(values)
    },
    [values],
  )

  return (
    <Form>
      <UsernameFormGroup onUpdate={onUpdate} values={values} />
      <EmailFormGroup onUpdate={onUpdate} values={values} />
      <PasswordSettingFormGroup onUpdate={onUpdate} values={values} />

      <EnglishNameFormGroup onUpdate={onUpdate} values={values} />
      <JapaneseNameFormGroup onUpdate={onUpdate} values={values} />
      <ExecutiveGenerationFormGroup onUpdate={onUpdate} values={values} />
      <TeamFormGroup onUpdate={onUpdate} values={values} />
      <ProfileImageFormGroup onUpdate={onUpdate} values={values} />
      <RegistrationCodeFormGroup onUpdate={onUpdate} values={values} />
      <Button variant='outline-light' onClick={onSubmit}>
        Register
      </Button>
    </Form>
  )
}

export default RegisterForm
