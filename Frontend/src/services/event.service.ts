import axios, { AxiosResponse, AxiosError } from 'axios';
import { API_BASE_URL } from 'constants/environment';
import { GetUserToken } from './token.service';

interface IApiResponse {
  data?: AxiosResponse;
  error?: AxiosError;
}
export const GetMyEvents = async (): Promise<IApiResponse> => {
  try {
    const token = GetUserToken();
    const data = await axios.get(`${API_BASE_URL}/api/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error: any) {
    const _error = error as AxiosError;
    return { error: _error };
  }
};

export const GetAllEvents = async (): Promise<IApiResponse> => {
  try {
    const token = GetUserToken();
    const data = await axios.get(`${API_BASE_URL}/api/events/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error: any) {
    const _error = error as AxiosError;
    return { error: _error };
  }
};

export const AddEvent = async (body: ICreateEvent): Promise<IApiResponse> => {
  const token = GetUserToken();
  try {
    const data = await axios.post(`${API_BASE_URL}/api/events`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error: any) {
    const _error = error as AxiosError;
    return { error: _error };
  }
};

export const GetEvent = async (eventId: string): Promise<IApiResponse> => {
  const token = GetUserToken();
  try {
    const data = await axios.get(`${API_BASE_URL}/api/events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error: any) {
    const _error = error as AxiosError;
    return { error: _error };
  }
};

export const UpdateEvent = async (
  eventId: string,
  body: IUpdateEvent,
): Promise<IApiResponse> => {
  const token = GetUserToken();
  try {
    const data = await axios.put(
      `${API_BASE_URL}/api/events/${eventId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return { data };
  } catch (error: any) {
    const _error = error as AxiosError;
    return { error: _error };
  }
};

export const DeleteEvent = async (eventId: string): Promise<IApiResponse> => {
  const token = GetUserToken();
  try {
    const data = await axios.delete(`${API_BASE_URL}/api/events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error: any) {
    const _error = error as AxiosError;
    return { error: _error };
  }
};

export const RsvpEvent = async (eventId: string): Promise<IApiResponse> => {
  const token = GetUserToken();
  try {
    const data = await axios.post(
      `${API_BASE_URL}/api/events/rsvp/${eventId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return { data };
  } catch (error: any) {
    const _error = error as AxiosError;
    return { error: _error };
  }
};
