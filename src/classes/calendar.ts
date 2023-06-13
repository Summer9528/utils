type DateType = {
  date: number,//在所属月份的第几天
  day: number,//一周中的第几天 
  year: number,
  month: number,
}
type CalendarConfig = {
  date: boolean,
  day: boolean,
  year: boolean,
  month: boolean
}
// TODO: to know how it works ?
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>
type MonthRange = IntRange<1, 12>

export default class Calendar {
  private instance: Date
  private dates: DateType[]
  private config: CalendarConfig
  private currentYear: number
  private currentMonth: number
  constructor(instance: Date = new Date(), config: CalendarConfig = {
    date: true,
    day: true,
    year: true,
    month: true
  }) {
    this.config = config
    this.instance = instance
    this.currentMonth = this.instance.getMonth() + 1
    this.currentYear = this.instance.getFullYear()
    this.dates = this.setDates(this.currentMonth, this.currentMonth)
  }
  private setDates(year: number, month: number): DateType[] {
    this.dates = []
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
  public getDates(): DateType[] {
    return this.dates
  }
  public prevMonth(): DateType[] {
    if (this.currentMonth === 1) {
      this.currentYear--
      this.currentMonth = 12
    } else {
      this.currentMonth--
    }
    this.instance = new Date(this.currentYear, this.currentMonth)
    this.dates = this.setDates(this.currentYear, this.currentMonth)
    return this.dates
  }
  public nextMonth(): DateType[] {
    if (this.currentMonth === 12) {
      this.currentMonth = 1
      this.currentYear + 1
    } else {
      this.currentMonth++
    }
    this.instance = new Date(this.currentYear, this.currentMonth)
    this.dates = this.setDates(this.currentYear, this.currentMonth)
    return this.dates
  }
  public prevYear(): DateType[] {
    this.currentYear--
    this.instance = new Date(this.currentYear, this.currentMonth)
    this.dates = this.setDates(this.currentYear, this.currentMonth)
    return this.dates
  }
  public nextYear(): DateType[] {
    this.currentYear++
    this.instance = new Date(this.currentYear, this.currentMonth)
    this.dates = this.setDates(this.currentYear, this.currentMonth)
    return this.dates
  }
  private getMonthSize(year: number, month: number): number {
    return new Date(year, month, 0).getDate()
  }
  private getDay(year: number, month: number, date: number): number {
    return new Date(year, month - 1, date).getDay() + 1
  }
}


