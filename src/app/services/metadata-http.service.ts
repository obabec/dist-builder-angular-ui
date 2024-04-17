/*
 * MIT License
 *
 * Copyright (c) [2024] [Ondrej Babec <ond.babec@gmail.com>]
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
 * KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
 * EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE
 * ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

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
