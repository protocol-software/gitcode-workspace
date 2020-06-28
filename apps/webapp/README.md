folder: /apps/webapp/src/app

# public code-review
ng g module modules/app/code-review/public-code-review
ng g component modules/app/code-review/public-code-review --module=public-code-review

ng g module modules/app/code-review/public-code-review/request-code-review
ng g component modules/app/code-review/public-code-review/request-code-review --module=request-code-review

ng g module modules/app/code-review/public-code-review/author-evaluation
ng g component modules/app/code-review/public-code-review/author-evaluation --module=author-evaluation

ng g module modules/app/code-review/public-code-review/expert-evaluation
ng g component modules/app/code-review/public-code-review/expert-evaluation --module=expert-evaluation

# private code-review
ng g module modules/app/code-review/private-code-review
ng g component modules/app/code-review/private-code-review --module=private-code-review

ng g module modules/app/code-review/private-code-review/request-code-review
ng g component modules/app/code-review/private-code-review/request-code-review --module=request-code-review

ng g module modules/app/code-review/private-code-review/author-evaluation
ng g component modules/app/code-review/private-code-review/author-evaluation --module=author-evaluation

ng g module modules/app/code-review/private-code-review/expert-evaluation
ng g component modules/app/code-review/private-code-review/expert-evaluation --module=expert-evaluation


# snack-code
ng g module modules/app/snack-code
ng g component modules/app/snack-code --module=snack-code

ng g module modules/app/snack-code/detail
ng g component modules/app/snack-code/detail --module=detail

# search-code
ng g module modules/app/search-code
ng g component modules/app/search-code --module=search-code

ng g module modules/app/search-code/result
ng g component modules/app/search-code/result --module=result

# payment
ng g module modules/app/payment/pricing
ng g component modules/app/payment/pricing --module=pricing

ng g module modules/app/payment
ng g component modules/app/payment --module=payment

# my-page
ng g module modules/app/my-page
ng g component modules/app/my-page --module=my-page

ng g module modules/app/my-page/profile
ng g component modules/app/my-page/profile --module=profile

ng g module modules/app/my-page/review-history
ng g component modules/app/my-page/review-history --module=review-history

ng g module modules/app/my-page/payment-history
ng g component modules/app/my-page/payment-history --module=payment-history
