import { TestBed } from '@angular/core/testing';
import { CatalogService } from './catalog.service';

describe('CatalogService', () => {
  let service: CatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct elements from getTicketsType()', () => {
    // Arrange
    const expected = ['Solicitud de requerimiento', 'Incidente'];
    const expectedLength = 2;

    // Act
    const result = service.getTicketsType();

    // Assert
    expect(result).toEqual(expected);
    expect(result.length).toEqual(expectedLength);
  });

  // it('should return correct elements from getStatus()', () => {
  //   // Arrange
  //   const expected = ['Nuevo', 'Activo', 'Cancelado'];
  //   const expectedLength = 3;

  //   // Act
  //   const result = service.getStatus();

  //   // Assert
  //   expect(result).toEqual(expected);
  //   expect(result.length).toEqual(expectedLength);
  // });

  it('should return correct elements from getPriorities()', () => {
    // Arrange
    const expected = ['Ágil', 'Expedito'];
    const expectedLength = 2;

    // Act
    const result = service.getPriorities();

    // Assert
    expect(result).toEqual(expected);
    expect(result.length).toEqual(expectedLength);
  });

  it('should return correct elements from getCategories()', () => {
    // Arrange
    const expected = [
      {
        ticketType: 'Solicitud de requerimiento',
        categories: [
          'Correo en Cisco ESA',
          'Filtrado web WSA',
          'Autenticación Cisco ISE',
          'Firewall Cisco/Palo Alto',
          'IPS Cisco',
          'VPN AnyConnect',
          'VPN L2L (Entidades externas)'
        ]
      }
    ];

    const expectedLength = 1;

    // Act
    const result = service.getCategories('Solicitud de requerimiento');

    // Assert
    expect(result).toEqual(expected);
    expect(result.length).toEqual(expectedLength);
  });

  it('should return correct elements from getSubcategories()', () => {
    // Arrange
    const expected = [
      {
        ticketType: "Solicitud de requerimiento",
        category: "Correo en Cisco ESA",
        subcategories: [
          "Apertura de casos proactivos con Fabricante",
          "Aplicación de mejoras y Hardening",
          "Aplicación de Parches o actualizaciones",
          "Bloqueo de dominios específicos",
          "Ejecución de control de cambios",
          "Monitoreo y HealthCheck",
          "Nuevas integraciones.",
          "Permiso para dominios específicos"
        ]
      }
    ];
    const expectedLength = 1;

    // Act
    const result = service.getSubcategories('Correo en Cisco ESA', 'Solicitud de requerimiento');

    // Assert
    expect(result).toEqual(expected);
    expect(result.length).toEqual(expectedLength);
  });

  // it('should return correct elements from getTypes()', () => {
  //   // Arrange
  //   const expected = [
  //     {
  //       ticketType: "Solicitud de requerimiento",
  //       types: [
  //         "SVR OP",
  //         "SVR SGSI"
  //       ]
  //     }
  //   ];
  //   const expectedLength = 1;

  //   // Act
  //   const result = service.getTypes('Solicitud de requerimiento');

  //   // Assert
  //   expect(result).toEqual(expected);
  //   expect(result.length).toEqual(expectedLength);
  // });
});
