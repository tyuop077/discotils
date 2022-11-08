export interface WithStatus<T> {
  status: number;
  body: T;
}

export const fetcher = (input: RequestInfo | URL, init?: RequestInit) =>
  fetch(input, init).then(res => res.json());

export const fetcherWithStatus = (input: RequestInfo | URL, init?: RequestInit) =>
  fetch(input, init).then(res => res.json().then(body => ({status: res.status, body})));
