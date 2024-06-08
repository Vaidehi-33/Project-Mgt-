import { Pipe, PipeTransform } from '@angular/core';
import { MultiLingualService } from 'src/service/multi-lingual.service'; // Update the path

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  constructor(private multiLingualService: MultiLingualService) {}

  transform(users: any[], searchText: string, language: string): any[] { // Add the 'language' parameter here
    if (!searchText) {
      return users;
    }
    
    let filteredUsers: any[] = [];

    this.multiLingualService.getTranslations(language).subscribe(translations => {
      filteredUsers = users.filter(user => {
        const uname = user.userDetails.uname;
        const translatedSearchText = this.translateSearchText(searchText, translations, language); // Pass 'language' here
        return uname.toLowerCase().includes(translatedSearchText.toLowerCase());
      });
    });

    return filteredUsers;
  }

  private translateSearchText(searchText: string, translations: any[], language: string): string {
    // Implement logic to find translation based on searchText
    // You may need to update this based on how translations are structured
    const translation = translations.find(t => t.key === searchText);
    return translation ? translation[language] : searchText; // Assuming the translations contain keys for different languages
  }

}