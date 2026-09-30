
import {useForm, type SubmitHandler } from 'react-hook-form';
import type { FieldSchema } from './dynamic-form.types';


interface DynamicFormProps {
  schema: FieldSchema[];
  onSubmit: (data: Record<string, unknown>) => void;
}

export function DynamicForm({
  schema,
  onSubmit
}: DynamicFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Record<string, unknown>>();

  const submit: SubmitHandler<Record<string, unknown>> = (
    data
  ) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>

      {schema.map((field) => (
        <div
          key={field.name}
          style={{ marginBottom: 16 }}
        >
          <label>
            {field.label}
          </label>

          {field.type === 'text' && (
            <input
              type="text"
              {...register(field.name, {
                required: field.required
              })}
            />
          )}

          {field.type === 'number' && (
            <input
              type="number"
              {...register(field.name, {
                required: field.required,
                valueAsNumber: true
              })}
            />
          )}

          {field.type === 'textarea' && (
            <textarea
              {...register(field.name, {
                required: field.required
              })}
            />
          )}

          {field.type === 'select' && (
            <select
              {...register(field.name, {
                required: field.required
              })}
            >
              <option value="">
                انتخاب کنید
              </option>

              {field.options?.map((option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </select>
          )}

          {errors[field.name] && (
            <small style={{ display: 'block' }}>
              {field.label} الزامی است
            </small>
          )}
        </div>
      ))}

      <button type="submit">
        ثبت درخواست
      </button>

    </form>
  );
}

