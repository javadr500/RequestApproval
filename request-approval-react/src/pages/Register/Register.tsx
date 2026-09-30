
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/auth.api';
import { useAuth } from '../../auth/AuthContext';
import { getApiErrorMessage } from '../../api/api-error';

export default function Register() {
  const navigate = useNavigate();
  const { login: useLogin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    try {

      const result = await register({ email, password });
      useLogin(result.token);
      navigate('/requests');
    } catch (error) {
      alert(getApiErrorMessage(error));
    }
  };

  return (
    <div>
      <fieldset >

        <legend>ثبت‌ نام</legend>

        <form onSubmit={submit}>

          <div>
            <label>ایمیل</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div>
            <label>رمز عبور</label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          <button type="submit">
            ثبت‌نام
          </button>

        </form>
      </fieldset>
    </div>
  );
}

