
import { useNavigate } from 'react-router-dom';
import { createRequest } from '../../api/request.api';
import { DynamicForm } from '../../components/DynamicForm/DynamicForm';
import type { FieldSchema } from '../../components/DynamicForm/dynamic-form.types';
import { getApiErrorMessage } from '../../api/api-error';


export default function RequestForm() {
  const navigate = useNavigate();

  const schema: FieldSchema[] = [
    {
      name: 'title',
      label: 'عنوان',
      type: 'text',
      required: true
    },
    {
      name: 'amount',
      label: 'مبلغ',
      type: 'number',
      required: true
    },
    {
      name: 'description',
      label: 'توضیحات',
      type: 'textarea'
    },
    {
      name: "urgency",
      label: "فوریت",
      type: "select",
      required: true,
      options: ["کم", "متوسط", "زیاد"]
    }

  ];

  const submit = async (
    data: Record<string, unknown>
  ) => {

    try {
      await createRequest({
        title: data['title'] as string,
        amount: data['amount'] as number,
        description: data['description']
      });

      navigate('/requests');

    } catch (error) {
      alert(getApiErrorMessage(error));
    }

  };

  return (
    <div>
      <fieldset>
        <legend>ثبت درخواست جدید</legend>

        <DynamicForm
          schema={schema}
          onSubmit={submit}
        />
      </fieldset>
    </div>
  );
}

