import { useState } from 'react';

// Type for validator function
type ValidatorFn<T> = (value: string, fields: T) => string;

// Type for validators object
type Validators<T> = Partial<{
  [K in keyof T]: ValidatorFn<T>;
}>;

// Type for errors object
type Errors<T> = Partial<{
  [K in keyof T]: string;
}>;

// Generic hook
const useFormFields = <T extends Record<string, any | undefined>>(
  initialFields: T,
  validators?: Validators<T>
) => {
  const [fields, setFields] = useState<T>(initialFields);
  const [errors, setErrors] = useState<Errors<T>>({});

  const onChange = (name: keyof T, value: any) => {
    setFields((prev) => ({ ...prev, [name]: value }));

    if (validators && validators[name]) {
      const error = validators[name]!(value, fields);
      setErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      // If no validator, clear error
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return { fields, errors, onChange };
};

export default useFormFields;
