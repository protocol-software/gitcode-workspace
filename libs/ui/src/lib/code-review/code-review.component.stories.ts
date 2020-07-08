import { CodeReviewUsersComponent } from './code-review-users/code-review-users.component';

export default {
  title: 'Code Review',
};

export const noUser = () => ({
  moduleMetadata: {
    imports: [],
    declarations: [CodeReviewUsersComponent],
  },
  component: CodeReviewUsersComponent,
  template: `<gitcode-code-review-users [users]='users'></gitcode-code-review-users>`,
  props: {
    users: [],
  },
});

export const user = () => ({
  moduleMetadata: {
    imports: [],
    declarations: [CodeReviewUsersComponent],
  },
  component: CodeReviewUsersComponent,
  template: `<gitcode-code-review-users [users]='users'></gitcode-code-review-users>`,
  props: {
    users: [{ name: 'spock', photoUrl: 'https://avatars2.githubusercontent.com/u/18748215?v=4' }],
  },
});

export const users = () => ({
  moduleMetadata: {
    imports: [],
    declarations: [CodeReviewUsersComponent],
  },
  component: CodeReviewUsersComponent,
  template: `<gitcode-code-review-users [users]='users'></gitcode-code-review-users>`,
  props: {
    users: [
      { name: 'Joris', photoUrl: 'https://i.pravatar.cc/40?img=11' },
      { name: 'Rax', photoUrl: 'https://i.pravatar.cc/40?img=12' },
      { name: 'Ximo', photoUrl: 'https://i.pravatar.cc/40?img=13' },
      { name: 'Anet', photoUrl: 'https://i.pravatar.cc/40?img=14' },
      { name: 'Tord', photoUrl: 'https://i.pravatar.cc/40?img=15' },
      { name: 'Aisha', photoUrl: 'https://i.pravatar.cc/40?img=16' },
      { name: 'Uri', photoUrl: 'https://i.pravatar.cc/40?img=17' },
      { name: 'Enoc', photoUrl: 'https://i.pravatar.cc/40?img=18' },
      { name: 'Elife', photoUrl: 'https://i.pravatar.cc/40?img=19' },
      { name: 'Jake', photoUrl: 'https://i.pravatar.cc/40?img=20' },
    ],
  },
});
