import { Component } from '@angular/core';

@Component({
  template: `
     <h1>Page Not Found</h1>
     <div class="alert alert-danger">
        <div class="alert-items">
            <div class="alert-item static">
                <div class="alert-icon-wrapper">
                    <clr-icon class="alert-icon" shape="exclamation-circle"></clr-icon>
                </div>
                <span class="alert-text">
                    The URL you've entered may be invalid.
                </span>
            </div>
        </div>
    </div>
  `
})
export class PageNotFoundComponent { }

