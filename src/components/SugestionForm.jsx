import { Form as FormPrimitive } from "@base-ui/react/form"

export function Form({ className = "", ...props }) {
  return (
    <FormPrimitive
      className={`subscriber-form ${className}`.trim()}
      data-slot="form"
      {...props}
    />
  )
}

export { FormPrimitive }