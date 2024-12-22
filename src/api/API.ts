/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
import { T_Topic } from "src/modules/types.ts";

interface TopicsResponse {
  draft_show_id: number | null;
  topics: T_Topic[];
  topics_count: number;
}

interface ShowDetails {
  show_name: string;
  show_date: Date;
  show_time: string;
  show_place: string;
  topics: Array<{
    topic_id: number;
    name: string;
    photo_url: string;
  }>;
}


export interface Show {
  /** Show id */
  show_id?: number;
  /** Topics */
  topics?: string;
  /** Creator */
  creator?: string;
  /** Moderator */
  moderator?: string;
  /** Topics count */
  topics_count?: string;
  /**
   * Created at
   * @format date-time
   */
  created_at?: string;
  /**
   * Submitted at
   * @format date-time
   */
  submitted_at?: string | null;
  /**
   * Completed at
   * @format date-time
   */
  completed_at?: string | null;
  /**
   * Show date
   * @format date
   */
  show_date?: string | null;
  /** Show time */
  show_time?: string | null;
  /**
   * Show name
   * @maxLength 100
   */
  show_name?: string | null;
  /**
   * Show place
   * @maxLength 100
   */
  show_place?: string | null;
  /** Status */
  status?: 1 | 2 | 3 | 4 | 5;
  /**
   * Visitors
   * @min -2147483648
   * @max 2147483647
   */
  visitors?: number;
}

export interface ShowTopic {
  /** Mm id */
  mm_id?: number;
  /**
   * Is main
   * @min -2147483648
   * @max 2147483647
   */
  is_main?: number | null;
  /** Topic */
  topic?: number | null;
  /** Showw */
  showw?: number | null;
}

export interface Topic {
  /** Topic id */
  topic_id?: number;
  /**
   * Name
   * @maxLength 100
   */
  name?: string | null;
  /**
   * Description
   * @maxLength 500
   */
  description?: string | null;
  /**
   * Photo url
   * @maxLength 100
   */
  photo_url?: string | null;
  /** Is main */
  is_main?: string;
}

export interface UserLogin {
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface UserRegister {
  /** ID */
  id?: number;
  /**
   * Адрес электронной почты
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * Имя
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Фамилия
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
}
 
export interface User {
  /** ID */
  id?: number;
  /**
   * Адрес электронной почты
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * Имя
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Фамилия
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Дата регистрации
   * @format date-time
   */
  date_joined?: string;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000/api" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000/api
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  shows = {
    /**
     * No description
     *
     * @tags shows
     * @name ShowsSearchList
     * @request GET:/shows/search/
     * @secure
     */
    showsSearchList: (params: RequestParams = {}) =>
      this.request<ShowDetails[], any>({
        path: `/shows/search/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags shows
     * @name ShowsRead
     * @request GET:/shows/{show_id}/
     * @secure
     */
    showsRead: (showId: string, params: RequestParams = {}) =>
      this.request<ShowDetails, any>({
        path: `/shows/${showId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags shows
     * @name ShowsDeleteDelete
     * @request DELETE:/shows/{show_id}/delete/
     * @secure
     */
    showsDeleteDelete: (showId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/shows/${showId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    // /**
    //  * No description
    //  *
    //  * @tags shows
    //  * @name ShowsUpdateUpdate
    //  * @request PUT:/shows/{show_id}/update/
    //  * @secure
    //  */
    // showsUpdateUpdate: (showId: string, data: Show, params: RequestParams = {}) =>
    //   this.request<Show, any>({
    //     path: `/shows/${showId}/update/`,
    //     method: "PUT",
    //     body: data,
    //     secure: true,
    //     format: "json",
    //     ...params,
    //   }),


        /**
   * Updates show details
   *
   * @tags shows
   * @name ShowsUpdateUpdate
   * @request PUT:/shows/{show_id}/update/
   * @secure
   */
  showsUpdateUpdate: ( showId: string, data: { show_name: string; show_date: string; show_time: string; show_place: string }, params: RequestParams = {} ) =>
    this.request<ShowDetails, any>({
      path: `/shows/${showId}/update/`,
      method: "PUT",
      body: data,
      secure: true,
      format: "json",
      ...params,
  }),

    /**
     * No description
     *
     * @tags shows
     * @name ShowsUpdateStatusAdminUpdate
     * @request PUT:/shows/{show_id}/update_status_admin/
     * @secure
     */
    showsUpdateStatusAdminUpdate: (showId: string, data: Show, params: RequestParams = {}) =>
      this.request<Show, any>({
        path: `/shows/${showId}/update_status_admin/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags shows
     * @name ShowsUpdateStatusUserUpdate
     * @request PUT:/shows/{show_id}/update_status_user/
     * @secure
     */
    showsUpdateStatusUserUpdate: (showId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/shows/${showId}/update_status_user/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags shows
     * @name ShowsUpdateTopicUpdate
     * @request PUT:/shows/{show_id}/update_topic/{topic_id}/
     * @secure
     */
    showsUpdateTopicUpdate: (showId: string, topicId: string, data: ShowTopic, params: RequestParams = {}) =>
      this.request<ShowTopic, any>({
        path: `/shows/${showId}/update_topic/${topicId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags shows
     * @name ShowsDeleteTopicDelete
     * @request DELETE:/shows/{showw}/delete_topic/{topic_id}/
     * @secure
     */
    showsDeleteTopicDelete: (showw: string, topicId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/shows/${showw}/delete_topic/${topicId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  topics = {
    /**
     * No description
     *
     * @tags topics
     * @name TopicsCreateCreate
     * @request POST:/topics/create/
     * @secure
     */
    topicsCreateCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/topics/create/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags topics
     * @name TopicsSearchList
     * @request GET:/topics/search/
     * @secure
     */
    topicsSearchList: (
      query?: {
        query?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<TopicsResponse, any>({
        path: `/topics/search/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags topics
     * @name TopicsRead
     * @request GET:/topics/{topic_id}/
     * @secure
     */
    topicsRead: (topicId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/topics/${topicId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags topics
     * @name TopicsAddToShowCreate
     * @request POST:/topics/{topic_id}/add_to_show/
     * @secure
     */
    topicsAddToShowCreate: (topicId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/topics/${topicId}/add_to_show/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags topics
     * @name TopicsDeleteDelete
     * @request DELETE:/topics/{topic_id}/delete/
     * @secure
     */
    topicsDeleteDelete: (topicId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/topics/${topicId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags topics
     * @name TopicsUpdateUpdate
     * @request PUT:/topics/{topic_id}/update/
     * @secure
     */
    topicsUpdateUpdate: (topicId: string, data: Topic, params: RequestParams = {}) =>
      this.request<Topic, any>({
        path: `/topics/${topicId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags topics
     * @name TopicsUpdateImageCreate
     * @request POST:/topics/{topic_id}/update_image/
     * @secure
     */
    topicsUpdateImageCreate: (topicId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/topics/${topicId}/update_image/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersLoginCreate
     * @request POST:/users/login/
     * @secure
     */
    usersLoginCreate: (data: UserLogin, params: RequestParams = {}) =>
      this.request<UserLogin, any>({
        path: `/users/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersLogoutCreate
     * @request POST:/users/logout/
     * @secure
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterCreate
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: UserRegister, params: RequestParams = {}) =>
      this.request<UserRegister, any>({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdateUpdate
     * @request PUT:/users/{user_id}/update/
     * @secure
     */
    usersUpdateUpdate: (userId: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${userId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
