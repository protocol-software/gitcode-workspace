import { Route } from '@angular/router';
import {SnackCodeComponent} from './snack-code.component';
import {DetailComponent} from "./detail/detail.component";

export const SnackCodeRoutes: Route[] = [
    {
        path: '',
        component: SnackCodeComponent
    },
    // {
    //     path     : 'detail/:snackCodeId',
    //     component: DetailComponent,
    //
    // }
];
