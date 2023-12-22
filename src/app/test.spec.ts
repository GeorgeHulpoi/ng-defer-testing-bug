import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TestComponent } from './test';

@Component({
    selector: 'app',
    template: `
    <button (click)="show = true">show</button>
    @defer (when show) {
        <test></test>
    }
    `,
    standalone: true,
    imports: [TestComponent],
})
class AppComponent {
    show = false;
}

describe('Snackbar Service', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({imports: [AppComponent], teardown: {destroyAfterEach: true}});
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('it should not render component', async () => {
        expect(fixture.nativeElement.innerHTML).not.toContain('<test>');
    });

    it ('it should render component', fakeAsync(() => {
        component.show = true;

        fixture.detectChanges();
        tick();

        expect(fixture.nativeElement.innerHTML).toContain('<test>');
    }));
});
