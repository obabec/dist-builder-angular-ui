import {Injectable} from '@angular/core';
import {MetadataObjectModel} from "../metadataModel/MetadataObjectModel";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MetadataHttpService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  async getMetadataFromBackend(): Promise<MetadataObjectModel> {
    console.log("API URL: " + this.url)
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Headers', '*')
      .set('Access-Control-Allow-Origin', '*');
    return new Promise((resolve, reject) => {
      this.http.get<MetadataObjectModel>(environment.apiUrl + '/metadata', {'headers': headers})
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
