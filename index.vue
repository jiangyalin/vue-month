<template>
  <div class="m-month-box" v-clickOutside="closeSelect">
    <div class="u-box" :data-active="inputState">
      <span class="u-icon">
        <i class="u-icon-date"></i>
      </span>
      <input class="u-it" type="text" :placeholder="locale.startTime" v-model="date[0]" @focus="openSelect" readonly="readonly">
      <span class="u-to">-</span>
      <input class="u-it" type="text" :placeholder="locale.endTime" v-model="date[1]" @focus="openSelect" readonly="readonly">
    </div>
    <div class="u-date" :data-active="inputState">
      <div class="u-date-box">
        <div class="u-date-mn">
          <div class="u-date-bd">
            <div class="u-date-tt">
              <button class="u-btn s-btn-fl" type="button" @click="previousYear(startTime)"></button>
              <span class="u-date-y">{{ startTime.year }} {{ locale.year }}</span>
            </div>
            <div class="u-date-ct">
              <ul class="u-date-table">
                <li class="u-td" v-for="(item, i) in startTime.month" :key="i" :data-state="item.state" @click="selectDate(startTime, i)" @mouseenter="after(startTime, i)">
                  <div class="u-text-gp">
                    <a class="u-date-cell" :data-active="item.active">{{ item.name }}</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="u-date-mn">
          <div class="u-date-bd">
            <div class="u-date-tt">
              <span class="u-date-y">{{ endTime.year }} {{ locale.year }}</span>
              <button class="u-btn s-btn-fr" type="button" @click="nextYear(endTime)"></button>
            </div>
            <div class="u-date-ct">
              <ul class="u-date-table">
                <li class="u-td" v-for="(item, i) in endTime.month" :key="i" :data-state="item.state" @click="selectDate(endTime, i)" @mouseenter="after(endTime, i)">
                  <div class="u-text-gp">
                    <a class="u-date-cell" :data-active="item.active">{{ item.name }}</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import i18n from './i18n'
export default {
  name: 'm-month',
  data () {
    return {
      date: [moment().format('YYYY-MM'), moment().format('YYYY-MM')],
      selectState: 'none',
      selectDateValue: {
        start: moment('2017-03-01').format('YYYY-MM'),
        end: moment('2019-08-01').format('YYYY-MM')
      },
      startTime: {
        name: 'start',
        year: moment().format('YYYY'),
        month: []
      },
      endTime: {
        name: 'end',
        year: moment().add(1, 'year').format('YYYY'),
        month: []
      },
      inputState: false,
      annalIndex: 0,
      locale: {},
      i18n: 'zh-CN'
    }
  },
  props: ['value', 'lang'],
  components: {
  },
  methods: {
    init () {
      this.i18n = this.lang || this.i18n
      this.locale = i18n(this.i18n)
      this.startTime.month = [{
        name: this.locale.month1,
        value: '01',
        active: false,
        state: 'none'
      }, {
        name: this.locale.month2,
        value: '02',
        active: false,
        state: 'none'
      }, {
        name: this.locale.month3,
        value: '03',
        active: false,
        state: 'none'
      }, {
        name: this.locale.month4,
        value: '04',
        active: false,
        state: 'none'
      }, {
        name: this.locale.month5,
        value: '05',
        active: false,
        state: 'none'
      }, {
        name: this.locale.month6,
        value: '06',
        active: false,
        state: 'none'
      }, {
        name: this.locale.month7,
        value: '07',
        active: false,
        state: 'none'
      }, {
        name: this.locale.month8,
        value: '08',
        active: false,
        state: 'none'
      }, {
        name: this.locale.month9,
        value: '09',
        active: false,
        state: 'none'
      }, {
        name: this.locale.month10,
        value: '10',
        active: false,
        state: 'none'
      }, {
        name: this.locale.month11,
        value: '11',
        active: false,
        state: 'none'
      }, {
        name: this.locale.month12,
        value: '12',
        active: false,
        state: 'none'
      }]
      this.endTime.month = this.startTime.month
    },
    openSelect () {
      this.inputState = true
      this.selectDateValue.start = moment(this.date[0] + '-01').format('YYYY-MM')
      this.selectDateValue.end = moment(this.date[1] + '-01').format('YYYY-MM')
      this.startTime.year = this.$moment(this.selectDateValue.start + '-01').format('YYYY')
      this.endTime.year = this.$moment(this.startTime.year + '-01').add(1, 'year').format('YYYY')
      this.initDateBox()
    },
    closeSelect () {
      this.inputState = false
      this.date = [moment(this.selectDateValue.start).format('YYYY-MM'), moment(this.selectDateValue.end).format('YYYY-MM')]
      this.$emit('input', this.date)
    },
    initDateBox () {
      const startDateUnix = this.$moment(this.selectDateValue.start).unix()
      const endDateUnix = this.$moment(this.selectDateValue.end).unix()
      this.startTime.month = this.startTime.month.map(data => {
        const thisDateUnix = this.$moment(this.startTime.year + '-' + data.value + '-01').unix()
        if (thisDateUnix === startDateUnix && thisDateUnix === endDateUnix) {
          return {
            ...data,
            state: 'start end',
            active: true
          }
        }
        if (thisDateUnix === startDateUnix) {
          return {
            ...data,
            state: 'start',
            active: true
          }
        }
        if (thisDateUnix === endDateUnix) {
          return {
            ...data,
            state: 'end',
            active: true
          }
        }
        if (thisDateUnix > startDateUnix && thisDateUnix < endDateUnix) {
          return {
            ...data,
            state: 'during',
            active: true
          }
        }
        return {
          ...data,
          state: 'none',
          active: false
        }
      })
      this.endTime.month = this.endTime.month.map(data => {
        let thisDateUnix = this.$moment(this.endTime.year + '-' + data.value + '-01').unix()
        if (thisDateUnix === startDateUnix && thisDateUnix === endDateUnix) {
          return {
            ...data,
            state: 'start end',
            active: true
          }
        }
        if (thisDateUnix === startDateUnix) {
          return {
            ...data,
            state: 'start',
            active: true
          }
        }
        if (thisDateUnix === endDateUnix) {
          return {
            ...data,
            state: 'end',
            active: true
          }
        }
        if (thisDateUnix > startDateUnix && thisDateUnix < endDateUnix) {
          return {
            ...data,
            state: 'during',
            active: true
          }
        }
        return {
          ...data,
          state: 'none',
          active: false
        }
      })
    },
    previousYear (dateDemo) {
      this.startTime.year = this.$moment(this.startTime.year + '-01-01').add(-1, 'year').format('YYYY')
      this.endTime.year = this.$moment(this.startTime.year + '-01-01').add(1, 'year').format('YYYY')
      this.initDateBox()
    },
    nextYear (dateDemo) {
      this.startTime.year = this.$moment(this.startTime.year + '-01-01').add(1, 'year').format('YYYY')
      this.endTime.year = this.$moment(this.startTime.year + '-01-01').add(1, 'year').format('YYYY')
      this.initDateBox()
    },
    selectDate (dateDemo, index) {
      if (this.selectState === 'none') {
        this.startTime.month = this.startTime.month.map(data => {
          return {
            ...data,
            state: 'none',
            active: false
          }
        })
        this.endTime.month = this.endTime.month.map(data => {
          return {
            ...data,
            state: 'none',
            active: false
          }
        })
        dateDemo.month[index].state = 'start end'
        dateDemo.month[index].active = true
        this.selectState = 'start'
        this.selectDateValue.start = this.$moment(dateDemo.year + '-' + dateDemo.month[index].value + '-01').format('YYYY-MM-DD')
      } else if (this.selectState === 'start') {
        dateDemo.month[index].state = 'end'
        dateDemo.month[index].active = true
        this.selectState = 'none'
        this.selectDateValue.end = this.$moment(dateDemo.year + '-' + dateDemo.month[index].value + '-01').format('YYYY-MM-DD')
        if (this.selectDateValue.start === this.selectDateValue.end) dateDemo.month[index].state = 'start end'
        if (this.$moment(this.selectDateValue.start).unix() > this.$moment(this.selectDateValue.end).unix()) {
          const start = this.selectDateValue.start
          this.selectDateValue.start = this.selectDateValue.end
          this.selectDateValue.end = start
          dateDemo.month[index].state = 'start'
        }
        this.closeSelect()
      }
    },
    after (dateDemo, index) {
      if (this.selectState === 'start') {
        for (let i = 0; i < this.startTime.month.length; i++) {
          if (this.startTime.month[i].active && this.startTime.month[i].state.indexOf('start') !== -1 && this.startTime.month[i].state.indexOf('end') !== -1) {
            this.annalIndex = i
            i = this.startTime.month.length
          }
        }
        for (let i = 0; i < this.endTime.month.length; i++) {
          if (this.endTime.month[i].active && this.endTime.month[i].state.indexOf('start') !== -1 && this.endTime.month[i].state.indexOf('end') !== -1) {
            this.annalIndex = i + 12
            i = this.endTime.month.length
          }
        }

        const startDateUnix = this.$moment(this.selectDateValue.start).unix()
        const afterDateUnix = this.$moment(dateDemo.year + '-' + dateDemo.month[index].value + '-01').unix()
        // 正序
        if (afterDateUnix > startDateUnix) {
          this.startTime.month = this.startTime.month.map((data, i) => {
            const thisDateUnix = this.$moment(this.startTime.year + '-' + data.value + '-01').unix()
            if (thisDateUnix === startDateUnix) {
              return {
                ...data,
                state: 'start',
                active: true
              }
            }
            if (thisDateUnix === afterDateUnix) {
              return {
                ...data,
                state: 'end',
                active: true
              }
            }
            if (thisDateUnix > startDateUnix && thisDateUnix < afterDateUnix) {
              return {
                ...data,
                state: 'during',
                active: true
              }
            }
            return {
              ...data,
              state: 'none',
              active: false
            }
          })
          this.endTime.month = this.endTime.month.map((data, i) => {
            const thisDateUnix = this.$moment(this.endTime.year + '-' + data.value + '-01').unix()
            if (thisDateUnix === startDateUnix) {
              return {
                ...data,
                state: 'start',
                active: true
              }
            }
            if (thisDateUnix === afterDateUnix) {
              return {
                ...data,
                state: 'end',
                active: true
              }
            }
            if (thisDateUnix > startDateUnix && thisDateUnix < afterDateUnix) {
              return {
                ...data,
                state: 'during',
                active: true
              }
            }
            return {
              ...data,
              state: 'none',
              active: false
            }
          })
        }
        // 倒序
        if (afterDateUnix < startDateUnix) {
          this.startTime.month = this.startTime.month.map((data, i) => {
            const thisDateUnix = this.$moment(this.startTime.year + '-' + data.value + '-01').unix()
            if (thisDateUnix === startDateUnix) {
              return {
                ...data,
                state: 'end',
                active: true
              }
            }
            if (thisDateUnix === afterDateUnix) {
              return {
                ...data,
                state: 'start',
                active: true
              }
            }
            if (thisDateUnix > afterDateUnix && thisDateUnix < startDateUnix) {
              return {
                ...data,
                state: 'during',
                active: true
              }
            }
            return {
              ...data,
              state: 'none',
              active: false
            }
          })
          this.endTime.month = this.endTime.month.map((data, i) => {
            const thisDateUnix = this.$moment(this.endTime.year + '-' + data.value + '-01').unix()
            if (thisDateUnix === startDateUnix) {
              return {
                ...data,
                state: 'end',
                active: true
              }
            }
            if (thisDateUnix === afterDateUnix) {
              return {
                ...data,
                state: 'start',
                active: true
              }
            }
            if (thisDateUnix > afterDateUnix && thisDateUnix < startDateUnix) {
              return {
                ...data,
                state: 'during',
                active: true
              }
            }
            return {
              ...data,
              state: 'none',
              active: false
            }
          })
        }
        if (afterDateUnix === startDateUnix) {
          this.startTime.month = this.startTime.month.map((data, i) => {
            if (i === this.annalIndex) {
              this.selectDateValue.start = this.$moment(this.startTime.year + '-' + data.value + '-01').format('YYYY-MM-DD')
              this.selectDateValue.end = this.$moment(this.startTime.year + '-' + data.value + '-01').format('YYYY-MM-DD')
              return {
                ...data,
                state: 'start end',
                active: true
              }
            }
            return {
              ...data,
              state: 'none',
              active: false
            }
          })
          this.endTime.month = this.endTime.month.map((data, i) => {
            if (i + 12 === this.annalIndex) {
              this.selectDateValue.start = this.$moment(this.endTime.year + '-' + data.value + '-01').format('YYYY-MM-DD')
              this.selectDateValue.end = this.$moment(this.endTime.year + '-' + data.value + '-01').format('YYYY-MM-DD')
              return {
                ...data,
                state: 'start end',
                active: true
              }
            }
            return {
              ...data,
              state: 'none',
              active: false
            }
          })
        }
      }
    }
  },
  directives: {
    clickOutside: {
      bind (el, binding, vnode) {
        document.onclick = (e) => {
          if (!el.contains(e.target)) binding.value()
        }
      }
    }
  },
  created () {
    this.date = [moment(this.value[0]).format('YYYY-MM'), moment(this.value[1]).format('YYYY-MM')]
    this.startTime.year = this.$moment(this.date[0] + '-01').format('YYYY')
    this.endTime.year = this.$moment(this.date[1] + '-01').add(1, 'year').format('YYYY')
    this.selectDateValue.start = this.date[0]
    this.selectDateValue.end = this.date[1]
    this.init()
    this.initDateBox()
  },
  mounted () {
  },
  watch: {
    lang () {
      this.init()
    }
  }
}
</script>

<style scoped>
  .m-month-box {
    position: relative;
  }
  .u-box {
    display: flex;
    width: 100%;
    font-size: 12px;
    line-height: 28px;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    background-color: #fff;
    box-sizing: border-box;
    transition: .2s;
  }
  .u-box[data-active='true'] {
    border-color: #409EFF;
  }
  .u-it {
    padding: 0 10px;
    height: 28px;
    line-height: 28px;
    outline: none;
    -webkit-appearance: none;
    background-color: #fff;
    border: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    flex: 1;
    font-size: inherit;
    text-align: center;
    outline: 0;
    border-radius: 4px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 40%;
  }
  .u-it:hover {
    border-color: #c0c4cc;
  }
  .u-it:focus {
    border-color: #409EFF;
    outline: 0;
  }
  .u-icon {
    transition: all .3s;
    font-size: 12px;
    height: 100%;
    color: #c0c4cc;
    text-align: center;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    line-height: 28px;
  }
  .u-box .u-icon .u-icon-date {
    display: block;
    margin-left: 5px;
    width: 18px;
    height: 18px;
    background-image: url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAASABIDASIAAhEBAxEB/8QAGgABAAEFAAAAAAAAAAAAAAAAAAQBAgUGCf/EACgQAAIBBAEDAQkAAAAAAAAAAAECAAMEBRExBhIhBxMUFTNRcaGx4f/EABYBAQEBAAAAAAAAAAAAAAAAAAECAP/EABcRAQEBAQAAAAAAAAAAAAAAAAAxAQL/2gAMAwEAAhEDEQA/AOlHUXV1fE5QWdL3VAvs3Zrh2BKsTvQAPGvzwZAu/UCvQdXR8dVpKjsypVqbJAGgNoPJ8/yS8zfUbbNZBHu6VrUZLZlFS8FsWANTem0d8jxqY26yluMffB8nbv3WtZAvxcVtsQdAJ2jZ/XEvJB1W/q3coP1G4lKXy0+wiSOZi+IiCiIiZn//2Q==');
  }

  .u-date {
    overflow: hidden;
    position: absolute;
    top: 28px;
    left: 0;
    z-index: 2007;
    width: 644px;
    height: 0;
    opacity: 0;
    transition: .2s;
  }
  .u-date[data-active='true'] {
    height: 300px;
    opacity: 1;
  }
  .u-date-box {
    display: flex;
    margin-top: 12px;
    width: 644px;
    color: #606266;
    line-height: 30px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background: #fff;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  .u-date-mn {
    width: 322px;
    color: #606266;
    line-height: 30px;
  }
  .u-date-mn:nth-of-type(1) {
    position: relative;
    border-right: 1px solid #e4e4e4;
  }
  .u-date-mn:nth-of-type(1):after {
    position: absolute;
    top: -3px;
    left: 40px;
    width: 8px;
    height: 8px;
    content: ' ';
    background-color: #fff;
    transform: rotate(45deg);
  }
  .u-date-bd {
    color: #606266;
    line-height: 30px;
  }
  .u-date-tt {
    margin: 12px 12px 0 12px;
    padding-bottom: 12px;
    border-bottom: solid 1px #ebeef5;
    text-align: center;
    color: #606266;
    line-height: 30px;
  }
  .u-date-ct {
    width: 292px;
    position: relative;
    margin: 0 15px 15px 15px;
    color: #606266;
    line-height: 30px;
  }
  .u-btn {
    display: block;
    width: 14px;
    height: 14px;
    background-image: url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAASABIDASIAAhEBAxEB/8QAGAABAQADAAAAAAAAAAAAAAAAAAYFBwn/xAAiEAACAgIDAAIDAQAAAAAAAAABAgMEBQYAERITIQciMTP/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EAB4RAAEDBAMAAAAAAAAAAAAAAAAhMfABAhFyUZGx/9oADAMBAAIRAxEAPwDpnuu6UtJxKWrMc1y3YlFajjqoDWLs7AlYo1JHZPRJJIVVDMxCqSJTWNy2nYstWxCpi3tUJi+fyFdHepV7JZaMBLAyzhSoaT6VQPRQFggyO/abdtZnG7dgVWfYsTBLXSnYk6it1pCplhBP+Uh8KVkXr7UBu17HJL8T7BBpdPGYeKvaOnZGxJFirdiArYx9kyN8lC6P77+T2Embv2f1di/lpbatVeYnKbrmRpnrxddz8cccgHHHHAHHHHAP/9k=');
    background-size: 14px 14px;
  }
  .s-btn-fl {
    font-size: 12px;
    color: #303133;
    border: 0;
    cursor: pointer;
    outline: 0;
    margin-top: 8px;
    float: left;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
  }
  .s-btn-fl:before {
    /*content: "\E610";*/
  }
  .s-btn-fr {
    font-size: 12px;
    color: #303133;
    border: 0;
    cursor: pointer;
    outline: 0;
    margin-top: 8px;
    float: right;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    transform: rotate(180deg);
    -webkit-font-smoothing: antialiased;
  }
  .s-btn-fr:before {
    /*content: "\E613";*/
  }
  .u-date-y {
    font-size: 16px;
    font-weight: 500;
    padding: 0 5px;
    line-height: 22px;
    text-align: center;
    color: #606266;
  }
  .u-date-table {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    font-size: 12px;
    border-collapse: collapse;
    border-spacing: 0;
  }
  .u-td {
    padding: 20px 0;
    width: 25%;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
  }
  .u-td[data-active=true] {
    color: #409EFF;
  }
  .u-text-gp {
    margin: 0 auto;
    padding: 4px;
    width: 100%;
    box-sizing: border-box;
  }
  .u-td[data-state='start'] .u-text-gp {
    margin: 0 auto;
    padding: 4px;
    border-radius: 16px 0 0 16px;
    background-color: #f2f6fc;
    box-sizing: border-box;
  }
  .u-td[data-state='during'] .u-text-gp {
    margin: 0 auto;
    padding: 4px 0;
    background-color: #f2f6fc;
    box-sizing: border-box;
  }
  .u-td[data-state='end'] .u-text-gp {
    margin: 0 auto;
    padding: 4px;
    border-radius: 0 16px 16px 0;
    background-color: #f2f6fc;
    box-sizing: border-box;
  }
  .u-td[data-state='start end'] .u-text-gp {
    margin: 0 auto;
    padding: 4px;
    border-radius: 16px;
    background-color: #f2f6fc;
    box-sizing: border-box;
  }
  .u-date-cell {
    color: #606266;
    margin: 0 auto;
    width: 100%;
    height: 24px;
    display: block;
    line-height: 24px;
    text-decoration: none;
    cursor: pointer;
    outline: none;
    text-align: center;
    font-size: 12px;
    border-collapse: collapse;
  }
  .u-date-cell:hover {
    color: #409EFF;
  }
  .u-td[data-state='start'] .u-date-cell {
    color: #fff;
    border-radius: 12px;
    background-color: #409EFF;
  }
  .u-td[data-state='during'] .u-date-cell {
    /*color: #fff;*/
    /*background-color: #409EFF;*/
  }
  .u-td[data-state='end'] .u-date-cell {
    color: #fff;
    border-radius: 12px;
    background-color: #409EFF;
  }
  .u-td[data-state='start end'] .u-date-cell {
    color: #fff;
    border-radius: 12px;
    background-color: #409EFF;
  }
  .u-td[data-state='start'] .u-date-cell:hover {
    color: #fff;
  }
</style>
