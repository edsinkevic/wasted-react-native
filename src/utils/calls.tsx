import { Credentials } from '../models/Credentials';
import * as SecureStore from 'expo-secure-store';
import { config } from './config';
import axios, { AxiosError } from 'axios';
import { Offer } from '../models/Offer';
import { Either } from 'fp-ts/lib/Either';
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';
import { ErrorResponse } from '../models/ErrorResponse';
import * as TE from 'fp-ts/lib/TaskEither';
import * as T from 'fp-ts/lib/Task';
import * as IO from 'fp-ts/lib/IO';
import { pipe } from 'fp-ts/lib/function';
import { OfferEntryCreate } from '../models/OfferEntryCreate';
import { OfferUpdate } from '../models/OfferUpdate';
import { OfferCreate } from '../models/OfferCreate';
import { OfferEntry } from '../models/OfferEntry';

export const login = (creds: Credentials, uri: string) => {
  return fetch(uri, {
    method: 'POST',
    body: JSON.stringify(creds),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.status == 200) {
      const token = response.headers.get('set-cookie').split(';')[0];

      if (token != null) return token;
    } else {
      return Promise.reject('Unauthorized');
    }
  });
};

export const getUser = (uri, token) => {
  console.log('token ' + token);
  return fetch(uri, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cookie: token,
    },
  })
    .then((response) => {
      if (response.status == 200) return response.json();
      else return null;
    })
    .catch((e) => console.log('getUser error: ' + e));
};

export const signup = (creds, uri: string) => {
  return fetch(uri, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  }).then((response) => {
    console.log(response.status);
    switch (response.status) {
      case 200:
        return response.json();
      case 400:
        return response
          .json()
          .then((json) => Promise.reject(JSON.stringify(json)));
      case 409:
        return response
          .json()
          .then((json) => Promise.reject(JSON.stringify(json.errors)));
      default:
        return null;
    }
  });
};

export const registerOffer = (create: OfferCreate) =>
  axios
    .post<Offer>(`${config.baseUrl}/offer`, create)
    .then((response) => response.data);

export const updateOffer = (update: OfferUpdate) =>
  axios
    .put<Offer>(`${config.baseUrl}/offer`, update)
    .then((response) => response.data);

export const registerEntry = (create: OfferEntryCreate): Promise<OfferEntry> =>
  axios
    .post<OfferEntry>(`${config.baseUrl}/offerentry`, create)
    .then((response) => response.data);

export const getOffersByVendorName = (name: String): Promise<Offer[]> =>
  axios
    .get<Array<Offer>>(`${config.baseUrl}/offer/${name}`)
    .then((response) => response.data);

export const getCategories = (): Promise<string[]> =>
  axios
    .get<Array<string>>(`${config.baseUrl}/misc/cats`)
    .then((response) => response.data);

export const getEntries = () =>
  axios
    .get<OfferEntry[]>(`${config.baseUrl}/offerentry`)
    .then((response) => response.data);
