import { Injectable } from "@angular/core";
import { cloneDeep } from "lodash-es";
import {
  FuseNavigationItem,
  FuseNavigationService,
} from "@fuse/components/navigation";
import { FuseMockApiService } from "@fuse/lib/mock-api";
import { defaultNavigation } from "app/mock-api/common/navigation/data";
import { TranslocoService } from "@ngneat/transloco";
// import { contacts } from 'app/mock-api/apps/contacts/data';
// import { tasks } from 'app/mock-api/apps/tasks/data';

@Injectable({
  providedIn: "root",
})
export class SearchMockApi {
  private readonly _defaultNavigation: FuseNavigationItem[] = defaultNavigation;
  private flatNavigation: any;
  // private readonly _contacts: any[] = contacts;
  // private readonly _tasks: any[] = tasks;

  /**
   * Constructor
   */
  constructor(
    private _fuseMockApiService: FuseMockApiService,
    private _fuseNavigationService: FuseNavigationService,
    private _translocoService: TranslocoService
  ) {
    // Register Mock API handlers
    this.registerHandlers();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register Mock API handlers
   */
  async registerHandlers() {
    // Get the flat navigation and store it
    this.flatNavigation = this._fuseNavigationService.getFlatNavigation(
      this._defaultNavigation
    );
    console.log('flatNavigation: ', this.flatNavigation);

    // -----------------------------------------------------------------------------------------------------
    // @ Search results - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onPost("api/common/search")
      .reply(({ request }) => {
        // Get the search query
        const query = cloneDeep(request.body.query.toLowerCase());

        // If the search query is an empty string,
        // return an empty array
        if (query === "") {
          return [200, { results: [] }];
        }

        this.flatNavigation.forEach((page: any) => {
            if (page.title) {
              page.titleTranslated = this._translocoService.translate(page.title);
            }
            if (page.subtitle) {
                page.subtitleTranslated = this._translocoService.translate(page.subtitle);
            }
        });

        // Filter the contacts
        // const contactsResults = cloneDeep(this._contacts)
        //     .filter(contact => contact.name.toLowerCase().includes(query));

        // Filter the navigation
        const pagesResults = cloneDeep(this.flatNavigation).filter(
          (page) =>
            page.titleTranslated?.toLowerCase().includes(query) ||
            (page.subtitleTranslated && page.subtitleTranslated.includes(query))
        );

        console.log("pageResults: ", pagesResults);
        // Filter the tasks
        // const tasksResults = cloneDeep(this._tasks)
        //     .filter(task => task.title.toLowerCase().includes(query));

        // Prepare the results array
        const results = [];

        // If there are contacts results...
        // if ( contactsResults.length > 0 )
        // {
        //     // Normalize the results
        //     contactsResults.forEach((result) => {

        //         // Add a link
        //         result.link = '/apps/contacts/' + result.id;
        //     });

        //     // Add to the results
        //     results.push({
        //         id     : 'contacts',
        //         label  : 'Contacts',
        //         results: contactsResults
        //     });
        // }

        // If there are page results...
        if (pagesResults.length > 0) {
          // Normalize the results
        //   pagesResults.forEach((page: any) => {
        //       if (page.title) {
        //         page.titleTranslated = this._translocoService.translate(page.title);
        //       }
        //       if (page.subtitle) {
        //           page.subtitleTranslated = this._translocoService.translate(page.subtitle);
        //       }
        //   });

          // Add to the results
          results.push({
            id: "pages",
            label: "Pages",
            results: pagesResults,
          });
        }

        // If there are tasks results...
        // if ( tasksResults.length > 0 )
        // {
        //     // Normalize the results
        //     tasksResults.forEach((result) => {

        //         // Add a link
        //         result.link = '/apps/tasks/' + result.id;
        //     });

        //     // Add to the results
        //     results.push({
        //         id     : 'tasks',
        //         label  : 'Tasks',
        //         results: tasksResults
        //     });
        // }

        // Return the response
        return [200, results];
      });
  }
}
