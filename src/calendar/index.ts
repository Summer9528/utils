interface DateInterface {
  date: number,//在所属月份的第几天
  day: number,//一周中的第几天 
  year: number,
  month: number
}
interface CalendarConfig {
  date: boolean,
  day: boolean,
  year: boolean,
  month: boolean
}
export class Calendar {
  instance: Date
  dates: DateInterface[]
  config: CalendarConfig
  currentYear: number
  currentMonth: number
  constructor(instance: Date = new Date(), config: CalendarConfig = {
    date: true,
    day: true,
    year: true,
    month: true
  }) {
    this.config = config
    this.instance = instance
    this.currentYear = this.getYear()
    this.currentMonth = this.getMonth()
    this.dates = []
    this.setDates(this.currentYear, this.currentMonth)
  }
  setDates(year: number, month: number): DateInterface[] {
    const len = this.getMonthSize(year, month)
    for (let i = 0; i < len; i++) {
      this.dates.push({
        date: i + 1,
        day: this.getDay(year, month, i + 1),
        year: year,
        month: month
      })
    }
    return this.dates
  }
  public prevMonth(): DateInterface[] {
    if (this.currentMonth === 1) {
      this.currentYear--
      this.currentMonth = 12
    } else {
      this.currentMonth--
    }
    return this.setDates(this.currentYear, this.currentMonth)

  }
  public nextMonth(): DateInterface[] {
    if (this.currentMonth === 12) {
      this.currentMonth = 1
      this.currentYear + 1
    } else {
      this.currentMonth++
    }
    return this.setDates(this.currentYear, this.currentMonth)
  }
  public prevYear(): DateInterface[] {
    this.currentYear--
    return this.setDates(this.currentYear, this.currentMonth)
  }
  public nextYear(): DateInterface[] {
    this.currentYear++
    return this.setDates(this.currentYear, this.currentMonth)
  }
  /**
   * @description: 月份天数
   * @param {number} year
   * @param {number} month
   * @return {*}
   */
  getMonthSize(year: number, month: number): number {
    return new Date(year, month, 0).getDate()
  }
  /**
   * @description: 一周的第几天 1-7
   * @return {*}
   */
  public getDay(year: number, month: number, date: number): number {
    return new Date(year, month - 1, date).getDay() + 1
  }
  public getYear(): number {
    return this.instance.getFullYear()
  }
  protected getMonth(): number {
    return this.instance.getMonth() + 1
  }

}


