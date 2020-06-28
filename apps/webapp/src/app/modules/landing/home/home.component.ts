import {Component, HostListener, ViewEncapsulation} from '@angular/core';

@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
    styleUrls    : ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LandingHomeComponent
{
    public isScreenSmall=false;
    /**
     * Constructor
     */
    constructor()
    {
    }
    /**
     * Getter for current year
     */
    get currentYear(): number
    {
        return new Date().getFullYear();
    }
    ngOnInit() { //detectScreenSize
        this.detectScreenSize();
    }

    private detectScreenSize() {
        if (this.isScreenSmall = window.innerWidth < 959){
            return true;
        } else return false;
    }

    @HostListener('window:resize', ['$event'])
    private onResize(event) {
        this.detectScreenSize();
    }

}
