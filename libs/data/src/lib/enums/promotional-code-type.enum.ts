export enum PromotionalCodeType {
  /**
   * A code that is restricted is targeted to a single user and can only be used once.
   */
  RESTRICTED = 0,

  /**
   * Anyone can see or use a public promo code.
   * These are useful for enticing new customers and encouraging previous shoppers to come back for more.
   */
  PUBLIC = 1,

  /**
   * Stores use private codes to target a specific group of people.
   * Commonly provided to loyal customers for special shopping opportunities,
   * such as first-time shoppers, private codes are a good way to bring in new customers.
   */
  PRIVATE = 2,
}
