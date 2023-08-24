import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTicketComponent } from './create-ticket.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CatalogService } from 'src/app/services/catalog.service';
import { MatCardModule } from '@angular/material/card';
import { CreateTicketService } from 'src/app/services/create-ticket.service';

describe('CreateTicketComponent', () => {

  let component: CreateTicketComponent;
  let fixture: ComponentFixture<CreateTicketComponent>;
  let _catalogServiceSpy: jasmine.SpyObj<CatalogService>;
  let _createTicketServiceSpy: jasmine.SpyObj<CatalogService>;

  beforeEach(async () => {
    _catalogServiceSpy = jasmine.createSpyObj(
      '_catalogService',
      [
        'getTicketsType',
        'getStatus',
        'getPriorities',
        'getCategories',
        'getSubcategories',
        'getTypes',
        'getProducts'
      ]
    );

    _createTicketServiceSpy = jasmine.createSpyObj(
      '_createTicketService',
      [
        'uploadFile'
      ]
    )

    await TestBed.configureTestingModule({
      declarations: [CreateTicketComponent],
      imports: [
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatOptionModule,
        NoopAnimationsModule,
        MatAutocompleteModule,
        MatCardModule
      ],
      providers: [
        {
          provide: CatalogService,
          useValue: _catalogServiceSpy,
        },
        {
          provide: CreateTicketService,
          useValue: _createTicketServiceSpy,
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the categories correctly', () => {
    // Arrange
    let mockCategories = [
      {
        ticketType: 'TicketType_1',
        categories: ['Category1', 'Category2']
      }
    ]

    _catalogServiceSpy.getCategories.and.returnValue(mockCategories);

    // Act
    component.getCategories();

    // Assert
    expect(component.categories).toEqual(['Category1', 'Category2']);
  });

  it('should clean the value of category and subcategory', () => {
    // Arrange
    let mockCategories = [
      {
        ticketType: 'TicketType_1',
        categories: ['Category1', 'Category2']
      }
    ]

    _catalogServiceSpy.getCategories.and.returnValue(mockCategories);
    component.ticketFormBuilder.controls['subcategory'].setValue('subcategory1');
    component.ticketFormBuilder.controls['category'].setValue('category1');

    // Act
    component.getCategories();

    // Assert
    expect(component.ticketFormBuilder.controls['subcategory'].value).toEqual('');
    expect(component.ticketFormBuilder.controls['category'].value).toEqual('');
  });

  it('should filter duplicate records in categories', () => {
    // Arrange
    let mockCategories = [
      {
        ticketType: 'TicketType_1',
        categories: ['Category1', 'Category2', 'Category1', 'Category2']
      }
    ]

    _catalogServiceSpy.getCategories.and.returnValue(mockCategories);

    // Act
    component.getCategories();

    // Assert
    expect(component.categories).toEqual(['Category1', 'Category2']);
  });

  it('should get the subcategories correctly', () => {
    // Arrange
    let mockSubCategories = [
      {
        ticketType: 'Type_1',
        category: 'Category_1',
        subcategories: ['subcategory1', 'subcategory2']
      }
    ]

    _catalogServiceSpy.getSubcategories.and.returnValue(mockSubCategories);

    // Act
    component.getSubcategories();

    // Assert
    expect(component.subcategories).toEqual(['subcategory1', 'subcategory2']);
  });

  it('should clean the value of subcategory', () => {
    // Arrange
    let mockSubCategories = [
      {
        ticketType: 'Type_1',
        category: 'Category_1',
        subcategories: ['subcategory1', 'subcategory2']
      }
    ]

    _catalogServiceSpy.getSubcategories.and.returnValue(mockSubCategories);
    component.ticketFormBuilder.controls['subcategory'].setValue('subcategory1');

    // Act
    component.getSubcategories();

    // Assert
    expect(component.ticketFormBuilder.controls['subcategory'].value).toEqual('');
  });

  it('should filter duplicate records in subcategories', () => {
    // Arrange
    let mockSubCategories = [
      {
        ticketType: 'Type_1',
        category: 'Category_1',
        subcategories: ['subcategory1', 'subcategory2', 'subcategory1', 'subcategory2']
      }
    ]
    _catalogServiceSpy.getSubcategories.and.returnValue(mockSubCategories);

    // Act
    component.getSubcategories();

    // Assert
    expect(component.subcategories).toEqual(['subcategory1', 'subcategory2']);
  });

  // it('should get the types correctly', () => {
  //   // Arrange
  //   let mockTypes = [
  //     {
  //       ticketType: 'Ticket_Type_1',
  //       types: ['type1', 'type2']
  //     }
  //   ]

  //   _catalogServiceSpy.getTypes.and.returnValue(mockTypes)

  //   // Act
  //   component.getTypes();

  //   // Assert
  //   expect(component.types).toEqual(['type1', 'type2']);
  // });

  // it('should clean the value of type', () => {
  //   // Arrange
  //   let mockTypes = [
  //     {
  //       ticketType: 'Ticket_Type_1',
  //       types: ['type1', 'type2']
  //     }
  //   ]
  //   _catalogServiceSpy.getTypes.and.returnValue(mockTypes)
  //   component.ticketFormBuilder.controls['type'].setValue('type1');

  //   // Act
  //   component.getTypes();

  //   // Assert
  //   expect(component.ticketFormBuilder.controls['type'].value).toEqual('');
  // });

  // it('should filter duplicate records in types', () => {
  //   // Arrange
  //   let mockTypes = [
  //     {
  //       ticketType: 'Ticket_Type_1',
  //       types: ['type1', 'type2', 'type1', 'type2']
  //     }
  //   ]

  //   _catalogServiceSpy.getTypes.and.returnValue(mockTypes)

  //   // Act
  //   component.getTypes();

  //   // Assert
  //   expect(component.types).toEqual(['type1', 'type2']);
  // });
});
