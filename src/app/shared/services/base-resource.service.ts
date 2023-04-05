import { BaseResourceModel } from "../models/base-resource.model";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators"
import { Injector } from "@angular/core";


export abstract class BaseResourceService<T extends BaseResourceModel>{

  protected http: HttpClient
  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonDataToResourceFn: (json: any) => T
  ) {
    this.http = injector.get(HttpClient)
  }


  getAll(): Observable<T[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResources.bind(this))
    )
  }

  getById(id: number): Observable<T> {
    const url = `${this.apiPath}/${id}`

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource.bind(this))
    )
  }

  create(resource: T): Observable<T> {
    return this.http.post(this.apiPath, resource).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource)
    )
  }

  update(resource: T, id: number): Observable<T> {
    const url = `${this.apiPath}/${id}`

    return this.http.put(url, resource).pipe(
      catchError(this.handleError),
      map(() => resource)
    )
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }


  // private methods

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = []
    jsonData.forEach((element) =>
      resources.push(this.jsonDataToResourceFn(element))
    );
    return resources
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: any): Observable<any> {
    console.log("ERROR NA REQUISICAO =>", error)
    return throwError(error)
  }
}
