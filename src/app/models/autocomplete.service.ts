import { Injectable } from '@angular/core';
import { SharepointContextService, SharePointItem, KeywordSearchService, ODataQueryConfiguration } from 'sp-pnpjs-utility';
import { Employee } from './employee.model';
import { environment } from '../../environments/environment';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserDirectoryKeywordSearchService {

  constructor(private http: HttpClient, private sharepointContextService: SharepointContextService,
    private keywordSearchService: KeywordSearchService) {}

  search = (text: string): Observable<Response> => {
    const webUrl = this.sharepointContextService.getInfo().webAbsoluteUrl;
    const configuration = {
        http: this.http,
        fieldsToSelect: ['Id', 'Name', 'WorkEmail'],
        fieldsToSearch: ['Name'],
        url: `${webUrl}/_vti_bin/ListData.svc/UserInformationList`,
        mapFunc: (resp: any) => {
            const results = resp.d.results;
            return results.map((item: any) => {
                return {
                    Id: item.Id,
                    Title: item.Name,
                    Email: item.WorkEmail,
                    display: item.Name,
                    value: item.Id
                };
            });
        }
    };
      return this.keywordSearchService.search(text, configuration);
  }
}

@Injectable()
export class CountriesKeywordSearchService {

  constructor(private http: HttpClient, private sharepointContextService: SharepointContextService,
    private keywordSearchService: KeywordSearchService) {}


  search = (text: string): Observable<Response> => {
    const webUrl = this.sharepointContextService.getInfo().webAbsoluteUrl;
      const configuration = {
        http: this.http,
        fieldsToSelect: ['Id', 'Title'],
        fieldsToSearch: ['Title'],
        url: `${webUrl}/_api/web/lists/getByTitle('Countries')/items`,
        mapFunc: (resp: any) => {
            const results = resp.value;
            return results.map((item: any) => {
                return {
                    Id: item.Id,
                    Title: item.Title,
                    display: item.Title,
                    value: item.Id
                };
            });
        }
      };
      return this.keywordSearchService.search(text, configuration);
  }
}
