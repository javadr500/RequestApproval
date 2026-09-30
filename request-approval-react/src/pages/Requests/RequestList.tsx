
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { approveRequest, getRequests, rejectRequest } from '../../api/request.api';
import { RequestStatus, type RequestItem } from '../../models/request.types';
import { getApiErrorMessage } from '../../api/api-error';


export default function RequestList() {
  const navigate = useNavigate();

  const [requests, setRequests] =
    useState<RequestItem[]>([]);

  const load = async () => {
    const result = await getRequests();

    setRequests(result);
  };

  useEffect(() => {
    load();
  }, []);

  const approve = async (id: string) => {
    try {
      await approveRequest(id);
      await load();
    } catch (error) {
      alert(getApiErrorMessage(error));
    }

  };

  const reject = async (id: string) => {
    try {
      await rejectRequest(id);
      await load();
    } catch (error) {
      alert(getApiErrorMessage(error));
    }

  };

  const getStatus = (
    status: RequestStatus
  ) => {
    switch (status) {
      case RequestStatus.Pending:
        return 'در انتظار';

      case RequestStatus.Approved:
        return 'تأیید شده';

      case RequestStatus.Rejected:
        return 'رد شده';

      default:
        return '';
    }
  };

  return (
    <div>

      <fieldset style={{width:'100%'}}>
        <legend>درخواست‌ها</legend>

        <div>

          <button
            onClick={() =>
              navigate('/requests/new')
            }
          >
            درخواست جدید
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>عنوان</th>
              <th>مبلغ</th>
              <th>وضعیت</th>
              <th>Role</th>
              <th>تاریخ</th>
              <th>عملیات</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>

                <td>
                  {request.title}
                </td>

                <td>
                  {request.amount.toLocaleString()}
                </td>

                <td>
                  {getStatus(request.status)}
                </td>

                <td>
                  {request.assignedRole}
                </td>

                <td>
                  {new Date(
                    request.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>

                  {request.status ===
                    RequestStatus.Pending && (
                      <>
                        <button
                          onClick={() =>
                            approve(request.id)
                          }
                        >
                          تأیید
                        </button>

                        <button
                          onClick={() =>
                            reject(request.id)
                          }
                        >
                          رد
                        </button>
                      </>
                    )}

                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </fieldset>
    </div>
  );
}


