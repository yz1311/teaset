/**
 * 目前跟react-native-picker中的逻辑保持一致
 * 1.如果年份变化，新的年份里面的月份包括前面的月份，则月份不发生变化,否则重置月份，日全部重置为第一天(因为最小最大日期的限制，可能不为1)
 * 2.如果月份发生变化,日全部重置为第一天(因为最小最大日期的限制，可能不为1)
 * 用户无法选择最小最大日期之外的值，因为压根就不会显示
 *
 */

import React, { PureComponent } from 'react';
import { ColorPropType, StyleSheet, View, ViewPropTypes as RNViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import Picker from '@yz1311/react-native-wheel-picker';
const PickerItem  = Picker.Item;

// @ts-ignore
const ViewPropTypes = RNViewPropTypes || View.propTypes;

const styles = StyleSheet.create({
    picker: {
        flex: 1
    },
    row: {
        flex:1,
        flexDirection: 'row',
    }
});

const stylesFromProps = props => ({
    itemSpace: props.itemSpace,
    textColor: props.textColor,
    textSize: props.textSize,
});

interface IProps {
    labelUnit: any,
    date: Date,
    maxDate?: Date,
    minDate: Date,
    mode?: string,
    onDateChange?: any,
    style?: any,
    pickerStyle?: any,
    textColor?: string,
    textSize?: number,
    itemSpace?: number,
}

interface IState {
    date: Date,
    monthRange: Array<any>,
    yearRange: Array<any>,
    dayRange: Array<any>
}

export default class DatePickerView extends PureComponent<IProps,IState> {
    static propTypes = {
        labelUnit: PropTypes.shape({
            year: PropTypes.string,
            month: PropTypes.string,
            date: PropTypes.string,
        }),
        date: PropTypes.instanceOf(Date).isRequired,
        maxDate: PropTypes.instanceOf(Date),
        minDate: PropTypes.instanceOf(Date),
        mode: PropTypes.oneOf(['date', 'time', 'datetime']),
        onDateChange: PropTypes.func.isRequired,
        style: ViewPropTypes.style,
        pickerStyle: ViewPropTypes.style,
        textColor: ColorPropType,
        textSize: PropTypes.number,
        itemSpace: PropTypes.number,
    };

    static defaultProps = {
        labelUnit: { year: '年', month: '月', date: '日', hour: '时', minute: '分', second: '秒' },
        mode: 'date',
        maxDate: moment().add(10, 'years').toDate(),
        minDate: moment().add(-10, 'years').toDate(),
        date: new Date(),
        style: null,
        textColor: '#333',
        textSize: 26,
        itemSpace: 20,
    };

    private newValue: any;
    private yearComponent: any;
    private monthComponent: any;
    private dateComponent: any;
    private hourComponent: any;
    private minuteComponent: any;

    constructor(props) {
        super(props);

        this.state = {
            date: this.props.date,
            monthRange: [],
            yearRange: [],
            dayRange:[]
        };
        this.initData();
    }


    UNSAFE_componentWillReceiveProps(nextProps)
    {
        if(this.props.minDate !== nextProps.minDate)
        {
            this.initData();
        }
    }


    initData=()=>{
        const date = moment(this.state.date);
        this.newValue = {};
        // @ts-ignore
        ['year', 'month', 'date', 'hour', 'minute'].forEach((s) => {
            // @ts-ignore
            this.newValue[s] = date.get(s); });

        const dayNum = date.daysInMonth();
        //必须要直接赋值

        // @ts-ignore
        this.state.dayRange = this.genDateRange(date);


        //月份，最小日期和最大日期之间的月份(包括最小和最大)
        // for (let i = 1; i <= 12; i += 1) {
        //     this.state.monthRange.push({ value: i, label: `${i}${this.props.labelUnit.month}` });
        // }
        // @ts-ignore
        this.state.monthRange = this.genMonthRange(date);
        // @ts-ignore
        this.state.yearRange = this.genYearRange(date);

    }

    onYearChange = (year) => {
        //滑动然后再复原，还是会触发
        if(this.newValue.year===year)
        {
            this.newValue.year = year;
            return;
        }
        this.newValue.year = year;
        //新的年份里面的月份包括前面的月份，则月份不发生变化,否则重置月份，日全部重置为第一天(因为最小最大日期的限制，可能不为1)
        const oldYear = this.newValue.year;

        //天数永远归1
        this.newValue.date = 1;
        let nextDate = moment(this.state.date).year(this.newValue.year).date(1);
        let nextMonthes = this.genMonthRange(nextDate);
        let nextDays = this.genDateRange(nextDate);
        this.setState({
            monthRange:nextMonthes,
            dayRange:nextDays
        });
        //判断当前选择的月份是否包含在里面的
        if(!nextMonthes.some(x=>x.value===this.newValue.month))
        {
            //设置为当前数据的第一个月
            nextDate = nextDate.month(nextMonthes[0].value-1);
        }
        //判断当前选择的日期是否包含在里面的
        // if(!nextDays.some(x=>x.value===this.newValue.date))
        // {
        //     //天数为第一天
        //     this.newValue.date = nextDays[0].value;
        //     nextDate = nextDate.date(this.newValue.date);
        // }
        this.setState({
            date:nextDate.toDate()
        });
        // this.checkDate(oldYear, this.newValue.month);
        this.props.onDateChange(this.getValue());
    };

    onMonthChange = (month) => {
        //滑动然后再复原，还是会触发
        if(this.newValue.month===month-1)
        {
            return;
        }
        this.newValue.month = month - 1;
        const oldMonth = this.newValue.month;

        //天数永远归1
        this.newValue.date = 1;
        let nextDate = moment(this.state.date).month(this.newValue.month).date(1);
        let nextDays = this.genDateRange(nextDate);
        this.setState({
            date:nextDate.toDate(),
            dayRange:nextDays
        });
        // this.checkDate(this.newValue.year, oldMonth);
        this.props.onDateChange(this.getValue());
    };

    onDateChange = (date) => {
        this.newValue.date = date;
        let nextDate = moment(this.state.date).date(this.newValue.date);
        this.setState({
            date:nextDate.toDate()
        });
        // this.checkDate(this.newValue.year, this.newValue.month);
        this.props.onDateChange(this.getValue());
    };

    onHourChange = (hour) => {
        this.newValue.hour = hour;
        let nextDate = moment(this.state.date).hour(this.newValue.hour);
        this.setState({
          date:nextDate.toDate()
        });
        this.props.onDateChange(this.getValue());
    };

    onMinuteChange = (minute) => {
        this.newValue.minute = minute;
        let nextDate = moment(this.state.date).minute(this.newValue.minute);
        this.setState({
          date:nextDate.toDate()
        });
        this.props.onDateChange(this.getValue());
    };


    genYearRange(nextDate)
    {
        let years=[];
        nextDate = nextDate || moment(this.state.date);
        const minYear = this.props.minDate.getFullYear();
        const maxYear = this.props.maxDate.getFullYear();
        //年份，最小日期和最大日期之间的年份(包括最小和最大)
        for (let i = minYear; i <= maxYear; i++) {
            years.push({ value: i, label: `${i}${this.props.labelUnit.year}` });
        }
        return years;
    }


    genMonthRange(nextDate)
    {
        //oldDayInMounth newDayInMonth
        //如果新的newDayInMonth<=oldDayInMounth,日保持不变
        //如果新的newDayInMonth>oldDayInMounth,
        //根据当前的日期动态生成月份
        nextDate = nextDate || moment(this.state.date);
        //不是min和max的肯定还是12个月
        const minYear = this.props.minDate.getFullYear();
        const maxYear = this.props.maxDate.getFullYear();
        let monthes = [];
        //包括了
        if([minYear,maxYear].indexOf(parseInt(this.newValue.year))>=0)
        {
            if(minYear === parseInt(this.newValue.year)) {
                //可能minDate和maxDate是同一个年份
                if(maxYear === parseInt(this.newValue.year))
                {
                    for (let i = moment(this.props.minDate).month() + 1; i <= this.props.maxDate.getMonth()+1; i++) {
                        monthes.push({value: i, label: `${i}${this.props.labelUnit.month}`});
                    }
                }
                else {
                    for (let i = moment(this.props.minDate).month() + 1; i <= 12; i++) {
                        monthes.push({value: i, label: `${i}${this.props.labelUnit.month}`});
                    }
                }
            }
            else
            {
                for (let i = 1; i <= moment(this.props.maxDate).month()+1; i++) {
                    monthes.push({value: i, label: `${i}${this.props.labelUnit.month}`});
                }
            }
        }
        else
        {
            for (let i = 1; i <= 12; i += 1) {
                monthes.push({ value: i, label: `${i}${this.props.labelUnit.month}` });
            }
        }
        return monthes;
    }

    genDateRange(nextDate) {
        nextDate = nextDate || moment(this.state.date);
        //不是min和max的肯定还是12个月
        const minDate = moment(this.props.minDate);
        const maxDate = moment(this.props.maxDate);
        const dayNum = nextDate.daysInMonth();
        let days = [];
        //包括了
        if(minDate.isSame(nextDate,'month'))
        {
            //可能minDate和maxDate是同一个月
            if(maxDate.isSame(nextDate,'month'))
            {
                for (let i = minDate.date(); i <= maxDate.date(); i++) {
                    days.push({value: i, label: `${i}${this.props.labelUnit.date}`});
                }
            }
            else {
                for (let i = minDate.date(); i <= dayNum; i++) {
                    days.push({value: i, label: `${i}${this.props.labelUnit.date}`});
                }
            }
        }
        else if(maxDate.isSame(nextDate,'month'))
        {
            for (let i = 1; i <= maxDate.date(); i++) {
                days.push({value: i, label: `${i}${this.props.labelUnit.date}`});
            }
        }
        else
        {
            for (let i = 1; i <= dayNum; i++) {
                days.push({value: i, label: `${i}${this.props.labelUnit.date}`});
            }
        }
        return days;
    }

    render() {
        return (
            <View style={[styles.row,this.props.style]}>
                {['date', 'datetime'].includes(this.props.mode) && this.datePicker}
                {['time', 'datetime'].includes(this.props.mode) && this.timePicker}
            </View>
        );
    }

    get datePicker() {
        const propsStyles = stylesFromProps(this.props);
        console.log('selectedMonth:'+(this.state.date.getMonth() + 1));
        return [
            <View key='year' style={styles.picker}>
                <Picker
                    {...propsStyles}
                    style={this.props.pickerStyle}
                    ref={(year) => { this.yearComponent = year; }}
                    selectedValue={this.state.date.getFullYear()}
                    onValueChange={this.onYearChange}
                >
                    {
                        this.state.yearRange.map((value,i)=>(
                            <PickerItem label={value.label} value={value.value} key={value.value}/>
                        ))
                    }
                </Picker>
            </View>,
            <View key='month' style={styles.picker}>
                <Picker
                    {...propsStyles}
                    style={this.props.pickerStyle}
                    ref={(month) => { this.monthComponent = month; }}
                    selectedValue={this.state.date.getMonth() + 1}
                    onValueChange={this.onMonthChange}
                >
                    {
                        this.state.monthRange.map((value,i)=>(
                            <PickerItem label={value.label} value={value.value} key={value.value}/>
                        ))
                    }
                </Picker>
            </View>,
            <View key='date' style={styles.picker}>
                <Picker
                    {...propsStyles}
                    style={this.props.pickerStyle}
                    ref={(date) => { this.dateComponent = date; }}
                    selectedValue={this.state.date.getDate()}
                    onValueChange={this.onDateChange}
                >
                    {
                        this.state.dayRange.map((value,i)=>(
                            <PickerItem label={value.label} value={value.value} key={value.value}/>
                        ))
                    }
                </Picker>
            </View>,
        ];
    }
    get timePicker() {
        const propsStyles = stylesFromProps(this.props);

        const [hours, minutes] = [[], []];

        for (let i = 0; i <= 24; i += 1) {
            hours.push({ value: i, label: `${i}${this.props.labelUnit.hour}` });
        }

        for (let i = 0; i <= 59; i += 1) {
            minutes.push({ value: i, label: `${i}${this.props.labelUnit.minute}` });
        }

        return [
            <View key='hour' style={styles.picker}>
                <Picker
                    ref={(hour) => { this.hourComponent = hour; }}
                    {...propsStyles}
                    selectedValue={this.state.date.getHours()}
                    onValueChange={this.onHourChange}
                >
                    {
                        hours.map((value, i) => (
                          <PickerItem label={value.label} value={value.value} key={value.value}/>
                        ))
                    }
                </Picker>
            </View>,
            <View key='minute' style={styles.picker}>
                <Picker
                    ref={(minute) => { this.minuteComponent = minute; }}
                    {...propsStyles}
                    selectedValue={this.state.date.getMinutes()}
                    onValueChange={this.onMinuteChange}
                >
                    {
                        minutes.map((value, i) => (
                          <PickerItem label={value.label} value={value.value} key={value.value}/>
                        ))
                    }
                </Picker>
            </View>,
        ];
    }

    checkDate(oldYear, oldMonth) {
        const currentMonth = this.newValue.month;
        const currentYear = this.newValue.year;
        const currentDay = this.newValue.date;

        let dayRange = this.state.dayRange;
        let dayNum = dayRange.length;

        if (oldMonth !== currentMonth || oldYear !== currentYear) {
            dayNum = moment(`${currentYear}-${currentMonth + 1}`, 'YYYY-MM').daysInMonth();
        }

        if (dayNum !== dayRange.length) {
            dayRange = this.genDateRange(dayNum);

            if (currentDay > dayNum) {
                this.newValue.date = dayNum;
                this.dateComponent.setState({ selectedValue: dayNum });
            }

            this.setState({ dayRange });
        }

        const unit = this.props.mode === 'date' ? 'day' : undefined;
        const current = Object.assign({}, this.newValue, { date: this.newValue.date });
        let currentTime = moment(current);
        const min = moment(this.props.minDate);
        const max = moment(this.props.maxDate);
        let isCurrentTimeChanged = false;

        if (currentTime.isBefore(min, unit)) {
            [currentTime, isCurrentTimeChanged] = [min, true];
        } else if (currentTime.isAfter(max, unit)) {
            [currentTime, isCurrentTimeChanged] = [max, true];
        }

        if (isCurrentTimeChanged) {
            if (this.monthComponent) {
                this.monthComponent.setState({ selectedValue: currentTime.get('month') + 1 });
            }

            ['year', 'date', 'hour', 'minute'].forEach((segment) => {
                const ref = this[`${segment}Component`];

                // @ts-ignore
                //Todo: check
                return ref && ref.setState({ selectedValue: currentTime.get(segment) });
            });
        }
    }

    getValue() {
        const { year, month, date, hour, minute } = this.newValue;
        const nextDate = new Date(year, month, date, hour, minute);

        if (nextDate < this.props.minDate) {
            return this.props.minDate;
        }

        return nextDate > this.props.maxDate ? this.props.maxDate : nextDate;
    }
}
