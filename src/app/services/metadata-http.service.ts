import {Injectable} from '@angular/core';
import {MetadataObjectModel} from "../metadataModel/MetadataObjectModel";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class MetadataHttpService {
  url = "http://127.0.0.1:7200"

  constructor(private http: HttpClient) { }

  async getMetadataFromBackend(): Promise<MetadataObjectModel> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Headers', '*')
      .set('Access-Control-Allow-Origin', '*');
    return new Promise((resolve, reject) => {
      this.http.get<MetadataObjectModel>(this.url + '/metadata', {'headers': headers})
        .subscribe({
            next: value => {
              resolve(value);
            }, error: err => {
              reject("Could not retrieve metadata from backend!")
            }, complete: () => {
              console.log("Successfully retrieved metadata.")
            }
          }
        )
    });
  }

  async postForm(json: FormData) {
    let headers = new HttpHeaders()
      .set('Accept', 'application/octet-stream')
      .set('Access-Control-Allow-Headers', '*')
      .set('Access-Control-Allow-Origin', '*');
    let options = {headers, responseType: 'blob' as 'json'}
    return new Promise((resolve, reject) => {
      this.http.post(this.url + '/generateDistribution', json, options)
        .subscribe({
          next: value => {
            resolve(value)
          }, error: err => {
            reject(err)
          }, complete: () => {
            console.log("Successfully sent request for distribution generation.")
          }
        })
    });
  }
}
