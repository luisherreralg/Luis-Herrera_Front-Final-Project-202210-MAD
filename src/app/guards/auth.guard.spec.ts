import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let injector: TestBed;
  let authService: AuthGuard;
  let guard: AuthGuard;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const routeMock: any = { snapshot: {} };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const routeStateMock: any = { snapshot: {}, url: '/admin' };
  const routerMock = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: routerMock }],
      imports: [HttpClientTestingModule],
    });
    injector = getTestBed();
    authService = injector.get(AuthGuard);
    guard = injector.get(AuthGuard);
  });

  it('should allow an authenticated user to access the route', () => {
    const spyLocalStorageService = spyOn(
      authService.localStorageService,
      'checkTokenRole'
    ).and.returnValue({ role: 'admin' });

    expect(guard.canActivate(routeMock, routeStateMock)).toBeTruthy();
    expect(spyLocalStorageService).toHaveBeenCalled();
  });

  it('should redirect an unauthenticated user to the login route', () => {
    const spyLocalStorageService = spyOn(
      authService.localStorageService,
      'checkTokenRole'
    ).and.returnValue({});

    expect(guard.canActivate(routeMock, routeStateMock)).toBeUndefined();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    expect(spyLocalStorageService).toHaveBeenCalled();
  });
});
