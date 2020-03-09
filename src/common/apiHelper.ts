import { toast } from 'react-toastify';

enum ApiRequestType {
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE'
}
const baseUrl = 'https://jsonplaceholder.typicode.com';

const fetchData = <T>(
  url: string, 
  requestType: ApiRequestType
): Promise<T> => {
  console.log('fetchData .....', url, requestType);
  
  const headers: HeadersInit = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('x-version-api', '1');
  const options: RequestInit = {
    headers,
    method: requestType
  }
  return fetch(baseUrl + url, options)
    .then(response => {

      if (!response.ok) {
        throw new Error(response.statusText)
      }
      let result: unknown
      if (requestType === ApiRequestType.GET) {
        result = response.json()
        toast.success('response returned successful.');
      } else {
        result = response
      }
      return result as Promise<T>
    })
    .catch((error: Error) => {
      // do logging
      toast.error('Request Error:' + error);

      throw error /* <-- rethrow the error so consumer can still catch it */
    })
}

export const apiGet = function get<T>(url: string): Promise<T> {
  return fetchData(url, ApiRequestType.GET);
}

export const apiAdd = function add(url: string): Promise<Response> {
  return fetchData(url, ApiRequestType.PUT);
}

export const apiRemove = function remove(url: string): Promise<Response> {
  return fetchData(url, ApiRequestType.DELETE);
}