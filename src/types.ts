export enum RequestMethod {
  GET = 0,
  POST,
  DELETE,
  OPTIONS,
  PUT
}

export interface RequestMappingMetadata {
  path?: string
  method: RequestMethod
}
