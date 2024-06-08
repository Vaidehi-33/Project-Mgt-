import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'objectToArray'
})
export class ObjectToArrayPipe implements PipeTransform {

  constructor(private translateService: TranslateService) {}

  transform(value: any, ...args: any[]): any[] {
    if (!value) return [];
    
    // Convert object to array
    const array = Object.keys(value).map(key => ({
      key: key,
      value: this.translateService.instant(value[key]) // Translate each value
    }));

    return array;
  }

}
