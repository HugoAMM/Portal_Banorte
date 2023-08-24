import { SimpleTablePipe } from './simple-table.pipe';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';



describe('SimpleTablePipe', () => {
  it('create an instance', () => {
    const pipe = new SimpleTablePipe("");
    expect(pipe).toBeTruthy();
  });

  it('Simple Table', () => {
    registerLocaleData(localeEs);
    const pipe = new SimpleTablePipe("es");
    const date = "2023/02/15 13:47:00";
    expect(pipe.transform(date, 'date')).toBe("15/2/23 13:47");
    expect(pipe.transform(date, 'idk')).toBe(date);
  })
});
