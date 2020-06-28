/* tslint:disable:max-line-length */
import { TreoNavigationItem } from '../../@treo/components/navigation';

export const defaultNavigation: TreoNavigationItem[] = [


    {
        id   : 'codeReview.publicCodeReview',
        title: '퍼블릭 코드리뷰',
        type : 'basic',
        link : '/code-review/public'
    },
    // {
    //     id   : 'codeReview.publicCodeReview',
    //     title: '프라이빗 코드리뷰',
    //     type : 'basic',
    //     link : '/code-review/private'
    // },
    // {
    //     id      : 'snackCode',
    //     title   : '스낵코드',
    //     type    : 'basic',
    //     link : '/snack-code',
    // },
    // {
    //     id      : 'searchCode',
    //     title   : '코드검색',
    //     type    : 'basic',
    //     link : '/search-code',
    // },
    {
        id      : 'howItWorks',
        title   : '어떻게 동작하나요?',
        type    : 'basic',
        link : '/how-it-works',
    },
    // {
    //     id      : 'settings',
    //     title   : '설정',
    //     type    : 'basic',
    //     link : '/settings',
    // },
];
export const compactNavigation: TreoNavigationItem[] = [
    {
        id      : 'starter',
        title   : 'Starter',
        type    : 'aside',
        icon    : 'apps',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    }
];
export const futuristicNavigation: TreoNavigationItem[] = [
    {
        id   : 'starter.example',
        title: 'Example component',
        type : 'basic',
        icon : 'heroicons:chart-pie',
        link : '/example'
    },
    {
        id   : 'starter.dummy.1',
        title: 'Dummy menu item #1',
        icon : 'heroicons:calendar',
        type : 'basic'
    },
    {
        id   : 'starter.dummy.2',
        title: 'Dummy menu item #1',
        icon : 'heroicons:user-group',
        type : 'basic'
    }
];
export const horizontalNavigation: TreoNavigationItem[] = [
    // {
    //     id      : 'codeReview',
    //     title   : '코드리뷰',
    //     type    : 'group',
    //     children: [
    //         {
    //             id   : 'codeReview.publicCodeReview',
    //             title: '퍼블릭 코드리뷰',
    //             type : 'basic',
    //             link : '/code-review/public'
    //         }
    //         ,{
    //             id   : 'codeReview.publicCodeReview',
    //             title: '프라이빗 코드리뷰',
    //             type : 'basic',
    //             link : '/code-review/private'
    //         }
    //     ]
    // },
    // TODO:spock if don't use nested 'Apeear dropdown arrow error'
    {
                id   : 'codeReview.publicCodeReview',
                title: '퍼블릭 코드리뷰',
                type : 'basic',
                link : '/code-review/public'
    },
    // {
    //     id      : 'snackCode',
    //     title   : '스낵코드',
    //     type    : 'basic',
    //     link : '/snack-code',
    // },
    // {
    //     id      : 'searchCode',
    //     title   : '코드검색',
    //     type    : 'basic',
    //     link : '/search-code',
    // },
    {
        id      : 'howItWorks',
        title   : '어떻게 동작하나요?',
        type    : 'basic',
        link : '/how-it-works',
    }
];
