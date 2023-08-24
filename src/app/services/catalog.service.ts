import { Injectable } from '@angular/core';
import ticketsType from 'db/ticketsType.json';
import status from 'db/status.json';
import priorities from 'db/priorities.json';
import categories from 'db/categories.json';
import subcategories from 'db/subcategories.json';
import types from 'db/types.json';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  getTicketsType() {
    return ticketsType.ticketsType.filter((item, index) =>
      ticketsType.ticketsType.indexOf(item) === index
    );
  }

  // getStatus() {
  //   return status.status.filter((item, index) =>
  //     status.status.indexOf(item) === index
  //   );
  // }

  getPriorities() {
    return priorities.priorities.filter((item, index) =>
      priorities.priorities.indexOf(item) === index
    );
  }
  getCategories(ticketType: string) {
    return categories.categories.filter((res) => res.ticketType === ticketType);
  }

  getSubcategories(category: string, ticketType: string) {
    return subcategories.subcategories.filter((res) => res.category === category && res.ticketType === ticketType);
  }

  // getTypes(ticketType: string) {
  //   return types.types.filter((res) => res.ticketType === ticketType);
  // }
}
