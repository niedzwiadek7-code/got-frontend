/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

class BadgeAward {
  id: number

  userId: number

  badge_id: number

  grant_date: Date

  badge_award_status: string

  points_from_previous_badge: number

  constructor(
    id: number,
    userId: number,
    badgeId: number,
    grantDate: Date,
    badgeAwardStatus: string,
    pointsFromPreviousBadge: number,
  ) {
    this.id = id
    this.userId = userId
    this.badge_id = badgeId
    this.grant_date = grantDate
    this.badge_award_status = badgeAwardStatus
    this.points_from_previous_badge = pointsFromPreviousBadge
  }
}

export default BadgeAward
