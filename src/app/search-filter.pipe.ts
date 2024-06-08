import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(projects: any[], searchText: string): any[] {
    if (!searchText) {
      return projects;
    }
  
    return projects.filter(project => {
      const pname = project.projectDetails.pname; 
      
  
      return pname.toLowerCase().includes(searchText.toLowerCase());
    });
  }

}
